import "./App.css";
import Header from "./components/common/header/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "./store";
import ProtectedRoute from "./ProtectedRoute";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import SIGNUP from "./components/sign-up/Sign-up";
import LOGIN from "./components/Log-in/Log-in";
import UserProfile from "./components/UserProfile/userProfile";

import Aside_Instructor from "./components/common/asidebar-instructor/asidebar";
import Aside_Student from "./components/common/asidebar-student/asidebar";

import DASHBOARD from "./components/instructor-dashboard/Dashboard";

import Aside_Admin from "./components/common/asidebar-admin/asidebar";
import Dashboard from "./components/admin-dashboaerd/Dashboard";
import EditFormStudent from "./components/admin-dashboaerd/Students/EditFormStudent";
import AllStudents from "./components/admin-dashboaerd/Students/AllStudent";
import AllUsers from "./components/admin-dashboaerd/Users/AllUsers";
import CreateNewStudent from "./components/admin-dashboaerd/Students/CreateNewStudent";

import All_Instructor from "./components/admin-dashboaerd/Instructor/All_Instructor";
import CreateNewInstructor from "./components/admin-dashboaerd/Instructor/CreateNewInstructor";
import EditFormInstructor from "./components/admin-dashboaerd/Instructor/EditFormInstructor";
import CreateCourse from "./components/course/AddCourse";
import AllCourses from "./components/course/AllCourses";
import UploadVideo from "./components/course/UploadVideo";
import MyCourses from "./components/course/MyCourses";
import Enrolle from "./components/enroll/Enrolle";
import StudentCourse from "./components/studentCourse/StudentCourse";
import Videos from "./components/studentCourse/Videos";

export const REST_API_BASE_URL = "http://localhost:9090/api";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      {" "}
      <Router>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <Routes>
              <Route
                path="/admin"
                element={
                  <ProtectedRoute
                    element={
                      <>
                        <Aside_Admin />
                        <Outlet />
                      </>
                    }
                    allowedRoles={["ADMIN"]}
                  />
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="allusers" element={<AllUsers />} />
                <Route path="students" element={<AllStudents />} />
                <Route path="student-add" element={<CreateNewStudent />} />
                <Route path="student-edit/:id" element={<EditFormStudent />} />
                <Route path="instructors" element={<All_Instructor />} />
                <Route
                  path="instructor-add"
                  element={<CreateNewInstructor />}
                />
                <Route
                  path="instructor-edit/:id"
                  element={<EditFormInstructor />}
                />
              </Route>
              <Route
                path="/student"
                element={
                  <ProtectedRoute
                    element={
                      <>
                        <Aside_Student />
                        <Outlet />
                      </>
                    }
                    allowedRoles={["STUDENT"]}
                  />
                }
              >
                <Route path="dashboard" element={<DASHBOARD />} />
                <Route path="mycourses" element={<StudentCourse />} />
                <Route path="my-course/play/:id" element={<Videos />} />
              </Route>

              <Route
                path="/instructor"
                element={
                  <ProtectedRoute
                    element={
                      <>
                        <Aside_Instructor />
                        <Outlet />
                      </>
                    }
                    allowedRoles={["INSTRUCTOR"]}
                  />
                }
              >
                <Route path="dashboard" element={<DASHBOARD />} />
                <Route path="createcourse" element={<CreateCourse />} />
                <Route path="my-course/play/:id" element={<AllCourses />} />
                <Route path="upload-video/:id" element={<UploadVideo />} />
                <Route path="my-courses/:id" element={<MyCourses />} />
              </Route>

              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Outlet />
                    <Footer />
                  </>
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<CourseHome />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sign-up" element={<SIGNUP />} />
                <Route path="/login" element={<LOGIN />} />
                <Route path="/userProfile" element={<UserProfile />} />
                <Route path="/enroll/:id" element={<Enrolle />} />
              </Route>
            </Routes>
          </StoreProvider>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
