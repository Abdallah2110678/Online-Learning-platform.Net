import React, { useContext, useEffect, useState } from "react"
import Back from "../common/back/Back"
import { useParams } from "react-router-dom"
import axios from "axios";
import { REST_API_BASE_URL } from "../../App";
import { Store } from "../../store";



const Enrolle = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const {id} = useParams();
  const [course, setCourse] = useState([]);

  const handleCourseFetch = async () => {
    try {
      const response = await axios.get( `${REST_API_BASE_URL}/instructor/course/${id}`
      );
      const courseData = response.data;
      setCourse(courseData);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    handleCourseFetch();
  }, []);

  const handleEnrollClick = async () => {
     if(userInfo.role != "STUDENT"){
      alert("Student only can Add to cart");
      return;}
      else{
        try {
          const response = await axios.post(`${REST_API_BASE_URL}/student/enroll/${userInfo.id}/${course.id}`);
          alert(response.data)
        } catch (error) {
          alert(error.response.data);
          console.error('Error enrolling in course:', error);
        }
      }
    
  };
  return (
    <section>
    <Back title='Enrolle' />

    <div className="container m-5">
      
      <ul className="list-group">
        {course &&(  <li key={course.id} className="list-group-item">
            <strong>Title:</strong> {course.title}<br />
            <strong>By:</strong> <br />
            <strong>Price:</strong> ${course.price}<br />
          </li>)}
        
        
      </ul>
      <button className="btn btn-primary m-5" onClick={handleEnrollClick}>Enroll</button>
    </div>

    </section>
  )
}

export default Enrolle
