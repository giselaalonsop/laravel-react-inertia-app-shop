import fondoM from "../../../public/images/fondo-movil.jpeg";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import {
    Button,
    Container,
    Form,
    Nav,
    NavDropdown,
    Navbar,
    Offcanvas,
    FormControl,
    Col,
    Row,
} from "react-bootstrap";
import logo from "../../assets/images/logo-empresa.png";
import { FaTruck, FaLock, FaHeart } from "react-icons/fa";
import { MdAccountCircle, MdMenu, MdShoppingCart } from "react-icons/md";
import imagenFija from "../../../public/images/1.jpg";
import imagenC1 from "../../../public/images/cambiante3.jpeg";
import imagenC2 from "../../../public/images/imagen2.jpg";
import tienda from "../../../public/images/tienda.jpg";
import curso from "../../../public/images/3.jpg";
import lucir from "../../../public/images/mujer1.jpg";
import asesoria from "../../../public/images/asesoria.jpeg";
import SocialMediaTab from "./ComponentesWelcome/SocialMediaTab";

export default function Welcome({
    auth,
    empresa,
    configuracion,
    redes,
    links,
}) {
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

    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isButtonHovered1, setIsButtonHovered1] = useState(false);
    const [isButtonHovered2, setIsButtonHovered2] = useState(false);
    const [isButtonHovered3, setIsButtonHovered3] = useState(false);
    const [isButtonHovered4, setIsButtonHovered4] = useState(false);

    const handleButtonMouseEnter1 = () => {
        setIsButtonHovered1(true);
    };

    const handleButtonMouseLeave1 = () => {
        setIsButtonHovered1(false);
    };

    const handleButtonMouseEnter2 = () => {
        setIsButtonHovered2(true);
    };

    const handleButtonMouseLeave2 = () => {
        setIsButtonHovered2(false);
    };

    const handleButtonMouseEnter3 = () => {
        setIsButtonHovered3(true);
    };

    const handleButtonMouseLeave3 = () => {
        setIsButtonHovered3(false);
    };

    const handleButtonMouseEnter4 = () => {
        setIsButtonHovered4(true);
    };

    const handleButtonMouseLeave4 = () => {
        setIsButtonHovered4(false);
    };
    const handleButtonMouseEnter = () => {
        setIsButtonHovered(true);
    };

    const handleButtonMouseLeave = () => {
        setIsButtonHovered(false);
    };

    const images = [
        imagenFija,
        imagenC1,
        imagenC2,
        // Agrega más imágenes cambiantes aquí
    ];
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    const [rotationAxis, setRotationAxis] = useState("Y");

    useEffect(() => {
        const handleKeyPress = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    setRotationAxis("Y"); // Cambiar al eje Y
                    break;
                case "ArrowLeft":
                    setRotationAxis("X"); // Cambiar al eje X
                    break;
                case "ArrowRight":
                    setRotationAxis("Z"); // Cambiar al eje Z (profundidad)
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 1000); // Cambia la imagen cada 5 segundos (5000 ms)

        return () => clearInterval(interval);
    }, []);
    const handleLogout = () => {
        window.location.href = "/";
    };
    return (
        <>
            <div>
                {/*Cubo */}

                <SocialMediaTab configuracion={configuracion} redes={redes} />

                {/*navbar*/}
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
                                                        href={route(
                                                            "profile.edit"
                                                        )}
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
                                            Log in
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            href={route("register")}
                                            className="font-semibold text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Register
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

                {/*carousel*/}
                <div
                    className="navbar navbar-expand-lg navbar-light"
                    style={{ backgroundColor: configuracion.color2 }}
                >
                    <div className="container">
                        <div className="navbar-nav w-100 align-items-center justify-content-center">
                            {/* Vista de escritorio */}
                            <div className="d-none d-lg-flex justify-content-between">
                                <div className="nav-item me-3">
                                    <div className="d-flex align-items-center">
                                        <FaLock className="me-2 text-white" />
                                        <div className="nav-link text-white">
                                            <div className="d-block">
                                                Compra Segura
                                            </div>
                                            <div className="d-block">
                                                Estás en buenas manos
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="nav-item mx-5">
                                    <div className="d-flex align-items-center">
                                        <FaHeart className="me-2 text-white" />
                                        <div className="nav-link text-white">
                                            <div className="d-block">
                                                {"Bienvenidas a " +
                                                    empresa.nombre}
                                            </div>
                                            <div className="d-block">
                                                Tenemos todo lo que necesitas
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="nav-item mx-3">
                                    <div className="d-flex align-items-center">
                                        <FaTruck className="me-2 text-white" />
                                        <div className="nav-link text-white">
                                            <div className="d-block">
                                                Envíos Nacionales
                                            </div>
                                            <div className="d-block">
                                                Llegamos a donde estés
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Vista de móvil */}
                            <div className="d-lg-none">
                                <Carousel
                                    showStatus={false}
                                    showThumbs={false}
                                    showArrows={true}
                                    infiniteLoop={true}
                                    autoPlay={true}
                                    interval={2000}
                                    stopOnHover={false}
                                    showIndicators={false}
                                >
                                    <div className="nav-item text-center">
                                        <div className="d-flex flex-column align-items-center">
                                            <FaLock className="me-2 text-white" />
                                            <div className="nav-link text-white">
                                                <div className="d-block">
                                                    Compra Segura
                                                </div>
                                                <div className="d-block">
                                                    Estás en buenas manos
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nav-item text-center">
                                        <div className="d-flex flex-column align-items-center">
                                            <FaTruck className="me-2 text-white" />
                                            <div className="nav-link text-white">
                                                <div className="d-block">
                                                    Envíos Nacionales
                                                </div>
                                                <div className="d-block">
                                                    Llegamos a donde estés
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nav-item text-center">
                                        <div className="d-flex flex-column align-items-center">
                                            <FaHeart className="me-2 text-white" />
                                            <div className="nav-link text-white">
                                                <div className="d-block">
                                                    {"Bienvenidas a " +
                                                        empresa.nombre}
                                                </div>
                                                <div className="d-block">
                                                    Tenemos todo lo que
                                                    necesitas
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
                {/*hero*/}
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            {/* Imagen fija */}
                            <div className="col-lg-7 col-md-12 p-0 d-none d-md-block">
                                <div
                                    id="carouselImagenFija"
                                    className="carousel slide carousel-fade carousel-dark"
                                    data-mdb-ride="carousel"
                                    translate="200"
                                >
                                    <div className="carousel-inner">
                                        {/* Single item */}
                                        <div className="carousel-item active">
                                            <div className="w-100 position-relative">
                                                <img
                                                    src={images[0]}
                                                    alt="Imagen Fija"
                                                    className="w-100 h-auto"
                                                    style={{
                                                        transition:
                                                            "filter 0.3s",
                                                        filter: isButtonHovered
                                                            ? "brightness(70%)"
                                                            : "brightness(100%)",
                                                    }}
                                                />
                                                <div className="position-absolute top-0 start-0 w-100 h-100 overlay"></div>
                                                <div className="position-absolute top-50 start-50 translate-middle justify-center">
                                                    <h1 className="text-black text-center">
                                                        Click here
                                                    </h1>

                                                    <button
                                                        className="btn btn-primary btn-lg rounded-pill mt-2 mx-5"
                                                        style={{
                                                            transition:
                                                                "background-color 0.3s",
                                                            backgroundColor:
                                                                isButtonHovered
                                                                    ? configuracion.color2
                                                                    : "#6c757d",
                                                        }}
                                                        onMouseEnter={
                                                            handleButtonMouseEnter
                                                        }
                                                        onMouseLeave={
                                                            handleButtonMouseLeave
                                                        }
                                                    >
                                                        Alta gama
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Carrusel de imágenes cambiantes */}
                            <div className="col-lg-5 col-md-12 p-0 d-none d-md-block">
                                <div
                                    id="carouselDarkVariant"
                                    className="carousel slide carousel-fade carousel-dark"
                                    data-mdb-ride="carousel"
                                    data-interval="1000"
                                >
                                    <div className="carousel-inner">
                                        {/* Single item */}
                                        <div className="carousel-item active">
                                            <img
                                                src={imagenC2}
                                                className="d-block w-100"
                                                alt="Imagen para pantallas de escritorio"
                                                style={{ maxHeight: "100%" }}
                                                preload="auto"
                                            />
                                        </div>
                                        {/* Otras imágenes */}
                                        <div className="carousel-item">
                                            <img
                                                src={imagenC1}
                                                className="d-block w-100"
                                                alt="Imagen para pantallas de escritorio"
                                                style={{ maxHeight: "100%" }}
                                                preload="auto"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 p-0 d-md-none">
                                {/* Imagen fija */}
                                <img
                                    src={images[0]}
                                    alt="Imagen Fija"
                                    className="w-100 h-auto"
                                    style={{
                                        transition: "filter 0.3s",
                                        filter: isButtonHovered
                                            ? "brightness(70%)"
                                            : "brightness(100%)",
                                    }}
                                />
                                <div className="position-absolute top-0 start-0 w-100 h-100 overlay"></div>
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <button
                                        className="btn btn-primary btn-lg rounded-pill mt-2 mx-5"
                                        style={{
                                            transition: "background-color 0.3s",
                                            backgroundColor: isButtonHovered
                                                ? configuracion.color2
                                                : "#6c757d",
                                        }}
                                        onMouseEnter={handleButtonMouseEnter}
                                        onMouseLeave={handleButtonMouseLeave}
                                    >
                                        Click here
                                    </button>
                                </div>
                            </div>

                            <div className=" col-md-8 p-0 d-md-none">
                                <div
                                    id="carouselDarkVariant"
                                    className="carousel slide carousel-fade carousel-dark"
                                    data-mdb-ride="carousel"
                                    data-interval="3000"
                                >
                                    <div className="carousel-inner">
                                        {/* Single item */}
                                        <div className="carousel-item active">
                                            <img
                                                src={imagenC2}
                                                className="d-block w-100"
                                                alt="Imagen para pantallas de escritorio"
                                                style={{ maxHeight: "100%" }}
                                            />
                                        </div>
                                        {/* Otras imágenes */}
                                        <div className="carousel-item">
                                            <img
                                                src={imagenC1}
                                                className="d-block w-100"
                                                alt="Imagen para pantallas de escritorio"
                                                style={{ maxHeight: "100%" }}
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src={imagenC2}
                                                className="d-block w-100"
                                                alt="Imagen para pantallas de escritorio"
                                                style={{ maxHeight: "100%" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*paleta*/}
                <section className=" content-center">
                    <div className="color-palette">
                        <div
                            className="color-box border-gray-200"
                            style={{ backgroundColor: configuracion.color1 }}
                        ></div>
                        <div
                            className="color-box"
                            style={{ backgroundColor: configuracion.color2 }}
                        ></div>
                        <div
                            className="color-box"
                            style={{ backgroundColor: configuracion.color3 }}
                        ></div>
                        <div
                            className="color-box"
                            style={{ backgroundColor: configuracion.color4 }}
                        ></div>
                    </div>
                </section>
                <>
                    {/* <div
                        id="carouselDarkVariant"
                        className="carousel slide carousel-fade carousel-dark"
                        data-mdb-ride="carousel"
                    >
                       
                        <div className="carousel-indicators">
                            <button
                                data-mdb-target="#carouselDarkVariant"
                                data-mdb-slide-to={0}
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                            />
                            <button
                                data-mdb-target="#carouselDarkVariant"
                                data-mdb-slide-to={1}
                                aria-label="Slide 1"
                            />
                            <button
                                data-mdb-target="#carouselDarkVariant"
                                data-mdb-slide-to={2}
                                aria-label="Slide 1"
                            />
                        </div>
                       
                        <div className="carousel-inner">
                            
                            <div className="carousel-item active">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(19).webp"
                                    className="d-none d-md-block d-lg-block w-100"
                                    alt="Motorbike Smoke"
                                />
                                <img
                                    src={fondoM}
                                    className="d-block d-md-none w-100"
                                    alt="Imagen para dispositivos móviles"
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>
                                        Nulla vitae elit libero, a pharetra
                                        augue mollis interdum.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="carousel-item">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(35).webp"
                                    className="d-none d-md-block d-lg-block w-100"
                                    alt="Imagen para pantallas de escritorio"
                                />

                                <img
                                    src={fondoM}
                                    className="d-block d-md-none w-100"
                                    alt="Imagen para dispositivos móviles"
                                />

                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="carousel-item">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(40).webp"
                                    className="d-none d-md-block d-lg-block w-100"
                                    alt="Woman Reading a Book"
                                />
                                <img
                                    src={fondoM}
                                    className="d-block d-md-none w-100"
                                    alt="Imagen para dispositivos móviles"
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>
                                        Praesent commodo cursus magna, vel
                                        scelerisque nisl consectetur.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-mdb-target="#carouselDarkVariant"
                            data-mdb-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-mdb-target="#carouselDarkVariant"
                            data-mdb-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div> */}
                </>
                {/*Servicios*/}
                <section className="py-5 bg-white ">
                    <div className="container-lg mt-5 p-4 rounded">
                        <h2 className="text-center mb-4">Nuestros Servicios</h2>
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            <div className="col mb-4 btn btn-outline custom-btn btn-white">
                                <div
                                    className="card h-100 "
                                    onMouseEnter={handleButtonMouseEnter1}
                                    onMouseLeave={handleButtonMouseLeave1}
                                >
                                    <img
                                        src={tienda}
                                        className="card-img-top"
                                        alt="..."
                                        style={{
                                            transition: "filter 0.3s",
                                            filter: isButtonHovered1
                                                ? "brightness(70%)"
                                                : "brightness(100%)",
                                        }}
                                    />
                                    <div
                                        className="card-body "
                                        style={{
                                            transition: "background-color 0.3s",
                                            backgroundColor: isButtonHovered1
                                                ? configuracion.color2
                                                : configuracion.color1,
                                        }}
                                    >
                                        <h5
                                            className="card-title text-center "
                                            style={{
                                                transition:
                                                    "background-color 0.3s",
                                                color: isButtonHovered1
                                                    ? "#fff"
                                                    : "#000",
                                            }}
                                        >
                                            <span
                                                className=""
                                                style={{
                                                    transition:
                                                        "background-color 0.3s",
                                                    color: isButtonHovered1
                                                        ? "#fff"
                                                        : "#000",
                                                    fontSize: "24px",
                                                    textAlign: "left",
                                                }}
                                            >
                                                Nuestra Tienda
                                            </span>
                                        </h5>
                                        <p
                                            className="card-text  "
                                            style={{
                                                transition:
                                                    "background-color 0.3s",
                                                color: isButtonHovered1
                                                    ? "#fff"
                                                    : "#000",
                                                fontSize: "12px",
                                                textAlign: "left",
                                            }}
                                        >
                                            Consigue todos los productos de
                                            maquillaje y cuidado de la piel de
                                            la mejor calidad
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-4 btn btn-outline custom-btn btn-white">
                                <div
                                    className="card h-100 "
                                    onMouseEnter={handleButtonMouseEnter2}
                                    onMouseLeave={handleButtonMouseLeave2}
                                >
                                    <img
                                        src={curso}
                                        className="card-img-top"
                                        alt="..."
                                        style={{
                                            transition: "filter 0.3s",
                                            filter: isButtonHovered2
                                                ? "brightness(70%)"
                                                : "brightness(100%)",
                                        }}
                                    />
                                    <div
                                        className="card-body "
                                        style={{
                                            transition: "background-color 0.3s",
                                            backgroundColor: isButtonHovered2
                                                ? configuracion.color2
                                                : configuracion.color1,
                                        }}
                                    >
                                        <h5
                                            className="card-title text-center "
                                            style={{
                                                transition:
                                                    "background-color 0.3s",
                                                color: isButtonHovered2
                                                    ? "#fff"
                                                    : "#000",
                                                fontSize: "24px",
                                            }}
                                        >
                                            <span className="">
                                                Cursos de Maquillaje
                                            </span>
                                        </h5>
                                        <p
                                            className="card-text "
                                            style={{
                                                transition:
                                                    "background-color 0.3s",
                                                color: isButtonHovered2
                                                    ? "#fff"
                                                    : "#000",
                                                fontSize: "12px",
                                                textAlign: "left",
                                            }}
                                        >
                                            Incribete en nuestros cursos de
                                            maquilla profesional, social y
                                            artistico
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-4 btn btn-outline custom-btn btn-white">
                                <div
                                    className="card h-100 "
                                    onMouseEnter={handleButtonMouseEnter3}
                                    onMouseLeave={handleButtonMouseLeave3}
                                >
                                    <img
                                        src={lucir}
                                        className="card-img-top"
                                        alt="..."
                                        style={{
                                            transition: "filter 0.3s",
                                            filter: isButtonHovered3
                                                ? "brightness(70%)"
                                                : "brightness(100%)",
                                            height: "500px",
                                        }}
                                    />
                                    <div
                                        className="card-body "
                                        style={{
                                            transition: "background-color 0.3s",
                                            backgroundColor: isButtonHovered3
                                                ? configuracion.color2
                                                : configuracion.color1,
                                        }}
                                    >
                                        <h5
                                            className="card-title text-center "
                                            style={{
                                                transition:
                                                    "background-color 0.3s",
                                                color: isButtonHovered1
                                                    ? "#fff"
                                                    : "#000",
                                            }}
                                        >
                                            <span
                                                className=""
                                                style={{
                                                    transition:
                                                        "background-color 0.3s",
                                                    color: isButtonHovered1
                                                        ? "#fff"
                                                        : "#000",
                                                    fontSize: "24px",
                                                    textAlign: "left",
                                                }}
                                            >
                                                Nuestra Tienda
                                            </span>
                                        </h5>
                                        <p
                                            className="card-text  "
                                            style={{
                                                transition:
                                                    "background-color 0.3s",
                                                color: isButtonHovered1
                                                    ? "#fff"
                                                    : "#000",
                                                fontSize: "12px",
                                                textAlign: "left",
                                            }}
                                        >
                                            Consigue todos los productos de
                                            maquillaje y cuidado de la piel de
                                            la mejor calidad
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-4 btn btn-outline custom-btn btn-white">
                                <div
                                    className="card h-100 "
                                    onMouseEnter={handleButtonMouseEnter4}
                                    onMouseLeave={handleButtonMouseLeave4}
                                >
                                    <img
                                        src={asesoria}
                                        className="card-img-top"
                                        alt="..."
                                        style={{
                                            transition: "filter 0.3s",
                                            filter: isButtonHovered3
                                                ? "brightness(70%)"
                                                : "brightness(100%)",
                                            height: "500px",
                                        }}
                                    />
                                    <div
                                        className="card-body "
                                        style={{
                                            transition: "background-color 0.3s",
                                            backgroundColor: isButtonHovered4
                                                ? configuracion.color2
                                                : configuracion.color1,
                                        }}
                                    >
                                        <h5
                                            className="card-title text-center "
                                            style={{
                                                transition:
                                                    "background-color 0.3s",
                                                color: isButtonHovered1
                                                    ? "#fff"
                                                    : "#000",
                                            }}
                                        >
                                            <span
                                                className=""
                                                style={{
                                                    transition:
                                                        "background-color 0.3s",
                                                    color: isButtonHovered1
                                                        ? "#fff"
                                                        : "#000",
                                                    fontSize: "24px",
                                                    textAlign: "left",
                                                }}
                                            >
                                                Nuestra Tienda
                                            </span>
                                        </h5>
                                        <p
                                            className="card-text  "
                                            style={{
                                                transition:
                                                    "background-color 0.3s",
                                                color: isButtonHovered1
                                                    ? "#fff"
                                                    : "#000",
                                                fontSize: "12px",
                                                textAlign: "left",
                                            }}
                                        >
                                            Consigue todos los productos de
                                            maquillaje y cuidado de la piel de
                                            la mejor calidad
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* categorizacion*/}
                <div className="bg-transparent text-center my-10">
                    <h1
                        className="display-4 mb-4"
                        style={{ color: configuracion.color4 }}
                    >
                        Categorías
                    </h1>
                    <ul className="list-inline">
                        <li className="list-inline-item mx-3 my-2">
                            <a
                                href="#"
                                className="btn btn-link btn-lg text-black"
                            >
                                <i className="bi bi-lipstick"></i>
                                <span>Maquillaje</span>
                            </a>
                        </li>
                        <li className="list-inline-item mx-3 my-2">
                            <a
                                href="#"
                                className="btn btn-link btn-lg text-black"
                            >
                                <i className="bi bi-palette"></i>
                                <span>Cuidado de la piel</span>
                            </a>
                        </li>
                        <li className="list-inline-item mx-3 my-2 ">
                            <a
                                href="#"
                                className="btn btn-link btn-lg text-black"
                            >
                                <i className="bi bi-person"></i>
                                <span>Perfumes</span>
                            </a>
                        </li>
                        <li className="list-inline-item mx-3">
                            <a
                                href="#"
                                className="btn btn-link btn-lg text-black"
                            >
                                <i className="bi bi-handbag"></i>
                                <span>Accesorios</span>
                            </a>
                        </li>
                        <li className="list-inline-item mx-3">
                            <a
                                href="#"
                                className="btn btn-link btn-lg text-black"
                            >
                                <i className="bi bi-sun"></i>
                                <span>Protectores solares</span>
                            </a>
                        </li>
                    </ul>
                </div>
                {/*Productos destacados*/}
                <section className="mt-10 container-fluid">
                    <h6 className="text-center display-10 mb-4 mt-5">
                        Productos destacados
                    </h6>
                    <div className="container px-4 px-lg-5 mt-5">
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Product image*/}
                                    <img
                                        className="card-img-top"
                                        src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                        alt="..."
                                    />
                                    {/* Product details*/}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name*/}
                                            <h5 className="fw-bolder">
                                                <p
                                                    style={{
                                                        color: configuracion.color3,
                                                    }}
                                                >
                                                    Fancy Product
                                                </p>
                                            </h5>
                                            {/* Product price*/}
                                            $40.00 - $80.00
                                        </div>
                                    </div>
                                    {/* Product actions*/}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <a
                                                className="btn btn-outline-dark mt-auto text-white border-white"
                                                href="#"
                                                style={{
                                                    backgroundColor:
                                                        configuracion.color4,
                                                }}
                                            >
                                                View options
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Sale badge*/}
                                    <div
                                        className="badge bg-dark text-white position-absolute"
                                        style={{
                                            top: "0.5rem",
                                            right: "0.5rem",
                                        }}
                                    >
                                        Sale
                                    </div>
                                    {/* Product image*/}
                                    <img
                                        className="card-img-top"
                                        src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                        alt="..."
                                    />
                                    {/* Product details*/}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name*/}
                                            <h5
                                                className="fw-bolder"
                                                style={{
                                                    color: configuracion.color3,
                                                }}
                                            >
                                                Special Item
                                            </h5>
                                            {/* Product reviews*/}
                                            <div className="d-flex justify-content-center small text-warning mb-2">
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                            </div>
                                            {/* Product price*/}
                                            <span className="text-muted text-decoration-line-through">
                                                $20.00
                                            </span>
                                            $18.00
                                        </div>
                                    </div>
                                    {/* Product actions*/}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <a
                                                className="btn btn-outline-dark mt-auto text-white border-white"
                                                href="#"
                                                style={{
                                                    backgroundColor:
                                                        configuracion.color4,
                                                }}
                                            >
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Sale badge*/}
                                    <div
                                        className="badge bg-dark text-white position-absolute"
                                        style={{
                                            top: "0.5rem",
                                            right: "0.5rem",
                                        }}
                                    >
                                        Sale
                                    </div>
                                    {/* Product image*/}
                                    <img
                                        className="card-img-top"
                                        src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                        alt="..."
                                    />
                                    {/* Product details*/}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name*/}
                                            <h5
                                                className="fw-bolder"
                                                style={{
                                                    color: configuracion.color3,
                                                }}
                                            >
                                                Sale Item
                                            </h5>
                                            {/* Product price*/}
                                            <span className="text-muted text-decoration-line-through">
                                                $50.00
                                            </span>
                                            $25.00
                                        </div>
                                    </div>
                                    {/* Product actions*/}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <a
                                                className="btn btn-outline-dark mt-auto text-white border-white"
                                                href="#"
                                                style={{
                                                    backgroundColor:
                                                        configuracion.color4,
                                                }}
                                            >
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Product image*/}
                                    <img
                                        className="card-img-top"
                                        src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                        alt="..."
                                    />
                                    {/* Product details*/}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name*/}
                                            <h5
                                                className="fw-bolder"
                                                style={{
                                                    color: configuracion.color3,
                                                }}
                                            >
                                                Popular Item
                                            </h5>
                                            {/* Product reviews*/}
                                            <div className="d-flex justify-content-center small text-warning mb-2">
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                            </div>
                                            {/* Product price*/}
                                            $40.00
                                        </div>
                                    </div>
                                    {/* Product actions*/}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <a
                                                className="btn btn-outline-dark mt-auto text-white border-white"
                                                href="#"
                                                style={{
                                                    backgroundColor:
                                                        configuracion.color4,
                                                }}
                                            >
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Sale badge*/}
                                    <div
                                        className="badge bg-dark text-white position-absolute"
                                        style={{
                                            top: "0.5rem",
                                            right: "0.5rem",
                                        }}
                                    >
                                        Sale
                                    </div>
                                    {/* Product image*/}
                                    <img
                                        className="card-img-top"
                                        src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                        alt="..."
                                    />
                                    {/* Product details*/}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name*/}
                                            <h5
                                                className="fw-bolder"
                                                style={{
                                                    color: configuracion.color3,
                                                }}
                                            >
                                                Sale Item
                                            </h5>
                                            {/* Product price*/}
                                            <span className="text-muted text-decoration-line-through">
                                                $50.00
                                            </span>
                                            $25.00
                                        </div>
                                    </div>
                                    {/* Product actions*/}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <a
                                                className="btn btn-outline-dark mt-auto text-white border-white"
                                                href="#"
                                                style={{
                                                    backgroundColor:
                                                        configuracion.color4,
                                                }}
                                            >
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Product image*/}
                                    <img
                                        className="card-img-top"
                                        src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                        alt="..."
                                    />
                                    {/* Product details*/}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name*/}
                                            <h5
                                                className="fw-bolder"
                                                style={{
                                                    color: configuracion.color3,
                                                }}
                                            >
                                                Fancy Product
                                            </h5>
                                            {/* Product price*/}
                                            $120.00 - $280.00
                                        </div>
                                    </div>
                                    {/* Product actions*/}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <a
                                                className="btn btn-outline-dark mt-auto text-white border-white"
                                                href="#"
                                                style={{
                                                    backgroundColor:
                                                        configuracion.color4,
                                                }}
                                            >
                                                View options
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Sale badge*/}
                                    <div
                                        className="badge bg-dark text-white position-absolute"
                                        style={{
                                            top: "0.5rem",
                                            right: "0.5rem",
                                        }}
                                    >
                                        Sale
                                    </div>
                                    {/* Product image*/}
                                    <img
                                        className="card-img-top"
                                        src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                        alt="..."
                                    />
                                    {/* Product details*/}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name*/}
                                            <h5
                                                className="fw-bolder"
                                                style={{
                                                    color: configuracion.color3,
                                                }}
                                            >
                                                Special Item
                                            </h5>
                                            {/* Product reviews*/}
                                            <div className="d-flex justify-content-center small text-warning mb-2">
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                            </div>
                                            {/* Product price*/}
                                            <span className="text-muted text-decoration-line-through">
                                                $20.00
                                            </span>
                                            $18.00
                                        </div>
                                    </div>
                                    {/* Product actions*/}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <a
                                                className="btn btn-outline-dark mt-auto text-white border-white"
                                                href="#"
                                                style={{
                                                    backgroundColor:
                                                        configuracion.color4,
                                                }}
                                            >
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-5">
                                <div className="card h-100">
                                    {/* Product image*/}
                                    <img
                                        className="card-img-top"
                                        src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                        alt="..."
                                    />
                                    {/* Product details*/}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name*/}
                                            <h5
                                                className="fw-bolder"
                                                style={{
                                                    color: configuracion.color3,
                                                }}
                                            >
                                                Popular Item
                                            </h5>
                                            {/* Product reviews*/}
                                            <div className="d-flex justify-content-center small text-warning mb-2">
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                                <div className="bi-star-fill" />
                                            </div>
                                            {/* Product price*/}
                                            $40.00
                                        </div>
                                    </div>
                                    {/* Product actions*/}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <a
                                                className="btn btn-outline-dark mt-auto text-white border-white"
                                                href="#"
                                                style={{
                                                    backgroundColor:
                                                        configuracion.color4,
                                                }}
                                            >
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*boton scroll*/}
                <div className="d-flex justify-center">
                    <button
                        className="scroll-to-top btn rounded-circle"
                        style={{
                            color: configuracion.color3,
                            backgroundColor: configuracion.color4,
                        }}
                        onClick={scrollToTop}
                    >
                        <span className="bi bi-arrow-up"></span>
                    </button>
                </div>

                {/* Footer*/}
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
                                        organize your footer content. Lorem
                                        ipsum dolor sit amet, consectetur
                                        adipisicing elit.
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
                                        {empresa.prefix1 +
                                            "-" +
                                            empresa.telefono1}
                                    </p>
                                    <p>
                                        <i className="fas fa-print me-3 text-secondary" />
                                        {empresa.prefix2 +
                                            "-" +
                                            empresa.telefono2}
                                    </p>
                                </div>
                                {/* Grid column */}
                            </div>
                            {/* Grid row */}
                        </div>
                    </section>
                    <h6 className="text-uppercase fw-bold text-center ">
                        Como llegar
                    </h6>
                    {/*mapa google maps*/}
                    <iframe
                        className=" mx-auto w-full "
                        name="mapa"
                        title="Ubicacion"
                        src={
                            configuracion.ubicacion.startsWith(
                                "https://www.google.com/maps"
                            )
                                ? configuracion.ubicacion
                                : "https://www.google.com/maps?q=" +
                                  encodeURIComponent(configuracion.ubicacion)
                        }
                        width=""
                        height="300"
                        style={{ border: "0" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

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
        </>
    );
}
