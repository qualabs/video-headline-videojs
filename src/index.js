import React from 'react'
import PropTypes from 'prop-types'
import videojs from 'video.js'
import { loadPaths } from './utils/loadScript'
import { plugins } from './utils/settings'
import { checkUnmutedAutoplaySupport } from './utils/autoPlay'

import './utils/allSettled'
import 'video.js/dist/video-js.min.css'
import './index.css'

// Make videjs visible from everywhere, needed for external plugins
// and allow console log
window.videojs = videojs

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.detectAdblock
    this.autoplayAllowed = false
    this.autoplayRequiresMute = false
  }

  componentDidMount() {
    const promisePlugins = [
      ...loadPaths(plugins.javascripts, 'script'),
      ...loadPaths(plugins.css, 'link')
    ]

    if (this.props.playerCustomCss) {
      promisePlugins.push(loadPaths([this.props.playerCustomCss], 'link'))
    }

    Promise.allSettled(promisePlugins).then(async () => {
      const { autoplayAllowed, autoplayRequiresMute } =
        await checkUnmutedAutoplaySupport()
      this.autoplayAllowed = autoplayAllowed
      this.autoplayRequiresMute = autoplayRequiresMute
      this.initPlayer()
    })
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
    window.player = null
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps && this.props.type && this.props.url) {
      this.player.autoplay(this.props.autoplay && this.autoplayAllowed)
      this.play()
    }
  }

  initPlayer() {
    this.player = videojs(this.videoTagNode, this.videoJSProps())
    window.player = this.player

    this.player.hotkeys({
      volumeStep: 0.1,
      seekStep: 5,
      enableModifiersForNumbers: false
    })

    this.player.ima({
      id: this.videoTagNode
    })

    try {
      // Can fail if the browser doesn´t have EME or the web page doesn´t have HTTP
      this.player.eme()
    } catch (e) {
      console.log(e)
    }

    if (this.props.onPlayerCreated) {
      this.props.onPlayerCreated(this.player)
    }

    if (this.props.type && this.props.url) {
      this.play()
    }
  }

  play() {
    const { url, type, posterUrl } = this.props

    this.src = { type: type, src: url }

    this.player.poster(posterUrl)

    this.setDRM()

    this.player.one('canplay', () => {
      this.setAutoPlay()
    })

    this.player.src(this.src)

    this.player.off('playing', this.detectAdblock)

    this.setAds()
  }

  videoJSProps() {
    const { controls, autoplay, appId } = this.props
    return {
      techOrder: ['html5'],
      fluid: false,
      controls: controls,
      autoplay: autoplay && this.autoplayAllowed,
      muted: autoplay && this.autoplayRequiresMute,
      playsinline: true,
      language: navigator.language,
      plugins: {},
      chromecast: { appId }
    }
  }

  setDRM() {
    const { laType, laUrl, certUrl } = this.props

    if (laUrl && laType === 'com.widevine.alpha') {
      this.src.keySystems = {
        'com.widevine.alpha': {
          url: laUrl,
          audioRobustness: 'SW_SECURE_CRYPTO',
          videoRobustness: 'SW_SECURE_CRYPTO'
        }
      }
    }

    if (laUrl && certUrl && laType === 'com.apple.fps.1_0') {
      this.src.keySystems = {
        'com.apple.fps.1_0': {
          certificateUri: certUrl,
          licenseUri: laType
        }
      }
    }
  }

  setAutoPlay = () => {
    if (this.props.autoplay && this.autoplayAllowed) {
      this.player.play()
    }
  }

  setAds() {
    const { adTagUrl, detectAdblock } = this.props

    if (adTagUrl) {
      try {
        this.player.ima.changeAdTag(adTagUrl)
        this.player.ima.requestAds()

        this.player.on('adserror', () => {
          this.player.ima.changeAdTag(null)
          this.player.loadingSpinner.hide()
          this.player.play()
        })
      } catch (e) {
        if (detectAdblock) {
          this.player.on('playing', this.detectAdblock)
        }
      }
    }
  }

  detectAdblock = () => {
    this.player.pause()
    this.player.error('Deshabilite ADBlock para ver este video')
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div className='video-player'>
        <div data-vjs-player>
          <video
            ref={(node) => (this.videoTagNode = node)}
            className='video-js vjs-big-play-centered'
          />
        </div>
      </div>
    )
  }
}

VideoPlayer.propTypes = {
  url: PropTypes.string,
  type: PropTypes.string,
  laUrl: PropTypes.string,
  certUrl: PropTypes.string,
  laType: PropTypes.string,
  adTagUrl: PropTypes.string,
  posterUrl: PropTypes.string,
  detectAdblock: PropTypes.bool,
  onPlayerCreated: PropTypes.func,
  playerCustomCss: PropTypes.string,
  controls: PropTypes.bool,
  autoplay: PropTypes.bool,
  appId: PropTypes.string
}

VideoPlayer.defaultProps = {
  controls: true,
  autoplay: false,
  posterUrl: null
}
