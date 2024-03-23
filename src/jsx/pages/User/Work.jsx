import React, { useEffect, useState } from "react";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import ToastMe from "../Common/ToastMe";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import TextArea from "antd/es/input/TextArea";
import Swal from "sweetalert2";

const Work = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visibleimg, setVisibleimg] = useState(false);
  const [Id, setId] = useState("");
  const [Name, setName] = useState("");
  var [images, setimages] = useState();

  const gerWork = (value) => {
    dispatch(UserService.getwork(value))
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((errors) => {
        console.log({ errors });
        setLoading(false)
      });
  };

  useEffect(() => {
    gerWork();
  }, []);

  const handleSubmit = (values) => {
    console.log(values);
    if (Id !== "") {
      values.id = Id;
      if (Name === "deer") {
        values.deerimage = images;
      } else {
        values.humanimage = images;
      }
    }
    const apicall =
      Id === ""
        ? UserService.creatework(values) : UserService.updatework(values);
    dispatch(apicall)
      .then((res) => {
        gerWork();
        setId("");
        setimages("");
        setVisibleimg(false);
        setVisible(false);
        ToastMe(res.data.message, "success");
      })
      .catch((errors) => {
        console.log({ errors });
      });
  };

  const editModal = (text) => {
    setId("")
    setVisible(true);
    if (text) {
      setId(text?._id);
      form.setFieldsValue({
        description: text.description
      });
    } else {
      form.resetFields();
    }
  };

  const editimageupload = (e) => {
    setId(e.id);
    setName(e.name);
    setVisibleimg(true);
    form.setFieldsValue({
      contract: '',
    })
  };

  let checkImageType = (info) => {
    const formData = new FormData();
    formData.append("image", info.target.files[0]);
    dispatch(UserService.updateimage(formData))
      .then((res) => {
        setimages(res?.data?.file_name);
        console.log(res,123456789);
        ToastMe(res.data.message, "success");
      })
      .catch((errors) => {
        console.log({ errors });
      });
  };

  const approvePendingUser = (text) => {
    let data = text?._id;
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
        dispatch(UserService.deletework(data))
          .then((res) => {
            gerWork();
            ToastMe("Work Deleted successfully", 'success')
          })
          .catch((errors) => {
            console.log({ errors })
          })
      }
    })
  };

  return (
    <>
      <PageLoader loading={loading} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">How it Work</h4>
          {/* <Button type="primary" onClick={() => editModal()}>
            Add Description
          </Button> */}
        </div>
        <div className="card-body">
          <Row span={24}>
            <Col style={{ margin: "0 10px" }} xs={24} lg={11}>
              <h1 style={{ textAlign: "center" }}>Human Vision</h1>
              <div style={{ position: "relative" }}>
                <img
                  style={{ objectFit: "cover", borderRadius: "6px" }}
                  src={process.env.REACT_APP_PROFILE_URL + 'admin/' + data[0]?.humanimage}
                  width="100%"
                  height="350px"
                  loading="lazy"
                />
                <Button
                  style={{ position: "absolute", right: "0" }}
                  type="dashed"
                  onClick={() =>
                    editimageupload({ id: data[0]?._id, name: "human" })
                  }
                >
                  {" "}
                  <i className="fa fa-edit" style={{ fontSize: "16px", color: "#1677ff" }} aria-hidden="true"></i>
                </Button>
              </div>
            </Col>
            <Col style={{ margin: "0 10px" }} xs={24} lg={11}>
              <h1 style={{ textAlign: "center" }}>Deer Vision</h1>
              <div style={{ position: "relative" }}>
                <img
                  src={process.env.REACT_APP_PROFILE_URL + 'admin/' + data[0]?.deerimage}
                  width="100%"
                  height="350px"
                  style={{ objectFit: "cover", borderRadius: "6px" }}
                  loading="lazy"
                />
                <Button
                  style={{ position: "absolute", right: "0" }}
                  type="dashed"
                  onClick={() =>
                    editimageupload({ id: data[0]?._id, name: "deer" })
                  }
                >
                  {" "}
                  <i className="fa fa-edit" style={{ fontSize: "16px", color: "#1677ff" }} aria-hidden="true"></i>
                </Button>
              </div>
            </Col>
          </Row>
          {data?.map((text, key) => {
            return (
              <Row style={{ margin: "10px 0" }} span={24} key={key}>
                <Col style={{ margin: "0 10px" }} xs={24} lg={22}>
                  {text?.description}
                </Col>
                {
                  (text?.description) ?
                    <>
                      <Button
                        style={{ position: "absolute", right: "50px" }}
                        type="dashed"
                        onClick={() => editModal(text)}
                      >
                        {" "}
                        <i className="fa fa-edit" style={{ fontSize: "16px", color: "#1677ff" }} aria-hidden="true"></i>
                      </Button>
                      <Button
                        style={{ position: "absolute", right: "0" }}
                        type="dashed"
                        onClick={() => approvePendingUser(text)}
                      >
                        {" "}
                        <i className="fa fa-trash" style={{ fontSize: "16px", color: "#f92b2b" }} aria-hidden="true"></i>
                      </Button>
                    </> : ""
                }
              </Row>
            );
          })}
        </div>
      </div>
      <Modal
        open={visible}
        title={Id === "" ? "Add Description" : "Edit Description"}
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
          <label className="label-name">Description</label>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please Enter Description" },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 4, maxRows: 6 }}
              type="text"
              placeholder="Enter Description"
            />
          </Form.Item>

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
      <Modal
        open={visibleimg}
        title={"Update image"}
        okText="Submit"
        cancelText="Cancel"
        onCancel={() => {
          setVisibleimg(false);
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
          <Form.Item label={`${Name} image`} name="contract">
            <Input
              type="file"
              name="image"
              className="file-input-control"
              id="file-input-control"
              onChange={checkImageType}
              accept="image/*"
            />
          </Form.Item>
          <div style={{ textAlign: "right" }}>
            <Button key="cancel" onClick={() => setVisibleimg(false)}>
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

export default Work;
