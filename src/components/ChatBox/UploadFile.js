import { FileAddOutlined } from "@ant-design/icons";
import { Tooltip, Upload } from "antd";
import React from "react";
const props = {
  action: "//jsonplaceholder.typicode.com/posts/",
  listType: "picture",
};

const UploadFile = () => {
  return (
    <Upload {...props}>
      <Tooltip title="Join file">
        {" "}
        <FileAddOutlined className="std-icons" />
      </Tooltip>
    </Upload>
  );
};

export default UploadFile;
