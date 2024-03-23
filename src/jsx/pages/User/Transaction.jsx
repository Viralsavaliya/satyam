import React, { useEffect, useMemo, useState } from "react";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import { Badge, Button, Descriptions, Empty, Input, Table, Tag } from "antd";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const Transaction = (props) => {
  const { state } = useLocation();
  const data = state.bilDetail



const backbutton = () => {
  props.history.push("/user-list")
}



  return (
    <>
      <div>
        <div width='100' style={{textAlign:'end', marginBottom:'8px'}}><Button onClick={backbutton}>Back</Button></div>
        <h2>Bil Details</h2>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Bil Number">{data.bilnumber}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Items">
            {data.Allitem.checkedItems.length > 0 ? (
              <ul>
                {data.Allitem.checkedItems.map((item) => (
                  <>
                    <div style={{ display: 'flex' }}>
                      <li key={item._id} style={{ width: "150px" }}>
                        {item.item}
                      </li>
                      <li> {item.amount}</li>
                    </div>
                  </>
                ))}
              </ul>
            ) : (
              <Tag color="warning">No items selected</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="List">
            {data.Allitem.inputList.length > 0 ? (
              <ul>
                {data.Allitem.inputList.map((input) => (
                  <>
                    <div style={{ display: 'flex' }}>
                      <li key={input._id} style={{ width: "150px" }}>
                        {input.textValue}
                      </li>
                      <li> {input.numberValue}</li>
                    </div>
                  </>
                ))}
              </ul>
            ) : (
              <Tag color="warning">Input list is empty</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Total">{data.total}</Descriptions.Item>
        </Descriptions>
      </div>

    </>
  );
};

export default Transaction;
