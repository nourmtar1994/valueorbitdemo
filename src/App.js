import React, { useEffect, useState } from "react";
//Cookies
import Cookies from "js-cookie";
//router
import { Redirect, Switch } from "react-router-dom";
//redux (store)
import { useDispatch } from "react-redux";
//DESIGN COMPONENTS
import { BackTop, Layout } from "antd";
//TEMPLATE COMPONENTS
import SideBar from "./template/SideBar/SideBar";
//app components
import AppHeader from "./template/AppHeader/AppHeader";
import ProtectedRoute from "./components/Services/ProtectedRoute";
import LoadingBar from "react-top-loading-bar";
//STYLE & ICONS
import "./App.less";
import { UpCircleOutlined } from "@ant-design/icons";
import { fetchStages } from "./redux/Slices/Stages";
import { fetchOpportunity } from "./redux/Slices/Opportunity.slices";
import { fetchForecastCategory } from "./redux/Slices/Forecastcategory.slices";
import { fetchSales } from "./redux/Slices/Sales.slices";
import axios from "axios";
import { fetchDealBand } from "./redux/Slices/DealBand";
import { fetchCountry } from "./redux/Slices/Country";
import { AccessToken } from "./components/Services/AccessToken";
import { addActions } from "./redux/Slices/Actions";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAccounts } from "./redux/Slices/Accounts.slices";
import Design from "./template/NewDesign/Design";
import { Suspense } from "react";
import Loader from "./template/Loader/Loader";

//app view  (Lazy loading)

const RevenuePath = React.lazy(() =>
  import("./components/RevenuePath/RevenuePath")
);
const DealIteligence = React.lazy(() =>
  import("./components/DealIteligence/DealIteligence")
);
const PipelineItelligence = React.lazy(() =>
  import("./components/PipelineIntelligence/PipelineIntelligence")
);
const AccountIntelligence = React.lazy(() =>
  import("./components/AccountIntelligence/AccountIntelligence")
);
const ExecutionItelligence = React.lazy(() =>
  import("./components/ExecutionItelligence/ExecutionItelligence")
);

const ProcessFlowTemplate = React.lazy(() =>
  import("./components/Settings/ProcessFlowTemplate/ProcessFlowTemplateMenage")
);
// const ProcessMining = React.lazy(() =>
//   import("./components/ProcessMining/ProcessMining")
// );

const Settings = React.lazy(() => import("./components/Settings/Settings"));
const Users = React.lazy(() =>
  import("./components/Settings/UsersMenage/Users")
);

const UsersConfiguration = React.lazy(() =>
  import("./components/Settings/UsersConfiguration/UsersConfiguration")
);
const ManagerJudgement = React.lazy(() =>
  import("./components/Settings/ManagerJudgement/ManagerJudgement")
);
const DealBand = React.lazy(() =>
  import("./components/Settings/DealBand/DealBand")
);
const Signals = React.lazy(() => import("./components/Signals/Signals"));
const Actions = React.lazy(() => import("./components/Actions/Actions"));
// const Insights = React.lazy(() => import("./components/Insights/Insights"));
const FiscalYear = React.lazy(() =>
  import("./components/Settings/FiscalYear/FiscalYear")
);
const Builder = React.lazy(() =>
  import("./components/Settings/Builder/Builder")
);

const Synchronize = React.lazy(() =>
  import("./components/Synchronize/Synchronize")
);

const Insights = React.lazy(() => import("./components/Insights/Insights"));

const Login = React.lazy(() => import("./components/Login/Login"));

const Salesforce = React.lazy(() =>
  import("./components/Services/SSO/Salesforce/Salesforce")
);

const HubSpot = React.lazy(() =>
  import("./components/Services/SSO/HubSpot/HubSpot")
);

