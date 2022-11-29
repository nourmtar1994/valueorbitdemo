import { WarningOutlined } from "@ant-design/icons";
import { List, Modal, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NumFormatter } from "../../Services/Utils/Utils";

const RiskOpportunity = ({ visible, setVisible }) => {
  const opportunities = useSelector(
    (state) => state.opportunity?.defaultList || []
  );

  const [riskListOppo, setRiskListOppo] = useState([]);

  useEffect(() => {
    setRiskListOppo(
      opportunities
        .filter((item) => item?.risk >= 50)
        .sort((a, b) => b.risk - a.risk)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunities]);

  return (
    <Modal
      footer={false}
      bodyStyle={{ height: "400px", overflowY: "scroll" }}
      onCancel={() => setVisible(false)}
      title={
        <>
          {
            <>
              <WarningOutlined
                className="text-primary"
                style={{ fontSize: 24 }}
              />
              {"  "}
              <span style={{ fontSize: 20 }}>Deals at risk</span>
            </>
          }
        </>
      }
      open={visible}
    >
      <List
        dataSource={riskListOppo}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <>
                  <a href={"/deal_intelligence/" + item?._id}>{item?.name}</a>
                  <Tag style={{ float: "right" }} color="#cd201f">
                    {" "}
                    {item?.risk} %
                  </Tag>
                </>
              }
              description={NumFormatter(item?.amount, true)}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default RiskOpportunity;
