import { Outlet } from "react-router";
import Header from "../Header";

export default function Layout() {
  return (
    <div className="layout bg-[var(--color-dark-theme-background)]">
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
