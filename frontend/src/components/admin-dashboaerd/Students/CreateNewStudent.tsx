import { useState, useEffect } from "react";

import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {REST_API_BASE_URL} from "./../../../App";

const CreateNewStudent = () => {
  const [active, setActive] = useState(false);
  const toggleMenu = () => {
    setActive(!active);
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
      <div className="detailss ">
        <div className="recentOrderss">
          <div class="cardHeader">
            <h2>Create New Student</h2>
            <Link to="/admin/students" className="btn">
              All Students
            </Link>
          </div>
          <FormCreateStudent state="Add student" />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export const FormCreateStudent = ({ state }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [studentData, setStudentData] = useState({
    fname: "",
    lname: "",
    password: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    role: "STUDENT",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const emptyStudentData = () => {
    setStudentData({
      fname: "",
      lname: "",
      password: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
      role: studentData.role,
    });
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
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
            `${REST_API_BASE_URL}/user/check-email/${value}`
          );
          if (response.data) {
            error = "Email is already in use.";
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
    setStudentData({ ...studentData, [name]: value });
  };

  const validateEmptyFields = () => {
    let isEmpty = false;
    const newErrors = {};
    for (const key in studentData) {
      if (studentData.hasOwnProperty(key)) {
        if (!studentData[key].trim()) {
          newErrors[key] = "Field must not be empty.";
          isEmpty = true;
        } else {
          newErrors[key] = "";
        }
      }
    }
    setErrors({ ...errors, ...newErrors });
    return isEmpty;
  };

  const handleStudentCreation = () => {
    axios
      .post(`${REST_API_BASE_URL}/user/students/create`, studentData)
      .then((response) => {
        console.log("Student created:", response.data);
        setSuccessMessage("Student Added successfully.");
        emptyStudentData();
        NavigatePage();
      })
      .catch((error) => {
        console.error("Error creating student:", error);
      });
  };

  const NavigatePage = () => {
    const currentPath = location.pathname;
    if (currentPath === "/sign-up") {
      navigate("/login");
    } else {
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors && !validateEmptyFields()) {
      handleStudentCreation();
    }
  };
  return (
    <>
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
            value={studentData.fname}
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
            value={studentData.lname}
            onChange={handleChange}
          />
        </div>
        {errors.lname && (
          <div className="error text-danger">{errors.lname}</div>
        )}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={studentData.password}
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
            value={studentData.email}
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
            value={studentData.phone}
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
            value={studentData.gender}
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
            value={studentData.dob}
            onChange={handleChange}
          />
        </div>
        {errors.dob && <div className="error text-danger">{errors.dob}</div>}
        <button
          type="submit"
          className="btn "
          style={{ background: "#1eb2a6" }}
        >
          {state}
        </button>
        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}
      </form>
    </>
  );
};

export default CreateNewStudent;
