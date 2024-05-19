import React, { useState } from "react";
import { Link } from "react-router-dom";

const Aside_Instructor = () => {
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
      <div className={'navigation ${active ? "active" : ""}'}>
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
    <Link to="/">
      <span className="iconn"></span>
      <span className="title">Home</span>
    </Link>
  </li>
  <li onClick={handleMouseOver}>
    <Link to="/student/dashboard">
      <span className="iconn"></span>
      <span className="title">Dashboard</span>
    </Link>
  </li>
  <li onClick={handleMouseOver}>
    <Link to="#">
      <span className="iconn">
        <ion-icon name="people-outline"></ion-icon>
      </span>
      <span className="title">Courses</span>
    </Link>
  </li>
  <li onClick={handleMouseOver}>
    <Link to="/student/mycourses">
      <span className="iconn">
        <ion-icon name="people-outline"></ion-icon>
      </span>
      <span className="title">Mycourses</span>
    </Link>
  </li>
  <li onClick={handleMouseOver}>
    <Link to="#">
      <span className="iconn">
        <ion-icon name="log-out-outline"></ion-icon>
      </span>
      <span className="title">Log Out</span>
    </Link>
  </li>
</ul>
      </div>
    </div>
  );
};

export default Aside_Instructor;