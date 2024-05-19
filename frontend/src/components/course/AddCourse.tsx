import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { REST_API_BASE_URL } from "./../../App";
import { Store } from "../../store";

const CreateCourse = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    tags: "",
    price: "",
    categoryId: "", // Assuming categoryId is the ID of the category for the course
  });

  // Define predefined categories directly in the frontend
  const [categories, setCategories] = useState([
    { id: 1, name: "Computer Science" },
    { id: 2, name: "UI/UX Design" },
    { id: 3, name: "Art & Design" },
    { id: 4, name: "History & Archeology" },
    { id: 5, name: "Software Engineering" },
    { id: 6, name: "Information Software" },
    { id: 7, name: "Health & Fitness" },
    { id: 8, name: "Marketing" },
    { id: 9, name: "Graphic Design" },
    { id: 10, name: "Music" },
    { id: 11, name: "Business Administration" },
    { id: 12, name: "Web Management" },
    // Add more categories as needed
  ]);
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "title":
        return !value.trim() ? "Title is required." : "";
      case "description":
        return !value.trim() ? "Description is required." : "";
      case "tags":
        return !value.trim() ? "Tags are required." : "";
      case "price":
        return isNaN(value) ? "Price must be a number." : "";
      case "categoryId":
        return !value ? "Category is required." : "";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    for (const key in courseData) {
      if (courseData.hasOwnProperty(key)) {
        formErrors[key] = validateField(key, courseData[key]);
      }
    }
    if (Object.values(formErrors).some((error) => error)) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await axios.post(
        `${REST_API_BASE_URL}/instructor/createcourse?categoryId=${courseData.categoryId}&useId=${userInfo.id}`,
        courseData
      );
      console.log("Course created:", response.data);
      setSuccessMessage("Course added successfully.");
      setCourseData({
        title: "",
        description: "",
        tags: "",
        price: "",
        categoryId: "",
      });
    } catch (error) {
      console.error("Error creating course:", error);
      // Handle specific errors or display a generic error message
    }
  };

  return (
    <div className="main">
      <div className="detailss">
        <div className="recentOrderss">
          <div className="cardHeader">
            <h2>Create New Course</h2>
            <Link to={`/instructor/my-courses/${userInfo.id}`} className="btn">
              All Courses
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={courseData.title}
                onChange={handleChange}
              />
              {errors.title && <div className="error text-danger">{errors.title}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleChange}
              />
              {errors.description && <div className="error text-danger">{errors.description}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Tags:
              </label>
              <input
                type="text"
                className="form-control"
                id="tags"
                name="tags"
                value={courseData.tags}
                onChange={handleChange}
              />
              {errors.tags && <div className="error text-danger">{errors.tags}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={courseData.price}
                onChange={handleChange}
              />
              {errors.price && <div className="error text-danger">{errors.price}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">
                Category:
              </label>
              <select
                className="form-select"
                id="categoryId"
                name="categoryId"
                value={courseData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <div className="error text-danger">{errors.categoryId}</div>}
            </div>
            <button type="submit" className="btn btn-primary">
              Add Course
            </button>
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
