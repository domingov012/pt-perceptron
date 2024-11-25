import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios, { Axios } from "axios";
import Task from "../components/Task";

export default function RootLayout() {
  return (
    <>
      <div className="sidebar">
        <h1>TODO PERCEPTRON</h1>
        <ul>
          <Link to="/dashboard">Home</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/epics">Epics</Link>
          <Link to="/epics">In Progress</Link>
        </ul>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}
