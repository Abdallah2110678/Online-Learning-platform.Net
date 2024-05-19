import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {REST_API_BASE_URL} from "./../../App";
import { Store } from "../../store";

const UploadVideo =()=>{
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
    const {id} =useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [fileTitle, setFileTitle] = useState(''); // added fileTitle state
    



    useEffect(() => {
        const timer = setTimeout(() => {
            setUploadMessage("");
        }, 4000);
        return () => clearTimeout(timer);
      }, [uploadMessage]);


    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
    
    const handleFileUpload = async () => {
      if (!selectedFile) {
        setUploadMessage('Please select a file.');
        return;
      }
    
      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append('title', fileTitle); // added file title to formData
    
      try {
        const response = await axios.post(`${REST_API_BASE_URL}/instructor/post/${id}`, formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
            setFileTitle("");
            setSelectedFile(null);
          },
        });
    
        setUploadMessage('Video uploaded successfully.');
      } catch (error) {
        console.error('Error uploading video:', error);
        setUploadMessage('Error uploading video. Please try again later.');
      }
    };
    
    return (
      <div className="main">
        <div className="details">
          <div className="recentOrders">
          <div className="cardHeader">
            <h2>Upload New video</h2>
            <Link to={`/instructor/my-course/play/${id}`} className="btn">
              Back To Videos
            </Link>
          </div>
          <form>
            <div className="mb-3">
              <label htmlFor="fileTitle" className="form-label">File Title:</label>
              <input
                type="text"
                className="form-control"
                id="fileTitle"
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fileInput" className="form-label">Choose File:</label>
              <input
                type="file"
                className="form-control"
                id="fileInput"
                accept="video/*"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFileUpload}
            >
              Upload
            </button>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-3">
                <p>Upload Progress: {uploadProgress}%</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${uploadProgress}%` }}
                    aria-valuenow={uploadProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            )}
             {uploadMessage && <div className="alert alert-success mt-3">{uploadMessage}</div>}
          </form>
        </div>
      </div>
        </div>
      
     
    );
    }



export default UploadVideo
