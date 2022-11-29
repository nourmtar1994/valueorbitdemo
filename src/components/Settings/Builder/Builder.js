import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { antdControlElements } from "@react-querybuilder/antd";
import { formatQuery, QueryBuilder } from "react-querybuilder";

import {
  Button,
  Card,
  Col,
  Divider,
  message,
  Modal,
  notification,
  Row,
  Select,
  Typography,
} from "antd";
import {
  FaChessQueen,
  FaGripLines,
  FaMapSigns,
  FaPencilAlt,
  FaPencilRuler,
  FaPlus,
  FaRegHandPointer,
  FaTrashAlt,
  FaUserTie,
  FaWifi,
} from "react-icons/fa";
import Badge from "../../Badge/Badge";
import ActionsBuilder from "./Composants/ActionsBuilder/ActionsBuilder";
import Cookies from "js-cookie";
import RulesList from "./Composants/RulesList/RulesList";
//Styles
import "./builder.css";
import "react-querybuilder/dist/query-builder.css";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import CollapsedCard from "../../../template/NewDesign/Components/CollapsedCard/CollapsedCard";
import * as classes from "./Builder.module.css";

const { Option } = Select;

const validator = (r) => !!r.value;
// const fields = [
//   {
//     name: "firstName",
//     label: "First Name",
//     placeholder: "Enter first name",
//     validator,
//   },
//   {
//     name: "lastName",
//     label: "Last Name",
//     placeholder: "Enter last name",
//     defaultOperator: "beginsWith",
//     validator,
//   },
//   { name: "age", label: "Age", inputType: "number", validator },
//   {
//     name: "isMusician",
//     label: "Is a musician",
//     valueEditorType: "checkbox",
//     operators: [{ name: "=", label: "is" }],
//     defaultValue: false,
//   },
//   {
//     name: "instrument",
//     label: "Instrument",
//     valueEditorType: "multiselect",
//     values: [
//       { name: "Guitar", label: "Guitar" },
//       { name: "Piano", label: "Piano" },
//       { name: "Vocals", label: "Vocals" },
//       { name: "Drums", label: "Drums" },
//     ],
//     defaultValue: "Piano",
//     operators: [
//       { name: "contains", label: "contains" },
//       { name: "doesNotContain", label: "doesNotContain" },
//     ],
//     multiple: true,
//   },
//   {
//     name: "gender",
//     label: "Gender",
//     operators: [{ name: "=", label: "is" }],
//     valueEditorType: "radio",
//     values: [
//       { name: "M", label: "Male" },
//       { name: "F", label: "Female" },
//       { name: "O", label: "Other" },
//     ],
//   },
//   { name: "height", label: "Height", validator },
//   { name: "job", label: "Job", validator },
// ];