const App = () => {
  const [progress, setProgress] = useState(80);
  const [title, setTitle] = useState("ValueOrbit");
  const [user, setUser] = useState("ValueOrbit");

  const dispatch = useDispatch();

  useEffect(() => {
    Cookies.get("VO_USER_AUTH") &&
      setUser(JSON.parse(Cookies.get("VO_USER_AUTH")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("VO_USER_AUTH")]);

  useEffect(() => {
    if (user) {
      getActions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (Cookies.get("VO_USER_AUTH")) {
      AccessToken();
      const handleFetchStages = () => {
        dispatch(fetchStages());
        dispatch(fetchForecastCategory());
      };

      if (user?.role !== "admin") {
        console.log(user?.role);
        handleFetchStages();
        dispatch(fetchOpportunity());
        dispatch(fetchSales());
        dispatch(fetchCountry());
        dispatch(fetchDealBand());
        dispatch(fetchAccounts());
      }

      setTimeout(() => {
        setProgress(20);
      }, 500);
      setTimeout(() => {
        setProgress(40);
      }, 800);
      setTimeout(() => {
        setProgress(60);
      }, 1000);
      setTimeout(() => {
        setProgress(85);
      }, 1300);

      setTimeout(() => {
        setProgress(100);
      }, 2000);
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActions = async () => {
    if (user.role === "sales") {
      try {
        const { data } = await axios.get("/sales/" + user.id);
        dispatch(addActions(data?.data?.salesactions));
      } catch (error) {
        console.log(error);
      }
    } else if (user.role === "manager") {
      try {
        const { data } = await axios.get("/manager/" + user.id);

        dispatch(addActions(data?.data?.manageractions));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return Cookies.get("VO_USER_AUTH") ? (
    <Layout style={{ height: "fit-content" }}>
      <>
        <LoadingBar
          height={3}
          color={"#9fc3e9"}
          progress={progress}
          transitionTime={1000}
          shadow={3}
          onLoaderFinished={() => setProgress(0)}
        />

        <Layout>
          <SideBar setTitle={setTitle} />
          <Layout>
            <AppHeader title={title} />
            <Switch>
              <ProtectedRoute
                setTitle={setTitle}
                role={["sales", "manager", "admin"]}
                path="/salesforceauth"
                exact
                component={Salesforce}
                title="Salesforce Authentification"
              />

              <ProtectedRoute
                setTitle={setTitle}
                role={["sales", "manager", "admin"]}
                path="/hubspotauth"
                exact
                component={HubSpot}
                title="HubSpot Authentification"
              />

              <ProtectedRoute
                setTitle={setTitle}
                role={["manager", "sales"]}
                exact
                path="/design"
                component={Design}
                title="Revenue Path"
              />
              <ProtectedRoute
                setTitle={setTitle}
                role={["manager", "sales"]}
                exact
                path="/revenuepath"
                component={RevenuePath}
                title="Revenue Path"
              />
              <ProtectedRoute
                setTitle={setTitle}
                role={["manager", "sales"]}
                exact
                path="/accountIntelligence"
                component={AccountIntelligence}
                title="Account Intelligence"
              />
              <ProtectedRoute
                setTitle={setTitle}
                role={["manager", "sales"]}
                exact
                path="/"
                component={ExecutionItelligence}
                title="Forecast Intelligence"
              />
              <ProtectedRoute
                setTitle={setTitle}
                role={["admin", "manager", "sales"]}
                path="/forecastintelligence/:id"
                exact
                component={ExecutionItelligence}
                title="Execution Intelligence"
              />

              <ProtectedRoute
                setTitle={setTitle}
                role={["admin", "manager", "sales"]}
                path="/deal_intelligence/:id"
                exact
                component={DealIteligence}
                title="Deal Intelligence"
              />

              <ProtectedRoute
                setTitle={setTitle}
                role={["admin", "manager", "sales"]}
                path="/pipelineintelligence"
                exact
                component={PipelineItelligence}
                title="Pipeline Intelligence"
              />
              <ProtectedRoute
                setTitle={setTitle}
                role={["sales", "manager"]}
                path="/signals"
                exact
                component={Signals}
                title="Signals"
              />
              <ProtectedRoute
                setTitle={setTitle}
                role={["sales", "manager"]}
                path="/actions"
                exact
                component={Actions}
                title="Actions"
              />
              {/* <ProtectedRoute
                setTitle={setTitle}
                role={["sales", "manager"]}
                path="/processmining"
                exact
                component={ProcessMining}
                title="Process Mining"
              /> */}
              <ProtectedRoute
                setTitle={setTitle}
                role={["sales", "manager"]}
                path="/insights"
                exact
                component={Insights}
                title="Insights"
              />

              <ProtectedRoute
                setTitle={setTitle}
                role={["admin", "manager", "sales"]}
                path="/settings"
                exact
                component={Settings}
                title="Settings"
              />

              <ProtectedRoute
                setTitle={setTitle}
                role={["admin"]}
                path="/settings/users"
                exact
                component={Users}
                title="Users"
              />

              <ProtectedRoute
                setTitle={setTitle}
                role={["admin"]}
                path="/settings/users/configuration"
                exact
                component={UsersConfiguration}
                title="Users Configuration"
              />
              <ProtectedRoute
                setTitle={setTitle}
                role={["admin"]}
                path="/settings/processflows"
                exact
                component={ProcessFlowTemplate}
                title="Process flows"
              />

              <ProtectedRoute
                setTitle={setTitle}
                role={["admin", "manager"]}
                path="/settings/managerjudgement"
                exact
                component={ManagerJudgement}
                title="Manager Judgement"
              />

              <ProtectedRoute
                setTitle={setTitle}
                role={["admin"]}
                path="/settings/dealband"
                exact
                component={DealBand}
                title="Deal Band"
              />

              <ProtectedRoute
                setTitle={setTitle}
                role={["admin", "manager", "sales"]}
                path="/settings/Builder"
                exact
                component={Builder}
                title="GTM Builder"
              />

              <ProtectedRoute
                setTitle={setTitle}
                role={["admin"]}
                path="/settings/fiscalyear"
                exact
                component={FiscalYear}
                title="GTM Builder"
              />
              <ProtectedRoute
                setTitle={setTitle}
                role={["admin"]}
                path="/synchronize"
                exact
                component={Synchronize}
                title="Synchronize"
              />

              {/* Redirect on invalid link */}
              <Route render={() => <Redirect to={{ pathname: "/404" }} />} />

              {/* <Poll /> */}
            </Switch>

            <BackTop
              className={"backtop"}
              style={{ right: 40, bottom: 100 }}
              duration={1000}
            >
              <UpCircleOutlined style={{ fontSize: 40 }} />
            </BackTop>

            {/* <AcceptCookies /> */}
          </Layout>
        </Layout>
      </>
    </Layout>
  ) : (
    <Switch>
      <Route
        path="/"
        exact
        render={(props) => {
          return (
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          );
        }}
      />

      <Route
        path="/salesforceauth"
        exact
        render={(props) => {
          return (
            <Suspense fallback={<Loader />}>
              <Salesforce />
            </Suspense>
          );
        }}
      />

      <Route
        path="/hubspotauth"
        exact
        render={(props) => {
          return (
            <Suspense fallback={<Loader />}>
              <HubSpot />
            </Suspense>
          );
        }}
      />
    </Switch>
  );
};

export default App;
