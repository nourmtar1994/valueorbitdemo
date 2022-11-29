import React, { useState } from "react";
import { useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
import * as classes from "../../Builder.module.css";

const Tags = ({ values, editValue, id, name }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(values || []);
  }, [values]);

  return (
    <div style={{ marginBottom: "5px" }}>
      <TagsInput
        classNames={[classes.Tages, classes.inputTages]}
        value={selected}
        onChange={(e) => editValue(e, id, name)}
        name="guidance tags"
        placeHolder="Tags"
      />
    </div>
  );
};

export default Tags;
