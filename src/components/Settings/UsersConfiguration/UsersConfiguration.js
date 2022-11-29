import React, { useEffect, useState } from "react";
//Call api
import axios from "axios";
//AntD Components
import { Col, Row } from "antd";
//App Components
import CollapsedCard from "../../../template/NewDesign/Components/CollapsedCard/CollapsedCard";
import UsersList from "./Composants/UsersList/UsersList";

const UsersConfiguration = () => {
  const [usersList, setusersList] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios?.get("/user");
      if (data?.success) {
        setusersList(data?.data);
        console.log(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CollapsedCard bodyColor="white" title={<>&nbsp; &nbsp; &nbsp; Manager</>}>
      <Row gutter={[5]}>
        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 18 }}
          xl={{ span: 16 }}
          xxl={{ span: 12 }}
        >
          <UsersList />
        </Col>
      </Row>
    </CollapsedCard>
  );
};

export default UsersConfiguration;
