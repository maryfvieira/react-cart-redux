 "use client";

import { UserState } from "@/global";
import { useSelector } from "@redux/store";
import React from "react";
import {getCurrentUser} from "@/lib/session";

import ButtonLogout from "@/components/ButtonLogout"
import Link from "next/link";

function UserGreeting(user) {
  return <label>Bem vindo de volta ${user}</label>;
}

function GuestGreeting() {
  return <label>Olá visitante, seja bem vindo</label>;
}

// function greetingFunc(){
//   let user = {} as UserState | undefined;
//   user = useSelector((state) => state.user);

//   if (user?.isLogged) {
//     return UserGreeting(user.data.firstName);
//   }else{
//     return GuestGreeting();
//   }
// }

//todo: remover usuario do reducer assim que o cookie for removido
export default async function Navbar(){

  const user = await getCurrentUser();

  // let user = {} as UserState | undefined;
  // user = useSelector((state) => state.user);

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
              {user ? (
                <a className="nav-link" href="/logout">
                   Olá, {user.firstName}. Bem vindo(a)!
                  	<ButtonLogout />
                </a>
              ) : (
                 <Link className="nav-link" href="/signin">Logar</Link>
              )}
            </li>
          </ul>
          
        </div>
      </nav>
    </>
  );
};


