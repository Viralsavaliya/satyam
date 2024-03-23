import React, { useEffect, useState } from "react";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import { Empty, Table } from "antd";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import ToastMe from "../Common/ToastMe";
import { Badge } from "react-bootstrap";
import Swal from "sweetalert2";



const Userreport = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(null);


  const transaction = (value) => {
    dispatch(UserService.getuserreport(value))
      .then((res) => {
        var newArr = [];
        for (var i = 0; i < res.length; i++) {
          newArr.push({
            key: i,
            id: res[i]?._id,
            reported_user_id: res[i]?.reported_user_id,
            user_data: res[i]?.user_name,
            reported_user: res[i]?.reported_user,
            report_data: res[i]?.reports,
            report_subject: res[i]?.report_subject,
            status: res[i]?.status,
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

  const approvePendingUser = (text) => {
    let data = {};
    data.user_id = text.reported_user_id
    Swal.fire({
      title: 'Are you sure?',
      text: "To change this User status!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Accept',
      cancelButtonText: 'Reject'
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed == true) {
        data.type = 1
      }
      else {
        data.type = 2
      }
      console.log(data);
      dispatch(UserService.changereportUserStatus(data))
        .then((res) => {
          transaction();
          setSelectedFilter(null);
          ToastMe("User status change successfully", 'success')
        })
        .catch((errors) => {
          console.log({ errors })
          setLoading(false);
        })
    })
  }


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
      title: "Reported user ",
      dataIndex: "reported_user",
      key: "reported_user",
      render: (text) => {
        lastInitial = text ? text[0].toUpperCase() : '';;
        return text
      }
    },
    {
      title: "Who report the user",
      dataIndex: "report_data",
      key: "report_data",
      render: (text) => (
        <div>
          {text.map((name) => name?.user_name).join(',')}
        </div>
      )
    },
    {
      title: "Report Name",
      dataIndex: "report_subject",
      key: "report_subject",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, data) => (
        <div>
          {data.status === 0 ? (
            <Badge bg="badge-lg" className="badge-warning light badge-lg" style={{ cursor: 'pointer' }} onClick={() => approvePendingUser(data)}>Pending</Badge>
          ) : data.status === 1 ? (
            <Badge bg="badge-lg" className="badge-primary light badge-lg" style={{ cursor: 'pointer' }} onClick={() => approvePendingUser(data)}>Accept</Badge>
          ) : (
            <Badge bg="badge-lg" className="badge-danger light badge-lg" style={{ cursor: 'pointer' }} onClick={() => approvePendingUser(data)}>Reject</Badge>
          )}
        </div>
      ),
    }
  ];

  return (
    <>
      <PageLoader loading={loading} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">User report</h4>

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

export default Userreport;
