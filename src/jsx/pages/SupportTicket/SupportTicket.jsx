import React, { useEffect, useMemo, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import { useDispatch } from 'react-redux';
import { Table, Empty } from 'antd';
import { Badge, Dropdown, DropdownButton } from "react-bootstrap";
import PageLoader from '../Common/PageLoader';
import supportService from '../../../services/support';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';


const SupportTicket = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const locations = useLocation()
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [statusFilterName, setStatusFilterName] = useState('Filter By Status');
    const locationdata = locations.state

    const handleFilterChange = (filterOption) => {
        if (filterOption === 2) {
            setStatusFilterName('Close')
        } else if (filterOption === 1) {
            setStatusFilterName('Open')
        } else {
            setStatusFilterName('All')
        }
        setSelectedFilter(filterOption);
    };
    useEffect(()=>{ 
        if(locationdata === 1 ){
            handleFilterChange(1)
        }
    },[locations])
    const viewTicket = (text) => {
        props.history.push("/view-ticket", { state: text.id })
    }

    const getTicketList = () => {
        dispatch(supportService.getTicketList())
            .then((res) => {
                let newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            user_name: res.data[i].user_name || '-',
                            subject: res.data[i].subject || '-',
                            description: res.data[i].description || '-',
                            status: res.data[i].status || '-',
                            id: res.data[i]._id || '-',
                        }
                    )
                }
                setData(newArr);
                setLoading(false);
            })
            .catch((errors) => {
                setLoading(false);
                console.log({ errors })
            })
    }

    useEffect(() => {
        getTicketList();
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
            title: 'User Name',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'subject',
            dataIndex: 'subject',
            key: 'subject',
            className: 'custom_width'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            className: 'custom_width'
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (text, data) => (
                <div style={{ cursor: 'pointer' }}>
                    {data.status === 1 ? <Badge bg=" badge-lg " className='badge-warning badge-lg' >Open</Badge>
                        : <Badge bg=" badge-lg " className='badge-secondary badge-lg'>Close</Badge>}
                </div>
            ),
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
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => viewTicket(text)}>View</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )
        },
    ];

   

    const filteredData = useMemo(() => {
        if (selectedFilter === null) return data;
        return data.filter((item) => {
            if (selectedFilter === 2) {
                return item.status === 2;
            } else if (selectedFilter === 1) {
                return item.status === 1;
            }
            return true;
        });
    }, [data, selectedFilter]);


    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Support List</h4>
                    <DropdownButton title={statusFilterName === "All" ? "Filter By Status" : statusFilterName} className="custom_dd" >
                        <Dropdown.Item onClick={() => handleFilterChange()} active>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange(1)} >Open</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange(2)} >Close</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {
                            filteredData && filteredData.length > 0 ?
                                <Table dataSource={filteredData} columns={columnss} className='table_custom' /> : <Empty />
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default SupportTicket