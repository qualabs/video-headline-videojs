import React, { useState } from "react";
import LinkComponent from "./LinkComponent";
import { links } from "../../defaultData";

const LinkPlayer = ({ setState }) => {
  const [currentSelection, setCurrentSelection] = useState(links[0].text);
  const [open, setOpen] = useState(false);

  const printLink = (link, index) => {
    return (
      <LinkComponent
        key={index}
        setState={setState}
        state={link}
        setOpen={setOpen}
        setCurrentSelection={setCurrentSelection}
      ></LinkComponent>
    );
  };

  return (
    <div
      className={`ui fluid selection dropdown ${open ? "visible active" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <i className="dropdown icon"></i>
      <div className="text">{currentSelection}</div>
      <div className={`menu ${open ? "visible transition" : ""}`}>
        {links.map((link) => printLink(link, links.indexOf(link)))}
       
      </div>
    </div>
  );
};

export default LinkPlayer;
