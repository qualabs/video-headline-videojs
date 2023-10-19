import React from "react";

const LinksComponent = ({ setState, state, setOpen, setCurrentSelection }) => {
  return (
    <div
      className="item"
      onClick={() => {
        setState({
          ...state,
        });
        setOpen(false);
        setCurrentSelection(state.text);
      }}
    >
      {state.text}
    </div>
  );
};

export default LinksComponent;
