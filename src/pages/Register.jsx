import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../Css/Register.css";
import Header from "../components/generalScreen/Header";
import Footer from "../components/generalScreen/Footer";
import { apiRegister } from "../services/auth";
import * as actions from "../store/actions";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { Button, Flex, Form, Radio, Input, Select } from "antd";
const Register = () => {
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState(0);
  const [isRegister, setIsReegister] = useState(location.state?.flag);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleChangeRole = (event) => {
    setRole(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);
  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 8000);
      return setError("Passwords do not match");
    }
    dispatch(
      actions.register({
        username,
        email,
        password,
        firstName,
        lastName,
        role,
        phone,
        address,
      })
    );

    // const response = await apiRegister({ username, email, password });
    // console.log(response);

    // try {
    //   const { data } = await axios.post(
    //     "/auth/register",
    //     {
    //       username,
    //       email,
    //       password,
    //     }
    //   );

    //   localStorage.setItem("authToken", data.token);

    //   setTimeout(() => {
    //     navigate('/');
    //   }, 1800)

    // } catch (error) {

    //   setError(error.response.data.error);

    //   setTimeout(() => {
    //     setError("");
    //   }, 6000);
    // }
  };
  return (
    <div className="">
      <Header />
      <div className="Inclusive-register-page">
        <div className="register-big-wrapper">
          <div className="register-banner-section ">
            <img src="register.png" alt="banner" />
          </div>

          <div className="section-wrapper">
            <div className="top-suggest_login">
              <span> Have an account? </span>
              <button onClick={() => navigate("/login")}>Sign In</button>
            </div>

            <div className="top-register-explain">
              <h2>Welcome to my website </h2>
            </div>

            <form onSubmit={registerHandler}>
              {error && <div className="error_message">{error}</div>}
              <div className="input-wrapper">
                <input
                  type="text"
                  required
                  id="name"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="name">Username</label>
              </div>
              <div className="flex justify-between">
                <div className="input-wrapper">
                  <input
                    type="text"
                    required
                    id="name"
                    placeholder="Enter firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label htmlFor="name">First Name</label>
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    required
                    id="name"
                    placeholder="Enter lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label htmlFor="name">Last Name</label>
                </div>
              </div>

              <div className="input-wrapper">
                <input
                  type="email"
                  required
                  id="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  tabIndex={1}
                />
                <label htmlFor="email">E-mail</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  required
                  id="name"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="name">Phone Number</label>
              </div>

              <div className="input-wrapper">
                <input
                  type="password"
                  required
                  id="password"
                  autoComplete="true"
                  placeholder="6+ strong character"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  tabIndex={2}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div></div>
              <div className="input-wrapper">
                <input
                  type="password"
                  required
                  id="confirmpassword"
                  autoComplete="true"
                  placeholder="Confirm password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="confirmpassword">Confirm Password</label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  required
                  id="name"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="name">Address</label>
              </div>
              <div>
                <div className="ml-4">
                  <p style={{ color: "#646464" }} className="text-sm ">
                    Register as
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex justify-between items-center">
                      <input
                        id="radio-a"
                        name="radio-group"
                        type="radio"
                        value="0"
                        checked={role === 0}
                        onChange={handleChangeRole}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <p className="ml-2 pb-7">Player</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <input
                        id="radio-b"
                        name="radio-group"
                        type="radio"
                        value="1"
                        checked={role === 1}
                        onChange={handleChangeRole}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <p className="ml-2 pb-7">Manager</p>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>

      <div className="pt-60">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
