import React, { useState } from 'react';
import "./style.css"
import ReactApexChart from 'react-apexcharts';






const Dashboard = () => {
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  };
  return (
    <div>
      {/* Main Content */}
      <div className={`main ${active ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleMenu}>
            {/* <ion-icon name="menu-outline"></ion-icon> */}
          </div>
          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              {/* <ion-icon name="search-outline"></ion-icon> */}
            </label>
          </div>

          <div className="user">
           
          </div>
        </div>

        <div className="cardBox">
                <div className="card">
                    <div>
                        <div className="numbers">1,504</div>
                        <div className="cardName">Course Enrollment</div>
                    </div>
                    <div className="iconBx">
                        {/* <ion-icon name="eye-outline"></ion-icon> */}
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">25</div>
                        <div className="cardName">Courses</div>
                    </div>

                    <div className="iconBx">
                        {/* <ion-icon name="chatbubbles-outline"></ion-icon> */}
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">$7,842</div>
                        <div className="cardName">Total Income</div>
                    </div>

                    <div className="iconBx">
                        {/* <ion-icon name="cash-outline"></ion-icon> */}
                    </div>
                </div>
            </div>

        <div className="details">
          <div className="recentCustomers">
            <div className="cardHeader">
              <h2>Most Courses Enrolled</h2>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
