import React, { useEffect, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Modal, Table } from 'antd';
import { Dropdown } from "react-bootstrap";
import moment from 'moment';
import 'react-phone-input-2/lib/style.css';
import PageLoader from '../Common/PageLoader';
import ToastMe from "../Common/ToastMe";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import TextArea from 'antd/es/input/TextArea';
import { fromUnixTime } from 'date-fns';
import Swal from 'sweetalert2';


const Contactus = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [visiblemail, setVisiblemail] = useState();
    const [Id, setId] = useState("");
    const [mailAddress, setMailAddress] = useState("");
    const subUserdata = location.state;

    const getcontactus = () => {
        dispatch(UserService.getContactus(subUserdata))
            .then((res) => {
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    setMailAddress({
                        mailAddress: res.data[res?.data?.length - 1]?.mailAddress || '',
                        id: res.data[res?.data?.length - 1]?._id || '',
                    });
                    if (res?.data[i]?.name) {

                        newArr.push(
                            {
                                key: i,
                                id: res.data[i]._id,
                                name: res.data[i].name,
                                email: res.data[i].email,
                                phone: res.data[i].phone,
                                mailAddress: res.data[i].mailAddress
                            }
                        )
                    }
                }
                setData(newArr);
                setLoading(false)
            })
            .catch((errors) => {
                console.log({ errors })
                setLoading(false)
            })
    }
    useEffect(() => {
        getcontactus();
    }, [])

    const columnss = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            render: (text) => (
                <div>
                    {text + 1}
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone No',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, data) => (
                <>
                    <div>
                        <span
                            style={{ margin: "0 10px", fontSize: "16px", color: "#1677ff", cursor: "pointer" }}
                            onClick={() => editModal(data)}>
                            <i className="fa fa-edit" aria-hidden="true"></i>
                        </span>
                        <span
                            style={{ margin: "0 10px", fontSize: "16px", color: "#f92b2b", cursor: "pointer" }}
                            onClick={() => approvePendingUser(data)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </span>
                    </div>
                </>
            ),
        },
    ];

    const approvePendingUser = (text) => {
        let data = text.id;
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to delete this?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(UserService.deletecontact(data))
                    .then((res) => {
                        getcontactus();
                        ToastMe("Work Deleted successfully", 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    };



    const handleSubmit = (values) => {
        if (Id !== "") {
            values.id = Id;
        }
        const apicall =
            Id === ""
                ? UserService.createcontact(values) : UserService.updatecontant(values);
        dispatch(apicall)
            .then((res) => {
                setVisible(false);
                setVisiblemail("");
                setId('');
                getcontactus();
                form.resetFields();
                ToastMe(res.data.message, "success");
            })
            .catch((errors) => {
                console.log({ errors });
            });
    };

    const editModal = (e) => {
        setVisiblemail("");
        setId("")
        setVisible(true);
        if (e) {
            setId(e?.id)
            form.setFieldsValue({
                name: e.name,
                email: e.email,
                phone: e.phone,
            });
        } else {
            setVisiblemail("");
            form.resetFields();
        }
    }

    const editModalmail = (e) => {
        setVisiblemail("");
        setVisible(true);
        setVisiblemail("MailAddress");
        setId(e?.id)
        form.setFieldsValue({
            mailAddress: e.mailAddress,
        });
    }

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Contact us</h4>
                    <Button type="primary" onClick={() => editModal()}>
                        Add Contact
                    </Button>
                </div>

                <div className="card-body">
                    <div style={{ textAlign: "center" }}>
                        {/* {data.map((mail) => { */}
                        {mailAddress?.mailAddress ? <p ><span style={{ fontSize: "18px", fontWeight: 700 }}> MailAddress </span>  :- <span style={{ fontSize: "15px" }}> {mailAddress?.mailAddress}</span>
                            <span
                                style={{ margin: "0 10px", fontSize: "16px", color: "#1677ff", cursor: "pointer" }}
                                onClick={() => editModalmail(mailAddress)}>
                                <i className="fa fa-edit" aria-hidden="true"></i>
                            </span>
                        </p> : ""}
                        {/* })} */}
                    </div>
                    <Table columns={columnss} className='table_custom' dataSource={data} />
                </div>
            </div>
            <Modal
                open={visible}
                title={Id ? "Edit Contact" : "Add Contact"}
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
                    {visiblemail === "MailAddress" ?
                        <>
                            <label className="label-name">Mail Address</label>
                            <Form.Item
                                name="mailAddress"
                                rules={[
                                    { required: true, message: "Please Enter Your Email" }
                                ]}
                            >
                                <TextArea
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                    type="text"
                                    placeholder="Enter Your Mail Address"
                                />
                            </Form.Item>
                        </>
                        : <>
                            <label className="label-name">Name</label>
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: "Please Enter Your Name" },
                                    { max: 20, message: "Miximum 20 character allow!" },
                                    { pattern: /^[A-Za-z\s]+$/, message: "Only character allow!" }
                                ]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter Your Name"
                                />
                            </Form.Item>

                            <label className="label-name">Email</label>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Please Enter Your Email" },
                                    { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email!" }
                                ]}
                            >
                                <Input
                                    type="email"
                                    placeholder="Enter Your Email"
                                />
                            </Form.Item>

                            <label className="label-name">Phone No.</label>
                            <Form.Item
                                name="phone"
                                rules={[
                                    { required: true, message: "Please Enter Your Phone No." },
                                    { pattern: /^[0-9+]+$/, message: "Only Number allow!" },
                                    { min: 8, message: "Minimum 8 number allow!" },
                                    { max: 12, message: "Miximum 12 number allow!" },
                                ]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter Your Phone No."
                                />
                            </Form.Item>
                        </>}
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
    )
}

export default Contactus