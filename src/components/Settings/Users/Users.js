import React, { useEffect, useState } from "react";
//axios
import axios from "axios";
//ant design components
import { Row, Col, notification } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Badge from "../../Badge/Badge";
import AddSales from "./Composants/AddSales";
import ManagerList from "./Composants/ManagerList";
import SalesList from "./Composants/SalesList";
import EditManager from "./Composants/EditManager";
import EditSales from "./Composants/EditSales";

const Users = () => {
  const [managerList, setManagerList] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [salesList, setSalesList] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSalesForm, setShowSalesForm] = useState(false);

  const [showEditManager, setShowEditManager] = useState(false);
  const [editedManager, setEditedManager] = useState(null);

  const [showEditSales, setShowEditSales] = useState(false);
  const [editedSales, setEditedSales] = useState(null);

  useEffect(() => {
    window.document.title = "Settings";
    getManagerList();
  }, []);
  useEffect(() => {
    if (selectedManager) {
      setSalesList(selectedManager.salesusers);
    }
  }, [managerList]);

  useEffect(() => {
    selectedManager !== null && setSalesList(selectedManager.salesusers);
  }, [selectedManager]);

  useEffect(() => {
    selectedManager !== null && setSalesList(selectedManager.salesusers);
  }, [managerList]);

  const getManagerList = async () => {
    try {
      const { data } = await axios.get("manager");
      if (data) {
        setManagerList(data);
      }
    } catch (error) {}
  };

  const deleteManager = async (id) => {
    try {
      const { data } = await axios.delete("/manager/" + id);
      if (data.success) {
        notification.success({
          message: "Manager deleted",
        });
        getManagerList();
      }
    } catch (error) {
      notification.error({
        message: "Manager cannot be deleted ",
      });
    }
  };

  const deleteSales = async (id) => {
    try {
      const { data } = await axios.delete("/sales/" + id);
      if (data.success) {
        notification.success({
          message: "Sales deleted",
        });
        getManagerList();
      }
    } catch (error) {
      notification.error({
        message: "Sales cannot be deleted ",
      });
    }
  };

  return (
    <>
      <Row gutter={[5]}>
        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 18 }}
          xl={{ span: 16 }}
          xxl={{ span: 12 }}
          hidden={selectedManager === null ? false : true}
        >
          <Badge title={<>&nbsp; &nbsp; &nbsp; Manager</>}>
            <ManagerList
              list={managerList}
              setShowAddForm={setShowAddForm}
              setSelectedManager={setSelectedManager}
              deleteManager={deleteManager}
              showEditManager={showEditManager}
              setShowEditManager={setShowEditManager}
              setEditedManager={setEditedManager}
            />
          </Badge>
        </Col>

        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 18 }}
          xl={{ span: 16 }}
          xxl={{ span: 12 }}
          hidden={selectedManager === null ? true : false}
        >
          <Badge
            title={
              <>
                <ArrowLeftOutlined onClick={() => setSelectedManager(null)} />
                &nbsp; &nbsp; &nbsp; Sales
              </>
            }
          >
            <SalesList
              list={salesList}
              setShowSalesForm={setShowSalesForm}
              deleteSales={deleteSales}
              setShowEditSales={setShowEditSales}
              setEditedSales={setEditedSales}
            />
          </Badge>
        </Col>

        <EditManager
          manager={editedManager}
          showEditManager={showEditManager}
          setShowEditManager={setShowEditManager}
          getManagerList={getManagerList}
        />
        <AddSales
          getManagerList={getManagerList}
          showSalesForm={showSalesForm}
          setShowSalesForm={setShowSalesForm}
          selectedManager={selectedManager}
        />
        <EditSales
          sales={editedSales}
          showEditSales={showEditSales}
          setShowEditSales={setShowEditSales}
          getManagerList={getManagerList}
        />
      </Row>
    </>
  );
};
export default Users;
