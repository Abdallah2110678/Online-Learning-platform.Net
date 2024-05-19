import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const Aside_Admin = () => {
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
    <Link to="/">
      <span className="iconn">
        <ion-icon name="logo-apple"></ion-icon>
      </span>
      <span className="title">e-learning</span>
    </Link>
  </li>
  <li onClick={handleMouseOver}>
    <Link to="/">
      <span className="iconn">
        
      </span>
      <span className="title">Home</span>
    </Link>
  </li>
  <li onClick={handleMouseOver}>
    <Link to="/admin/dashboard">
      <span className="iconn">
        
      </span>
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
    <Link to="/admin/allusers">
      <span className="iconn">
        <ion-icon name="home-outline"></ion-icon>
      </span>
      <span className="title">All Users</span>
    </Link>
  </li>
  <li onClick={handleMouseOver}>
    <Link to="/admin/students">
      <span className="iconn">
        <ion-icon name="home-outline"></ion-icon>
      </span>
      <span className="title">Students</span>
    </Link>
  </li>
  <li onClick={handleMouseOver}>
    <Link to="/admin/student-add">
      <span className="iconn">
        <ion-icon name="home-outline"></ion-icon>
      </span>
      <span className="title">Add Student</span>
    </Link>
  </li>
  <li onClick={handleMouseOver}>
    <Link to="/admin/instructors">
      <span className="iconn">
        <ion-icon name="home-outline"></ion-icon>
      </span>
      <span className="title">Instructors</span>
    </Link>
  </li>
  <li onClick={handleMouseOver}>
    <Link to="/admin/instructor-add">
      <span className="iconn">
        <ion-icon name="home-outline"></ion-icon>
      </span>
      <span className="title">Add Instructor</span>
    </Link>
  </li>
  <li onClick={handleMouseOver}>
    <Link to="/">
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

export default Aside_Admin;
