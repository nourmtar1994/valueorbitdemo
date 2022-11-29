import React, { useState, useEffect } from "react";
//ANT DESIGN COMPONENTS
import { Card, Col, Progress, Row, Select, Typography } from "antd";
//APP COMPONENTS
import Recommended_action_chart from "../charts/Recommended_actions/Recommended_action_chart";
import DataTables from "../DataTables/DataTables";
//DATA
import { dataFromApi } from "../../redux/data";
import Moment from "react-moment";

const { Title } = Typography;
const { Option } = Select;
const columns = [
  {
    name: "Action",
    selector: (d) => d.action,
    sortable: true,
    cell: (d) => <span>{d.action}</span>,
  },
  {
    name: "Confidence",
    selector: (d) => d.confidence,
    sortable: true,
    cell: (d) => <span>{d.confidence}</span>,
  },
  {
    name: "Win rate",
    selector: (d) => d.win_rate,
    sortable: true,
    cell: (d) => <span>{d.win_rate}</span>,
  },
  {
    name: "Explaination",
    selector: (d) => d.explanation,
    cell: (d) => <span>{d.explanation}</span>,
    sortable: true,
  },
  {
    name: "Source",
    selector: (d) => d.source,
    cell: (d) => <span>{d.source}</span>,
    sortable: true,
  },
  {
    name: "Priority",
    selector: (d) => d.priority,
    cell: (d) => <span>{d.priority}</span>,
    sortable: true,
  },
  {
    name: "date",
    selector: (d) => d.created_on,
    cell: (d) => (
      <span>
        <Moment format="YYYY-MM-DD">{d.created_on}</Moment>
      </span>
    ),
    sortable: true,
  },
  {
    name: "Progress",
    selector: () => "date",
    cell: (d) => completedPrgoresDom(40),
    sortable: true,
  },
  {
    name: "status",
    selector: (d) => d.status,
    cell: (d) => (
      <Select
        defaultValue={d.status}
        placeholder={"Status"}
        style={{ width: "100%" }}
        allowClear
      >
        <Option value={"1"} key={"Drop"}>
          Drop
        </Option>
        <Option value={"relation"} key={"relation"}>
          relation
        </Option>
        <Option value={"complete"} key={"complete"}>
          complete
        </Option>
        <Option value={"retain"} key={"retain"}>
          retain
        </Option>
      </Select>
    ),
    sortable: false,
  },
];

const statusDom = (options) => {
  return (
    <Select placeholder={"Status"} style={{ width: "100%" }} allowClear>
      {options?.map((item, index) => (
        <Option value={item} key={index}>
          {item}
        </Option>
      ))}
    </Select>
  );
};

const completedPrgoresDom = (value) => {
  return <Progress percent={30} />;
};

const NextBestActions = ({ data }) => {
  const [chartData, setChartData] = useState({ labels: [], series: [] });
  const [filtredData, setFiltredData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let newFiltredData = [];
    data &&
      data.forEach((element, index) => {
        newFiltredData.push({
          id: index,
          ...element,
        });
      });

    setFiltredData(newFiltredData);
    setLoading(false);
    const newData = chartData;

    // if (data.length > 0) {
    //   for (const property in data[0]) {
    //     console.log(`${property}: ''+ ${data[property]}`);
    //     // newData.labels.push({
    //     //   name: property,
    //     //   data: data[property].map((el) => el.coord),
    //     // });

    //     // newData.series.push({
    //     //   name: property,
    //     //   data: data[property].map((el) => el.data),
    //     // });
    //   }
    // }

    setChartData(newData);
  }, [data]);

  return (
    <Row gutter={[30, 15]}>
      <Col xs={{ span: 24 }}>
        <Card title="NEXT BEST ACTIONS" loading={loading}>
          {/* <Recommended_action_chart data={chartData} /> */}

          <DataTables columns={columns} data={filtredData} />

        </Card>
      </Col>
    </Row>
  );
};
export default NextBestActions;
