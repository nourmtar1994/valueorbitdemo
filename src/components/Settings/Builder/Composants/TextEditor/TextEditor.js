import { Input } from "antd";
import React, { useEffect, useState } from "react";
import RichTextEditor from "react-rte";
import * as classes from "../../Builder.module.css";
const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: [
    "INLINE_STYLE_BUTTONS",
    "BLOCK_TYPE_BUTTONS",
    "LINK_BUTTONS",
    "HISTORY_BUTTONS",
  ],
  INLINE_STYLE_BUTTONS: [
    { label: "Bold", style: "BOLD", className: "custom-css-class" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    {
      label: "Strikethrough",
      style: "STRIKETHROUGH",
    },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Blockquote", style: "blockquote" },
  ],
  LINK_BUTTONS: [
    { label: "Link", style: "LINK" },
    { label: "Remove Link", style: "REMOVE_LINK" },
  ],

  HISTORY_BUTTONS: [
    { label: "Undo", style: "UNDO" },
    { label: "Redo", style: "REDO" },
  ],
};
const TextEditor = ({ editValue, defaultValue, id, name, selecetedRules }) => {
  const [state, setState] = useState(RichTextEditor.createEmptyValue());
  const [title, setTitle] = useState("Guidance");
  const onChange = (value) => {
    setState(value);
    // console.log(value.toString("markdown"));
    let newValue = value.toString("markdown");

    if (title === "" || title === null) {
      editValue(newValue, id, name);
    } else {
      editValue("¤" + title + "¤" + newValue, id, name);
    }
  };

  useEffect(() => {
    if (title === "" || title === null) {
      editValue(state?.toString("markdown"), id, name);
    } else {
      editValue("¤" + title + "¤" + state?.toString("markdown"), id, name);
    }
  }, [title]);

  useEffect(() => {
    setTitle(defaultValue?.substring(0, defaultValue?.lastIndexOf("¤")));
    setState(
      RichTextEditor.createValueFromString(
        defaultValue?.substring(defaultValue?.lastIndexOf("#") + 1) || "",
        "markdown"
      )
    );
  }, [selecetedRules]);

  return (
    <>
      <Input
        value={title?.replaceAll("¤", "")}
        onChange={(e) => setTitle(e?.target?.value)}
        style={{ marginBottom: 5 }}
        placeholder="Title"
        name="title"
      />
      <div className={classes.editorengine}>
        <RichTextEditor
          toolbarConfig={toolbarConfig}
          value={state}
          onChange={onChange}
        />
      </div>{" "}
    </>
  );
};

export default TextEditor;
