import React, { useState } from "react";
import Header from "./Header";
import VideoPlayer from "qualabs-player-web";
import EditSettings from "./EditSettings";
import LinkPlayer from "./Link/LinkPlayer";
import EventLog from "./EventLog";

import { links } from "../defaultData";
import "../styles/App.css";

const App = () => {
  const [state, setState] = useState(links[0]);
  const [playerLoaded, setPlayerLoaded] = useState(false);

  return (
    <div id="container" className="ui container">
      <Header />
      <div id="auxContainer" className="ui grid">
        <div className="seven wide column">
          <LinkPlayer setState={setState} />
          <br />
          <div className="App-player twelve wide column">
            <VideoPlayer
              {...state}
              onPlayerCreated={(player) => {
                console.log("onPlayerCreated", player);
                setPlayerLoaded(true);
              }}
            />
          </div>
          <br />
          <EventLog playerLoaded={playerLoaded} cleanLog={state} />
        </div>
        <div className="nine wide column">
          <EditSettings current={state} setSettings={setState} />
        </div>
      </div>
    </div>
  );
};

export default App;
