import { Form, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SettingService from "../../../services/setting"
import ToastMe from "../Common/ToastMe";
import PageLoader from "../Common/PageLoader";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const PromoCode = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [promo, setPromo] = useState()

    const getPromocode =async () => {
        dispatch(SettingService.getPromoCode())
            .then((res) => {
                setLoading(false);
                 if (res.data != null) {
                  setPromo(res?.data)
                }
            })
            .catch((errors) => {
                setLoading(false);
                console.log({ errors })
            })
    }

    const handleSwitchChange = (data) => {
        dispatch(SettingService.updatePromoCode(data))
            .then((res) => {
                setLoading(false);
                if (res.data != null) {
                    setPromo(res?.data)
                    ToastMe("PromoCode status change successfully", 'success')
                }
            })
            .catch((errors) => {
                setLoading(false);
                console.log({ errors })
            })
    }

    useEffect(() => {
        getPromocode();
    }, [])

    return (
        <>
            <PageLoader loading={loading} />
            <Col xl="12">
                <Card className='table_custom promo_wrapper'>
                    <Card.Header className=" border-0 pb-0">
                        <Card.Title style={{ fontWeight: 700 }}>PROMOCODE</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="text-center">
                            <p className="fs-16">This promo code is for subscription process. if you active this than user can use it otherwise not.</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: 'center', gap: '20px' }}>
                            <h3 style={{ marginBottom: '0' }}>{promo?.promo_code} </h3>
                            <Switch
                                checked={promo?.status === true ? true : false} onChange={() => handleSwitchChange(promo)} />
                        </div>
                    </Card.Body>

                </Card>
            </Col>
        </>
    )
}

export default PromoCode