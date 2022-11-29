import { Modal, notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RichTextEditor from "react-rte";
import * as classes from "./Notes.module.css";

const AddNotes = ({
  notes,
  visible,
  setVisible,
  userId,
  opportunityId,
  getNotes = null,
  setNewNotes,
}) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  const addNotes = async (oppoid, userId, body) => {
    //  salesfeel salesmsg salesoption manageropinion managermsg
    try {
      const { data } = await axios.post(
        "/note/?opportunity_id=" + oppoid + "&user_id=" + userId,
        {
          body,
        }
      );
      if (data?.success) {
        getNotes && getNotes();
        setVisible(false);
        setNewNotes([]);
        notification.success({
          message: "Note added",
          placement: "bottomRight",
        });
      }
    } catch (error) {
      notification.error({
        message: "Note not added",
        placement: "bottomRight",
      });
    }
  };

  useEffect(() => {
    let newStringNote = "";
    notes.forEach((element) => {
      newStringNote = newStringNote + element + "\n";
    });

    setValue(
      RichTextEditor.createValueFromString(newStringNote || "", "markdown")
    );
  }, [notes]);

  const onChange = (value) => {
    setValue(value);
  };
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
  return (
    <Modal
      okButtonProps={{
        disabled: value === "",
      }}
      onOk={() => addNotes(opportunityId, userId, value?.toString("markdown"))}
      title="Add Notes"
      open={visible}
      onCancel={() => setVisible(false)}
    >
      <div className={classes.editorengine + " " + classes.hovrable}>
        <RichTextEditor
          autoFocus
          toolbarConfig={toolbarConfig}
          value={value}
          onChange={onChange}
        />
      </div>
    </Modal>
  );
};

export default AddNotes;
