import { Avatar, Badge, List, message, notification, Popconfirm } from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
import {
  FaChessQueen,
  FaExternalLinkAlt,
  FaRegEdit,
  FaTrashAlt,
  FaUserTie,
} from "react-icons/fa";
import * as classes from "../../Builder.module.css";

const RulesList = ({
  loading,
  rulesList,
  setSelecetedRules,
  selecetedRules,
  setGeneratedActionsList,
  setQuery,
  getRules,
}) => {
  const handleSelectRules = (item) => {
    let defaultData = item?.conditions;
    setSelecetedRules(defaultData);
    function formatting(arr) {
      arr.forEach((item) => {
        if (item.all !== undefined) {
          formatting(item.all);
          renameKey(item, "all", "rules");
        } else if (item.any !== undefined) {
          formatting(item.any);
          renameKey(item, "any", "rules");
        }
      });
    }

    function renameKey(obj, oldKey, newKey) {
      obj[newKey] = obj[oldKey];
      obj.combinator = oldKey;
      delete obj[oldKey];
      //   delete obj[oldKey];
    }
    if (defaultData) {
      if (defaultData?.all) {
        formatting(defaultData?.all);
      } else if (defaultData?.any) {
        formatting(defaultData?.any);
      }

      if (defaultData?.all) {
        renameKey(defaultData, "all", "rules");
      } else if (defaultData?.any) {
        renameKey(defaultData, "any", "rules");
      }
      setQuery(defaultData);
      setSelecetedRules(item);
    } else {
      setQuery(null);
      setSelecetedRules(null);
    }
  };

  const deleteRule = async (id) => {
    try {
      if (id) {
        try {
          const { data } = await axios.delete("/conditionbuilder/" + id);
          if (data?.success) {
            notification.success({
              message: "Rules Deleted ",
              placement: "bottomRight",
            });
            getRules();
          }
        } catch (error) {
          console.log(error);
          message.error("Error Connextion");
          return;
        }
      }
    } catch (error) {}
  };

  return (
    <List
      className={classes.listContainer}
      loading={loading}
      itemLayout="horizontal"
      dataSource={rulesList}
      renderItem={(item) => (
        <List.Item
          // onClick={() => {
          //   handleSelectRules(item);
          //   setGeneratedActionsList(item?.actions);
          // }}
          className={
            classes.bulderListItem +
            " " +
            (item._id === selecetedRules?._id ? classes.selected : "")
          }
          actions={[
            <FaRegEdit
              onClick={() => {
                handleSelectRules(item);
                setGeneratedActionsList(item?.actions);
              }}
              cursor="pointer"
            />,
            <Popconfirm
              placement="right"
              title="Are you sure delete this Rule?"
              onConfirm={() => deleteRule(item?._id)}
            >
              <FaTrashAlt className="icon_danger" cursor="pointer" />
            </Popconfirm>,
          ]}
        >
          <List.Item.Meta
            title={item?.name}
            description={
              <div className="textDescription">
                <Badge.Ribbon
                  style={{ position: "absolute", top: -30, right: -108 }}
                  text={
                    item?.context === "opportunity" ? (
                      <FaChessQueen className="textWhite" />
                    ) : (
                      <FaUserTie className="textWhite" />
                    )
                  }
                  color={
                    item?.context === "opportunity" ? "#fb8c00" : "#00417e"
                  }
                />

                <span>
                  {"conditions (" +
                    Object?.keys(
                      item?.conditions?.all ||
                        item?.conditions?.any ||
                        item?.conditions?.rules
                    ).length +
                    ")"}
                  {" . "}
                  {"Actions (" + item?.actions?.actions?.length + ")"}
                  {" . "}
                  {"Signals (" + item?.actions?.signals?.length + ")"}
                  {" . "}
                  {"Guidances (" + item?.actions?.guidances?.length + ")"}
                </span>
                <p>{moment(item.createddate).format("ll")}</p>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default RulesList;
