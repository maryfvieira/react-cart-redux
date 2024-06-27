"use client";

import { UserState } from "@/global";
import { useSelector } from "@redux/store";
import React from "react";

function UserGreeting(user) {
  return <label>Bem vindo de volta ${user}</label>;
}

function GuestGreeting() {
  return <label>Olá visitante, seja bem vindo</label>;
}

function greetingFunc(){
  let user = {} as UserState | undefined;
  user = useSelector((state) => state.user);

  if (user?.isLogged) {
    return UserGreeting(user.data.firstName);
  }else{
    return GuestGreeting();
  }
}

//todo: remover usuario do reducer assim que o cookie for removido
const Navbar = () => {
  let user = {} as UserState | undefined;
  user = useSelector((state) => state.user);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-4">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
       
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Shopping Cart
              </a>
            </li>
            <li className="nav-item">
              {user?.isLogged ? (
                <a className="nav-link" href="/logout">
                  Logout
                </a>
              ) : (
                <a className="nav-link" href="/login">
                  Login
                </a>
              )}
            </li>
          </ul>
          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
