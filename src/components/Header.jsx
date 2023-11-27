// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import header from "../assets/style/header.module.css";
// import { Outlet, Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// function Header({ account, setAccount, isAdmin, setIsAdmin }) {
//   // useEffect(() => {
//   //   setAccount(JSON.parse(localStorage.getItem("user")));
//   // }, []);

//   return (
//     <>
//       <nav className={header.nav}>
//         <div className={header.container}>
//           <div className={header.div}>
//             <div className="logo">
//               <img
//                 style={{ height: 70 }}
//                 src="https://images.squarespace-cdn.com/content/v1/5f1155b4bacb5b1f3bf222da/6177a13b-102e-4096-8480-4b1f54d1d653/IL-Quirky%2BHand+Drawn%2BFood%2BLogo%2BIcons.png"
//                 alt=""
//               />
//             </div>
//             <ul className={header.ul}>
//               <li className={header.li}>
//                 <Link to="/" style={{ color: "darkblue", fontWeight: "bold" }}>
//                   Home
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className={header.div}>
//             <ul className={header.ul}>
//               <li className={header.li}>
//                 {" "}
//                 <Link
//                   style={{ color: "darkblue", fontWeight: "bold" }}
//                   to="/login"
//                 >
//                   Login
//                 </Link>
//               </li>
//               <li className={header.li}>
//                 {" "}
//                 <Link
//                   to="/register"
//                   style={{ color: "darkblue", fontWeight: "bold" }}
//                 >
//                   Register
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//       <Outlet />
//     </>
//   );
// }

// export default Header;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import header from "../assets/style/header.module.css";

// function Header() {
//   const navigate = useNavigate();
//   let account = JSON.parse(localStorage.getItem("user"));
//   const handleLogout = () => {
//     // Additional logic for clearing user data if needed
//     // setAccount(null);
//     // setIsAdmin(false);
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <>
//       <nav className={header.nav}>
//         <div className={header.container}>
//           <div className={header.div}>
//             <div className="logo">
//               <img
//                 style={{ height: 70 }}
//                 src="https://images.squarespace-cdn.com/content/v1/5f1155b4bacb5b1f3bf222da/6177a13b-102e-4096-8480-4b1f54d1d653/IL-Quirky%2BHand+Drawn%2BFood%2BLogo%2BIcons.png"
//                 alt=""
//               />
//             </div>
//             <ul className={header.ul}>
//               <li className={header.li}>
//                 <Link to="/" style={{ color: "darkblue", fontWeight: "bold" }}>
//                   Home
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className={header.div}>
//             {account ? (
//               <>
//                 <ul className={header.ul}>
//                   <li className={header.li}>
//                     <Link
//                       style={{ color: "darkblue", fontWeight: "bold" }}
//                       to="/"
//                     >
//                       Welcome, {account.username}
//                     </Link>
//                   </li>
//                   <li className={header.li}>
//                     <Link
//                       style={{ color: "darkblue", fontWeight: "bold" }}
//                       to="/requests"
//                     >
//                       {/* {isAdmin ? "Admin" : "User"} */}
//                     </Link>
//                   </li>
//                   <li className={header.li}>
//                     <button
//                       style={{
//                         color: "darkblue",
//                         fontWeight: "bold",
//                         border: "none",
//                         background: "none",
//                         cursor: "pointer",
//                       }}
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </>
//             ) : (
//               <ul className={header.ul}>
//                 <li className={header.li}>
//                   <Link
//                     style={{ color: "darkblue", fontWeight: "bold" }}
//                     to="/login"
//                   >
//                     Login
//                   </Link>
//                 </li>
//                 <li className={header.li}>
//                   <Link
//                     to="/register"
//                     style={{ color: "darkblue", fontWeight: "bold" }}
//                   >
//                     Register
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Header;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import header from "../assets/style/header.module.css";

function Header({ onLogout, setAuthenticated }) {
  const navigate = useNavigate();

  return (
    <>
      <nav className={header.nav}>
        <div className={header.container}>
          <div className={header.div}>
            <ul className={header.ul}>
              {localStorage.getItem("user") && (
                <>
                  <li className={header.li}>
                    <Link
                      to="/"
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        listStyle: "none",
                        textDecoration: "none",
                        fontSize: "22px",
                      }}
                    >
                      Home
                    </Link>
                  </li>
                  <li className={header.li}>
                    <Link
                      to="/friends"
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        listStyle: "none",
                        textDecoration: "none",
                        fontSize: "22px",
                      }}
                    >
                      Friends
                    </Link>
                  </li>
                  <li className={header.li}>
                    <Link
                      to="/requests"
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        listStyle: "none",
                        textDecoration: "none",
                        fontSize: "22px",
                      }}
                    >
                      Requests
                    </Link>
                  </li>
                  <li className={header.li}>
                    <Link
                      to="/block"
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        listStyle: "none",
                        textDecoration: "none",
                        fontSize: "22px",
                      }}
                    >
                      Block List
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className={header.div}>
            <ul className={header.ul}>
              {localStorage.getItem("user") ? (
                <>
                  <li className={header.li}>
                    <button
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontSize: "22px",
                      }}
                      onClick={() => {
                        setAuthenticated(false);
                        localStorage.removeItem("user");
                        navigate("/login");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className={header.li}>
                    {" "}
                    <Link
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        listStyle: "none",
                      }}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className={header.li}>
                    {" "}
                    <Link
                      to="/register"
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        listStyle: "none",
                      }}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
