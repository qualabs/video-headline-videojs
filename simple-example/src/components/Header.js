import React from "react";
import imgQualabs from "../img/logo-qualabs-2019-.png";

const Header = () => {
  return (
    <div>
      <div>
        <img src={imgQualabs} alt="qualabs" />
        <h1 id="title" className="ui right floated header">
          Video Player Demo
        </h1>
        <div className="ui clearing divider"></div>
      </div>
    </div>
  );
};

export default Header;
