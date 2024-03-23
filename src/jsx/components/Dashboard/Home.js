import React, {  useEffect, useState } from 'react';
import { useHistory  } from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import CommonService from '../../../services/common';
import PageLoader from '../../pages/Common/PageLoader';

import { useDispatch } from 'react-redux';

const TotalInvoices = loadable(() =>
	pMinDelay(import("./Dashboard/TotalInvoices"), 1000)
);

const Totalinvoicessent = loadable(() =>
	pMinDelay(import("./Dashboard/Totalinvoicessent"), 1000)
);

const Paidinvoices = loadable(() =>
	pMinDelay(import("./Dashboard/Paidinvoices"), 1000)
);

const Unpaidinvoices = loadable(() =>
	pMinDelay(import("./Dashboard/Unpaidinvoices"), 1000)
);


const Home = () => {
	const dispatch = useDispatch();
	const [countData, setCountData] = useState();
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	const dashboardCountData = (key) => {
		key = "All"
		dispatch(CommonService.dashboard(key))
			.then((res) => {
				setCountData(res.data)
				setLoading(false)
			})
			.catch((errors) => {
				console.log({ errors })
				setLoading(false)
			})
	}
	

	useEffect(() => {
		dashboardCountData();
	}, []);

	const UserRedirect = () => {
		history.push('/user-list');
	}
	const subscriberRedirect = () => {
		history.push('/user-subscriptions');
	}

	 const UserRedirectTicket = () => {
		history.push('/support-list' , 1)
	 }
	 const Redirecttrascation = () =>{
		history.push('/transaction')
	 }

	return (
		<>
			<PageLoader loading={loading} />
			<div className="row">
				<h4><b>Users</b></h4>
				<div className="col-xl-12">
					<div className="row">
					{/* <div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
										<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#FD5353" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.user?.todaytotaluser ?? 0}</h4>
											<span>Today Joined</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="totalinvoicessent">
										<Unpaidinvoices />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6" onClick={subscriberRedirect} style={{cursor:"pointer"}}>
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.784 54.128 9.106 53.788C8.428 53.45 8 52.758 8 52V16C8 14.896 8.896 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#FFAA2B" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.user?.SubscriberUser ?? 0}</h4>
											<span>Subscriber User</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="totalinvoicessent">
										<Totalinvoicessent />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#09BD3C" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.user?.FreeUser ?? 0}</h4>
											<span>Free User</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="paidinvoices">
										<Paidinvoices />
									</div>
								</div>

							</div>
						</div> */}
						<div className="col-xl-3 col-sm-6" onClick={UserRedirect} style={{cursor:"pointer"}}>
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-2">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#717579" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#717579" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.user?.TotalUser ?? 0}</h4>
											<span>Total User</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="totalInvoices">
										<TotalInvoices />
									</div>
								</div>
							</div>
						</div>
					
					</div>
				</div>
				{/* <h4><b>Received Payment</b></h4> */}
				{/* <div className="col-xl-12">
					<div className="row">
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#09BD3C" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
										<h4>{countData?.user?.totalpaymenttoday?.toFixed(2) ?? 0}$</h4>
											<span>Today Received Payment</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="paidinvoices">
										<Paidinvoices />
									</div>
								</div>

							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#FD5353" stroke="white" strokeWidth="4" />
											</svg>

										</span>
										<div className="invoices">
										<h4>{countData?.user?.totalpayment?.toFixed(2) ?? 0}$</h4>
											<span>Total Received Payment</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="unpaidinvoices">
										<Unpaidinvoices />
									</div>
								</div>

							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
										<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.784 54.128 9.106 53.788C8.428 53.45 8 52.758 8 52V16C8 14.896 8.896 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#FFAA2B" stroke="white" strokeWidth="4" />
											</svg>

										</span>
										<div className="invoices">
										<h4>{countData?.user?.TodayPaidUser ?? 0}</h4>
											<span>Today Paid User</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="unpaidinvoices">
									<Totalinvoicessent />
									</div>
								</div>

							</div>
						</div>
						<div className="col-xl-3 col-sm-6" onClick={Redirecttrascation} style={{cursor:"pointer"}}>
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-2">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#717579" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#717579" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.user?.transactionhistory ?? 0}</h4>
											<span>Transaction History</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="totalInvoices">
										<TotalInvoices />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<h4><b>Tickets</b></h4>
				<div className="col-xl-12">
					<div className="row">
						<div className="col-xl-3 col-sm-6" onClick={UserRedirectTicket} style={{cursor:"pointer"}}>
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#09BD3C" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
										<h4>{countData?.user?.supportticket ?? 0}</h4>
											<span>New Tickets</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="paidinvoices">
										<Paidinvoices />
									</div>
								</div>

							</div>
						</div>
					</div>
				</div> */}
			</div>
		</>
	)
}
export default Home;