import React, { useEffect, useState } from "react";
//ANDT COMPONENTS
import {
  Col,
  Card,
  Tooltip,
  Affix,
  Result,
  Select,
  message,
  Popconfirm,
  Modal,
} from "antd";

import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import Split from "react-split";

import ProcessFlowCategories from "./ProcessFlowCategories/ProcessFlowCategories";
import SmartProcessFlow from "../SmartProcessFlow/SmartProcessFlow";
import { DealProgress } from "../DealProgress/DealProgress";
import Signal from "../Signal/Signal";
import { FaBullhorn, FaClipboardList } from "react-icons/fa";
import Notes from "../Notes/Notes";

const { Option } = Select;

const ProcessFlow = ({
  data,
  loading = false,
  getOpportunity,
  activeCategory = "",
  setActiveCategory,
  opportunity,
  dealProgressData,
  laodingDealProgress,
}) => {
  let { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [selectEdCategory, setSelectEdCategory] = useState(undefined);
  const [messageLoading, setMessageLoading] = useState(true);
  const [layoutProcess, setLayoutProcess] = useState("horizontal");
  const [resizeDitect, setResizeDitect] = useState(false);
  const [mode, setMode] = useState("tags");
  const [coachNoteMode, setCoachNoteMode] = useState("coach");
  const [processFlowList, setProcessFlowList] = useState([]);
  const [laodingAssoc, setLaodingAssoc] = useState(false);
  useEffect(() => {
    startMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectEdCategory]);

  useEffect(() => {
    if (activeCategory !== undefined) {
      setSelectEdCategory(
        data?.categories?.filter((item) => item?.name === activeCategory[0])[0]
          ?._id
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  useEffect(() => {
    if (opportunity?._id) {
      getProcessFlow();
    }
  }, [opportunity]);

  const getProcessFlow = async () => {
    try {
      const { data } = await axios.get("/processflowtemplate");
      setProcessFlowList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async () => {
    try {
      const { data } = await axios.get(
        "/message/opportunity/filteredby/" +
          id +
          "?category_id=" +
          (selectEdCategory || "")
      );
      if (data.success) {
        setMessages(
          data.data === null
            ? []
            : data.data.sort(
                (a, b) => moment(a.createddate) - moment(b.createddate)
              )
        );

        setMessageLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(opportunity);
  console.log(processFlowList);

  const addAssociatePlaybook = async (id) => {
    if (!opportunity?._id && id) {
      message.error("Playbook can't be associated to this opportunity");
    }
    setLaodingAssoc(true);
    try {
      const { data } = await axios.post(
        "/opportunity/setplaybook/go?opportunity=" +
          opportunity?._id +
          "&processflowtemplate=" +
          id
      );
      if (data) {
        console.log(data);
        getProcessFlow();
        window?.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startMessage = () => {
    setMessageLoading(true);
    getMessages();
  };

  return (
    <>
      {/* <Row> */}
      <Split
        onDragEnd={(sizes) => setResizeDitect(sizes)}
        minSize={400}
        gutterSize={5}
        // sizes={layoutProcess === "horizontal"  ? [70, 30] : [100, 100]}
        sizes={[70, 30]}
        direction="horizontal"
        cursor="col-resize"
        className={"split-flex"} // You'll need to define this. check styles.css
      >
        {data?.categories?.length > 0 ? (
          <Col>
            <DealProgress
              resizeDitect={resizeDitect}
              laodingDealProgress={laodingDealProgress}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              data={dealProgressData}
            />
            {mode === "tags" ? (
              <SmartProcessFlow
                setMode={setMode}
                getOpportunity={getOpportunity}
                opportunity={opportunity}
                processFlowData={(data && data) || null}
                getMessages={getMessages}
                activeCategory={activeCategory}
              />
            ) : (
              <ProcessFlowCategories
                setMode={setMode}
                getOpportunity={getOpportunity}
                opportunity={opportunity}
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
                data={data}
                getMessages={getMessages}
                loading={loading}
              />
            )}
          </Col>
        ) : (
          <Col>
            <Result
              status="404"
              title="No associated playbook found."
              subTitle=""
              extra={
                <Select
                  onChange={(e) =>
                    e &&
                    Modal.warning({
                      title: "Are You Sure ?",
                      // content: 'This opportunity wil ',
                      onOk: () => addAssociatePlaybook(e),
                    })
                  }
                  style={{ width: "100%" }}
                  size="large"
                  placeholder="Choose you playbook"
                  allowClear
                  showSearch
                >
                  {processFlowList?.map((item, index) => (
                    <Option key={index} value={item?._id}>
                      {item?.name}
                    </Option>
                  ))}
                </Select>
              }
            />
          </Col>
        )}
        <Col>
          <Affix offsetTop={10}>
            <Card
              title={coachNoteMode === "coach" ? "VO Coach" : "Notes"}
              extra={
                <Tooltip
                  placement="bottom"
                  title={coachNoteMode === "coach" ? "Show Notes" : "Vo Coach"}
                >
                  {coachNoteMode === "coach" ? (
                    <FaClipboardList
                      className="action-icon"
                      onClick={() => setCoachNoteMode("notes")}
                      size={18}
                    />
                  ) : (
                    <FaBullhorn
                      className="action-icon"
                      onClick={() => setCoachNoteMode("coach")}
                      size={18}
                    />
                  )}
                </Tooltip>
              }
            >
              {coachNoteMode === "coach" ? (
                <Signal opportunityId={opportunity?._id} />
              ) : (
                <Notes opportunity={opportunity} />
              )}
            </Card>
            {/* <ProcessFlowJournal
              data={data}
              selectEdCategory={selectEdCategory}
              setSelectEdCategory={setSelectEdCategory}
              setMessageLoading={setMessageLoading}
              messageLoading={messageLoading}
              messages={messages}
              opportunity={opportunity}
            /> */}
          </Affix>
        </Col>
      </Split>
      {/* </Row> */}

      {/* <Row>
        {" "}
        <Col xs={{ span: 12 }}> */}

      {/* </Col>
      </Row> */}
    </>
  );
};

export default ProcessFlow;
