import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { REST_API_BASE_URL } from "./../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faPlus,
  faEdit,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const MyCourses = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);



  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${REST_API_BASE_URL}/instructor/delete/course/${id}`);

      if (response.status === 200) {
        // setSuccessMessage(`Instractor deleted successfully`);

       // console.log("Instractor deleted successfully");
        
       // setInstractor(Instractor.filter((Student) => Student.id !== id));
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  const handleCourseFetch = async () => {
    try {
      const response = await axios.get(`${REST_API_BASE_URL}/instructor/courses/${id}`);
      const courseData = response.data;
      // For each course, fetch the number of students enrolled
      const coursesWithStudentCount = await Promise.all(courseData.map(async (course) => {
        const studentCountResponse = await axios.get(`${REST_API_BASE_URL}/instructor/course/${course.id}/students/count`);
        return { ...course, studentCount: studentCountResponse.data };
      }));
      setCourses(coursesWithStudentCount);
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
          <div style={{ padding: "5px" }}>
            {/* Your message alert */}
            <Link to="/instructor/createcourse" className="btn btn-dark mb-3">
              Add New Course
            </Link>

            <table className="table table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col"># Student</th>
                  <th scope="col"># Videos</th>
                  <th scope="col">Actions</th>
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
                      <td>{course.price === 0 ? "Free" : `$${course.price}`}</td>
                      <td>{course.category.name}</td>
                      <td>{course.studentCount}</td>
                      <td>
                      <Link
                          to={`/instructor/my-course/play/${course.id}`}
                           className="link-dark me-3"
                        >
                          {course.courseMaterials.length}
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
                     </td>
                      <td>
                        <Link
                          to={`/instructor/upload-video/${course.id}`}
                          className="link-dark me-3"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </Link>
                        <Link
                          to={`/admin/course-edit/${course.id}`}
                          className="link-dark me-3"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <button className="btn"
                          onClick={() => handleDelete(course.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
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
    </div>
  );
};

export default MyCourses;
