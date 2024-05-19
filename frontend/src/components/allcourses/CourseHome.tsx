import React, { useEffect, useState } from "react";
import Back from "../common/back/Back";
import CoursesCard from "./CoursesCard";
import OnlineCourses from "./OnlineCourses";
import { REST_API_BASE_URL } from "./../../App";
import axios from "axios";
const CourseHome = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    console.log(courses);
  }, []);
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${REST_API_BASE_URL}/instructor/allcourse`
      );
      const courseData = response.data;
      // For each course, fetch the number of students enrolled
      const coursesWithStudentCount = await Promise.all(
        courseData.map(async (course) => {
          const studentCountResponse = await axios.get(
            `${REST_API_BASE_URL}/instructor/course/${course.id}/students/count`
          );
          return { ...course, studentCount: studentCountResponse.data };
        })
      );
      setCourses(coursesWithStudentCount);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `${REST_API_BASE_URL}/student/search?title=${searchQuery}`
        );
        const courseData = response.data;
        // For each course, fetch the number of students enrolled
        const coursesWithStudentCount = await Promise.all(
          courseData.map(async (course) => {
            const studentCountResponse = await axios.get(
              `${REST_API_BASE_URL}/instructor/course/${course.id}/students/count`
            );
            return { ...course, studentCount: studentCountResponse.data };
          })
        );
        setCourses(coursesWithStudentCount);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <Back title="Explore Courses" />
      <div className="container d-flex justify-content-center mt-5">
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="form-control"
              placeholder="Search by title..."
            />
          </div>
          <div className="col-md-4">
            <button onClick={handleSearch} className="btn btn-primary mx-2">
              Search
            </button>
            <button onClick={fetchCourses} className="btn btn-secondary">
              All Course
            </button>
          </div>
        </div>
      </div>
      <CoursesCard courses={courses} />
      {/* <OnlineCourses /> */}
    </>
  );
};

export default CourseHome;
