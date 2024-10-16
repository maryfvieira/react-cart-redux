
import { getProductService } from '@/hooks/container';
import { getAuthSession } from '@/lib/auth'
import { signOut } from 'next-auth/react';
import React, { useEffect } from "react";


const Navbar = async () => {

  const session = await getAuthSession();

  // useEffect(() => {
  //   if(session==undefined){
  //     signOut();
  //   }
  // })
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-4">
        <div>
        {session?.user ? <p>Olá {session?.user.firstName} seja bem vindo de volta</p> : ""}
          
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Shopping Cart
              </a>
            </li>
            <li className="nav-item">
              {session?.user ? (
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
