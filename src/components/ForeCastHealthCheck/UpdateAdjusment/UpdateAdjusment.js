import React, { useEffect, useState } from "react";
//Apis
import axios from "axios";
import {
  Input,
  Divider,
  Button,
  Modal,
  InputNumber,
  notification,
  Typography,
} from "antd";
//icons
//Utils
import { alphaMonths } from "../../Services/Utils/Utils";
import Cookies from "js-cookie";

const UpdateAdjusment = ({ adjusment, target, quarterData }) => {
  const [user, setUser] = useState(null);
  const [adjusmntToUpdate, setAdjusmntToUpdate] = useState([]);
  const [NewValue, setNewValue] = useState({
    amount: 0,
    note: "",
    createddate: "",
  });

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  useEffect(() => {
    quarterData?.month
      ? setNewValue({
          id: adjusment?._id,
          amount: adjusment?.value,
          note: adjusment?.comment,
        })
      : setAdjusmntToUpdate(
          adjusment?.data?.map((item) => {
            return {
              amount: item?.value,
              note: item?.comment,
            };
          })
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjusment]);

  const updateForeCast = async (id, object, month = null) => {
    let link = target === "target" ? "/target/" : "/forecast/";

    try {
      const { data } = await axios.post(link, {
        value: object?.amount,
        periodtype: "monthly",
        fiscalyear: quarterData?.year,
        fiscalquarter: quarterData?.quarter,
        fiscalmonth: month,
        forecastcategoryname: target,
        forecasttype: "period",
        comment: object?.note,
        createdbyid: user?.id,
        createddate: object?.createddate,
        lastmodifiedbyid: user?.id,
      });
      if (data) {
        Modal.destroyAll();
        notification?.success({
          message:
            (target === "commit"
              ? "Commit"
              : target === "target"
              ? "Target"
              : "Best Case") + " Created",
          placement: "bottomRight",
        });
      }
    } catch (error) {
      console.log(error);
    }

    return;
  };
  //Update values locally
  const updateForecastValues = (index, value, key) => {
    const newArr = adjusmntToUpdate.map((obj, j) => {
      if (j === index) {
        if (key === "amount") {
          return { ...obj, amount: parseInt(value) };
        } else {
          return { ...obj, note: value };
        }
      }
      return obj;
    });
    setAdjusmntToUpdate(newArr);
  };

  return (
    <span>
      {quarterData?.month ? (
        <>
          <Divider>{alphaMonths[quarterData?.month - 1]?.name}</Divider>

          <InputNumber
            // disabled={
            //   !(target === "commit"
            //     ? adjusment?.commit
            //     : target === "quota"
            //     ? adjusment?.quota
            //     : adjusment?.bestCase)
            // }
            min={0}
            placeholder="Amount"
            style={{ width: "100%", marginTop: "10px" }}
            value={NewValue?.amount}
            onChange={(e) => setNewValue({ ...NewValue, amount: e })}
          />
          <Input.TextArea
            // disabled={
            //   !(target === "commit"
            //     ? adjusment?.commit
            //     : target === "quota"
            //     ? adjusment?.quota
            //     : adjusment?.bestCase)
            // }
            placeholder="Note"
            style={{ width: "100%", marginTop: "10px" }}
            value={NewValue?.note}
            onChange={(e) => setNewValue({ ...NewValue, note: e.target.value })}
          />

          <Button
            // disabled={
            //   !(target === "commit"
            //     ? adjusment?.commit
            //     : target === "quota"
            //     ? adjusment?.quota
            //     : adjusment?.bestCase)
            // }
            style={{ width: "100px", marginTop: "10px", float: "right" }}
            type="primary"
            block
            onClick={() =>
              updateForeCast(NewValue?.id, NewValue, quarterData?.month)
            }
          >
            {!NewValue?.id ? "Create" : "Save"}
          </Button>

          {!adjusment?._id && (
            <Typography.Text type="danger" style={{ fontSize: 11 }}>
              Not found {target} at this period .
            </Typography.Text>
          )}
        </>
      ) : (
        adjusment?.months?.map((element, index) => (
          <span key={index}>
            <Divider plain orientation="left">
              {alphaMonths[element - 1]?.name}
            </Divider>
            <InputNumber
              // disabled={
              //   !(target === "commit"
              //     ? adjusment?.findedCommits[index]?.owneradjustedamount
              //     : target === "quota"
              //     ? adjusment?.findedQuotas[index]?.quotaamount
              //     : adjusment?.findedBestcases[index]?.owneradjustedamount)
              // }
              min={0}
              placeholder="Amount"
              style={{ width: "100%" }}
              onChange={(e) => {
                updateForecastValues(index, e, "amount");
              }}
              defaultValue={adjusment?.data[index]?.value}
            />
            <Input.TextArea
              // disabled={
              //   !(target === "commit"
              //     ? adjusment?.findedCommits[index]?.owneradjustedamount
              //     : target === "quota"
              //     ? adjusment?.findedQuotas[index]?.quotaamount
              //     : adjusment?.findedBestcases[index]?.owneradjustedamount)
              // }
              placeholder="Note"
              style={{ width: "100%", marginTop: "10px" }}
              onChange={(e) => {
                updateForecastValues(index, e.target.value, "note");
              }}
              defaultValue={adjusment?.data[index]?.comment}
            />

            <Button
              // disabled={
              //   !(target === "commit"
              //     ? adjusment?.findedCommits[index]?.owneradjustedamount
              //     : target === "quota"
              //     ? adjusment?.findedQuotas[index]?.quotaamount
              //     : adjusment?.findedBestcases[index]?.owneradjustedamount)
              // }
              style={{ width: "100px", marginTop: "10px", float: "right" }}
              type="primary"
              block
              onClick={() =>
                updateForeCast(
                  adjusment?.data[index]?._id,
                  adjusmntToUpdate[index],
                  element
                )
              }
            >
              {!NewValue?.id ? "Create" : "Save"}
            </Button>
            {!adjusment?.data[index]?.value && (
              <Typography.Text type="danger" style={{ fontSize: 11 }}>
                Not found {target} at this period .
              </Typography.Text>
            )}
          </span>
        ))
      )}

      <br />
      <br />
    </span>
  );
};

export default UpdateAdjusment;
