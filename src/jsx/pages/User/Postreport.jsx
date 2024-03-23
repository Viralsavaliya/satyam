import React, { useEffect, useState } from "react";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import { Empty, Table } from "antd";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import ToastMe from "../Common/ToastMe";
import { Badge } from "react-bootstrap";
import Swal from "sweetalert2";



const Postreport = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(null);


  const transaction = (value) => {
    dispatch(UserService.getpostreport(value))
      .then((res) => {
        var newArr = [];
        for (var i = 0; i < res.length; i++) {
          newArr.push({
            key: i,
            post_id: res[i]?.post_id,
            user_data: res[i]?.user_name,
            report_user: res[i]?.reports,
            post_image: res[i]?.post_image,
            report_name: res[i]?.report_name,
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
    data.post_id = text.post_id
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
      dispatch(UserService.changereportPostStatus(data))
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
      title: "User Name",
      dataIndex: "user_data",
      key: "user_data",
      render: (text) => {
        firstInitial = text ? text[0].toUpperCase() : '';;
        return text;
      }
    },
    {
      title: "Report user name",
      dataIndex: "report_user",
      key: "report_user",
      render: (text) => (
        <div>
          {text.map((name) => name?.user_name).join(',')}
        </div>
      )
    },
    {
      title: "Post image",
      dataIndex: "post_image",
      key: "post_image",
      render: (text) => {
        return (
          text
            ? <img src={process.env.REACT_APP_PROFILE_URL + 'posts/' + text} width="50px" height="50px" style={{ borderRadius: "50%" }} loading="lazy" />
            : (<div id="profileImage" style={{ background: '#a6a7ac', borderRadius: "50%", color: '#fff', textAlign: 'center', width: '50px', height: '50px', lineHeight: '50px', margin: '20px 0' }}>
              {firstInitial + lastInitial}
            </div>)
        );
      }
    },
    {
      title: "Report name",
      dataIndex: "report_name",
      key: "report_name",
    },
    {
      title: "status",
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
          <h4 className="card-title">Post report</h4>

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

export default Postreport;
