import React from "react";
import ReactHtmlParser from "react-html-parser";
import { FaStar } from "react-icons/fa";
import "./Result.css";

const Result = props => {
  const { element, favouritedStatus, favouriteFunc } = props;
  let starColour;
  //set colour of star based on the elements favouritedStatus
  favouritedStatus ? (starColour = "#24995c") : (starColour = "#aaaaaa");

  return (
    <div className="resultContainer">
      <FaStar
        className="resultStar"
        onClick={() => favouriteFunc(element)}
        color={starColour}
      />
      <p className="resultTitle">{element.title}</p>
      <div
        className="resultBody"
        dangerouslySetInnerHTML={{ __html: ReactHtmlParser(element.body) }}
      />
    </div>
  );
};

export default Result;
