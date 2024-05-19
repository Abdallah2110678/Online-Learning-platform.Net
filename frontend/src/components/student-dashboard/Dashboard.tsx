import React, { useState } from "react";
import "./style.css";

const Dashboard = () => {
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  };
  return (
    <div>
      {/* Main Content */}
      <div className={'main ${active ? "active" : ""}'}>
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

          <div className="user"></div>
        </div>

        <div class="cardBox">
          <div class="card">
            <div>
              <div class="numbers">5</div>
              <div class="cardName">Course Enrolled</div>
            </div>
            <div class="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>

          <div class="card">
            <div>
              <div class="numbers">2</div>
              <div class="cardName">Courses completed</div>
            </div>

            <div class="iconBx">
              <ion-icon name="chatbubbles-outline"></ion-icon>
            </div>
          </div>

          <div class="card">
            <div>
              <div class="numbers">$2</div>
              <div class="cardName">Certificates</div>
            </div>

            <div class="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
