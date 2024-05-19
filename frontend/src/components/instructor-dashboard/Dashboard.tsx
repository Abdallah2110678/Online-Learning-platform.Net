import React, { useState } from 'react';
import "./style.css"
import ReactApexChart from 'react-apexcharts';

function ApexChartt() {
  const series = [30, 20, 15]; 

  const options = {
    chart: {
      height: 350,
      type: 'pie', 
    },
    labels: ['SWE', 'INF', 'ASWE'], 
    colors: ['#77B6EA', '#545454', '#FF5733'], 
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  };
  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="pie" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}


function ApexChart() {
  const series = [
    {
      name: "Student",
      data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
      name: "Instractor",
      data: [12, 11, 14, 18, 17, 13, 13]
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'pie',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Increase accounts ',
      align: 'left'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], 
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Accounts '
      },
      min: 5,
      max: 40
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}




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
            <ion-icon name="menu-outline"></ion-icon>
          </div>
          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>

          <div className="user">
           
          </div>
        </div>

        <div class="cardBox">
                <div class="card">
                    <div>
                        <div class="numbers">1,504</div>
                        <div class="cardName">Course Enrollment</div>
                    </div>
                    <div class="iconBx">
                        <ion-icon name="eye-outline"></ion-icon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">25</div>
                        <div class="cardName">Courses</div>
                    </div>

                    <div class="iconBx">
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                    </div>
                </div>

                <div class="card">
                    <div>
                        <div class="numbers">$7,842</div>
                        <div class="cardName">Total Income</div>
                    </div>

                    <div class="iconBx">
                        <ion-icon name="cash-outline"></ion-icon>
                    </div>
                </div>
            </div>

        <div className="details">
          <div className="recentCustomers">
            <div className="cardHeader">
              <h2>Most Courses Enrolled</h2>
            </div>
            <ApexChartt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
