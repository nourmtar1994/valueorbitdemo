import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Badge from "../../Badge/Badge";

import {
  Col,
  Row,
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  notification,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import * as classes from "./ManagerJudgement.module.css";
const EditableContext = React.createContext(null);

const ManagerJudgement = () => {
  const [addLoading, setAddLoading] = useState(false);
  // const [deleteloading, setDeleteloading] = useState(false);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const [dataSource, setDataSource] = useState([]);

  const [count, setCount] = useState(2);

  const defaultColumns = [
    {
      key: 1,
      title: "name",
      dataIndex: "name",
      width: "30%",
      editable: true,
      sortable: true,
      render: (_, record) => (
        <div className={classes.rowFields}>
          <label className={classes.labelFileds}>{record?.name}</label>{" "}
          <span className={classes.editIconFileds}>
            <EditOutlined />
          </span>
        </div>
      ),
    },
    {
      key: 2,
      title: "Forecast Percentage",
      dataIndex: "percentage_forecast",
      width: "30%",
      editable: true,
      render: (_, record) => (
        <div className={classes.rowFields}>
          <label className={classes.labelFileds}>
            {record?.percentage_forecast}
          </label>{" "}
          <span className={classes.editIconFileds}>
            <EditOutlined />
          </span>
        </div>
      ),
    },
    {
      key: 3,
      title: "Best Case Percentage",
      dataIndex: "percentage_best_case",
      width: "30%",
      editable: true,
      render: (_, record) => (
        <div className={classes.rowFields}>
          <label className={classes.labelFileds}>
            {record?.percentage_best_case}
          </label>{" "}
          <span className={classes.editIconFileds}>
            <EditOutlined />
          </span>
        </div>
      ),
    },
    {
      key: 4,
      title: "operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            placement="right"
            title="Sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="danger" size="small">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  useEffect(() => {
    getforecastCategory();
  }, []);

  const handleAdd = async () => {
    setAddLoading(true);
    try {
      const { data } = await axios.post("/managerjuggement", {
        name: `Name  *`,
        percentage_forecast: "0",
        percentage_best_case: "0",
      });
      if (data?.success) {
        notification.success({
          placement: "bottomRight",
          message: "manager judgment added",
        });
        getforecastCategory();
      }
      setAddLoading(false);
    } catch (error) {
      console.log(error);
      setAddLoading(false);
    }
    const newData = {
      key: Date.now(),
      name: `Name ${count} *`,
      percentage_forecast: "0",
      percentage_best_case: "0",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const getforecastCategory = async () => {
    try {
      const { data } = await axios.get("/forecasthealthcheckcategory/");
      if (data.success) {
        setCount(data?.data?.length);
        setDataSource(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (row) => {
    try {
      const { data } = await axios.put(
        "/forecasthealthcheckcategory/" + row?._id,
        row
      );
      if (data?.success) {
        notification.success({
          placement: "bottomRight",
          message: "Manager judgment updated ",
        });
        getforecastCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (key) => {
    // setDeleteloading(true);
    try {
      const { data } = await axios.delete(
        "/forecasthealthcheckcategory/" + key
      );
      if (data?.success) {
        notification.success({
          placement: "bottomRight",
          message: "manager judgment deleted",
        });
        getforecastCategory();
      }
      // setDeleteloading(false);
    } catch (error) {
      // setDeleteloading(false);
    }
    const newData = dataSource.filter((item) => item._id !== key);
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        key: col.key,
        handleSave,
      }),
    };
  });
  // console.log(dataSource);
  return (
    <Badge title="Manager Judgment">
      <Row>
        <Col span={24}>
          <Button
            loading={addLoading}
            onClick={handleAdd}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add New Judgment
          </Button>
          <Table
            rowKey={"_id"}
            size="small"
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </Col>
      </Row>
    </Badge>
  );
};

export default ManagerJudgement;
