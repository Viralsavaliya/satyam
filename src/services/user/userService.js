import Http from '../../Http'
// import ToastMe from '../../view/common/ToastMe';
const BaseUrl = process.env.REACT_APP_BASE_URL;

export function getUser(value) {
    let search = value || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + `/admin/userList?serach=${search}`)
                .then(function (res) {
                    // dispatch(action.setNotificationData(res));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getAllUser(value) {
    let search = value || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/allUserList?search=' + search)
                .then(function (res) {
                    // dispatch(action.setNotificationData(res));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getRequest(value) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/requestList')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getwork(value) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/workList  ')
                .then(function (res) {
                    // dispatch(action.setNotificationData(res));
                    return resolve(res?.data);
                })
                .catch(function (error) {
                    const data = {
                        // errorData: error.response.data,
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getusersubscription(value) {
    let search = value || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + `/admin/usersubscription?serach=${search}`)
                .then(function (res) {
                    return resolve(res?.data);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                    };
                    return reject(data);
                })
        })
    )
}

export function gettransaction(value) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/usersubscriptionlist')
                .then(function (res) {
                    return resolve(res?.data);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                    };
                    return reject(data);
                })
        })
    )
}

export function getpostreport(value) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getpostreport')
                .then(function (res) {
                    return resolve(res?.data);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                    };
                    return reject(data);
                })
        })
    )
}

export function getuserreport(value) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getuserreport')
                .then(function (res) {
                    return resolve(res?.data);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                    };
                    return reject(data);
                })
        })
    )
}


export function getSubUserList(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            const id = data.state.id
            Http.callApi('get', `${BaseUrl}/admin/subUserList?id=${id}`, [])
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function changeUserStatus(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/changeUserStatus', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    // const data = {
                    //     // errorData: error.response.data.message,
                    //     // statusCode: error.response.status,
                    // };
                    return reject(data);
                })
        })
    )
}
export function changereportUserStatus(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/changeReportUserStatus', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    // const data = {
                    //     // errorData: error.response.data.message,
                    //     // statusCode: error.response.status,
                    // };
                    return reject(data);
                })
        })
    )
}

export function changereportPostStatus(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/changeReportPostStatus', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    // const data = {
                    //     // errorData: error.response.data.message,
                    //     // statusCode: error.response.status,
                    // };
                    return reject(data);
                })
        })
    )
}

export function getCarrierSubUserList(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            const id = data.state.id
            Http.callApi('get', `${BaseUrl}/admin/carriersubUserList?id=${id}`, [])
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getContactus(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', `${BaseUrl}/admin/getContactUs`, [])
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        // errorData: error.response.data.message,
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getSubUserFmcsasList(data) {
    data.env = 'test'
    const queryParam = `?dotNumber=${data?.state?.dotNumber}&env=${data?.env}`;
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/carrierfmcsasList' + queryParam, [])
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                });
        })
    )
}

export function getLinkList(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            const id = data.state.id
            Http.callApi('get', `${BaseUrl}/admin/linkList?id=${id}`, [])
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function gethuntertip(value) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/huntertipList')
                .then(function (res) {
                    // dispatch(action.setNotificationData(res));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                    };
                    return reject(data);
                })
        })
    )
}

export function gettechniques(value) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/gettechniques')
                .then(function (res) {
                    // dispatch(action.setNotificationData(res));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                    };
                    return reject(data);
                })
        })
    )
}



