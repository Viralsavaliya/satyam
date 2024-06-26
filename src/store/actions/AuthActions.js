import {
    formatError,
    login,
    runLogoutTimer,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';
import Http from '../../Http';
import ToastMe from '../../jsx/pages/Common/ToastMe';

export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';
export function signupAction(email, password, history) {
    return (dispatch) => {
        signUp(email, password)
            .then((response) => {
                saveTokenInLocalStorage(response.data);
                runLogoutTimer(
                    dispatch,
                    response.data.expiresIn * 1000,
                    history,
                );
                dispatch(confirmedSignupAction(response.data));
                history.push('/dashboard');
            })
            .catch((error) => {
                const errorMessage = formatError(error.response.data);
                dispatch(signupFailedAction(errorMessage));
            });
    };
}

export function logout(history) {
    // new Promise((resolve, reject) => {
    //     Http.callApi('patch', BaseUrl + '/admin/logout')
    //         .then(function (res) {
    //             return resolve(res);
    //         })
    //         .catch(function (error) {
    //             const data = {
    //                 errorData: error.response.data,
    //             };
    //             return reject(data);
    //         })
    // })
    // new Promise((resolve, reject) => {
    //     Http.callApi('get', BaseUrl + '/admin/refreshToken')
    //         .then(function (res) {
    //             return resolve(res);
    //         })
    //         .catch(function (error) {
    //             const data = {
    //                 errorData: error.response.data,
    //             };
    //             return reject(data);
    //         })
    // })
    localStorage.removeItem('adminDetails');
    history.push('/');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, history,setLoding) {
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                const resObject = {
                    kind: "identitytoolkit#VerifyPasswordResponse",
                    localId: "qmt6dRyipIad8UCc0QpMV2MENSy1",
                    email: 'admin@admin.com',
                    id: response.data.user._id,
                    displayName: response.data.user.name,
                    profileImage: response.data.user.image,
                    registered: true,
                    refreshToken: response.data.refreshToken,
                    accessToken: response.data.accessToken,
                    idToken: response.data.accessToken,
                    expiresIn: 3600
                }
                Http.setBearerToken(response.data.accessToken);
                saveTokenInLocalStorage(resObject);
                runLogoutTimer(
                    dispatch,
                    resObject.expiresIn * 1000,
                    history,
                );
                history.push('/dashboard');
                dispatch(loginConfirmedAction(resObject));
            })
            .catch((error) => {
                setLoding(false)
                ToastMe(error?.response?.data?.message, 'error')
                const errorMessage = formatError(error?.response?.data?.message);
                dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
