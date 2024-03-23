import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SettingService from "../../../services/setting"
import ToastMe from "../Common/ToastMe";
import PageLoader from "../Common/PageLoader";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Cms = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [privacy, setPrivacy] = useState('')
    const [terms, setTerms] = useState('')

    const getCms = () => {
        dispatch(SettingService.getCms())
            .then((res) => {
                setLoading(false);
                if (res.data != null) {
                    setTerms(res?.data?.terms_condition ?? "test")
                    setPrivacy(res?.data?.privacy_policy ?? "testy")
                }
            })
            .catch((errors) => {
                setLoading(false);
                console.log({ errors })
            })
    }

    const onFinish = () => {
        let data = {};
        data.terms_condition = terms;
        data.privacy_policy = privacy;
        dispatch(SettingService.addCms(data))
            .then((res) => {
                getCms();
                ToastMe('Cms Update Successfully', 'success')
            })
            .catch((errors) => {
                setLoading(false);
                console.log({ errors })
            })
    }

    useEffect(() => {
        getCms();
    }, [])

    const handleTerms = (data) => {
        setTerms(data)
    }
    const handlePrivacy = (data) => {
        setPrivacy(data)
    }
    return (
        <>
            <PageLoader loading={loading} />
            <Col xl="12">
                <Card className='table_custom'>
                    <Card.Header className=" border-0 pb-0">
                        {/* <Card.Title style={{ fontWeight: 700 }}>CMS</Card.Title> */}

                    </Card.Header>
                    <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
                        {/* <Card.Body>
                            <label className="label-name">Terms & Conditions</label>
                            <Form.Item
                                name="terms_condition"
                            >
                                <ReactQuill theme="snow" value={terms} onChange={handleTerms} />
                            </Form.Item>
                            <label className="label-name">Privacy Policy</label>
                            <Form.Item
                                name='privacy_policy'
                            >
                                <ReactQuill theme="snow" value={privacy} onChange={handlePrivacy} />
                            </Form.Item>
                            <Button type="submit" className="float-end me-2 btn-xl" variant="primary">
                                Save
                            </Button>
                        </Card.Body> */}

                        <>
                            <div className="mb-4">
                                <label className="label-name fs-20 font-bold mb-3" style={{ fontWeight: 600 }}>Terms & Conditions</label>
                                <ReactQuill theme="snow" value={terms} onChange={handleTerms} />
                            </div>
                            <div>
                                <label className="label-name fs-20 font-bold mb-3" style={{ fontWeight: 600 }}>Privacy Policy</label>
                                <ReactQuill theme="snow" value={privacy} onChange={handlePrivacy} />
                            </div>
                            <div>
                                <Button type="submit" className="float-end me-2 btn-xl" variant="primary" style={{ minWidth: "150px" }}>
                                    Save
                                </Button>
                            </div>
                        </>

                        <Card.Footer className=" border-0 pt-0">
                            <Card.Text className=" d-inline"></Card.Text>
                        </Card.Footer>
                    </Form>
                </Card>
            </Col>
        </>
    )
}

export default Cms