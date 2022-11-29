import React, { useState } from "react";
import { Drawer, Space, Tooltip } from "antd";
// import component 👇
// import Drawer from "react-modern-drawer";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import * as classes from "./TextBook.module.css";
import {
  FaClipboard,
  FaCompressArrowsAlt,
  FaExpandArrowsAlt,
  FaGripLines,
  FaGripLinesVertical,
  FaTimes,
} from "react-icons/fa";
import OpportunityTextBook from "./OpportunityTextBook/OpportunityTextBook";

const TextBook = ({ position }) => {
  const [placement, setPlacement] = useState("right");
  const [isOpen, setIsOpen] = React.useState(false);
  const [size, setSize] = useState("70%");
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className={classes.textEditor}>
        <Tooltip placement="bottom" title="Open Notebook">
          <FaClipboard
            onClick={toggleDrawer}
            className="navbar-icon"
            size={20}
          />
        </Tooltip>

        <Drawer
          keyboard={false}
          closable={false}
          bodyStyle={{ padding: 0 }}
          title={"NoteBook"}
          width={size}
          open={isOpen}
          onClose={toggleDrawer}
          placement={placement}
          className="bla bla bla"
          extra={
            <Space align="center" size={"small"}>
              {placement === "bottom" ? (
                <FaGripLinesVertical
                  onClick={() => setPlacement("right")}
                  className="action-icon"
                />
              ) : (
                <FaGripLines
                  onClick={() => setPlacement("bottom")}
                  className="action-icon"
                />
              )}
              {size === "70%" ? (
                <FaExpandArrowsAlt
                  onClick={() => setSize("100%")}
                  className="action-icon"
                />
              ) : (
                <FaCompressArrowsAlt
                  onClick={() => setSize("70%")}
                  className="action-icon"
                />
              )}
              <FaTimes
                onClick={() => setIsOpen(false)}
                className="action-icon"
              />
            </Space>
          }
        >
          <OpportunityTextBook setIsOpen={setIsOpen} isOpen={isOpen} />
        </Drawer>
      </div>
    </>
  );
};

export default TextBook;
