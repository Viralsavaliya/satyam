import React, { useEffect, useMemo, useState } from "react";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import { Button, Empty, Input, Table, Dropdown as AntdDropDown, Modal, Form } from "antd";
import moment from "moment";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import { phoneFormate } from "../helper";
import Swal from "sweetalert2";
import ToastMe from "../Common/ToastMe";
import { SearchOutlined } from "@ant-design/icons";
import { Badge, Dropdown, DropdownButton } from "react-bootstrap";
import TextArea from "antd/es/input/TextArea";
import supportService from "../../../services/support";

const User = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serach, setSerach] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [statusFilterName, setStatusFilterName] = useState('Filter By Status');
  const [Id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const getUserList = (value) => {
    console.log(1);
    dispatch(UserService.getUser(serach)).then((res) => {
      var newArr = [];
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        newArr.push({
          key: i,
          name: res.data[i].name,
          email: res.data[i].email,
          mobile: res.data[i].mobile,
          mobile2: res.data[i].mobile2,
          carnumber: res.data[i].carnumber,
          model: res.data[i].model,
          chassisno: res.data[i].chassisno,
          address: res.data[i].address,
          engineno: res.data[i].engineno,
          createdAt: res.data[i].createdAt,
          id: res.data[i]._id,
        });
      }
      setData(newArr);
      setLoading(false);
    })
      .catch((errors) => {
        console.log({ errors })
        setLoading(false)
      })
  };

  useEffect(() => {
    getUserList();
  }, [serach]);

  const approvePendingUser = (text) => {
    let data = {};
    data.userid = text.id
    data.status = text.status
    Swal.fire({
      title: 'Are you sure?',
      text: "To change this User status!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(UserService.changeUserStatus(data))
          .then((res) => {
            getUserList();
            setSelectedFilter(null);
            setStatusFilterName('All')
            ToastMe("User status change successfully", 'success')
          })
          .catch((errors) => {
            console.log({ errors })
            setLoading(false);
          })
      }
    })
  };

  const handleSubmit = (values) => {
    console.log(Id);
    const apicall =
      Id === ""
        ? supportService.createuser(values) : supportService.updateuser(Id, values);
    dispatch(apicall)
      .then((res) => {
        setVisible(false);
        setId('');
        getUserList();
        ToastMe(res.data.message, "success");
      })
      .catch((errors) => {
        console.log(errors.errorData);
        if (errors && errors.errorData && errors.errorData.errors) {
          const fieldErrors = errors.errorData.errors;
          Object.keys(fieldErrors).forEach((fieldName) => {
            form.setFields([
              {
                name: fieldName,
                errors: [fieldErrors[fieldName]],
              },
            ]);
          });
        }
      });
  };



  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );

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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        firstInitial = text ? text[0].toUpperCase() : '-';
        return (text ? text : "-")
      }
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (text) => {
        return text ? text : "-"
      }
    },
    {
      title: "Car Number",
      dataIndex: "carnumber",
      key: "carnumber",
      render: (text) => {
        return <span>{text ?? "-"}</span>;
      },
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      render: (text) => {
        return <span>{text ?? "-"}</span>;
      },
    },
    {
      title: "Mobile 2",
      dataIndex: "mobile2",
      key: "mobile2",
      render: (text) => {
        return <span>{text ?? "-"}</span>;
      },
    },
    {
      title: "Chassis No",
      dataIndex: "chassisno",
      key: "chassisno",
      render: (text) => {
        return <span>{text ?? "-"}</span>;
      },
    },
    {
      title: "Engine No",
      dataIndex: "engineno",
      key: "engineno",
      render: (text) => {
        return <span>{text ?? "-"}</span>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text) => (
        <>
          <Dropdown>
            <Dropdown.Toggle
              variant="danger"
              className="light sharp i-false badge_label"
            >
              {svg1}
              {
                text.readStatusCount > 0 ?
                  <span className="badge light text-white bg-danger rounded-circle">{text.readStatusCount}</span> : ''
              }
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => viewUser(text)}>View</Dropdown.Item>
              {/* {/ <Dropdown.Item onClick={() => viewChat(text)}>Chat</Dropdown.Item> /} */}
              <Dropdown.Item onClick={() => editModal(text)}>Edit</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )
    },
  ];

  const viewUser = (text) => {
    props.history.push("/user-detail", { userDetail: text })
  }

  const handleSearch = (e) => {
    setSerach(e.target.value)
  }

  const handleFilterChange = (filterOption) => {
    if (filterOption === 0) {
      setStatusFilterName('Deactive')
    } else if (filterOption === 1) {
      setStatusFilterName('Active')
    } else {
      setStatusFilterName('All')
    }
    setSelectedFilter(filterOption);
  };

  const filteredData = useMemo(() => {
    if (selectedFilter === null) return data;
    return data.filter((item) => {
      if (selectedFilter === 0) {
        return item.status === 0;
      } else if (selectedFilter === 1) {
        return item.status === 1;
      }
      return true;
    });
  }, [data, selectedFilter]);

  const editModal = (e) => {
    console.log(e);
    setId("")
    setVisible(true);
    if (e) {
      setId(e?.id)
      form.setFieldsValue({
        name: e.name,
        email: e.email,
        mobile: e.mobile,
        mobile2: e.mobile2,
        carnumber: e.carnumber,
        model: e.model,
        chassisno: e.chassisno,
        engineno: e.engineno,
        address: e.address,
      });
    } else {
      form.resetFields();
    }
  }


  return (
    <>
      <PageLoader loading={loading} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">User List</h4>
          <div className="d-flex gap-2">
            <div className="search_feild">
              <Input placeholder='Search....' onChange={(e) => handleSearch(e)} prefix={<SearchOutlined className="site-form-item-icon" />} />
            </div>
            <Button type="primary" onClick={() => editModal()}>
              Add
            </Button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {filteredData && filteredData.length > 0 ? (
              <Table
                dataSource={filteredData}
                columns={columnss}
                className="table_custom"
              />
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
      <Modal
        open={visible}
        title={Id ? "Edit" : "Add"}
        okText="Submit"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false);
        }}
        footer={
          [
          ]
        }
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <div>
            <label className="label-name">Name</label>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please Enter Name" },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter name"
              />
            </Form.Item>
          </div>
          <div>
            <label className="label-name">Email</label>
            <Form.Item
              name="email"
            >
              <Input
                type="email"
                placeholder="Enter Your email"
              />
            </Form.Item>
          </div>
          <div>
            <label className="label-name">Mobile</label>
            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: "Please Enter mobile" },
                {
                  pattern: /^[0-9]+$/,
                  message: 'Please enter only numbers.',
                },
                {
                  min: 7,
                  message: "minimum length 7"
                },
                {
                  max: 12,
                  message: "maximum length 12"
                }
              ]}
            >
              <Input
                type="text"
                placeholder="Enter mobile"
              />
            </Form.Item>
          </div>
          <div>
            <label className="label-name">Mobile 2</label>
            <Form.Item
              name="mobile2"
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: 'Please enter only numbers.',
                },
                {
                  min: 7,
                  message: "minimum length 7"
                },
                {
                  max: 12,
                  message: "maximum length 12"
                }
              ]}
            >
              <Input
                type="text"
                placeholder="Enter mobile2"
              />
            </Form.Item>
          </div>
          <div>
            <label className="label-name">Car Number</label>
            <Form.Item
              name="carnumber"
              disabled={Id}
              rules={[
                { required: true, message: "Please Enter car Number" },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Enter car Number"
              />
            </Form.Item>
          </div>
          <div>
            <label className="label-name">Model</label>
            <Form.Item
              name="model"
              rules={[
                { required: true, message: "Please Enter Model" },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Model"
              />
            </Form.Item>
          </div>
          <div>
            <label className="label-name">Chassis No</label>
            <Form.Item
              name="chassisno"
              rules={[
                { required: true, message: "Please Enter Chassis No" },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Chassis No"
              />
            </Form.Item>
          </div>
          <div>
            <label className="label-name">Engine No</label>
            <Form.Item
              name="engineno"
              rules={[
                { required: true, message: "Please Enter Engine No" },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Engine No"
              />
            </Form.Item>
          </div>
          <div>
            <label className="label-name">Address</label>
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please Enter Address" },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Address"
              />
            </Form.Item>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button key="cancel" onClick={() => setVisible(false)}>
              {" "}
              Cancel{" "}
            </Button>
            <Button
              style={{ marginLeft: "7px" }}
              htmlType="submit"
              type="primary"
              key="submit"
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default User;