export function deletework(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('delete', BaseUrl + `/admin/deletework?id=${data}`)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function deletecontact(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('delete', BaseUrl + `/admin/deletecontactus?id=${data}`)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getProfile() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/profile')
                .then(function (res) {
                    // dispatch(action.setNotificationData(res));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function updateUserProfile(data, adminData) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('patch', BaseUrl + '/admin/updateProfile', data)
                .then(function (res) {
                    adminData.name = data.name;
                    adminData.email = data.email;
                    adminData.mobile = data.mobile;
                    // adminData.profileImage = data.image
                    localStorage.setItem('adminDetails', JSON.stringify(adminData));
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

// userService.js
export function carrierDetails(data) {
    data.env = 'test'
    const queryParam = `?userId=${data?.id}&env=${data.env}`;
    return new Promise((resolve, reject) => {
        Http.callApi('get', BaseUrl + '/admin/carrierDetails' + queryParam, [])
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                const data = {
                    errorData: error.response.data.message,
                    // statusCode: error.response.status,
                };
                reject(data);
            });
    });
}

export function googleimage(data) {
    data.env = 'test'
    const queryParam = `?id=${data.id}&env=${data.env}`;
    return new Promise((resolve, reject) => {
        Http.callApi('get', BaseUrl + '/admin/physicalAddressPhotos' + queryParam, [])
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                const data = {
                    errorData: error.response.data.message,
                    // statusCode: error.response.status,
                };
                reject(data);
            });
    });
}

// userService.js
export function changepassword(data, adminData) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/changePassword', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}


export function changehunterTipStatus(data) {
    const Id = data._id

    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + `/admin/changestatushuntertip?id=${Id}`, data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function changetechniquesStatus(data) {
    const Id = data._id

    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + `/admin/changestatustechniques?id=${Id}`, data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

// 2FA
export function enableGoogle2FA(email) {
    return Http.callApi('post', BaseUrl + '/admin/generateGoogle2fa', { email });
}

export function disableGoogle2FA() {
    return Http.callApi('post', BaseUrl + '/admin/disableGoogle2fa');
}

export function verifyGoogle2FA(values) {
    return Http.callApi('post', BaseUrl + '/admin/google2faCheck', values);
}

export function uploadProfile(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/uploadImage', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function uploadUserProfile(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/uploadImage', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function uploadCommonImage(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/commonuploadImage', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getCms() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/common/listCMS')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function addCms(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/cms', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getMaintenance(data) {
    let search = data || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/listRequest?search=' + search)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function approveRequest(data) {
    let data_ = {
        mId: data._id,
        env: 'test',
        technicianStatus: data?.technicianStatus,
        technicianId: data?.technicianId
    }
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/approveReject', data_)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function updateCms(data) {
    data.env = 'test';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/editCms', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function deleteCms(data) {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/common/deleteCms/' + data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function createcontact(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/addContactUs', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function updatecontant(data) {
    const id = data?.id
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('patch', BaseUrl + `/admin/updateContactUs?id=${id}`, data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function creatework(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/creatework', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function updatework(data) {
    const ID = data.id
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('patch', BaseUrl + `/admin/updatework?id=${ID}`, data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function updateimage(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/uploadImage/admin', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}


export function createhntertip(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/createhuntertip', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function createtechniques(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/createtechniques', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function Edithntertip(data) {
    const ID = data?.id;
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('patch', BaseUrl + `/admin/updatehuntertip?id=${ID}`, data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function Edittechniques(data) {
    const ID = data?.id;
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('patch', BaseUrl + `/admin/updatetechniques?id=${ID}`, data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}


// export function imageupdate(data) {
//     data.env = 'test'
//     return dispatch => (
//         new Promise((resolve, reject) => {
//             Http.callApi('post', BaseUrl + '/uploadImage/admin', data)
//                 .then(function (res) {
//                     return resolve(res);
//                 })
//                 .catch(function (error) {
//                     console.log(error);
//                     const data = {
//                         errorData: error,
//                         // statusCode: error.response.status,
//                     };
//                     return reject(data);
//                 })
//         })
//     )
// }

export function sendUserNotification(data) {
    data.type = 2
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/sendNotificationToUser', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getNotificationlist(type) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getNotification')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        error: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function addFaq(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/createFaq', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getFaq(data) {
    let search = data || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/common/allFaq?search=' + search)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getGroup() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/common/groupList')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function uploadMedia(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/upload/media', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function addTechnicalguides(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/createTechnicalGuides', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getTechnicalGuides(data) {
    // data.env = 'test'
    let search = data || ''
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/common/listTechnicalGuides?search=' + search)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function editTechnicalguides(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/editTechnicalguides', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function createGroup(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/createGroup', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function editGroup(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/common/editGroup', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getTechnician(data) {
    // data.env = 'test'
    let search = data || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/listTechnician?search=' + search)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function updateTechician(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/updateTechnician', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errors: error.response.data.errors,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function addTechician(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/addTechnician', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errors: error.response.data.errors,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function addRequest(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/sendMaintenanceRequest', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.errors,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function listRequestbyId(data) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/listRequestbyId/' + data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function listSubscribeUser(data) {
    // data.env = 'test'
    let search = data || '';
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/listSubscribeUser?search=' + search)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function addSubscribeUser(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/addSubscribeUser', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function updateUser(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/admin/userProfileUpdate', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errors: error.response.data.errors,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function addUser(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/userRegister', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errors: error.response.data.errors,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getPaymentHistory() {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/PaymentHistory')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.response.data.errors,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getSharedPostList(id) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getSharedPostList/' + id)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getSavedPostList(id) {
    // data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/admin/getSavedPostList/' + id)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}
export function sendNotification(data) {
    data.env = 'test'
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/admin/sendAlluserNotification/' , data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (error) {
                    const data = {
                        errorData: error.message,
                        // statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

