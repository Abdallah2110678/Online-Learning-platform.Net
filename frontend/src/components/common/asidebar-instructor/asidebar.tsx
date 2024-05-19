import React, { useContext, useState } from "react";
import { Store } from "../../../store";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Aside_Instructor = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  };

  const handleMouseOver = (e) => {
    const listItems = document.querySelectorAll(".navigation li");
    listItems.forEach((item) => {
      item.classList.remove("hovered");
    });
    e.target.classList.add("hovered");
  };

  return (
    <div>
      {/* Navigation */}
      <div className={`navigation ${active ? "active" : ""}`}>
        <ul>
          <li onClick={handleMouseOver}>
            <Link to="#">
              <span className="iconn">
                <ion-icon name="logo-apple"></ion-icon>
              </span>
              <span className="title">e-learning</span>
            </Link>
          </li>
          <li onClick={handleMouseOver}>
            <Link to="/instructor/dashboard">
              <span className="iconn"></span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li onClick={handleMouseOver}>
            <Link to="#">
              <span className="iconn">
                <ion-icon name="document-text-outline"></ion-icon>
              </span>
              <span className="title">Profile</span>
            </Link>
          </li>
          <li onClick={handleMouseOver}>
            <Link to="/instructor/createcourse">
              <span className="iconn">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Add Course</span>
            </Link>
          </li>
          <li onClick={handleMouseOver}>
            <Link to={`/instructor/my-courses/${userInfo.id}`}>
              <span className="iconn">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Courses</span>
            </Link>
          </li>

          <li onClick={handleMouseOver}>
          
              <Link  onClick={() => signoutHandler()}>
              <span className="iconn">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Log Out</span></Link>
            
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aside_Instructor;
