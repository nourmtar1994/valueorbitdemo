import React, { useEffect, useState } from "react";

import * as classes from "./InfoCard.module.css";
import { Card } from "antd";
import Loader from "../Badge/Loader/Loader";
const InfoCard = ({
  color = "secondary",
  title = null,
  body = null,
  icon = null,
  footer,
  lodaing = false,
}) => {
  const [colorStyle, setColorStyle] = useState("");

  useEffect(() => {
    switch (color) {
      case "primary": {
        setColorStyle(classes.card_primary);
        break;
      }
      case "success": {
        setColorStyle(classes.card_success);
        break;
      }
      case "danger": {
        setColorStyle(classes.card_danger);
        break;
      }
      case "warning": {
        setColorStyle(classes.card_warning);
        break;
      }
      case "pink": {
        setColorStyle(classes.card_pink);
        break;
      }
      default: {
        setColorStyle(classes.card_black);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className={`${classes.o_card}  ${colorStyle}`}>
      {lodaing ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="card_header ">
            <h1>{title}</h1>
            {icon && <span className="icon">{icon}</span>}
          </div>
          <div className="card_body">{body}</div>
          {footer && (
            <div className="o_card_footer">
              <hr></hr>
              {footer}
            </div>
          )}
        </>
      )}
    </Card>
  );
};
export default InfoCard;
