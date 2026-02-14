import { Outlet } from "react-router";
import AppNavbar from "../AppNavbar/AppNavbar";

export default function Layout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}
