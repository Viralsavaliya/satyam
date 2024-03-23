import React, { useEffect, useState } from "react";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import { Empty, Table } from "antd";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import moment from "moment";



const UserSubscriptions = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const transaction = (value) => {
    dispatch(UserService.gettransaction(value))
      .then((res) => {
        var newArr = [];
        for (var i = 0; i < res.length; i++) {
          newArr.push({
            key: i,
            firstName: res[i]?.firstname,
            lastName: res[i]?.lastname,
            email: res[i]?.email,
            img: res[i]?.image,
            createdAt: res[i]?.createdAt,
          });
        }
        setData(newArr);
        setLoading(false);
      })
      .catch((errors) => {
        console.log({ errors });
        setLoading(false)
      });
  };

  useEffect(() => {
    transaction();
  }, []);


  let firstInitial;
  let lastInitial;

  const columnss = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text) => <div>{text + 1}</div>,
    },
   
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => {
        firstInitial = text ? text[0].toUpperCase() : '';;
        return text;
      }
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => {
       lastInitial = text ? text[0].toUpperCase() : '';;
        return text
      }
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text) => {
        return (
          text 
            ? <img src={process.env.REACT_APP_PROFILE_URL + 'users/' + text} width="50px"   height="50px" style={{ borderRadius: "50%" }} loading="lazy"/>
            : (<div id="profileImage" style={{ background: '#a6a7ac', borderRadius: "50%", color: '#fff', textAlign: 'center', width: '50px', height: '50px', lineHeight: '50px', margin: '20px 0' }}>
              {firstInitial + lastInitial}
            </div>)
        );
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{moment(text).format("DD MMM YYYY h:mm A")}</div>,
    }
  ];

  return (
    <>
      <PageLoader loading={loading} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">User Subscriptions</h4>

        </div>
        <div className="card-body">
          {data && data.length > 0 ? (
              <Table
                dataSource={data}
                columns={columnss}
                className="table_custom"
              />
            ) : (
              <Empty />
            )}
        </div>
      </div>

    </>
  );
};

export default UserSubscriptions;
