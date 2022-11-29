import { Col, Row } from "antd";

import React from "react";

import Badge from "../Badge/Badge";
// import * as classes from "./Insights.module.css";

const Insights = () => {
  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Badge title={"Insights"} loading={false}>
          <div style={{ width: "100%" }}>
            {/* <Image
              src={powerBi}
              width={"100%"}
              preview={false}
              style={{ borderRadius: "10px" }}
            /> */}

            {/* <PowerBIEmbed
              embedConfig={{
                type: "report", // Supported types: report, dashboard, tile, visual and qna
                id: "5548ee85-f63f-4c4a-a843-ccd3186d6bda",
                embedUrl:
                  "https://app.powerbi.com/reportEmbed?reportId=5548ee85-f63f-4c4a-a843-ccd3186d6bda&autoAuth=true&ctid=bbaefe9b-e7ff-41a2-bbc1-212b13ed785c",
                accessToken: undefined, // Keep as empty string, null or undefined
                // tokenType: models.TokenType.Embed,
              }}
            /> */}

            <iframe
              title="opportunity_DashboardV2.4.0"
              width="100%"
              height="541.25"
              src="https://app.powerbi.com/reportEmbed?reportId=5548ee85-f63f-4c4a-a843-ccd3186d6bda&autoAuth=true&ctid=bbaefe9b-e7ff-41a2-bbc1-212b13ed785c"
              frameBorder="0"
              allowFullScreen={true}
            ></iframe>
            <iframe
              title="opportunity_DashboardV2.4.2"
              width="100%"
              height="541.25"
              src="https://app.powerbi.com/reportEmbed?reportId=efb05d0e-ec1e-4a8a-a561-312cff29ed4d&autoAuth=true&ctid=bbaefe9b-e7ff-41a2-bbc1-212b13ed785c"
              frameBorder="0"
              allowFullScreen={true}
            ></iframe>

            <iframe
              title="opportunity_DashboardV2.4.3"
              width="100%"
              height="541.25"
              src="https://app.powerbi.com/reportEmbed?reportId=00e14897-16f9-4362-8772-c603760f45b7&autoAuth=true&ctid=bbaefe9b-e7ff-41a2-bbc1-212b13ed785c"
              frameBorder="0"
              allowFullScreen={true}
            ></iframe>
          </div>
        </Badge>
      </Col>
    </Row>
  );
};
export default Insights;
