import React, { Fragment, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { Edit2 } from "iconsax-react";
import UserService from "../../../../services/user";
import ToastMe from "../../../pages/Common/ToastMe";
import { loginConfirmedAction } from '../../../../store/actions/AuthActions';
import PageLoader from "../../../pages/Common/PageLoader";


const AppProfile = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [form] = Form.useForm();
  const [userImg, setUserImg] = useState("");
  const [userImgpath, setUserImgpath] = useState("");
  const [imageName, setImageName] = useState();

  const getProfile = () => {
    dispatch(UserService.getProfile())
      .then((res) => {
        setUser(res.data);
      })
      .catch((errors) => {
        console.log({ errors });
      });
  };

  const previewUserImageOnChange = (ev) => {
    let userImgSrc = URL.createObjectURL(ev.target.files[0]);
    setUserImg(userImgSrc);
    setUserImgpath(ev.target.files[0])

  }

  const loginurldata = () => {
    let data = props?.adminData
    if (imageName) {
      data.profileImage = imageName
    }
    dispatch(loginConfirmedAction(data));
  }


  const uploadimage = async () => {
    const image = new FormData();
    image.append('image', userImgpath);

    // let data = await dispatch(UserService.uploadUserProfile(image))
    //   .then((res) => {
    //     if (res.data) {
    //       setImageName(res.data.file_name)
    //       return res.data.file_name
    //     }
    //   })
    //   .catch((errors, statusCode) => {
    //     setUserImg('')
    //     // ToastMe(errors.errorData, "error");
    //   });
    // return data;
  }

  const onFinish = async (data) => {
    const dataimage = await uploadimage()
    data.image = dataimage

    dispatch(UserService.updateUserProfile(data, props?.adminData))
      .then((res) => {
        ToastMe("Profile Updated Successfully", "success");
        props.history.push("/dashboard");
      })
      .catch((errors) => {
        console.log({ errors });
      });
  };


  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    loginurldata();
  }, [onFinish])


  useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
      admin_id: user?._id,
    });
  }, [user]);

  let imageurl = `${process.env.REACT_APP_PROFILE_URL + 'admin/'}${user?.image}`

  return (
    <>
      <Fragment>
        <div className="row">
          <div className="col-lg-12">
            <div className="profile card card-body px-3 pt-3 pb-0">
              <div className="profile-head">
                <div className="photo-content">
                  <div
                    className="cover-photo rounded"
                    style={{ height: "350px" }}
                  ></div>
                </div>
                <div className="profile-info">
                  <div className="profile-photo"
                  // style={{ position: 'relative', width: '400px', height: '200px' ,margin: '0 auto' }}
                  >
                    {/* <div className="img_wrapper">

                      <img
                        src={userImg ? userImg : imageurl}
                        className="img-fluid rounded-circle custome_imag"
                        // style={{ width: '200%',height: '40%',objectFit: 'cover',borderRadius: '50%'}}
                        alt="profile"
                      />
                    </div> */}
                    {/* <label htmlFor='file-input-control' className="edit_btn"
                      style={{
                        position: 'absolute', marginTop: '-20px', right: '0', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', backgroundColor: '#fff',
                        borderRadius: '50%', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', cursor: 'pointer'
                      }}>
                      <a role={"button"} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <Edit2 size="20" color="#333230" />
                        <div className="col d-none" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', opacity: '0' }}>
                          <Input type="file" name="image" className="file-input-control"
                            style={{
                              position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', cursor: 'pointer', opacity: '0',
                            }}
                            id='file-input-control' onChange={(event) => previewUserImageOnChange(event)} accept="image/*" />
                        </div>
                      </a>
                    </label> */}
                  </div>
                  <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    className="mx-auto"
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group mb-3">
                          <label htmlFor="" className="fs14 fw500 lh-1 mb-2">
                            <b>Name</b>
                          </label>
                          <Form.Item
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your name!",
                              },
                              {
                                min: 3,
                                message: "minimum length is 3 ",
                              },
                              {
                                max: 50,
                                message: "maximum length is 50 ",
                              },
                              {
                                pattern: /^[a-zA-Z\s'-]+$/,
                                message:
                                  "only characters are allowed in the name!",
                              },
                            ]}
                          >
                            <Input placeholder="Name" className="input-control" />
                          </Form.Item>
                          <Form.Item label="name" name="admin_id" noStyle>
                            <Input type="hidden" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mb-3">
                          <label htmlFor="" className="fs14 fw500 lh-1 mb-2">
                            <b>Email Address</b>
                          </label>
                          <Form.Item
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your email address!",
                              },
                              {
                                pattern: /^[a-zA-Z0-9._@]+$/,
                                message:
                                  "Only @ and . characters are allowed in the email!",
                              },
                              {
                                type: 'email',
                                message: 'Please enter a valid email address!',
                              },
                            ]}
                          >
                            <Input
                              disabled={false}
                              placeholder="Email"
                              className="input-control"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mb-3">
                          <label htmlFor="" className="fs14 fw500 lh-1 mb-2">
                            <b>Mobile Number</b>
                          </label>
                          <Form.Item
                            name="mobile"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your mobile number!",
                              },
                              {
                                min: 8,
                                message: "minimum length is 8",
                              },
                              {
                                max: 15,
                                message: "maximum length is 15",
                              },
                              {
                                pattern: /^[0-9]+$/,
                                message:
                                  "Only numbers allowed!",
                              },
                            ]}
                          >
                            <Input
                              disabled={false}
                              placeholder="Mobile Number"
                              className="input-control"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="profile_card_widget">
                      <div className="row justify-content-center">
                        <div className="col-lg-6">
                          {/* { <button type="submit" className="button button-2 w-100 fs18 fw600">Save</button> } */}
                          <Button
                            htmlType="submit"
                            className="button button-2 w-100 fs18 fw600"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    adminData: state.auth.auth,
  };
};
export default connect(mapStateToProps)(AppProfile);
