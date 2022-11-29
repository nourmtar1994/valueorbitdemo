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
import * as classes from "./DealBand.module.css";

const EditableContext = React.createContext(null);

const DealBand = () => {
  const [addLoading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(false);

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
      title: "Min",
      dataIndex: "min",
      width: "30%",
      editable: true,
      render: (_, record) => (
        <div className={classes.rowFields}>
          <label className={classes.labelFileds}>{record?.min}</label>{" "}
          <span className={classes.editIconFileds}>
            <EditOutlined />
          </span>
        </div>
      ),
    },
    {
      key: 3,
      title: "Max",
      dataIndex: "max",
      width: "30%",
      editable: true,
      render: (_, record) => (
        <div className={classes.rowFields}>
          <label className={classes.labelFileds}>{record?.max}</label>{" "}
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
    setLoading(true);
    getDealBand();
  }, []);

  const handleAdd = async () => {
    setAddLoading(true);
    try {
      const { data } = await axios.post("/dealband", {
        name: `Name  *`,
        percentage_forecast: "0",
        percentage_best_case: "0",
      });
      if (data?.success) {
        notification.success({
          placement: "bottomRight",
          message: "Band added ",
        });
        getDealBand();
      }
      setAddLoading(false);
    } catch (error) {
      setAddLoading(false);
    }
    const newData = {
      key: count,
      name: `Name ${count} *`,
      percentage_forecast: "0",
      percentage_best_case: "0",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const getDealBand = async () => {
    try {
      const { data } = await axios.get("/dealband/");
      if (data.success) {
        setLoading(false);
        setCount(data?.data?.length);
        setDataSource(data?.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSave = async (row) => {
    try {
      const { data } = await axios.put("/dealband/" + row?._id, row);
      if (data?.success) {
        notification.success({
          placement: "bottomRight",
          message: "Band updated",
        });
        getDealBand();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (key) => {
    try {
      const { data } = await axios.delete("/dealband/" + key);
      if (data?.success) {
        notification.success({
          placement: "bottomRight",
          message: "Band deleted ",
        });
        getDealBand();
      }
    } catch (error) {
      console.log(error);
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
  return (
    <Badge title="Deal Band">
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
            Add New band
          </Button>
          <Table
            loading={loading}
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
export default DealBand;
