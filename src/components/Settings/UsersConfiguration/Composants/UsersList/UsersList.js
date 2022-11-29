import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { List, Popconfirm } from "antd";
import React from "react";

const UsersList = ({ role, usersList }) => {
  return (
    <div>
      {" "}
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={usersList}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <EditOutlined />,
              <Popconfirm
                placement="topRight"
                title="Are you sure delete this manager?"
                // onConfirm={() => deleteManager(item._id)}
              >
                <DeleteOutlined style={{ color: "red" }} />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              // avatar={<Avatar src={item.picture.large} />}
              title={<a href="#">{item?.firstname + " " + item?.lastname}</a>}
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
    </div>
  );
};

export default UsersList;
