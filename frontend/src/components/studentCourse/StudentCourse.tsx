import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import  axios from "axios";
import { REST_API_BASE_URL } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faPlus,
  faEdit,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Store } from "../../store";

const StudentCourse = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [courses, setCourses] = useState([]);


  const handleCourseFetch = async () => {
    try {
      const response = await axios.get(
        `${REST_API_BASE_URL}/student/courses/enrolled/${userInfo.id}`
      );
      const courseData = response.data;
      console.log(courseData)
      console.log(userInfo.id)
      setCourses(courseData);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    handleCourseFetch();
  }, []);

  return (
    <div className={`main`}>
      <div className="topbar">
        <div className="toggle">
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <div className="search">
          <label>
            <input type="text" placeholder="Search here" />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>

        <div className="user">
          <img src="assets/imgs/customer01.jpg" alt="" />
        </div>
      </div>
      <div className="detailss ">
        <div className="recentOrderss">
        <div className="cardHeader">
            <h2>{userInfo.fname}`s Courses</h2>
          </div>

            <table className="table table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Athor</th>
                  <th scope="col">Category</th>
                  <th scope="col">Learn </th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="5">No courses found</td>
                  </tr>
                ) : (
                  courses.map((course, index) => (
                    <tr key={course.id}>
                      <td>{index + 1}</td>
                      <td> {course.title}</td>
                      <td>{course.user.fname} {course.user.fname}</td>
                      <td>{course.category.name}</td>
                      <td>
                      <Link
                          to={`/student/my-course/play/${course.id}`}
                           className="link-dark me-3"
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
                     </td>
                      
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}*/}
        </div>
      </div>
    
  );
};

export default StudentCourse;
