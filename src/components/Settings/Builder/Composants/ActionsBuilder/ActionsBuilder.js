import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Popover, Row, Select, Tag } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaCommentDots, FaTrashAlt } from "react-icons/fa";
import * as classes from "../../Builder.module.css";
import Tags from "../Tags/Tags";
import TextEditor from "../TextEditor/TextEditor";
const { Option } = Select;
const messages = [
  "Update Amount",
  "Update Stage",
  "Update Next step",
  "Update Close date",
  "Update Playbook",
  "Create Deal",
  "Create Contact",
  "Create Lead",
  "Send an Email ",
  "Organize a meeting",
  // "Launch a URL - use a button to open a URL (pdf document, video or PowerPoint or text)",
];

const ActionsBuilder = ({
  actionName,
  fieldName,
  fields,
  setGeneratedActionsList,
  generatedActionsList,
  listKey,
  selecetedRules,
  associated = false,
}) => {
  const [actionsBuilderList, setActionsBuilderList] = useState([]);

  const editValue = (newValue, id, name = null) => {
    let newActionsBuilderList = actionsBuilderList;
    let objIndex = actionsBuilderList.findIndex((obj) => obj.id === id);
    newActionsBuilderList[objIndex].params = {
      ...newActionsBuilderList[objIndex].params,
      [name]: newValue,
    };
    setActionsBuilderList(newActionsBuilderList);
    setGeneratedActionsList({
      ...generatedActionsList,
      [listKey]: newActionsBuilderList,
    });
  };

  const handleAssosiate = (actionIds, id) => {
    let newActionsBuilderList = actionsBuilderList;

    let objIndex = actionsBuilderList.findIndex((obj) => obj.id === id);

    newActionsBuilderList[objIndex].params = {
      ...newActionsBuilderList[objIndex].params,
      [associated?.key + "_ids"]: actionIds,
    };

    setActionsBuilderList(newActionsBuilderList);

    setGeneratedActionsList({
      ...generatedActionsList,
      [listKey]: newActionsBuilderList,
    });
  };

  const deleteItem = (id) => {
    setActionsBuilderList(
      actionsBuilderList?.filter((item) => item?.id !== id)
    );
    setGeneratedActionsList({
      ...generatedActionsList,
      [listKey]: actionsBuilderList?.filter((item) => item?.id !== id),
    });
  };

  useEffect(() => {
    selecetedRules
      ? setActionsBuilderList(selecetedRules?.actions[listKey])
      : setActionsBuilderList([]);
  }, [selecetedRules]);

  useEffect(() => {
    generatedActionsList[listKey]?.length === 0 && setActionsBuilderList([]);
  }, [generatedActionsList]);

  return (
    <>
      <Row gutter={[10, 10]}>
        {actionsBuilderList?.map((element, i) => (
          <React.Fragment key={i}>
            {fields?.map((item, j) => (
              <Col
                className={classes.fieldsContainer}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: element?.name === "signal" ? 24 : 24 }}
                key={i + "" + j}
              >
                <Row gutter={[5, 5]}>
                  <Col span={24}>
                    <div className={classes.fieldsLabel + " textSecondary"}>
                      {item?.label + " " + (i + 1)}
                    </div>
                  </Col>
                  {associated && (
                    <Col span={20}>
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select target actions"
                        mode="multiple"
                        onChange={(e) => handleAssosiate(e, element?.id)}
                        value={element?.params[associated?.key + "_ids"]}
                      >
                        {associated?.data?.map((item, index) => (
                          <Option value={item?.id} key={index}>
                            {associated?.label} {index + 1}
                          </Option>
                        ))}
                      </Select>

                      <br />
                    </Col>
                  )}
                  <Col span={20}>
                    {item?.fieldType === "textarea" && (
                      <>
                        <Input.TextArea
                          rows={2}
                          onChange={(e) =>
                            editValue(e.target.value, element?.id, item?.name)
                          }
                          placeholder={item?.label}
                          value={element?.params[fieldName]}
                        />
                      </>
                    )}
                    <div>
                      {item?.fieldType === "tags" && (
                        <>
                          <Tags
                            values={element?.params[item?.name]}
                            editValue={editValue}
                            id={element.id}
                            name={item?.name}
                          />
                          {item?.fields?.map(
                            (field, index) =>
                              field?.fieldType === "texteditor" && (
                                <TextEditor
                                  key={index}
                                  selecetedRules={selecetedRules}
                                  defaultValue={element?.params[field?.name]}
                                  id={element.id}
                                  editValue={editValue}
                                  name={field?.name}
                                />
                              )
                          )}
                        </>
                      )}
                    </div>
                  </Col>
                  <Col
                    span={4}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item?.fieldType !== "tags" && (
                      <>
                        {item?.name === "action" && (
                          <>
                            &nbsp;
                            <Popover
                              placement="rightTop"
                              trigger={"click"}
                              title={
                                <>
                                  <FaCommentDots />
                                  &nbsp; Messages
                                </>
                              }
                              content={
                                <div>
                                  {messages?.map((msgitem, index) => (
                                    <React.Fragment key={index + "tags"}>
                                      <Tag
                                        className={classes.tagMessage}
                                        onClick={() =>
                                          editValue(
                                            msgitem,
                                            element?.id,
                                            item?.name
                                          )
                                        }
                                        color="geekblue"
                                      >
                                        {msgitem}
                                      </Tag>
                                      <br />
                                    </React.Fragment>
                                  ))}
                                </div>
                              }
                            >
                              <Button
                                size="small"
                                shape="circle"
                                type="link"
                                icon={<FaCommentDots color="#00417e" />}
                              />
                            </Popover>
                            <label className="textSilver">|</label>{" "}
                          </>
                        )}
                      </>
                    )}
                    <Button
                      size="small"
                      shape="circle"
                      onClick={() => deleteItem(element?.id)}
                      type="link"
                      danger
                      icon={<FaTrashAlt />}
                    />
                  </Col>
                </Row>
              </Col>
            ))}
          </React.Fragment>
        ))}
        <Col span={24} align="right">
          <Button
            type="link"
            className="inputRadius"
            size="small"
            onClick={() =>
              setActionsBuilderList([
                ...actionsBuilderList,
                { id: Date.now(), name: actionName, params: {} },
              ])
            }
            icon={<PlusOutlined />}
          >
            New
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ActionsBuilder;
