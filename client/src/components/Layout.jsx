import React from "react";
import { Outlet } from "react-router";
import NavBar from "./ui/NavBar";

export default function Layout({ user, logoutHandler }) {
  return (
    <>
      <header>
        <NavBar user={user} logoutHandler={logoutHandler}/>
      </header>
      <main>
        <Outlet />
      </main>

    </>
  );
}