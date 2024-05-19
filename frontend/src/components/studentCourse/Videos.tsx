import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import { REST_API_BASE_URL } from "../../App";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

const Videos = () => {

  const { id } = useParams();
  const [selectedVideo, setSelectedVideo] = useState();
  const [course, setCourse] = useState([{}]);
  const [courseName, setCourseName] = useState("");


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${REST_API_BASE_URL}/student/course/${id}`
        );
        setCourse(response.data.courseMaterials);
        setCourseName(response.data.title);
        console.log(response.data.courseMaterials);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);
  // Function to handle video selection
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

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
            <Link to="/student/mycourses" className="btn btn-dark mb-3">
              Back
            </Link>

            <div>
              <h1>{courseName}</h1>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 2 }}>
                  {/* Left side - Display selected video */}

                  {selectedVideo && (
                    <video controls width="400" height="300">
                      <source
                        src={`${REST_API_BASE_URL}/instructor/play/${id}/${selectedVideo}`}
                      />
                    </video>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  {/* Right side - Table of videos */}

                  <table className="table table-hover text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Watch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.length === 0 ? (
                        <tr>
                          <td colSpan="6">Videos not found</td>
                        </tr>
                      ) : (
                        course.map((video, index) => (
                          <tr key={video.id}>
                            <td>{index + 1}</td>
                            <td>{video.title}</td>
                            <td>
                              {/* Button to select video */}
                              
                              <button className="btn"
                          onClick={() => handleVideoSelect(video.id)}>
                          <FontAwesomeIcon icon={faEye} />
                            </button>
                            
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}*/}
        </div>
      </div>
    </div>
  );
};

//     const GetAllVideo =()=>{
//         return axios.get(`${REST_API_BASE_URL}/instructor`);
//     }

//     const [data,setData] =useState([]);
//     const [loading,setLoading] = useState(false);
//     const getAllFile = async ()=>
//     {
//         try {
//             const response=await GetAllVideo();
//         setData(response.data);
//         setLoading(true);

//         } catch (error) {
//             alert(error.message)
//             console.log(error);

//         }
//     }

//     useEffect(()=>{
//         getAllFile();
//     },[])

//     return (
//         <>
//         <Container>

//                 <video controls>
//                     <source src={`${REST_API_BASE_URL}/instructor/play/1/1`}>
//                     </source>
//                 </video>

//         </Container>
//         </>
//     )
// }

export default Videos;
