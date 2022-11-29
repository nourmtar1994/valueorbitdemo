//React
import React, { useEffect, useState } from "react";
//ANT Components
import { Col, Row } from "antd";
//Cookies
import Cookies from "js-cookie";
//App Components
import Badge from "../Badge/Badge";
import VoCard from "../VoCard/VoCard";
import axios from "axios";
import UpdateOpportunity from "../UpdateOpportunity/UpdateOpportunity";
import SignalsCategory from "../Signals/SignalsCategory/SignalsCategory";
import CollapsedCard from "../../template/NewDesign/Components/CollapsedCard/CollapsedCard";
import { useSelector } from "react-redux";

const RevenuePath = () => {
  const opportunities = useSelector(
    (state) => state.opportunity?.filtredList || []
  );
  const [goToAction, setGoToAction] = useState({
    visible: false,
    layoutClosed: {
      toDo: 12,
      action: 0,
      done: 12,
    },
    layoutOpened: {
      toDo: 8,
      action: 8,
      done: 8,
    },
    type: null,
    information: null,
  });

  const [user, setUser] = useState(null);
  const [actionsList, setActionsList] = useState({
    done: [],
    notDone: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.document.title = "Revenue Path";
  }, []);
  useEffect(() => {
    setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  useEffect(() => {
    if (user) {
      getOpportunityActions();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getOpportunityActions = async () => {
    setLoading(true);
    let link = "";

    if (user?.role === "manager") {
      link = "/manager_actions/manager/onlyoppo/" + user?.id;
    } else if (user?.role === "sales") {
      link = "/sales_actions/sales/onlyoppo/" + user?.id;
    }
    try {
      const { data } = await axios.get(link);
      if (data?.success) {
        setLoading(false);
        setActionsList({
          done: data?.data?.filter(
            (item) => item?.isDone === true && item?.opportunity?.risk >= 60
          ),
          notDone: data?.data?.filter(
            (item) => item?.isDone === false && item?.opportunity?.risk >= 60
          ),
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <CollapsedCard title="Revenue Path" bodyColor="#fff">
      <Row align="center">
        <Col
          xs={24}
          md={
            goToAction?.visible
              ? goToAction?.layoutOpened?.toDo
              : goToAction?.layoutClosed?.toDo
          }
          lg={
            goToAction?.visible
              ? goToAction?.layoutOpened?.toDo
              : goToAction?.layoutClosed?.toDo
          }
        >
          <VoCard
            setGoToAction={setGoToAction}
            goToAction={goToAction}
            hasOption={true}
            title="To Do"
            data={actionsList?.notDone?.filter((a) =>
              opportunities.some((b) => a.opportunity?._id === b._id)
            )}
            loading={loading}
          />
        </Col>
        {goToAction?.visible && (
          <Col
            xs={24}
            md={
              goToAction?.visible
                ? goToAction?.layoutOpened?.action
                : goToAction?.layoutClosed?.action
            }
            lg={
              goToAction?.visible
                ? goToAction?.layoutOpened?.action
                : goToAction?.layoutClosed?.action
            }
          >
            <VoCard
              setGoToAction={setGoToAction}
              goToAction={goToAction}
              hasOption={true}
              title="Update Opportunity"
              isAction={true}
            >
              <div
                style={{
                  backgroundColor: "#f0f2f5",
                  padding: " 20px 10px",
                  borderRadius: "5px",
                }}
              >
                {
                  <>
                    {goToAction?.type === "UPDATE_CATEGORY" ? (
                      <SignalsCategory
                        getSignals={getOpportunityActions}
                        oppId={goToAction?.information?.oppoId}
                        categoryLabel={goToAction?.information?.category}
                        actionId={goToAction?.information?.actionId}
                        signalId={goToAction?.information?.signalId}
                      />
                    ) : (
                      goToAction?.type === "UPDATE_OPPORTUNITY" && (
                        <UpdateOpportunity
                          opportunity={goToAction?.information?.opportunity}
                          getSignals={getOpportunityActions}
                          actionId={goToAction?.information?.actionId}
                          signalId={goToAction?.information?.signalId}
                        />
                      )
                    )}
                  </>
                }
              </div>
            </VoCard>
          </Col>
        )}
        <Col
          xs={24}
          md={
            goToAction?.visible
              ? goToAction?.layoutOpened?.done
              : goToAction?.layoutClosed?.done
          }
          lg={
            goToAction?.visible
              ? goToAction?.layoutOpened?.done
              : goToAction?.layoutClosed?.done
          }
        >
          <VoCard
            setGoToAction={setGoToAction}
            goToAction={goToAction}
            title="Done"
            data={actionsList?.done?.filter((a) =>
              opportunities.some((b) => a.opportunity?._id === b._id)
            )}
            loading={loading}
            hasOption={true}
            // isAction={true}
          />
        </Col>
      </Row>
    </CollapsedCard>
  );
};

export default RevenuePath;
