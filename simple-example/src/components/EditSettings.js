import React, { useEffect, useState } from "react";
import "../styles/components.css";

const EditSettings = ({ current, setSettings }) => {
  const [currentSettings, setCurrentSettings] = useState({ current });

  useEffect(() => {
    setCurrentSettings(current);
  }, [current]);

  const disabled = currentSettings.text !== "Custom" ? true : false;

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = event.target.url.value;
    let type = event.target.type.value;
    let laType = event.target.laType.value;
    let laUrl = event.target.laUrl.value;
    let certUrl = event.target.certUrl.value;
    let adTagUrl = event.target.adTagUrl.value;
    let detectAdblock = event.target.detectAdblock.checked;
    let autoplay = event.target.autoplay.checked;
    let posterUrl = event.target.posterUrl.value;
    let text = currentSettings.text;

    if (type === "autodetect") {
      if (url.includes("m3u8")) {
        type = "application/x-mpegURL";
      } else if (url.includes("mpd")) {
        type = "application/dash+xml";
      }
    }

    if (laType === "") {
      laType = null;
      laUrl = null;
      certUrl = null;
    }

    setSettings({
      url,
      type,
      laUrl,
      laType,
      certUrl,
      adTagUrl,
      detectAdblock,
      posterUrl,
      autoplay,
      text,
    });
  };

  return (
    <div>
      <form className="ui form" onSubmit={(event) => handleSubmit(event)}>
        <div id="settingsContainer" className="ui segment">
          <div className="ui fluid grid">
            <div className="thirteen wide column">
              <h1>Settings </h1>
            </div>
            <div id="button" className="three wide column">
              <button id="buttonIcon" className="ui button" type="submit">
                <i id="buttonIcon" className="fa-regular fa-paper-plane"></i>
              </button>
            </div>
          </div>
          <div className="ui divider"></div>

          <div className="field">
            <label>Type</label>
            <select
              className="ui fluid dropdown"
              name="type"
              defaultValue={currentSettings.type}
              disabled={disabled}
            >
              <option value="autodetect">Autodetect</option>
              <option
                value="application/dash+xml"
                selected={
                  currentSettings.type === "application/dash+xml"
                    ? "selected"
                    : null
                }
              >
                Dash
              </option>
              <option
                value="application/x-mpegURL"
                selected={
                  currentSettings.type === "application/x-mpegURL"
                    ? "selected"
                    : null
                }
              >
                HLS
              </option>
              <option
                value="application/vnd.ms-sstr+xml"
                selected={
                  currentSettings.type === "application/vnd.ms-sstr+xml"
                    ? "selected"
                    : null
                }
              >
                SmoothStreaming
              </option>
            </select>
          </div>

          <div className="field">
            <label>URL</label>
            <input
              disabled={disabled}
              name="url"
              defaultValue={currentSettings.url}
            />
          </div>

          <div className="field">
            <label>Licence type</label>
            <select
              className="ui fluid dropdown"
              name="laType"
              defaultValue={currentSettings.laType}
              disabled={disabled}
            >
              <option value="">Sin DRM</option>
              <option
                value="com.widevine.alpha"
                selected={
                  currentSettings.laType === "com.widevine.alpha"
                    ? "selected"
                    : null
                }
              >
                Widevine
              </option>
              <option
                value="com.microsoft.playready"
                selected={
                  currentSettings.laType === "com.microsoft.playready"
                    ? "selected"
                    : null
                }
              >
                PlayReady
              </option>
              <option
                value="com.apple.fps.1_0"
                selected={
                  currentSettings.laType === "com.apple.fps.1_0"
                    ? "selected"
                    : null
                }
              >
                Fairplay
              </option>
            </select>
          </div>

          <div className="field">
            <label>Licence URL</label>
            <input
              disabled={disabled}
              name="laUrl"
              defaultValue={currentSettings.laUrl}
            />
          </div>

          <div className="field">
            <label>Cert URL</label>
            <input
              disabled={disabled}
              name="certUrl"
              defaultValue={currentSettings.certUrl}
            />
          </div>

          <div className="field">
            <label>Ad Tag URL</label>
            <input
              disabled={disabled}
              name="adTagUrl"
              defaultValue={currentSettings.adTagUrl}
            />
          </div>

          <div className="field">
            <label>Poster URL</label>
            <input
              disabled={disabled}
              name="posterUrl"
              defaultValue={currentSettings.posterUrl}
            />
          </div>

          <div className="two fields">
            <div className="field">
              <div id="checkDiv" className="inline fields">
                <label>Detect ADBlock</label>
                <div className="ui toggle checkbox">
                  <input
                    name="detectAdblock"
                    type="checkbox"
                    defaultChecked={currentSettings.detectAdblock}
                  />
                  <label></label>
                </div>
              </div>
            </div>

            <div className="field">
              <div id="checkDiv" className="inline fields">
                <label>Autoplay</label>
                <div className="ui toggle checkbox">
                  <input
                    data-onstyle="secondary"
                    name="autoplay"
                    type="checkbox"
                    defaultChecked={currentSettings.autoplay}
                  />
                  <label></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSettings;
