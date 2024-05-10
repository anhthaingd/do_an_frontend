import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import Header from "./components/generalScreen/Header";
import Footer from "./components/generalScreen/Footer";
import SubHeader from "./components/generalScreen/SubHeader";
import Football from "./pages/Football";
import LocationDetail from "./pages/LocationDetail";
import MyLocation from "./pages/MyLocation";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LayoutsWithHeader />}>
            <Route exact path="/bong-da" element={<Football />} />
            <Route exact path="/location/:id" element={<LocationDetail />} />
            <Route exact path="/my_location" element={<MyLocation />} />
            {/* <Route path="*" element={<NotFound />} />

            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
            </Route>

            <Route exact path="/story/:slug" element={<DetailStory />} />

            <Route exact path="/addstory" element={<PrivateRoute />}>
              <Route exact path="/addstory" element={<AddStory />} />
            </Route>

            <Route exact path="/profile" element={<PrivateRoute />}>
              <Route exact path="/profile" element={<Profile />} />
            </Route> */}

            {/* <Route exact path="/edit_profile" element={<PrivateRoute />}>
              <Route exact path="/edit_profile" element={<EditProfile />} />
            </Route> */}
            {/* <Route exact path="/" element={<Home />} /> */}

            <Route exact path="/change_Password">
              <Route
                exact
                path="/change_Password"
                // element={<ChangePassword />}
              />
            </Route>

            {/* <Route exact path="/story/:slug/like" element={<PrivateRoute />}>
              <Route exact path="/story/:slug/like" element={<DetailStory />} />
            </Route> */}

            {/* <Route exact path="/story/:slug/edit" element={<PrivateRoute />}>
              <Route exact path="/story/:slug/edit" element={<EditStory />} />
            </Route> */}

            <Route exact path="/story/:slug/delete">
              <Route
                exact
                path="/story/:slug/delete"
                // element={<DetailStory />}
              />
            </Route>
            <Route
              exact
              path="/story/:slug/addComment"
              // element={<PrivateRoute />}
            >
              <Route
                exact
                path="/story/:slug/addComment"
                // element={<DetailStory />}
              />
            </Route>

            {/* <Route exact path="/readList" element={<PrivateRoute />}>
              <Route exact path="/readList" element={<ReadListPage />} />
            </Route> */}
          </Route>

          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />

          <Route
            exact
            path="/forgotpassword"
            // element={<ForgotPasswordScreen />}
          />

          <Route
            exact
            path="/resetpassword"
            // element={<ResetPasswordScreen />}
          />
        </Routes>
      </div>
    </Router>
  );
}

const LayoutsWithHeader = () => {
  return (
    <>
      <Header />
      <SubHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
