import React, { useEffect, useState } from "react";
//router
import { useParams } from "react-router-dom";
//Redux
import { useSelector } from "react-redux";
//Cookies
import Cookies from "js-cookie";
//axios
import axios from "axios";
//ANT DESIGN COMPONENTS
import { notification, Row, Col, Empty } from "antd";
//APP COMPONENTS
import Predicitions from "../Predicitions/Predicitions";
import { SkeletonLoader } from "./SkeletonLoader";
import Processflows from "../ProcessFlow/ProcessFlow";
import NoOpportunity from "./NoOpportunity";
import CollapsedCard from "../../template/NewDesign/Components/CollapsedCard/CollapsedCard";

const DealIteligence = () => {
  let { id } = useParams();
  const [data2, setData2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processflows, setprocessflows] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);
  const [quarterData, setQuarterData] = useState(null);
  const [dealProgressData, setDealProgressData] = useState({
    category: [],
    coaching: [],
    completed: [],
  });

  const [laodingDealProgress, setLaodingDealProgress] = useState(true);
  const forecastParametres = useSelector((state) => state?.forecastParametres);

  useEffect(() => {
    getOpportunity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    window.document.title = "Deal Intelligence";
  }, []);

  useEffect(() => {
    if (data2?.data?.processflow?._id) {
      dealProgressProcessingData(data2?.data?.processflow?._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data2]);

  useEffect(() => {
    setQuarterData({
      year: forecastParametres?.fiscalyear?.value,
      quarter: forecastParametres?.fiscalquarter?.value,
      month: forecastParametres?.fiscalmonth?.value,
    });
  }, [forecastParametres]);

  const getOpportunity = async () => {
    if (id) {
      try {
        const { data } = await axios.get("/opportunity/" + id);
        if (data?.success) {
          setData2(data);
          setLoading(false);
          setprocessflows(data?.data?.processflow);
        }
      } catch (error) {
        notification.error({
          message: "Deals not be found",
          placement: "bottomRight",
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const dealProgressProcessingData = async (
    idProcessFlow = data2?.data.processflow?._id
  ) => {
    setLaodingDealProgress(true);
    try {
      const { data } = await axios.get("/processflow/" + idProcessFlow);
      let categoriesItem = [];
      if (data?.success) {
        data?.data?.categories?.map((category) =>
          categoriesItem.push({
            items: category?.items?.map((item) => item?.name),
            manageropinion: category?.items?.map(
              (item) => item?.manageropinion
            ),
            salesfeel: category?.items?.map((item) => item?.salesfeel),
          })
        );

        let newFormatedData = {
          categoriesItem: categoriesItem,
          category: data2?.data.processflow?.categories?.map(
            (item) => item.name
          ),
          coaching: data?.tab_totalitems?.map(
            (item, index) => (data?.tab_coaching[index] / item || 0) * 100
          ),
          completed: data?.tab_totalitems?.map(
            (item, index) => (data?.tab_completed[index] / item || 0) * 100
          ),
        };
        setLaodingDealProgress(false);
        setDealProgressData(newFormatedData);
      }

      // console.log(newFormatedData);
    } catch (error) {
      notification.error({
        message: "Deal progress not be found ",
        placement: "bottomRight",
      });
      setLaodingDealProgress(false);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : id ? (
        data2 ? (
          <>
            <Predicitions
              setData={setData2}
              data={data2?.data && data2?.data}
              quarterData={quarterData}
            />

            <CollapsedCard bodyColor="#fff" title="Deal Update & Signals">
              <Row>
                <Col span={24}>
                  {JSON.parse(Cookies.get("VO_USER_AUTH")).role !== "admin" && (
                    <Processflows
                      dealName={data2?.data?.name}
                      activeCategory={activeCategory}
                      setActiveCategory={setActiveCategory}
                      getOpportunity={getOpportunity}
                      data={(processflows && processflows) || null}
                      opportunity={data2?.data}
                      dealProgressData={dealProgressData}
                      laodingDealProgress={laodingDealProgress}
                    />
                  )}
                </Col>
              </Row>
            </CollapsedCard>
            <br />
          </>
        ) : (
          <NoOpportunity />
        )
      ) : (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Empty description="Not Found Deal" />
        </>
      )}
    </>
  );
};
export default DealIteligence;
