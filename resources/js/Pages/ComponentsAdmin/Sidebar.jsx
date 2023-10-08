import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaTools } from "react-icons/fa";

const Sidebar = ({ auth, cambiarHome, empresa, configuraciones }) => {
    return (
        <div>
            <aside
                className="main-sidebar sidebar-light-primary elevation-4 "
                style={{}}
            >
                {/* Brand Logo */}
                <a href="/" className="brand-link ">
                    <img
                        src={configuraciones.favicon}
                        alt="AdminLTE Logo"
                        className="brand-image img-circle elevation-10"
                        style={{ opacity: ".8" }}
                    />
                    <span className="brand-text font-weight-light">
                        {" "}
                        <a href="#" className="d-block">
                            {empresa.nombre}
                        </a>
                    </span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <i
                                className=" fas fa-user text-center"
                                style={{ color: configuraciones.color3 }}
                            ></i>
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">
                                {auth.user.name}
                            </a>
                        </div>
                    </div>
                    {/* SidebarSearch Form */}
                    <div className="form-inline">
                        <div
                            className="input-group"
                            data-widget="sidebar-search"
                        >
                            <input
                                className="form-control form-control-sidebar"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                style={{
                                    borderColor: "white", // Color de borde normal
                                    boxShadow: "initial", // Sombra normal
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor =
                                        configuraciones.color2; // Cambiar color de borde al enfocar
                                    e.target.style.boxShadow = "none"; // Eliminar sombra al enfocar
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "white"; // Restaurar color de borde cuando pierde el foco
                                }}
                            />
                            <div className="input-group-append  text-black">
                                <button
                                    className="btn btn-sidebar"
                                    style={{
                                        backgroundColor: configuraciones.color2,
                                        borderColor: "white",
                                    }}
                                >
                                    <i className="fas fa-search fa-fw  text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul
                            className="nav nav-pills nav-sidebar flex-column"
                            data-widget="treeview"
                            role="menu"
                            data-accordion="false"
                        >
                            <li
                                className="nav-item  "
                                onClick={() => cambiarHome("none")}
                            >
                                <div
                                    onMouseEnter={(e) => {
                                        e.target.style.color =
                                            configuraciones.color2;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = "black";
                                    }}
                                >
                                    <a
                                        href="#"
                                        className="nav-link bg-transparent "
                                    >
                                        <i className="nav-icon fas fa-list-ul" />
                                        <p>Inicio</p>
                                    </a>
                                </div>
                            </li>

                            <li className="nav-header">FORMULARIOS</li>
                            <li
                                onClick={() => cambiarHome("general")}
                                className="nav-item"
                            >
                                <div
                                    onMouseEnter={(e) => {
                                        e.target.style.color =
                                            configuraciones.color2;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = "black";
                                    }}
                                >
                                    <a
                                        href="#"
                                        className="nav-link  bg-transparent"
                                    >
                                        <i className="nav-icon fas fa-edit" />
                                        <p>Formulario General</p>
                                    </a>
                                </div>
                            </li>
                            <li
                                onClick={() => cambiarHome("wizard")}
                                className="nav-item"
                            >
                                <div
                                    onMouseEnter={(e) => {
                                        e.target.style.color =
                                            configuraciones.color2;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = "black";
                                    }}
                                >
                                    <a
                                        href="#"
                                        className="nav-link bg-transparent"
                                    >
                                        <i className="nav-icon fas fa-bolt" />
                                        <p>Formulario Wizard</p>
                                    </a>
                                </div>
                            </li>
                            <li
                                onClick={() => cambiarHome("tools")}
                                className="nav-item"
                            >
                                <div
                                    onMouseEnter={(e) => {
                                        e.target.style.color =
                                            configuraciones.color2;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = "black";
                                    }}
                                >
                                    <a
                                        href="#"
                                        className="nav-link bg-transparent"
                                    >
                                        <i className="nav-icon fas fa-tools" />
                                        <p>Configuraciones</p>
                                    </a>
                                </div>
                            </li>
                            <li
                                onClick={() => cambiarHome("redes")}
                                className="nav-item"
                            >
                                <div
                                    onMouseEnter={(e) => {
                                        e.target.style.color =
                                            configuraciones.color2;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = "black";
                                    }}
                                >
                                    <a
                                        href="#"
                                        className="nav-link  bg-transparent"
                                    >
                                        <i className="nav-icon  fa-solid fa-heart" />
                                        <p>Redes</p>
                                    </a>
                                </div>
                            </li>
                            <li
                                onClick={() => cambiarHome("posts")}
                                className="nav-item"
                            >
                                <div
                                    onMouseEnter={(e) => {
                                        e.target.style.color =
                                            configuraciones.color2;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = "black";
                                    }}
                                >
                                    <a
                                        href="#"
                                        className="nav-link  bg-transparent"
                                    >
                                        <i className="nav-icon  fa-solid fa-file" />
                                        <p>Posts</p>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </div>
    );
};

export default Sidebar;
