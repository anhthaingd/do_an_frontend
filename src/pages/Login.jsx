import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../Css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/generalScreen/Header";
import Footer from "../components/generalScreen/Footer";
import * as actions from "../store/actions";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const { setLoginUserInfo } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, loginUserIDRd } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => {
    return state.auth;
  });
  const handleNavigate = () => {
    if (isLoggedIn) {
      if (role === 2) {
        setLoginUserInfo(loginUserIDRd);
        navigate("/admin");
      } else if (role === 1 || role === 0) {
        setLoginUserInfo(loginUserIDRd);
        navigate("/");
      }
    } else {
      navigate("/login"); // Optionally navigate to login if not logged in
    }
  };
  useEffect(() => {
    handleNavigate();
  }, [isLoggedIn]);
  const loginHandler = async (e) => {
    e.preventDefault();
    // try {
    //   const { data } = await axios.post(
    //     "/auth/login",
    //     { email, password }
    //   );
    //   localStorage.setItem("authToken", data.token);
    //   setTimeout(() => {
    //     navigate("/")
    //   }, 1800)
    // } catch (error) {
    //   setError(error.response.data.error);
    //   setTimeout(() => {
    //     setError("");
    //   }, 4500);
    // }
    dispatch(actions.login({ phone, password }));
  };

  return (
    <>
      <Header />
      <div className="Inclusive-login-page">
        <div className="login-big-wrapper">
          <div className="section-wrapper">
            <div className="top-suggest_register">
              <span>Bạn chưa có tài khoản? </span>
              <button onClick={() => navigate("/register")}>Đăng ký</button>
            </div>

            <div className="top-login-explain">
              <h2>Đăng nhập vào tài khoản </h2>

              <p>Hãy nhập thông tin, Cảm ơn!</p>
            </div>

            <form onSubmit={loginHandler}>
              {error && <div className="error_message">{error}</div>}
              <div className="input-wrapper">
                <input
                  type="text"
                  required
                  id="phone"
                  placeholder="+84"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  tabIndex={1}
                />
                <label htmlFor="email">Số điện thoại</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  required
                  id="password"
                  autoComplete="true"
                  placeholder="6+ ký tự"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  tabIndex={2}
                />
                <label htmlFor="password">Mật khẩu</label>
              </div>
              {/* <Link
                to="/forgotpassword"
                className="login-screen__forgotpassword"
              >
                {" "}
                Forgot Password ?
              </Link> */}
              <button type="submit">Đăng nhập</button>
            </form>
          </div>

          <div className="login-banner-section pb-1">
            <img src="login.png" alt="banner" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
