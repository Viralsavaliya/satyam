import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
  loadingToggleAction, loginAction,
} from '../../store/actions/AuthActions';

// image
import logo from "../../icons/logosatyam.png";
import loginbg from "../../images/bg-login.jpg";
import * as Yup from "yup";
import { Spin } from 'antd';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, "Your username must consist of at least 3 characters ")
    .max(50, "Your username must consist of at least 3 characters ")
    .required("Please enter a Email")
    // .matches(/^[a-zA-Z0-9.@]+$/, "Special characters are not allowed")
    .email("email is not validate"),
  password: Yup.string()
    .min(5, "Your password must be at least 5 characters long")
    .max(50, "Your password must be at least 5 characters long")
    .required("Please enter a password"),
});

function Login(props) {
  const [email, setEmail] = useState('');
  let errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loding, setLoding] = useState(false);
  const dispatch = useDispatch();

  function onLogin(e) {
    setLoding(true);
    e.preventDefault();
    loginSchema.validate({ email, password }, { abortEarly: false })
      .then(() => {
        // Validation successful, proceed with login action
        dispatch(loadingToggleAction(true));
        dispatch(loginAction(email, password, props.history,setLoding));
      })
      .catch(validationErrors => {
        const newErrors = {};
        validationErrors.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
        setLoding(false);
        setErrors(newErrors);
      });
  }

  return (
    <div className="login-main-page" style={{ backgroundImage: "url(" + loginbg + ")" }}>
      <div className="login-wrapper">
        <div className="login-aside-left" >
          <Link to={"#"} className="login-logo">
            <img src={logo} alt="" width="400px" loading="lazy" />
          </Link>
          <div className="login-description">
            <h2 className="main-title mb-2">Welcome To satyam</h2>
            <p className="">Satyam Motors</p>
            <ul className="social-icons mt-4">
              {/* <li><Link to={"#"}><i className="fab fa-facebook-f"></i></Link></li>
              <li><Link to={"#"}><i className="fab fa-twitter"></i></Link></li>
              <li><Link to={"#"}><i className="fab fa-linkedin-in"></i></Link></li> */}
            </ul>
            <div className="mt-5 bottom-privacy">
              {/* <Link to={"#"} className="mr-4">Privacy Policy</Link>
              <Link to={"#"} className="mr-4">Contact</Link>
              <Link to={"#"} className="">© 20222 DexignLab</Link> */}
            </div>
          </div>
        </div>
        <div className="login-aside-right">
          <div className="row m-0 justify-content-center h-100 align-items-center">
            <div className="p-5">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form-1">
                      <div className="mb-4">
                        <h3 className="dz-title mb-1">Sign in</h3>
                        <p className="">Sign in by entering information below</p>
                      </div>
                      {props.errorMessage && (
                        <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                          {props.successMessage}
                        </div>
                      )}
                      <form onSubmit={onLogin}>
                        <div className="form-group">
                          <label htmlFor="email" className="mb-2 ">
                            <strong>Email</strong>
                          </label>
                          <input type="email" className="form-control"
                            value={email}
                            id="email"
                            data-validation-schema={loginSchema}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            placeholder="Type Your Email Address"
                          />
                          {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="password" className="mb-2 "><strong>Password</strong></label>
                          <div className='password_feild'>
                            <input
                              type={show ? 'text' : 'password'}
                              className="form-control"
                              id="password"
                              data-validation-schema={loginSchema}
                              value={password}
                              placeholder="Type Your Password"
                              autoComplete="current-password"
                              onChange={(e) =>
                                setPassword(e.target.value)
                              }

                            />
                            <span onClick={() => setShow(!show)}>
                              {show ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15.58 12c0 1.98-1.6 3.58-3.58 3.58S8.42 13.98 8.42 12s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58Z" stroke="#44814e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68Z" stroke="#44814e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="m14.53 9.47-5.06 5.06a3.576 3.576 0 1 1 5.06-5.06Z" stroke="#44814e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73c-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19.79 1.24 1.71 2.31 2.71 3.17M8.42 19.53c1.14.48 2.35.74 3.58.74 3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-.33-.52-.69-1.01-1.06-1.47" stroke="#44814e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.51 12.7a3.565 3.565 0 0 1-2.82 2.82M9.47 14.53 2 22M22 2l-7.47 7.47" stroke="#44814e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              }
                            </span>
                          </div>
                          {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                        </div>
                        {/* <div className="form-row d-flex justify-content-between mt-4 mb-2">
                          <div className="form-group">
                            <div className="form-check custom-checkbox ml-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="basic_checkbox_1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                              >
                                Remember my preference
                              </label>
                            </div>
                          </div>
                        </div> */}
                        <div className="text-center login_btn">
                          <Spin  spinning={loding}>
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              Sign In
                            </button>
                          </Spin>
                        </div>
                      </form>
                      {/* <div className="new-account mt-2">
                        <p className="">
                          Don't have an account?{" "}
                          <Link className="text-primary" to="./page-register">
                            Sign up
                          </Link>
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
