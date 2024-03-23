import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import supportService from "../../../services/support";
import { useDispatch } from "react-redux";
import ToastMe from "../Common/ToastMe";
import { Button, Checkbox, Dropdown, Form, Input, Modal, Table } from "antd";
import moment from "moment";
import PageLoader from "../Common/PageLoader";
import axios from "axios";

const ViewUser = (props) => {
  const { state } = useLocation();
  const userDetail = state?.userDetail;
  const dispatch = useDispatch();
  const [itemList, setItemList] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [Id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const BaseUrl = process.env.REACT_APP_BASE_URL;


  const ID = userDetail.id
  const getbil = () => {
    dispatch(supportService.getbil(ID))
      .then((res) => {
        var newArr = [];
        console.log(res.data, "kupi");
        for (var i = 0; i < res.data.length; i++) {
          newArr.push(
            {
              key: i,
              id: res.data[i]._id,
              bilnumber: res.data[i].billnumber,
              user: res.data[i].user,
              Allitem: res.data[i].Allitem,
              createdAt: res.data[i].createdAt,
              total: res.data[i].Allitem.total,
              millage: res.data[i].millage,
            }
          )
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
    getbil();
  }, [])

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

  const handleCheckboxChange = (itemId) => {
    if (checkedItems.some((item) => item._id === itemId._id)) {
      setCheckedItems(checkedItems.filter((item) => item._id !== itemId._id));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };

  const pdfDownload = async (data) => {
    data.checkedItems = data?.Allitem?.checkedItems
    data.inputList = data?.Allitem?.inputList
    console.log(data,213456879);
    // Transactiondata.sender_user = Transactiondata?.senderuser ? Transactiondata?.senderuser : Transactiondata?.from
    // Transactiondata.receiver_user = Transactiondata?.receiveruser ? Transactiondata?.receiveruser : Transactiondata?.to
    // Transactiondata.card_name = Transactiondata?.userCard
    // Transactiondata.fees = Transactiondata?.admin_fees
    // Transactiondata.final_amount = Transactiondata.type == 3 ? Transactiondata?.total_send_amount : Transactiondata?.send_amount ? Transactiondata?.send_amount : Transactiondata?.amount
    // Transactiondata.bank_name = Transactiondata?.userBank?.bank_name ? Transactiondata?.userBank?.bank_name : Transactiondata?.user_bank
    // Transactiondata.status_name = Transactiondata?.status === 0 ? "Pending" : Transactiondata?.status === 1 ? "Success" :
    //     Transactiondata?.status === 2 ? "Fail" : Transactiondata?.status === 3 ? "Admin Pending" : Transactiondata?.status === 4 ?
    //         "Admin Reject" : ''
    try {
      const response = await axios.post(`${BaseUrl}/admin/pdfDownload`, JSON.stringify(data), {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          'env': 'test'
        },
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.bilnumber}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const columnss = [
    {
      title: 'Index',
      dataIndex: 'key',
      key: 'key',
      render: (text) => (
        <div>
          {text + 1}
        </div>
      ),
    },
    {
      title: 'Bil Number',
      dataIndex: 'bilnumber',
      key: 'bilnumber',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Millage',
      dataIndex: 'millage',
      key: 'millage',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: ((text) => {
        return moment(text).format('DD-MM-YYYY')
      })
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
              style={{ margin: "0 10px", fontSize: "16px", color: "#1677ff", cursor: "pointer" }}
              onClick={() => viewUser(data)}>
              <i className="fa fa-eye" aria-hidden="true"></i>
            </span>
            <span>
              <Button onClick={() => pdfDownload(data)} disabled={loading} className="md:min-w-[150px] md:me-auto" >
                Download
              </Button>
            </span>
          </div>
        </>
      ),
    },
  ];


  const viewUser = (text) => {
    props.history.push("/transaction", { bilDetail: text })
  }

  const handleAddClick = () => {
    const newInputObject = {
      id: inputList.length + 1,
      textValue: '',
      numberValue: 0,
    };
    setInputList([...inputList, newInputObject]);
  };

  const handleInputChange = (index, property, value) => {
    const updatedInputList = [...inputList];
    updatedInputList[index][property] = value;
    setInputList(updatedInputList);
  };


  const handleRemoveClick = (index) => {
    // Remove the item at the specified index from the inputList
    const updatedInputList = [...inputList];
    updatedInputList.splice(index, 1);
    setInputList(updatedInputList);
  };

  const getSharedPost = () => {
    dispatch(supportService.getTutorial())
      .then((res) => {
        if (res.data.length !== 0) {
          setItemList(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSharedPost();
  }, [userDetail]);

  // const handleSubmit =async () => {
  //   const checkedItemsTotal = checkedItems.reduce((acc, item) => acc + parseInt(item.amount, 10), 0);
  //   const inputValuesTotal = inputList.reduce((acc, item) => acc + parseInt(item.numberValue, 10), 0);
  //   const totalResult = checkedItemsTotal + inputValuesTotal;
  //   setTotal(totalResult);
  //    handleSubmits();
  // };

  // const postData = {
  //   userId:userDetail?.id,
  //   bil:{
  //     checkedItems,
  //     inputList,
  //     total
  //   }
  // };

  const handleSubmit = async (values) => {
    console.log(values,"8585858");
    const checkedItemsTotal = checkedItems.reduce((acc, item) => acc + parseInt(item.amount, 10), 0);
    const inputValuesTotal = inputList.reduce((acc, item) => acc + parseInt(item.numberValue, 10), 0);
    const totalResult = checkedItemsTotal + inputValuesTotal;
    setTotal(totalResult);

    const postData = {
      userId: userDetail?.id,
      bil: {
        checkedItems,
        inputList,
        total: totalResult,
      },
      millage:values.millage
    };

    await handleSubmits(postData);
  };

  const handleSubmits = (values) => {
    values.bil.bil = userDetail?.postData;
    const apicall =
      Id == ""
        ? supportService.createBil(values) : supportService.updateBil(Id, values);
    dispatch(apicall)
      .then(async (res) => {
        setId('');
        getbil();
        setVisible(false);
        ToastMe(res.data.message, "success");
      })
      .catch((errors) => {
        console.log({ errors });
      });
  };

  const editModal = (e) => {
    console.log(e);
    setId("")
    setVisible(true);
    if (e) {
      console.log(1);
      setId(e?.id)
      form.setFieldsValue({
        item: e.item,
        amount: e.amount,
        millage:e.millage
      });
      setCheckedItems(e?.Allitem?.checkedItems)
      setInputList(e?.Allitem?.inputList)
      setTotal(e?.total)
    } else {
      console.log(2);
      form.resetFields();
      setTotal(0)
      setCheckedItems([]);
      setInputList([])
    }
  }

  return (
    <>
      <Row>
        <PageLoader loading={loading} />
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Items</h4>
            <Button type="primary" onClick={() => editModal()}>
              Add
            </Button>
          </div>
        </div>
        <div className="card-body">
          <Table columns={columnss} className='table_custom' dataSource={data} />
        </div>
      </Row>
      <Row>

        <Modal
          open={visible}
          title={Id ? "Edit Items" : "Add Items"}
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
                // onClick={}
                onFinish={handleSubmit}
          >
            <Col xl="12">
              <div>
                <div className="row-12">
                  <div class="col-md-12 col-lg-12">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p><span style={{ fontSize: "16px" }}> Name:</span> &nbsp; {userDetail?.name ? userDetail?.name : '-'}</p>
                      <p> <span style={{ fontSize: "16px" }}> Mobile No:</span> &nbsp; {userDetail?.mobile ? userDetail?.mobile : '-'}</p>
                    </div>
                  </div>
                  <div class="col-md-12 col-lg-12">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p><span style={{ fontSize: "16px" }}> Model:</span> &nbsp; {userDetail?.model ? userDetail?.model : '-'}</p>
                      <p> <span style={{ fontSize: "16px" }}> Chassis No:</span> &nbsp; {userDetail?.chassisno ? userDetail?.chassisno : '-'}</p>
                    </div>
                  </div>
                  <div class="col-md-12 col-lg-12">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p><span style={{ fontSize: "16px" }}> Engine No:</span> &nbsp; {userDetail?.engineno ? userDetail?.engineno : '-'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="label-name">Millage</label>
                    <Form.Item
                      name="millage"
                      rules={[
                        { required: true, message: "Please Enter Millage" },
                        {
                          pattern: /^[0-9]+$/,
                          message: 'Please enter only numbers.',
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Enter Millage"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    {
                      itemList?.map((data) => (
                        <div key={data?._id}>
                          <Checkbox
                            id={data?._id}
                            checked={checkedItems.some((item) => item._id === data._id)}
                            onChange={() => handleCheckboxChange(data)}
                          >
                            {data?.item}
                          </Checkbox>
                        </div>
                      ))
                    }
                  </div>
                  <div style={{ width: '100%' }}>
                    <div width="100" style={{ textAlign: 'end', marginBottom: '5px' }}>
                      <Button onClick={handleAddClick}>Add</Button>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>


                      {inputList.map((item, index) => (
                        <li key={item.id} style={{ display: 'flex' }}>
                          <Form.Item style={{ width: '50%' }}>
                            <Input
                              type="text"
                              value={item.textValue}
                              onChange={(e) => handleInputChange(index, 'textValue', e.target.value)}

                            />
                          </Form.Item>
                          {/* <input
                            type="text"
                            value={item.numberValue}
                            onChange={(e) => handleInputChange(index, 'numberValue', e.target.value)}
                          /> */}
                          <Form.Item
                            // label={`Field ${index + 1}`}
                            // Use a unique name for each field
                            rules={[
                              {
                                required: true,
                                message: 'Please enter a value',
                              },
                              {
                                pattern: /^[0-9]*$/,
                                message: 'Please enter a valid number',
                              },
                            ]}
                            style={{ width: '50%' }}
                          >
                            <Input
                              type="text"
                              value={item.numberValue}
                              onChange={(e) => handleInputChange(index, 'numberValue', e.target.value)}
                            />
                          </Form.Item>
                          <Button onClick={() => handleRemoveClick(index)}>Remove</Button>
                        </li>

                      ))}
                    </ul>
                  </div>

                  <div>
                    <p>Total: {total}</p>
                  </div>
                </div>
              </div>
            </Col>
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
      </Row>
    </>
  );
};

export default ViewUser;
