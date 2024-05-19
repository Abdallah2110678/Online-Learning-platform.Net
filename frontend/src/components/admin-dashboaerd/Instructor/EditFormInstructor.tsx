import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {REST_API_BASE_URL} from "../../../App"
const EditFormInstructor = () => {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [InstructorInfo, setInstructorInfo] = useState({});

  const [InstructorData, setInstructorData] = useState({
    fname: "",
    lname: "",
    password: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    password: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
  });

  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const validateEmptyPassword = () => {
    if (!InstructorData.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must not be empty.",
      }));
      return true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
      return false;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setInstructorData({ ...InstructorData, [name]: value });
    let error = "";

    switch (name) {
      case "fname":
      case "lname":
        if (!value.trim() || value.length < 3 || !/^[a-zA-Z]+$/.test(value)) {
          error =
            "Name must be non-empty, contain only characters, and be at least 3 characters long.";
        }
        break;
      case "password":
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}/.test(value)) {
          error =
            "Password must contain at least one digit, one lowercase and one uppercase character, and be at least 3 characters long.";
        }
        break;
      case "phone":
        if (!/^\d{11}$/.test(value)) {
          error = "Phone number must be a valid 11-digit number.";
        }
        break;
      case "gender":
        if (!value) {
          error = "Gender is required.";
        }
        break;
      case "dob":
        const currentDate = new Date();
        const selectedDate = new Date(value);
        const age = currentDate.getFullYear() - selectedDate.getFullYear();
        if (age < 15) {
          error = "You must be at least 15 years old.";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email address.";
          break;
        }
        try {
          const response = await axios.get(
            `${REST_API_BASE_URL}/user/check-email/instructor/${value}`
          );
          if (response.data && response.data.id != id) {
            error = "Email is already in use.";
            console.log(response.data.id !== id);
            console.log(response.data.id);
            console.log(id);
          } else {
            error = ""; // Reset error if the email belongs to the current user
          }
        } catch (error) {
          console.error("Error checking email:", error);
          // Handle error (e.g., show an error message)
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
    setInstructorData({ ...InstructorData, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REST_API_BASE_URL}/user/instructor/${id}`);
        const updatedInstructorData = { ...response.data, password: "" };
        setInstructorData(updatedInstructorData);
        setInstructorInfo(updatedInstructorData);
      } catch (error) {
        console.error("Error fetching Instructor data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInstructorUpdate = () => {
    axios
      .put(`${REST_API_BASE_URL}/user/instructors/update/${id}`, InstructorData)
      .then((response) => {
        console.log("Instructor updated successfully:", response.data);
        setSuccessMessage(
          `update Instructor ${InstructorData.fname}  ${InstructorData.lname} in the system system.`
        );
        setInstructorInfo(InstructorData);
      })
      .catch((error) => {
        console.error("Error updating Instructor:", error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors && !validateEmptyPassword()) {
      handleInstructorUpdate();
    }
  };

  return (
    <div className={`main ${active ? "active" : ""}`}>
      <div className="topbar">
        <div className="toggle" onClick={toggleMenu}>
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
      <div className="details">
        <div class="recentOrders">
          <div class="cardHeader">
            <h2>Edit Instructor {InstructorInfo.fname}</h2>
            <Link to="/admin/Instructors" className="btn">
              All Instructors
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="fname"
                value={InstructorData.fname}
                onChange={handleChange}
              />
            </div>
            {errors.fname && (
              <div className="error text-danger">{errors.fname}</div>
            )}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lname"
                value={InstructorData.lname}
                onChange={handleChange}
              />
            </div>
            {errors.lname && (
              <div className="error text-danger">{errors.lname}</div>
            )}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={InstructorData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <div className="error text-danger">{errors.password}</div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={InstructorData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <div className="error text-danger">{errors.email}</div>
            )}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone:
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={InstructorData.phone}
                onChange={handleChange}
              />
            </div>
            {errors.phone && (
              <div className="error text-danger">{errors.phone}</div>
            )}
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender:
              </label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={InstructorData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {errors.gender && (
              <div className="error text-danger">{errors.gender}</div>
            )}
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth:
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={InstructorData.dob}
                onChange={handleChange}
              />
            </div>
            {errors.dob && (
              <div className="error text-danger">{errors.dob}</div>
            )}
            <button type="submit" className="btn btn-primary">
              Update Instructor
            </button>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
          </form>
        </div>
        <Ins InstructorData={InstructorInfo} />
      </div>
    </div>
  );
};

const Ins = ({ InstructorData }) => {
  const { fname, lname, phone, email } = InstructorData;
  const { id } = useParams();
const [courses, setCourses] = useState([]);

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
  <div className="recentCustomerss">
    <div className="card">
      <div className="card-header">
        <h2>Instructor Info</h2>
      </div>
      <div className="card-body">
        <p>
          <strong>First Name:</strong> {fname}
        </p>
        <p>
          <strong>Last Name:</strong> {lname}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <div>
          <h2>Courses</h2>
          <ul className="list-group">
            {courses.length !== 0 ? (
              courses.map((course, index) => (
                <li key={course.id} className="list-group-item">
                  <strong>{index + 1}-</strong> {course.title} <br />
                  <strong>Category:</strong> {course.category.name} <br />
                  <strong>Price:</strong> {course.price === 0 ? "Free" : `$${course.price}`} <br />
                  <strong>Number of Students Enrolled:</strong> {course.studentCount}
                </li>
              ))
            ) : (
              <li className="list-group-item">The Instructor has not created any courses</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EditFormInstructor;
