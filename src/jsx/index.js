import React, { useContext } from "react";

/// React router dom
import { Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

import { ThemeContext } from "../context/ThemeContext";
import User from "./pages/User/Userlist";
import ViewUser from "./pages/User/ViewUser";
import Notification from "./pages/Setting/Notification";
import Work from "./pages/User/Work";
import UserNotification from "./pages/Setting/UserNotification";
import NotificationDetail from "./pages/Setting/NotificationDetail";
import ChangePassword from "./components/AppsMenu/AppProfile/ChangePassword";
import HunterTip from "./pages/User/HunterTip";
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import SupportTicket from "./pages/SupportTicket/SupportTicket";
import ViewTicket from "./pages/SupportTicket/ViewTicket";
import Contactus from "./pages/User/Contactus";
import AboutUs from "./pages/User/AboutUs";
import Cms from "./pages/Setting/Cms";
import Tutorial from "./pages/Setting/Tutorial";
import UserSubscriptions from "./pages/User/UserSubscriptions";
import Transaction from "./pages/User/Transaction";
import PromoCode from "./pages/Setting/PromoCode";
import Techniques from "./pages/User/Techniques";
import Postreport from "./pages/User/Postreport";
import Userreport from "./pages/User/Userreport";

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "dashboard-dark", component: DashboardDark },


    // User
    { url: "user-list", component: User },
    { url: "how-it-work", component: Work },
    { url: "contact-us", component: Contactus },
    { url: "hunter-tip", component: HunterTip },
    { url: "techniques-guide", component: Techniques },
    { url: "user-subscriptions", component: UserSubscriptions },
    { url: "post-report", component: Postreport },
    { url: "user-report", component: Userreport },
    { url: "transaction", component: Transaction },
    

    //Notification
    { url: "general-notification", component: Notification },
    { url: "user-notification", component: UserNotification },
    { url: "notification-detail", component: NotificationDetail },

    { url: "user-detail", component: ViewUser },


    /// Apps
    { url: "app-profile", component: AppProfile },
    { url: "change-password", component: ChangePassword },

    //support-ticket
    { url: "support-list", component: SupportTicket },
    { url: "view-ticket", component: ViewTicket },

    //About us
    { url: "about-us", component: AboutUs },
    { url: "cms", component: Cms },
    { url: "items", component: Tutorial },
    { url: "promocode", component: PromoCode },

    /// pages
    { url: "page-register", component: Registration },
    { url: "page-login", component: Login },
    { url: "page-forgot-password", component: ForgotPassword },

  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${menuToggle ? "menu-toggle" : ""
          }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <ScrollToTop />
    </>
  );
};

export default Markup;
