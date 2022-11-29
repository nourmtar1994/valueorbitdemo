import React, { useEffect, useState } from "react";
import axios from "axios";
import { notification, Typography, Tooltip } from "antd";

// import * as classes from "./Guidances.module.css";
import { FaArrowRight, FaMapSigns, FaQuoteLeft } from "react-icons/fa";
import RichTextEditor from "react-rte";
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
const Guidances = ({ opportunityId, tagWord }) => {
  const [suggetionsGuidances, setSuggetionsGuidances] = useState({
    visible: false,
    data: [],
  });

  useEffect(() => {
    tagWord && getGuidances(tagWord);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagWord]);

  useEffect(() => {
    suggetionsGuidances?.visible && suggetionsGuidancesTitleDom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggetionsGuidances]);

  const getGuidances = async (string) => {
    console.log("start guideances");
    notification.destroy();
    try {
      const { data } = await axios.get(
        "https://ec2-18-117-177-7.us-east-2.compute.amazonaws.com:4000/guidance?message=" +
          string?.toLowerCase() +
          "&id=" +
          opportunityId
      );

      if (data?.guidance_data?.guidance?.length > 0) {
        setSuggetionsGuidances({
          visible: true,
          data: data?.guidance_data?.guidance || [],
        });
      } else {
        setSuggetionsGuidances({
          visible: false,
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const suggetionsGuidancesDom = (index) => {
    notification.destroy();
    return notification.info({
      icon: <FaQuoteLeft e={25} className={"icon_warning"} />,
      closeIcon: <FaArrowRight onClick={() => suggetionsGuidancesTitleDom()} />,
      duration: 0,
      top: 20,
      message: (
        <Typography.Text className="textDescriptionX2">
          {suggetionsGuidances?.data[index]?.note}
        </Typography.Text>
      ),
      description: (
        <div>
          <RichTextEditor
            toolbarConfig={toolbarConfig}
            readOnly
            value={RichTextEditor.createValueFromString(
              suggetionsGuidances?.data[index]?.guidance || "",
              "markdown"
            )}
          />
        </div>
      ),
      placement: "topRight",
    });
  };
  const suggetionsGuidancesTitleDom = () => {
    notification.destroy();

    notification.info({
      top: 20,
      icon: <FaMapSigns className="icon_info" />,
      duration: 0,
      message: (
        <Typography.Text className="textDescriptionX2">
          Guidances
        </Typography.Text>
      ),
      description: suggetionsGuidances?.data?.map((item, index) => (
        <div key={index}>
          <Tooltip placement="right" title="Click to show guidances details">
            <Typography.Text
              onClick={() => suggetionsGuidancesDom(index)}
              aria-label="ddd"
              className="textDescriptionX2"
              underline
              ellipsis
            >
              {index + 1 + " - " + item?.note}
            </Typography.Text>
          </Tooltip>
        </div>
      )),
      placement: "topRight",
    });
  };

  return false;
};

export default Guidances;
