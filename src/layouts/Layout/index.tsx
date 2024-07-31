import { Outlet } from "react-router";
import Sidebar from "../Sidebar";
import Header from "../Header";

import "./layout.style.css";

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
