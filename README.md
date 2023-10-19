# qualabs-player-web

## Install

```bash
npm install --save https://github.com/qualabs/video-headline-videojs.git
```

## Usage

```jsx
import React, { Component } from 'react'

import VideoPlayer from 'qualabs-player-web'

class Example extends Component {
  render () {
    return (
      <VideoPlayer
        url={this.state.url}
        type={this.state.type}
        la_url={this.state.la_url}
        la_type={this.state.la_type}
      />
    )
  }
}
```

## How to Dev

1. In the root run `npm link` (it's likely that administrator access is needed in order to run this command)
2. In the root run `npm start` to detect the changes and run a new build 
  *if you are using a node version above version 16, you need to set this flag in the command line: export NODE_OPTIONS=--openssl-legacy-provider
3. In `example/` run `npm install`
4. In `example/` run `npm link qualabs-player-web`
5. In `example/` run `npm start`

## How to release a new version

1. Run `npm install`
2. Run `npm run build` to create the build in `dist/`
3. Check which version is in the package.json and update it.
4. Run `git add .` and `git commit`.
5. Check the last version with `git tag -l` to tag the following version. Example: `v1.0.3`.
6. Create the tag running the following command: `git tag -a "v1.0.4"`
7. Run `git push --tags` to also send the tags.
8. Verify in the repo that the new tag is in the commit.

Then in the projects where this is used you must update the version of the player.

## Custom CSS

To add custom CSS to the player you must use the 'playerCustomCss' prop which must be a link to a CSS file.
To test momentarily you can do a 'npm serve.' and pass the url of the served css file.

For the latter:
1. Go to the directory where the css to test is located.
2. Execute 'npx serve .'
3. Enter the server from the explorer, search for the file and copy the url
4. Pass said url as a prop to the player ('playerCustomCss')
