import { Button, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import supportService from "../../../services/support";
import { Row, Card, Col } from "react-bootstrap";
import ToastMe from "../Common/ToastMe";



const ViewTicket = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { id } = state.state;

  const [form] = Form.useForm();
  const [userImg, setUserImg] = useState('');
  const [imageData, setimageData] = useState();
  const [messageList, setMessageList] = useState([]);
  const [data, setData] = useState();
  const history = useHistory();

  // Add Ticket 

  const onSubmit = async (values) => {

    values.support_ticket_id = state.state
    values.user_id = data.user_id
    // console.log(values)
    if (values.message == undefined) {
      const image = new FormData();
      image.append('image', imageData);
      values.type = 2; //msg type 1=text 2=media

      dispatch(supportService.uploadCommonImage(image))
        .then((res) => {

          values.type = 2;
          values.message = res.data.file_name;

          dispatch(supportService.ticketReply(values))
            .then((res) => {
              form.resetFields();
              getMessageList();
              getTicket();
              scrollToBottom();
              setUserImg('')
            })

            .catch((errors) => {
              console.log({ errors })
            })
        })

        .catch((errors, statusCode) => {
          setUserImg('')
          ToastMe(errors.errorData, "error");
        });

    }

    else {
      values.type = 1; //msg type 1=text 2=media
    }
    dispatch(supportService.ticketReply(values))
      .then((res) => {
        form.resetFields();
        getMessageList();
        getTicket();
        scrollToBottom();
      })
      .catch((errors) => {
        console.log({ errors })
      })
  }

  //Get Message List continue
  const getMessageList = () => {
    dispatch(supportService.getMessageList(state.state))
      .then((res) => {
        setMessageList(res.data)
        return res.data
      })
      .catch((errors) => {
        console.log({ errors })
      })
  }

  //Get single Ticket
  const getTicket = () => {
    dispatch(supportService.getTicketDetail(state.state))
      .then((res) => {
        setData(res.data)
        return res.data
      })
      .catch((errors) => {
        console.log({ errors })
      })
  }

  useEffect(() => {
    getMessageList();
    getTicket();
  }, [])

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: 'end', behavior: "instant" })
  }

  useEffect(() => {
    scrollToBottom();
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      //   sendMessage();
    }
  };

  const previewUserImageOnChange = (ev) => {
    let userImgSrc = URL.createObjectURL(ev.target.files[0]);
    let filesPath = ev.target.files[0];
    setUserImg(userImgSrc);
    setimageData(filesPath)
  }

  const Back = async () => {
    history.push('/support-list');
  }

  const statuschange = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "To close ticket!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(supportService.changeStatus(state.state))
          .then((res) => {
            ToastMe("Ticket Complete Successfully", 'success')
            history.push('/support-list');
          })
          .catch((errors) => {
            console.log({ errors })
          })
      }
    })

  }
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const documentExtensions = ['pdf', 'doc', 'docx'];

  return (

    <Row>
      <Col xl="12">
        <Card className='table_custom'>
          <Card.Header>
            <Card.Title className="text-dark">Ticket Information</Card.Title>
            <div className="d-flex align-items-center gap-3">
              <Button type="primary" onClick={() => Back()}>Back</Button>
              {data?.status == 1 ? <Button onClick={() => statuschange()}>Complete Ticket</Button> : ''}
            </div>
          </Card.Header>
          <Card.Body className="mb-0">
            <div className="row">
              <div className="col-6">
                <Card.Text>
                  <div>
                    <label className="label-name" style={{ fontWeight: 'bold', fontSize: '20px' }}>User Name :&nbsp;</label>
                    <span style={{ fontWeight: 'initial', fontSize: 'large' }}>{data?.user_name ? data?.user_name : '-'}</span>
                  </div>
                </Card.Text>
              </div>
              <div className="col-6">
                <Card.Text>
                  <div>
                    <label className="label-name" style={{ fontWeight: 'bold', fontSize: '20px' }}>Requested On :&nbsp;</label>
                    <span style={{ fontWeight: 'initial', fontSize: 'large' }}>{data?.createdAt ? moment(data?.createdAt).format('Do MMMM, YYYY') : '-'}</span>
                  </div>
                </Card.Text>
              </div>
            </div>
            <Card.Text>
              <div className="row">
                <div className="col-6">
                  <Card.Text>
                    <div>
                      <label className="label-name" style={{ fontWeight: 'bold', fontSize: '20px' }}>Subject :&nbsp;</label>
                      <span style={{ fontWeight: 'initial', fontSize: 'large' }}>{data?.subject ? data?.subject : '-'}</span>
                    </div>
                  </Card.Text>
                </div>
                <div className="col-6">
                  <Card.Text>
                    <div>
                      <label className="label-name" style={{ fontWeight: 'bold', fontSize: '20px' }}>Status :&nbsp;</label>
                      {data?.status == 1 ? <span className="badge badge-warning" >Open</span>
                        : <span className="badge badge-success" >Close</span>}
                    </div>
                  </Card.Text>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Card.Text>
                    <div>
                      <label className="label-name" style={{ fontWeight: 'bold', fontSize: '20px' }}>Message :&nbsp;</label>
                      <span style={{ fontWeight: 'initial', fontSize: 'large' }}>  {data?.description ? data?.description : '-'}
                      </span>
                    </div>
                  </Card.Text>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xl="12">
        <Card className='table_custom'>
          <Card.Header>
            <Card.Title className="text-dark">Chat</Card.Title>
          </Card.Header>
          {/* <div> */}
          <div className="message-container custome_scrollbar">
            {messageList.map((m, index) => (
              <div
                key={index}
                className={`message ${m.sender_id === 1 ? 'user' : 'admin'} ${m.type === 1 ? 'text' : 'image'
                  }`}
              >
                {m.type === 1 ? (
                  <div className="message-text">{m.message}</div>
                ) : (
                  (() => {
                    // Extract the file extension from the message
                    const fileExtension = m.message.split('.').pop().toLowerCase();

                    // Define allowed extensions for different content types
                    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                    const documentExtensions = ['pdf'];
                    const wordExtensions = ['doc', 'docx'];

                    if (imageExtensions.includes(fileExtension)) {
                      // Render image
                      return (
                        <img
                          src={process.env.REACT_APP_PROFILE_URL + 'support/' + m.message}
                          alt="Message"
                          height="250px"
                          width="250px"
                        />
                      );
                    } else if (documentExtensions.includes(fileExtension)) {
                      // Render document link
                      return (
                        <a
                          href={process.env.REACT_APP_PROFILE_URL + 'support/' + m.message}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="custom_fontsize_pdf"
                        >
                          <i class="fa fa-file-pdf" aria-hidden="true"></i>
                        </a>
                      );
                    } else if (wordExtensions.includes(fileExtension)) {
                      // Render document link
                      return (
                        <a
                          href={process.env.REACT_APP_PROFILE_URL + 'support/' + m.message}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="custom_fontsize_word"
                        >
                          <i class="fa fa-file-word" aria-hidden="true"></i>
                        </a>
                      );
                    }
                    else {
                      // Handle unsupported file types here
                      return <div>Unsupported file type</div>;
                    }
                  })()
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* </div> */}

          {data?.status == 1 ? <Card.Body className="mb-0 chat_footer">
            {userImg != '' ? <img src={userImg} style={{ width: "20%" }} alt="gallery" loading="lazy"/> : ''}
            <Form form={form} layout="vertical" name="form_in_modal"
              initialValues={{
                modifier: "public"
              }}
            >
              <div className="form_warpper">
                <Form.Item name="message"
                >
                  <Input type="text" placeholder='Type a message....' />
                </Form.Item>
                <div className="image_selection">
                  <Form.Item name="image">
                    <label for="file_upload">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2487_34812)">
                          <path d="M11.25 17.0625H6.75C2.6775 17.0625 0.9375 15.3225 0.9375 11.25V6.75C0.9375 2.6775 2.6775 0.9375 6.75 0.9375H11.25C15.3225 0.9375 17.0625 2.6775 17.0625 6.75V11.25C17.0625 15.3225 15.3225 17.0625 11.25 17.0625ZM6.75 2.0625C3.2925 2.0625 2.0625 3.2925 2.0625 6.75V11.25C2.0625 14.7075 3.2925 15.9375 6.75 15.9375H11.25C14.7075 15.9375 15.9375 14.7075 15.9375 11.25V6.75C15.9375 3.2925 14.7075 2.0625 11.25 2.0625H6.75Z" fill="white" />
                          <path d="M6.75004 8.0625C5.61004 8.0625 4.68754 7.14 4.68754 6C4.68754 4.86 5.61004 3.9375 6.75004 3.9375C7.89004 3.9375 8.81254 4.86 8.81254 6C8.81254 7.14 7.89004 8.0625 6.75004 8.0625ZM6.75004 5.0625C6.5014 5.0625 6.26294 5.16127 6.08712 5.33709C5.91131 5.5129 5.81254 5.75136 5.81254 6C5.81254 6.24864 5.91131 6.4871 6.08712 6.66291C6.26294 6.83873 6.5014 6.9375 6.75004 6.9375C6.99868 6.9375 7.23713 6.83873 7.41295 6.66291C7.58876 6.4871 7.68754 6.24864 7.68754 6C7.68754 5.75136 7.58876 5.5129 7.41295 5.33709C7.23713 5.16127 6.99868 5.0625 6.75004 5.0625ZM2.00179 14.7743C1.88125 14.7744 1.76387 14.7357 1.66713 14.6638C1.57039 14.5919 1.49945 14.4906 1.46489 14.3752C1.43034 14.2597 1.43399 14.1361 1.47533 14.0229C1.51666 13.9097 1.59346 13.8128 1.69429 13.7468L5.39179 11.2643C6.20179 10.7168 7.31929 10.7843 8.05429 11.4068L8.30179 11.6243C8.67679 11.9468 9.31429 11.9468 9.68179 11.6243L12.8018 8.94675C13.5968 8.26425 14.8493 8.26425 15.6518 8.94675L16.8743 9.99675C17.1068 10.1993 17.1368 10.5518 16.9343 10.7918C16.7318 11.0243 16.3793 11.0543 16.1393 10.8518L14.9168 9.80175C14.5418 9.47925 13.9043 9.47925 13.5293 9.80175L10.4093 12.4793C9.61429 13.1618 8.36179 13.1618 7.55929 12.4793L7.31179 12.2618C6.96679 11.9693 6.39679 11.9393 6.01429 12.2018L2.31679 14.6843C2.21929 14.7443 2.10679 14.7743 2.00179 14.7743Z" fill="white" />
                        </g>
                        <defs>
                          <clipPath id="clip0_2487_34812">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </label>
                    <input
                      id="file_upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        previewUserImageOnChange(e);
                      }}
                      className="d-none"
                    />
                  </Form.Item>
                </div>
                <Button
                  key="submit"
                  type="primary" htmlType="submit"
                  onClick={() => {
                    form.validateFields()
                      .then((values) => {
                        onSubmit(values);
                      })
                      .catch((info) => {
                        console.log("Validate Failed:", info);
                      });
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8484 6.34616L2.58381 0.138186C1.92654 -0.123375 1.18399 -0.00830987 0.645993 0.438313C0.107994 0.885022 -0.117026 1.57329 0.0588206 2.23451L1.4475 7.45673H8.24665C8.55951 7.45673 8.8132 7.69997 8.8132 8.00002C8.8132 8.30005 8.55955 8.54331 8.24665 8.54331H1.4475L0.0588206 13.7655C-0.117026 14.4267 0.107956 15.115 0.645993 15.5617C1.18509 16.0092 1.92771 16.1229 2.58385 15.8618L14.8484 9.65388C15.5588 9.37123 16 8.7375 16 8.00002C16 7.26253 15.5588 6.62877 14.8484 6.34616Z" fill="#FAFBFD" />
                  </svg>

                </Button>
              </div>
            </Form>
          </Card.Body> : ''}
        </Card>
      </Col>
    </Row >
  );
};

export default ViewTicket;
