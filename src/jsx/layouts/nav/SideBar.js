/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link, useLocation} from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from './Logout';
import dummy from "../../../icons/logosatyam.png";
// const Userservice from "../"


/// Image
//import user from "../../../images/user.jpg";
import { connect, useDispatch } from "react-redux";



class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  render() {

    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = (props) => {
  const adminData = props?.adminData;
  const dispatch = useDispatch();
  const [users, setUser] = useState();
  // const data = useParams();
  const path = useLocation();
  // console.log(path.pathname);

  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);

  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    // var handleheartBlast = document.querySelector('.heart');
    // function heartBlast() {
    //   return handleheartBlast.classList.toggle("heart-blast");
    // }
    // handleheartBlast.addEventListener('click', heartBlast);

  }, []);
  // let scrollPosition = useScrollPosition();
  /// Path
  // let path = window.location.pathname;
  // path = path.split("/");
  // path = path[path.length - 1];
  let deshBoard = [ 
    "",
    "dashboard",
    "dashboard-dark",
    "wallet",
    "invoices-list",
    "create-invoices",
    "card-center",
    "transaction-details",
    "task",
    "post-report",
    "user-report"
  ],
    user = [
      "user-list",
      "broker-list",
      'user-detail'
    ],
    notification = [
      "general-notification",
    ];

  let profileImage = `${process.env.REACT_APP_PROFILE_URL + 'admin/'}${adminData?.profileImage}`
  return (
    <div
      className={`dlabnav ${iconHover} ${sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
        // ? scrollPosition > 120
        //   ? "fixed"
        //   : ""
        // : ""
        }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <Dropdown className="dropdown header-profile2">
          <Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
            <div className="header-info2 d-flex align-items-center border">
              <img src={dummy} width={30} alt="" loading="lazy" className=""/>
              {/* <img src={profile} width={20} alt="" /> */}
              <div className="d-flex align-items-center sidebar-info">
                <div>
                  <span className="font-w700 d-block mb-2">{adminData?.displayName}</span>
                  <small className="text-end font-w400">Super Admin</small>
                </div>
                <i className="fas fa-sort-down ms-4"></i>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu align="right" className=" dropdown-menu dropdown-menu-end">
            <Link to="/app-profile" className="dropdown-item ai-icon">
              <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1"
                width={18} height={18} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="ms-2">Profile </span>
            </Link>
            <Link to="/change-password" className="dropdown-item ai-icon">
              <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1"
                width={18} height={18} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M11.02 19.5H7.5c-.62 0-1.17-.02-1.66-.09-2.63-.29-3.34-1.53-3.34-4.91v-5c0-3.38.71-4.62 3.34-4.91.49-.07 1.04-.09 1.66-.09h3.46M15.02 4.5h1.48c.62 0 1.17.02 1.66.09 2.63.29 3.34 1.53 3.34 4.91v5c0 3.38-.71 4.62-3.34 4.91-.49.07-1.04.09-1.66.09h-1.48M15 2v20M11.02 19.5H7.5c-.62 0-1.17-.02-1.66-.09-2.63-.29-3.34-1.53-3.34-4.91v-5c0-3.38.71-4.62 3.34-4.91.49-.07 1.04-.09 1.66-.09h3.46M15.02 4.5h1.48c.62 0 1.17.02 1.66.09 2.63.29 3.34 1.53 3.34 4.91v5c0 3.38-.71 4.62-3.34 4.91-.49.07-1.04.09-1.66.09h-1.48M15 2v20" />
                <circle cx={12} cy={15} r={4} />
              </svg>
              <span className="ms-2">Change Password</span>
            </Link>
            <LogoutPage />
          </Dropdown.Menu>
        </Dropdown>
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) || path.pathname === '/' ? "mm-active" : ""}`}>
            <Link to="/" >
              <i className="fas fa-home"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className={`${user.includes(path) || path.pathname === '/user-list' ? "mm-active" : ""}`}>
            <Link to="/user-list">
              {/* <Link className="has-arrow ai-icon" to="#" > */}
              <i className="fa fa-user"></i>
              <span className="nav-text">Users</span>
            </Link>

          </li>
          <li className={`${path.pathname === "/items" || path.pathname === "/items" ? "mm-active" : ""}`}>
            <Link to="/items" >
              <i className="fa fa-list"></i>
              <span className="nav-text">Items</span>
            </Link>
          </li>
          {/* <li className={`${path === "hunter-tip" || path.pathname === "/hunter-tip" ? "mm-active" : ""}`}>
            <Link to="/hunter-tip" >
              <i className="fa fa-lightbulb"></i>
              <span className="nav-text">Hunter Tip</span>
            </Link>
          </li>
          <li className={`${path.pathname === "/support-list" || path.pathname === "/support-tickets" ? "mm-active" : ""}`}>
            <Link to="/support-list" >
              <i className="fa fa-envelope"></i>
              <span className="nav-text">Support Tickets</span>
            </Link>
          </li>
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fa fa-user-plus" aria-hidden="true"></i>
              <span className="nav-text">Subscriptions</span>
            </Link>
            <ul >
              <li><Link className={`${path === "user-subscriptions" ? "mm-active" : ""}`} to="/user-subscriptions">Subscribed Users</Link></li>
              <li><Link className={`${path === "transaction" ? "mm-active" : ""}`} to="/transaction">Transaction</Link></li>

            </ul>
          </li>
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fa fa-flag" aria-hidden="true"></i>
              <span className="nav-text">Report</span>
            </Link>
            <ul >
              <li><Link className={`${path === "post-report" ? "mm-active" : ""}`} to="/post-report">post report</Link></li>
              <li><Link className={`${path === "user-report" ? "mm-active" : ""}`} to="/user-report">user report</Link></li>

            </ul>
          </li>
          <li>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fa fa-bell" aria-hidden="true"></i>
              <span className="nav-text">Notifications</span>
            </Link>
            <ul >
              <li><Link className={`${path === "general-notification" ? "mm-active" : ""}`} to="/general-notification">General Notifications</Link></li>
            </ul>
          </li>
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="fa fa-cog" aria-hidden="true"></i>
              <span className="nav-text">Settings</span>
            </Link>
            <ul >
              <li><Link className={`${path === "how-it-work" ? "mm-active" : ""}`} to="/how-it-work">How it Work</Link></li>
              <li><Link className={`${path === "techniques-guide" ? "mm-active" : ""}`} to="/techniques-guide">Techniques Guide</Link></li>
              <li><Link className={`${path === "contact-us" ? "mm-active" : ""}`} to="/contact-us">Contact us</Link></li>
              <li><Link className={`${path === "about-us" ? "mm-active" : ""}`} to="/about-us">About Us</Link></li>
              <li><Link className={`${path === "cms" ? "mm-active" : ""}`} to="/cms">CMS</Link></li>
              <li><Link className={`${path === "promocode" ? "mm-active" : ""}`} to="/promocode">PromoCode</Link></li>
            </ul>
          </li> */}
        </MM>
      </PerfectScrollbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adminData: state.auth.auth
  };
};
export default connect(mapStateToProps)(SideBar);
