import React, { useState } from "react";

function Header() {
  return (
    <div>
      <nav class="navbar bg-danger navbar-expand-lg">
        <a class = "navbar-brand h1">Pathways</a>
        <ul class = "navbar-nav ml-auto">
          <li class = "nav-item">
            <a class="navbar-brand mb-0 h1 text-right">GPD name</a>
          </li>
          <li class = "nav-item">
            <a class = "nav-link" href = "/" style = {{"color": "inherit"}}>
              <i class="large material-icons ">account_box</i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
