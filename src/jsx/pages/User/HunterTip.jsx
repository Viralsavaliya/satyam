import React, { useEffect, useMemo, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Button, Form, Empty, Table, Modal, Input, Badge } from 'antd';
import 'react-phone-input-2/lib/style.css';
import PageLoader from '../Common/PageLoader';
import TextArea from 'antd/es/input/TextArea';
import ToastMe from "../Common/ToastMe";
import Swal from 'sweetalert2';


const HunterTip = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingbutton, setLoadingbutton] = useState(false);
  const [Id, setId] = useState("");
  const [imageName, setImageName] = useState();
  const [userImgpath, setUserImgpath] = useState("");
  const [userImg, setUserImg] = useState("");

  const [visible, setVisible] = useState(false);

  const gethuntertip = (value) => {
    dispatch(UserService.gethuntertip(value))
      .then((res) => {
        var newArr = [];
        res.data.map((element, index) => {
          return newArr.push({ key: index, ...element });
        })
        setData(newArr)
        setLoading(false)
      })
      .catch((errors) => {
        console.log({ errors })
      })
  }



  const filteredData = useMemo(() => {
    return data
  }, [data]);


  useEffect(() => {
    gethuntertip();
  }, [])


  const changestatus = (e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "To change this HunterTip status!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(UserService.changehunterTipStatus(e))
          .then((res) => {
            gethuntertip();
            ToastMe("Hunter Tip status change successfully", 'success')
          })
          .catch((errors) => {
            console.log({ errors })
          })
      }
    })
  }

  const columnss = [
    {
      title: 'ID',
      dataIndex: "key",
      key: "key",
      render: (text) => <div>{text + 1}</div>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (data) => (
        <img src={process.env.REACT_APP_PROFILE_URL + 'admin/' + data}
          style={{ borderRadius: "50%", height: "80px", width: "80px" }}
          alt="" loading="lazy"/>
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (data) => (
        <p style={{ width: "200px" }}>  {data === '' || data === null ? "-" : data}</p>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (data) => (
        data === '' || data === null ? "-" : data
      )
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (element, data) => (
        <div style={{ width: "100px", cursor: 'pointer' }} onClick={() => changestatus(data)}>
          {element === 0 ? <Badge bg=" badge-lg " className='badge-danger light badge-xs badge bg- badge-lg'>Deactive</Badge>
            : <Badge bg=" badge-lg " className='badge-primary light badge-xs badge bg- badge-lg' >Active</Badge>}
        </div>
      ),
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
          </div>
        </>
      ),
    },
  ];
  const editModal = (text) => {
    setVisible(true);
    setId("")
    setUserImg("")
    if (text) {
      setId(text?._id);
      setUserImg(`${process.env.REACT_APP_PROFILE_URL + 'admin/'}${text?.image}`)
      form.setFieldsValue({
        title: text.title,
        description: text.description,
        // imagePath: text.image
      });
    } else {
      form.resetFields();
    }
  };

  const previewUserImageOnChange = (ev) => {
    let userImgSrc = URL.createObjectURL(ev.target.files[0]);
    setUserImg(userImgSrc);
    setUserImgpath(ev.target.files[0])
  }

  const uploadimage = async () => {
    const image = new FormData();
    image.append('image', userImgpath);

    let data = await dispatch(UserService.uploadUserProfile(image))
      .then((res) => {
        if (res.data) {
          setImageName(res.data.file_name)
          return res.data.file_name
        }
      })
      .catch((errors, statusCode) => {
        setUserImg('')
        // ToastMe(errors.errorData, "error");
      });
    return data;
  }

  const handleSubmit = async (values) => {
    setLoadingbutton(true);
    const dataimage = await uploadimage()
    values.image = dataimage
    if (Id) {
      values.id = Id
    }

    const apicall = Id ? UserService.Edithntertip(values) : UserService.createhntertip(values);

    dispatch(apicall)
      .then((res) => {
        gethuntertip();
        setId("");
        setVisible(false);
        setUserImg('')
        setUserImgpath("")
        ToastMe(res.data.message, "success");
        setLoadingbutton(false);
      })
      .catch((errors) => {
        console.log({ errors });
      });
  };
  return (
    <>
      <PageLoader loading={loading} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Hunter Tip List</h4>
          <Button type="primary" onClick={() => editModal()}>
            Add HunterTip
          </Button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {filteredData && filteredData.length > 0 ? (
              <Table dataSource={filteredData} columns={columnss} className='table_custom' />
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
      <Modal
        open={visible}
        title={Id ? "Edit Hunter Tip" : "Add Hunter Tip"}
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
          <label className="label-name">Image</label>
          <Form.Item
            name="imagePath"
            rules={[
              { required: Id ? false : true, message: "Please Enter Image" },
            ]}
          >
            <Input
              type="file"
              onChange={(event) => previewUserImageOnChange(event)} accept="image/*"
            />
          </Form.Item>
          {userImg ?
            <div className="img_wrapper">
              <img
                src={userImg}
                alt="profile"
                style={{ borderRadius: "8px", height: "150px", width: "150px" }}
              />
            </div>
            : ""}

          <label className="label-name">Title</label>
          <Form.Item
            name="title"
            rules={[
              { required: true, message: "Please Enter Title" },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter Title"
            />
          </Form.Item>

          <label className="label-name">Description</label>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please Enter Description" },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 10, maxRows: 15 }}
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
              loading={loadingbutton}
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

export default HunterTip