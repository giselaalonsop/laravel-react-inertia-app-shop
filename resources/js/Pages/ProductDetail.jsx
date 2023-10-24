import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
    MDBRipple,
    MDBCardTitle,
} from "mdb-react-ui-kit";
import { NavDropdown, Nav } from "react-bootstrap";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { MdShoppingCart } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function ProductDetail({ producto, configuracion, empresa, auth }) {
    const {
        nombre,
        descripcion,
        precio,
        imagen1,
        imagen2,
        imagen3,
        multimedia,
    } = producto;
    const settingsY = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 4,
    };
    document.title = empresa && empresa.nombre;
    if (configuracion && configuracion.favicon) {
        const favicon =
            document.querySelector("link[rel*='icon']") ||
            document.createElement("link");
        favicon.type = "image/x-icon";
        favicon.rel = "icon";
        favicon.href = configuracion.favicon;
        document.getElementsByTagName("head")[0].appendChild(favicon);
    }
    const handleLogout = () => {
        window.location.href = "/";
    };

    return (
        <div>
            <header
                className="p-3  "
                style={{ backgroundColor: configuracion.color1 }}
            >
                <div>
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a
                            href="/"
                            className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
                        >
                            <img
                                src={configuracion.logo}
                                className="bi me-2"
                                width={180}
                                height={120}
                                role="img"
                                aria-label="Bootstrap"
                            />
                            <use xlinkHref="#bootstrap" />
                        </a>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li>
                                <a
                                    href="#"
                                    className="nav-link px-2 link-body-emphasis text-gray-900 hover:text-gray-900 dark:text-gray-400 dark:hover:text-red focus:outline focus:outline-2 focus:rounded-sm "
                                    style={{
                                        color: configuracion.color3,
                                    }}
                                >
                                    Principal
                                </a>
                            </li>

                            <li>
                                <a
                                    style={{
                                        color: configuracion.color3,
                                    }}
                                    href={route("Galeria")}
                                    className="nav-link px-2 link-body-emphasis text-gray-900 hover:text-gray-900 dark:text-gray-400 dark:hover:text-red focus:outline focus:outline-2 focus:rounded-sm "
                                >
                                    Galeria
                                </a>
                            </li>

                            <li className="text-gray-800">
                                <NavDropdown
                                    className="text-dark "
                                    title={
                                        <a
                                            className="text-gray-600 "
                                            style={{
                                                color: configuracion.color3,
                                            }}
                                        >
                                            Categorias
                                        </a>
                                    }
                                    active
                                    id="collasible-nav-dropdown"
                                >
                                    <NavDropdown.Item
                                        href="#"
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-red focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Polvos
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        href="#"
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-red focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Labiales
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        href="#"
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-red focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Bases
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        href="#"
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-red focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Perfumes
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </li>
                            <li>
                                <a
                                    style={{
                                        color: configuracion.color3,
                                    }}
                                    href={route("Productos")}
                                    className="nav-link px-2 link-body-emphasis text-gray-900 hover:text-gray-900 dark:text-gray-400 dark:hover:text-red focus:outline focus:outline-2 focus:rounded-sm "
                                >
                                    Productos
                                </a>
                            </li>
                        </ul>
                        <form
                            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                            role="search"
                        >
                            <input
                                className="form-control form-control-sidebar rounded-pill"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                style={{
                                    backgroundColor: configuracion.color1,
                                    borderColor: configuracion.color2, // Color de borde normal
                                    boxShadow: "initial",
                                    border: "2px solid ",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor =
                                        configuracion.color2; // Cambiar color de borde al enfocar
                                    e.target.style.boxShadow = "none"; // Eliminar sombra al enfocar
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "black"; // Restaurar color de borde cuando pierde el foco
                                }}
                            ></input>
                        </form>
                        <NavDropdown
                            title={
                                <i
                                    className=" fas fa-user text-center"
                                    style={{
                                        color: configuracion.color3,
                                    }}
                                ></i>
                            }
                            id="collasible-nav-dropdown"
                        >
                            {auth.user ? (
                                <div>
                                    {auth.user.role === "admin" ? (
                                        <NavDropdown.Item
                                            href={route("dashboard")}
                                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-red focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Perfil
                                        </NavDropdown.Item>
                                    ) : (
                                        <NavDropdown.Item>
                                            <a
                                                href="#"
                                                className="dropdown-item"
                                            >
                                                <ResponsiveNavLink
                                                    href={route("profile.edit")}
                                                >
                                                    Perfil
                                                </ResponsiveNavLink>
                                            </a>
                                        </NavDropdown.Item>
                                    )}
                                    <NavDropdown.Item>
                                        <ResponsiveNavLink
                                            method="post"
                                            href={route("logout")}
                                            onClick={handleLogout}
                                            as="button"
                                        >
                                            Cerrar sesión
                                        </ResponsiveNavLink>
                                    </NavDropdown.Item>
                                </div>
                            ) : (
                                <>
                                    <NavDropdown.Item
                                        href={route("login")}
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-red focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Ingresar
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        href={route("register")}
                                        className="font-semibold text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Registrarse
                                    </NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>
                        <Nav.Link href="#action1" className="px-2">
                            <MdShoppingCart
                                style={{
                                    fontSize: "20px",
                                    color: configuracion.color3,
                                }}
                            />
                        </Nav.Link>
                    </div>
                </div>
            </header>
            <div className="" style={{ backgroundColor: configuracion.color2 }}>
                <section className="py-1  ">
                    <div
                        className="container-lg mt-2 p-8 rounded bg-pink-200"
                        style={{ backgroundColor: configuracion.color2 }}
                    ></div>
                    <MDBContainer fluid>
                        <MDBRow className="justify-content-center">
                            <MDBCol md="6">
                                <MDBCard className="text-black">
                                    <Slider {...settingsY} className="">
                                        <div>
                                            <img src={imagen1} alt="" />
                                        </div>
                                        <div>
                                            <img src={imagen2} alt="" />
                                        </div>
                                        <div>
                                            <img src={imagen3} alt="" />
                                        </div>
                                        <div>
                                            <iframe
                                                src={multimedia}
                                                width="100%"
                                                height="315"
                                                frameborder="0"
                                                allowfullscreen=""
                                                aria-hidden="false"
                                                tabindex="0"
                                            ></iframe>
                                        </div>
                                    </Slider>

                                    <MDBCardBody>
                                        <div className="text-center">
                                            <MDBCardTitle>
                                                {nombre}
                                            </MDBCardTitle>
                                            <p className="text-muted mb-4">
                                                {descripcion}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="d-flex justify-content-between">
                                                <span>{nombre}</span>
                                                <span>${precio}</span>
                                            </div>
                                            {/* Agrega aquí el resto de la información del producto */}
                                        </div>
                                        <div className="d-flex justify-content-between total font-weight-bold mt-4">
                                            <span>Total</span>
                                            <span>${precio}</span>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </div>
        </div>
    );
}

export default ProductDetail;
