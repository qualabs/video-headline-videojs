import React, { useEffect, useState, useRef } from "react";

const EventLog = ({ playerLoaded, cleanLog }) => {
  const [eventsListed, setEventsListed] = useState(false);
  const [eventCollection, setEventCollection] = useState([]);
  const eventCollectionRef = useRef(eventCollection);

  useEffect(() => {
    eventCollectionRef.current = [];
    setEventCollection(eventCollectionRef.current);
  }, [cleanLog]);

  useEffect(() => {
    if (playerLoaded) {
      if (!eventsListed) {
        const player = window.player;
        const events = window.videojs.getTech("Html5").Events;
        events.map((event) => {
          player.on(event, () => handleEvent(event, eventCollection));
        });
        setEventsListed(true);
      }
    }
    const handleEvent = (event) => {
      eventCollectionRef.current = [...eventCollectionRef.current, event];
      setEventCollection(eventCollectionRef.current);
      const list = document.getElementById("eventsList");
      list.scrollTop = list.scrollHeight;
    };
  }, [playerLoaded]);

  return (
    <div>
      <div className="ui inverted segment">
        <ul className="ui inverted relaxed divided list" id="eventsList">
          {eventCollection.map((event, index) => {
            return (
              <li key={index} className="item">
                {event}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default EventLog;
