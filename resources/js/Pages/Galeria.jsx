import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { NavDropdown, Nav, Button } from "react-bootstrap";
import { FaLock, FaHeart, FaTruck } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Container } from "postcss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../Pages/estilo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Galeria = ({ links, empresa, configuracion, auth }) => {
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
    const instagramNumero = () => {
        if (instagramPostIds.length > 2) {
            return 3;
        } else {
            if (instagramPostIds.length > 1) {
                return 2;
            } else {
                return 1;
            }
        }
    };

    const [youtubeVideoIds, setYoutubeVideoIds] = useState([]);
    const [instagramPostIds, setInstagramPostIds] = useState([]);
    const settingsI = {
        dots: true,
        nav: true,
        infinite: true,
        autoplay: true,

        inicialSlide: 0,
        speed: 800,
        slidesToShow: instagramNumero(),
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: instagramNumero(),
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: instagramNumero() > 1 ? 2 : instagramNumero(),
                    slidesToScroll:
                        instagramNumero() > 2 ? 2 : instagramNumero(),
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: instagramNumero() > 1 ? 1 : instagramNumero(),
                    slidesToScroll: 1,
                },
            },
        ],

        swipeToSlide: true,

        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow size="40px" />,
    };
    const settingsY = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: youtubeVideoIds.length > 2 ? 3 : youtubeVideoIds.length,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                }}
                onClick={onClick}
            ></div>
        );
    }

    // Componente personalizado para la flecha izquierda
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    color: "black",
                }}
                onClick={onClick}
            ></div>
        );
    }

    useEffect(() => {
        // Función para extraer video IDs de enlaces de YouTube
        const extractYouTubeVideoIds = (links) => {
            return links.map((link) => {
                // Utiliza una expresión regular para encontrar el primer "=" en la URL de YouTube
                const match = link.link.match(/youtube\.com\/watch\?v=([^&]+)/);
                if (match && match[1]) {
                    // Si se encontró el ID del video, devuélvelo

                    return match[1];
                }
                // Si no se encontró, devuelve el enlace original (o puedes manejarlo de otra manera)
                return link.link;
            });
        };

        // Función para extraer IDs de publicaciones de Instagram
        const extractInstagramPostIds = (links) => {
            return links.map((link) => {
                // Utiliza una expresión regular para extraer el ID de la publicación de Instagram
                const match = link.link.match(/\/p\/([^/]+)/);
                if (match && match[1]) {
                    // Si se encontró el ID de la publicación, devuélvelo
                    return match[1];
                }
                // Si no se encontró, devuelve el enlace original (o puedes manejarlo de otra manera)
                return link.link;
            });
        };

        // Separar los enlaces de YouTube e Instagram
        const separateLinks = () => {
            const youtube = [];
            const instagram = [];

            if (links) {
                Object.keys(links).forEach((tipo) => {
                    links[tipo].forEach((link) => {
                        const platform = {
                            id: link.id,
                            type: tipo,
                            link: link.link,
                        };

                        if (tipo === "Youtube") {
                            youtube.push(platform);
                        } else if (tipo === "Instagram") {
                            instagram.push(platform);
                        }
                    });
                });
            }

            return { youtube, instagram };
        };

        const { youtube, instagram } = separateLinks();

        // Extraer video IDs de enlaces de YouTube
        const extractedYoutubeVideoIds = extractYouTubeVideoIds(youtube);
        setYoutubeVideoIds(extractedYoutubeVideoIds);

        // Extraer IDs de publicaciones de Instagram
        const extractedInstagramPostIds = extractInstagramPostIds(instagram);
        setInstagramPostIds(extractedInstagramPostIds);
    }, [links]);
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
                            {links && (
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
                            )}

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
                                    href="#"
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
                    >
                        <h2 className="text-center mb-4 display-6 text-white font-mono">
                            Galeria
                        </h2>
                        <div className="container  my-5 cursor-move">
                            <div className="">
                                <Slider {...settingsI}>
                                    {instagramPostIds.map((postId) => (
                                        <div className="card-wrapper">
                                            <div className="card flex justify-center">
                                                <div className="card-image">
                                                    <div key={postId}>
                                                        <iframe
                                                            src={`https://www.instagram.com/p/${postId}/embed`}
                                                            width="400"
                                                            height="600"
                                                            frameBorder="0"
                                                            scrolling="no"
                                                            allowtransparency="true"
                                                        />

                                                        <div className="details text-center bg-transparent">
                                                            <div
                                                                className="btn cursor-pointer text-center btn-white"
                                                                style={{
                                                                    backgroundColor:
                                                                        configuracion.color2,
                                                                }}
                                                            >
                                                                <a
                                                                    href={`https://www.instagram.com/p/${postId}/embed`}
                                                                >
                                                                    Ver en ig
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="  rounded mt-10">
                                <Slider {...settingsY} className="">
                                    {youtubeVideoIds.map((value, index) => (
                                        <div key={index}>
                                            <div>
                                                <iframe
                                                    width="100%"
                                                    height="200"
                                                    src={`https://www.youtube.com/embed/${value}?si=Qfb0vauL5b1y31bb`}
                                                    title="YouTube video player"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <footer className=" text-center text-lg-start bg-white text-muted mt-5">
                <div
                    className=" text-center text-white"
                    style={{
                        backgroundColor: configuracion.color1,
                    }}
                >
                    {/* Grid container */}
                    <div className="container pb-0">
                        {/* Section: Social media */}
                        <section className="mb-4">
                            {/* Facebook */}
                            <a
                                className="btn text-white btn-floating m-1"
                                style={{ backgroundColor: "#3b5998" }}
                                href="#!"
                                role="button"
                            >
                                <i className="fab fa-facebook-f" />
                            </a>
                            {/* Twitter */}
                            <a
                                className="btn text-white btn-floating m-1"
                                style={{ backgroundColor: "#55acee" }}
                                href="#!"
                                role="button"
                            >
                                <i className="fab fa-twitter" />
                            </a>
                            {/* Google */}
                            <a
                                className="btn text-white btn-floating m-1"
                                style={{ backgroundColor: "#dd4b39" }}
                                href="#!"
                                role="button"
                            >
                                <i className="fab fa-google" />
                            </a>
                            {/* Instagram */}
                            <a
                                className="btn text-white btn-floating m-1"
                                style={{ backgroundColor: "#ac2bac" }}
                                href="#!"
                                role="button"
                            >
                                <i className="fab fa-instagram" />
                            </a>
                            {/* Linkedin */}
                            <a
                                className="btn text-white btn-floating m-1"
                                style={{ backgroundColor: "#0082ca" }}
                                href="#!"
                                role="button"
                            >
                                <i className="fab fa-linkedin-in" />
                            </a>
                            {/* Github */}
                            <a
                                className="btn text-white btn-floating m-1"
                                style={{ backgroundColor: "#333333" }}
                                href="#!"
                                role="button"
                            >
                                <i className="fab fa-github" />
                            </a>
                        </section>
                        {/* Section: Social media */}
                    </div>
                </div>

                {/* Section: Social media */}

                <section className>
                    <div className="container text-center text-md-start mt-5">
                        {/* Grid row */}
                        <div className="row ">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 ">
                                {/* Content */}
                                <a href="/" className="brand-link ">
                                    <img
                                        src={configuracion.favicon}
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
                                {/* <h6 className="text-uppercase fw-bold mb-4">
                                        <img
                                            src={configuracion.favicon}
                                            className="bi me-2"
                                            width={190}
                                            height={90}
                                            role="img"
                                            aria-label="Bootstrap"
                                        />
                                        <use xlinkHref="#bootstrap" />
                                    </h6> */}
                                <p>
                                    Here you can use rows and columns to
                                    organize your footer content. Lorem ipsum
                                    dolor sit amet, consectetur adipisicing
                                    elit.
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h6
                                    className="text-uppercase fw-bold mb-4"
                                    style={{ color: configuracion.color1 }}
                                >
                                    Products
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Angular
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        React
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Vue
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Laravel
                                    </a>
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Pricing
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Settings
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Orders
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Help
                                    </a>
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Contact
                                </h6>
                                <p>
                                    <i className="fas fa-home me-3 text-secondary" />
                                    {empresa.direccion}
                                </p>
                                <p>
                                    <i className="fas fa-envelope me-3 text-secondary" />
                                    {empresa.correo1}
                                </p>
                                <p>
                                    <i className="fas fa-phone me-3 text-secondary" />
                                    {empresa.prefix1 + "-" + empresa.telefono1}
                                </p>
                                <p>
                                    <i className="fas fa-print me-3 text-secondary" />
                                    {empresa.prefix2 + "-" + empresa.telefono2}
                                </p>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>

                {/* Section: Links  */}
                {/* Copyright */}
                <div
                    className="text-center text-white p-3"
                    style={{
                        // backgroundColor: configuracion.color2,
                        backgroundColor: configuracion.color2,
                    }}
                >
                    © 2020 Copyright:
                    <a
                        className="text-reset fw-bold"
                        href="https://mdbootstrap.com/"
                    >
                        MDBootstrap.com
                    </a>
                </div>

                {/* Copyright */}
            </footer>
            {/* Control Sidebar */}
            <aside className="control-sidebar control-sidebar-dark">
                {/* Control sidebar content goes here */}
            </aside>
        </div>
    );
};

export default Galeria;
