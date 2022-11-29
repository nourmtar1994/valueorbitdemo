import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Col, notification, Popconfirm, Row, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import RichTextEditor from "react-rte";

import * as classes from "./Notes.module.css";

const NoteItem = ({ note, setNotesList, notesList }) => {
  const [state, setState] = useState(RichTextEditor.createEmptyValue());
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (value) => {
    setState(value);
  };

  useEffect(() => {
    setState(
      RichTextEditor.createValueFromString(note?.body || "", "markdown")
    );
  }, [note]);

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

  const deleteNote = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete("/note/" + note?._id);
      if (data?.success) {
        notification.success({
          message: "Note deleted",
          placement: "bottomRight",
        });
        setEditMode(false);
      }
      setNotesList(notesList?.filter((item) => item?._id !== note?._id));
      setLoading(false);
    } catch (error) {
      notification.error({
        message: "Note not deleted",
        placement: "bottomRight",
      });
    }
    setLoading(false);
  };
  const saveNote = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put("/note/" + note?._id, {
        body: state.toString("markdown"),
      });
      if (data?.success) {
        notification.success({
          message: "Note saved",
          placement: "bottomRight",
        });
        setEditMode(false);
      }
      setLoading(false);
    } catch (error) {
      notification.error({
        message: "Note not saved",
        placement: "bottomRight",
      });
    }
    setLoading(false);
  };

  return (
    <Row gutter={[10, 10]}>
      <Col span={24} className={classes.editorarea}>
        <Tooltip
          destroyTooltipOnHide
          title={editMode ? false : "Click twice to edit note"}
          placement="bottom"
        >
          <div
            className={classes.editorengine + " " + classes.hovrable}
            onDoubleClick={() => setEditMode(true)}
          >
            <RichTextEditor
              readOnly={!editMode}
              toolbarConfig={toolbarConfig}
              value={state}
              onChange={onChange}
            />
          </div>
        </Tooltip>

        <div className={classes.actionsButton}>
          {!editMode ? (
            <>
              <FaRegEdit
                cursor={"pointer"}
                size={15}
                onClick={() => setEditMode(!editMode)}
                className="icon_silver"
              />
              &nbsp; &nbsp;
              <Popconfirm
                placement="right"
                title="Are you sure delete this Note?"
                onConfirm={() => deleteNote()}
              >
                <FaTrashAlt
                  cursor={"pointer"}
                  className="icon_danger"
                  size={15}
                />
              </Popconfirm>
            </>
          ) : (
            <>
              <Button
                onClick={() => setEditMode(false)}
                icon={<CloseOutlined />}
                type="text"
                shape="circle"
                size="small"
              />
              &nbsp;
              <Button
                loading={loading}
                onClick={() => saveNote()}
                icon={<CheckOutlined />}
                type="primary"
                shape="circle"
                size="small"
              />
            </>
          )}
        </div>

        {!editMode && (
          <div className={classes.footer}>
            <label className="textDescription">
              {moment(note?.createddate).format("ll")}
            </label>
          </div>
        )}
      </Col>
    </Row>
  );
};
export default NoteItem;
