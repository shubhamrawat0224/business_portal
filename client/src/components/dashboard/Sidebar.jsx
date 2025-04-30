import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // Create this CSS file for styles

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-header">
      <div className="avatar"></div>
      <div>
        <div className="sidebar-user">Maharram</div>
        <div className="sidebar-phone">+998 (99) 436-46-15</div>
      </div>
    </div>
    <nav className="sidebar-nav">
      <NavLink to="/dashboard" end>
        Dashboard
      </NavLink>
      <NavLink to="/dashboard/orders">Orders</NavLink>
      <NavLink to="/dashboard/rides">Rides</NavLink>
      <NavLink to="/dashboard/clients">Clients</NavLink>
      <NavLink to="/dashboard/drivers">Drivers</NavLink>
      <NavLink to="/dashboard/shift">Shift</NavLink>
      <NavLink to="/dashboard/live-map">Live map</NavLink>
      <NavLink to="/dashboard/car-classes">Car classes</NavLink>
      <NavLink to="/dashboard/branches">Branches</NavLink>
      <NavLink to="/dashboard/moderators">Moderators</NavLink>
      <NavLink to="/dashboard/settings">Settings</NavLink>
    </nav>
  </div>
);

export default Sidebar;
