import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import TopDrivers from "./TopDrivers.jsx";
import OrdersTable from "./OrdersTable.jsx";
import StatsChart from "./StatsChart.jsx";
import KnowledgeBase from "./KnowledgeBase.jsx";
import "./Dashboard.css"; // Create this CSS file for styles

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2>
              Good morning, {user ? user.name : "User"}{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </h2>
            <span className="dashboard-message">you have 1 new message</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <KnowledgeBase />
        <div className="dashboard-content">
          <StatsChart />
          <TopDrivers />
        </div>
        <OrdersTable />
      </main>
    </div>
  );
};

export default Dashboard;
