import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

const Sidebar = ({auth,cambiarHome, datosEmpresa, empresa}) => {
  
  return (
    <div >
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="/" className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light"></span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <i className=" fas fa-user text-white text-center"></i>

      </div>
      <div className="info">
        <a href="#" className="d-block">{auth.user.name}</a>
      </div>
    </div>
    {/* SidebarSearch Form */}
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        
            <li onClick={()=>cambiarHome("datos")} className="nav-item">
            <a href="#" className="nav-link">
                <i className="nav-icon fas fa-list-ul" />
                <p>
                Empresas
                </p>
            </a>
            </li>
       
            <li className="nav-item" onClick={()=>cambiarHome("none")}>
            <a href="#" className="nav-link">
               
                <i className="nav-icon fas fa-list-ul" />
                <p>
                Inicio
                </p>
                
            </a>
            </li>
        
        <li className="nav-header">FORMULARIOS</li>
      <li onClick={()=>cambiarHome("general")} className="nav-item">
          <a href="#" className="nav-link">
              <i className="nav-icon fas fa-edit" />
              <p>
              Formulario General
              </p>
          </a>
      </li>
      <li onClick={()=>cambiarHome("wizard")} className="nav-item">
          <a href="#" className="nav-link">
              <i className="nav-icon fas fa-bolt" />
              <p>
              Formulario Wizard
              </p>
          </a>
      </li>
      <li onClick={()=>cambiarHome("tools")} className="nav-item">
          <a href="#" className="nav-link">
              <i className="nav-icon fas fa-bolt" />
              <p>
              Configuraciones
              </p>
          </a>
      </li>
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>
</div>
  )
}

export default Sidebar