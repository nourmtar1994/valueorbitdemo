import React from "react";
//ant design components
import { List, Popconfirm } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ManagerList = ({
  list,
  setShowAddForm,
  setSelectedManager,
  deleteManager,
  setShowEditManager,
  setEditedManager,
}) => {
  return (
    <>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <EditOutlined
                onClick={() => {
                  setShowEditManager(true);
                  setEditedManager(item);
                }}
              />,
              <Popconfirm
                placement="topRight"
                title="Are you sure delete this manager?"
                onConfirm={() => deleteManager(item._id)}
              >
                <DeleteOutlined style={{ color: "red" }} />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              // avatar={<Avatar src={item.picture.large} />}
              title={
                <a href="#" onClick={() => setSelectedManager(item)}>
                  {item?.firstname + " " + item?.lastname}
                </a>
              }
              description={
                "username : " +
                item?.username +
                " - " +
                item?.salesusers?.length +
                " Sales - " +
                item?.salesusers?.length +
                "  Processflows. "
              }
            />
            {/* <div>content</div> */}
          </List.Item>
        )}
      />
    </>
  );
};

export default ManagerList;
