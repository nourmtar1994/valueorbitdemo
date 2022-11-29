import React from "react";
//ant design components
import { List, Button, Popconfirm, Typography } from "antd";

//icons
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

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
                <Typography.Link
                  href="#"
                  onClick={() => setSelectedManager(item)}
                >
                  {item?.firstname + " " + item?.lastname}
                </Typography.Link>
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
      <div align="center">
        <Button
          type="primary"
          size="middle"
          icon={<PlusOutlined />}
          onClick={() => setShowAddForm(true)}
        />
      </div>
    </>
  );
};

export default ManagerList;
