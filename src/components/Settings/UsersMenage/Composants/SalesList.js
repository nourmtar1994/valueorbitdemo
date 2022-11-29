import React from "react";

//ant design components
import { List, Button, Popconfirm } from "antd";

//icons
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const SalesList = ({
  list,
  setShowSalesForm,
  setShowEditSales,
  deleteSales,
  setEditedSales,
}) => {
  return (
    <>
      <List
        loading={list.length === 0 ? true : false}
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <EditOutlined
                onClick={() => {
                  setEditedSales(item);
                  setShowEditSales(true);
                }}
              />,
              <Popconfirm
                placement="topRight"
                title="Are you sure delete this sales?"
                onConfirm={() => deleteSales(item._id)}
              >
                <DeleteOutlined style={{ color: "red" }} />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              // avatar={<Avatar src={item.picture.large} />}
              title={<>{item.firstname + " " + item.lastname}</>}
              description={"username : " + item.username}
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
          onClick={() => setShowSalesForm(true)}
        />
      </div>
    </>
  );
};

export default SalesList;