export const ReactBuilde = () => {
  const rulesnameRef = useRef(null);
  const [loadingList, setLoadingList] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [query, setQuery] = useState(false);
  const [builderVariables, setbuilderVariables] = useState([]);
  const [generatedActionsList, setGeneratedActionsList] = useState({
    actions: [],
    signals: [],
    guidances: [],
  });

  const [user, setUser] = useState(null);
  const [rulesName, setrulesName] = useState("Rule Name");
  const [context, setContext] = useState("opportunity");
  const [editing, setEditing] = useState(true);
  const [rulesData, setRulesData] = useState([]);
  const [selecetedRules, setSelecetedRules] = useState(null);

  useEffect(() => {
    getVariableBuilder();
    getRules();
  }, []);

  useEffect(() => {
    selecetedRules && setrulesName(selecetedRules?.name);
    selecetedRules && setContext(selecetedRules?.context);
  }, [selecetedRules]);

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  const getVariableBuilder = async () => {
    try {
      const { data } = await axios.get("/variablebuilder");
      if (data?.success) {
        let Variables = [];

        data?.data?.forEach((item, index) => {
          Variables.push({
            key: index,
            context: item?.context,
            name: item?._id,
            label: item?.label,
            placeholder: item?.label,
            valueEditorType: item?.htmlinput,
            inputType: item?.htmlinput,
            validator,
            values: item?.options?.map((opItem) => ({
              name: opItem,
              label: opItem,
            })),
            operators: item?.variabletypebuilder?.variabletypeinputbuilder,
            multiple: true,
          });
        });
        setbuilderVariables(Variables);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRules = async () => {
    setLoadingList(true);
    try {
      const { data } = await axios.get("/conditionbuilder/appstyle/go");
      setLoadingList(false);
      if (data?.success) {
        setRulesData(data?.data);
      }
    } catch (error) {
      setLoadingList(false);
      console.log(error);
    }
  };

  // const getActions = async () => {
  //   setLoadingAction(true);
  //   try {
  //     const { data } = await axios.get("/actionbuilder");
  //     setLoadingAction(false);

  //     if (data?.success) {
  //       setActionbuilder(data?.data);
  //     }
  //   } catch (error) {
  //     setLoadingAction(false);
  //     console.log("connexion error");
  //   }
  // };

  const resetBuilder = () => {
    setrulesName("Rule Name");
    setQuery({
      rules: [],
      combinator: "all",
    });
    setGeneratedActionsList({
      actions: [],
      signals: [],
      guidances: [],
    });
    setSelecetedRules(null);
  };

  const getQuery = async () => {
    if (
      !rulesName ||
      rulesName === "" ||
      rulesName === "Rule Name" ||
      rulesName === "New Rule"
    ) {
      const config = {
        title: "Please set The rule name",
        content: (
          <div align="center">
            <br />
            <Typography.Title
              style={{
                margin: "auto",
              }}
              className={"textPrimary"}
              level={5}
              type="secondary"
              editable={{
                icon: <FaPencilAlt size={14} />,
                tooltip: "click to edit text",
                onChange: setrulesName,
                autoSize: true,
                editing: editing,
                onCancel: () => setEditing(false),
                onEnd: () => setEditing(false),
                onStart: () => setEditing(true),
                triggerType: ["icon", "text"],
              }}
            >
              {rulesName}
            </Typography.Title>
          </div>
        ),
      };
      Modal.confirm(config);
      return;
    }

    setSaveLoading(true);

    function formatting(arr) {
      arr = arr.forEach((item) => {
        if (item.rules !== undefined) {
          formatting(item.rules);
          renameKey(item, "rules", item.combinator);
        }
      });
    }

    function renameKey(obj, oldKey, newKey) {
      obj[newKey] = obj[oldKey]?.map((item) => {
        if (parseInt(item?.value)) {
          return {
            ...item,
            value: parseInt(item?.value),
          };
        } else {
          return item;
        }
      });
      delete obj.combinator;
      delete obj.not;
      delete obj[oldKey];
    }

    let newQuery = JSON.parse(formatQuery(query, "json_without_ids"));

    newQuery.rules && formatting(newQuery.rules);

    newQuery.rules && renameKey(newQuery, "rules", newQuery.combinator);

    if (selecetedRules?._id) {
      try {
        axios.delete("/conditionbuilder/" + selecetedRules?._id);
      } catch (error) {
        console.log(error);
        message.error("Error Connextion");
        return;
      }
    }

    if (rulesName !== "" && rulesName) {
      console.log(rulesName);
      try {
        const { data } = await axios.post("/conditionbuilder", {
          name: rulesName,
          context,
          owneridorigin: user?.originId,
          conditions: newQuery,
          actions: generatedActionsList,
        });
        setSaveLoading(false);
        resetBuilder();
        if (data?.success) {
          getRules();

          // setSelecetedRules(data?.data);
          notification.success({
            message: "Rules added",
            placement: "bottomRight",
          });
        }
      } catch (error) {
        console.log(error);
        setSaveLoading(false);
      }
    } else {
      setSaveLoading(false);
      message.error("Please type the rules name");
    }
  };
  return (
    <CollapsedCard title="GTM Builder" bodyColor="#fff">
      <Row>
        <Col span={14} style={{ borderRight: "1px solid silver" }}>
          <Card
            title={
              <Typography.Title
                style={{
                  marginRight: 20,
                }}
                ref={rulesnameRef}
                className={"textPrimary"}
                level={5}
                type="secondary"
                editable={{
                  icon: <FaPencilAlt size={14} />,
                  tooltip: "click to edit text",
                  onChange: setrulesName,
                  autoSize: true,
                  editing: editing,
                  onCancel: () => setEditing(false),
                  onEnd: () => setEditing(false),
                  onStart: () => setEditing(true),
                  triggerType: ["icon", "text"],
                }}
              >
                {rulesName}
              </Typography.Title>
            }
            extra={
              <Select
                value={context}
                onChange={(e) => {
                  resetBuilder();
                  setContext(e);
                }}
                bordered={true}
                size="middle"
                defaultValue="Opportunity"
                style={{ minWidth: "80px" }}
              >
                <Option key={"opportunity"} value="opportunity">
                  <Typography.Text>
                    <FaChessQueen className="icon_warning" size={16} /> Deal
                  </Typography.Text>
                </Option>
                <Option key={"sales"} value="sales">
                  <FaUserTie className="icon_primary" size={16} /> Sales
                </Option>
              </Select>
            }
          >
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Typography.Text strong className="textSecondary">
                  <FaPencilRuler /> Conditions
                </Typography.Text>
              </Col>

              <Col span={24}>
                <QueryBuilder
                  autoSelectField
                  autoSelectOperator
                  // showCloneButtons
                  // showLockButtons

                  enableDragAndDrop
                  translations={{
                    addRule: {
                      label: "Add Condition",
                      title: "Add Condition",
                    },
                    addGroup: {
                      label: "Add Sub-Condition",
                      title: "Add Sub-Condition",
                    },
                    removeRule: {
                      label: <FaTrashAlt />,
                      title: "Remove rule",
                    },
                    removeGroup: {
                      label: <FaTrashAlt />,
                      title: "Remove group",
                    },
                    lockRule: {
                      label: <UnlockOutlined />,
                      title: "Lock rule",
                    },
                    lockGroup: {
                      label: <UnlockOutlined />,
                      title: "Lock group",
                    },
                    lockRuleDisabled: {
                      label: <LockOutlined />,
                      title: "Unlock rule",
                    },
                    lockGroupDisabled: {
                      label: <LockOutlined />,
                      title: "Unlock group",
                    },
                    dragHandle: {
                      label: <FaGripLines />,
                      title: "Drag handle",
                    },
                  }}
                  controlElements={antdControlElements}
                  fields={builderVariables
                    ?.filter((item) => item?.context === context)
                    .sort((a, b) => a?.name?.localeCompare(b?.name))}
                  query={query}
                  onQueryChange={(q) => {
                    console.log(q);
                    setQuery(q);
                  }}
                  combinators={[
                    { name: "all", label: "ALL" },
                    { name: "any", label: "ANY" },
                  ]}
                />

                {/* <pre>
            <code>{formatQuery(query)}</code>
          </pre> */}
              </Col>
              <Divider style={{ margin: 0 }} />

              <Col span={24}>
                <Typography.Text strong className="textSecondary">
                  <FaRegHandPointer /> Add Actions
                </Typography.Text>
              </Col>

              <Col span={24}>
                <div className="queryBuilder ruleGroup">
                  <ActionsBuilder
                    actionName={"add_actions"}
                    fieldName="action"
                    actionLabel={"Add Actions"}
                    selecetedRules={selecetedRules}
                    generatedActionsList={generatedActionsList}
                    setGeneratedActionsList={setGeneratedActionsList}
                    listKey={"actions"}
                    fields={[
                      {
                        name: "action",
                        label: "Action",
                        placeholder: "Action",
                        fieldType: "textarea",
                      },
                    ]}
                  />
                </div>
              </Col>
              <Divider style={{ margin: 0 }} />

              <Col span={24}>
                <Typography.Text strong className="textSecondary">
                  <FaWifi /> Add Signals
                </Typography.Text>
              </Col>

              <Col span={24}>
                <div className="queryBuilder ruleGroup">
                  <ActionsBuilder
                    actionName={"add_signals"}
                    fieldName="signal"
                    actionLabel={"Add Signals"}
                    selecetedRules={selecetedRules}
                    generatedActionsList={generatedActionsList}
                    setGeneratedActionsList={setGeneratedActionsList}
                    listKey={"signals"}
                    associated={{
                      key: "actions",
                      label: "Action",
                      data: generatedActionsList?.actions,
                    }}
                    fields={[
                      {
                        name: "signal",
                        label: "Signal",
                        placeholder: "Signal",
                        fieldType: "textarea",
                      },
                    ]}
                  />
                </div>
              </Col>
              <Divider style={{ margin: 0 }} />

              <Col span={24}>
                <Typography.Text strong className="textSecondary">
                  <FaMapSigns /> Add Guidance
                </Typography.Text>
              </Col>
              <Col span={24}>
                <div className="queryBuilder ruleGroup">
                  <ActionsBuilder
                    actionName={"add_guidances"}
                    fieldName="guidance"
                    actionLabel={"Add Guidance"}
                    selecetedRules={selecetedRules}
                    generatedActionsList={generatedActionsList}
                    setGeneratedActionsList={setGeneratedActionsList}
                    listKey={"guidances"}
                    fields={[
                      {
                        name: "tags",
                        label: "Guidance Tags",
                        placeholder: "Add tags",
                        fieldType: "tags",
                        fields: [
                          {
                            name: "title",
                            label: "Title",
                            placeholder: "Title",
                            fieldType: "text",
                          },
                          {
                            name: "guidance",
                            label: "Guidance",
                            placeholder: "Guidance",
                            fieldType: "texteditor",
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </Col>

              <Col span={24}>
                <Button
                  loading={saveLoading}
                  type="primary"
                  onClick={() => getQuery()}
                >
                  Save Query
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={10}>
          <Card
            title={
              <Typography.Title level={5} className="textPrimary">
                Rules List
              </Typography.Title>
            }
            extra={
              <Col span={12} align="right">
                <Button
                  disabled={selecetedRules === null}
                  type="primary"
                  className="inputRadius"
                  ghost
                  onClick={() => {
                    setEditing(true);

                    setSelecetedRules(null);
                    setQuery(null);
                    setrulesName("New Rule");
                    setGeneratedActionsList({});
                  }}
                  icon={<FaPlus />}
                >
                  &nbsp; New Rule
                </Button>
              </Col>
            }
            bodyStyle={{ paddingTop: 0 }}
          >
            {/* classes.bulderListItem + */}
            <Row>
              <Col span={24}>
                <RulesList
                  setQuery={setQuery}
                  setGeneratedActionsList={setGeneratedActionsList}
                  loading={loadingList}
                  rulesList={rulesData}
                  setSelecetedRules={setSelecetedRules}
                  selecetedRules={selecetedRules}
                  getRules={getRules}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </CollapsedCard>
  );
};

export default ReactBuilde;
