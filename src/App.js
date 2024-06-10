import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import Header from "./components/generalScreen/Header";
import Footer from "./components/generalScreen/Footer";
import SubHeader from "./components/generalScreen/SubHeader";
import Football from "./pages/Football";
import LocationDetail from "./pages/LocationDetail";
import MyLocation from "./pages/MyLocation";
import LocationPage from "./pages/LocationPage";
import { items } from "./utils/sport";
import Sport from "./pages/Sport";
import AdminPage from "./pages/AdminPage";
import Group from "./pages/Group";
import Home from "./components/generalScreen/Home";
import AllGroup from "./pages/AllGroup";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { ChatProvider } from "./context/ChatContext";
import UserChat from "./components/chat/UserChat";
import PrivateChat from "./components/chat/PrivateChat";
import Map from "./components/map/Map";
import ListMatch from "./components/ListMatch";
import PostList from "./components/profile/PostList";
import About from "./components/profile/About";
import History from "./components/profile/History";
import LivingPlace from "./components/profile/about/LivingPlace";
import Overview from "./components/profile/about/Overview";
import Contact from "./components/profile/about/Contact";
import Job from "./components/profile/about/Job";
import FindPlayer from "./pages/FindPlayer";
function App() {
  const role = localStorage.getItem("role");
  return (
    <ChatProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LayoutsWithHeader />}>
              {/* <Route exact path="/bong-da" element={<Football />} /> */}
              {items.map((item) => (
                <Route
                  key={item.id}
                  exact
                  path={`/${item.path}`}
                  element={<Sport sportDetail={item} />}
                />
              ))}
              <Route exact path="/" element={<Home />} />
              {/* <Route exact path="/location/:id" element={<LocationPage />} /> */}
              <Route exact path="/my_location" element={<MyLocation />} />
              <Route exact path="/location" element={<LocationPage />}>
                <Route exact path=":id" element={<LocationDetail />} />
                <Route exact path=":id/booking" element={<ListMatch />} />
              </Route>
              <Route exact path="/group/:id" element={<Group />} />
              <Route exact path="/groups" element={<AllGroup />} />
              <Route exact path="/search" element={<FindPlayer />} />
              <Route exact path="/profile" element={<Profile />}>
                <Route exact path=":id" element={<PostList />} />
                <Route exact path=":id/about" element={<About />}>
                  <Route path="" element={<Navigate to="overview" replace />} />
                  <Route exact path="living" element={<LivingPlace />} />
                  <Route exact path="overview" element={<Overview />} />
                  <Route exact path="contact" element={<Contact />} />
                  <Route exact path="job" element={<Job />} />
                </Route>
                <Route exact path=":id/history" element={<History />} />
              </Route>
              <Route exact path="/map" element={<Map />} />
              <Route exact path="/change_Password">
                <Route
                  exact
                  path="/change_Password"
                  // element={<ChangePassword />}
                />
              </Route>

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
            <Route exact path="/admin" element={<AdminPage />} />

            <Route path="/chat" element={<Chat />}>
              <Route exact path=":id" element={<PrivateChat />} />
            </Route>
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
    </ChatProvider>
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
