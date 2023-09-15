import React from "react";

const Footer = ({ empresa, configuraciones }) => {
    return (
        <div>
            <div>
                <footer className=" main-footer text-center text-lg-start bg-white text-muted">
                    {/* Section: Social media */}
                    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                        {/* Left */}
                        <div className="me-5 d-none d-lg-block">
                            <span>
                                Get connected with us on social networks:
                            </span>
                        </div>
                        {/* Left */}
                        {/* Right */}
                        <div>
                            <a href className="me-4 link-secondary">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href className="me-4 link-secondary">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href className="me-4 link-secondary">
                                <i className="fab fa-google" />
                            </a>
                            <a href className="me-4 link-secondary">
                                <i className="fab fa-instagram" />
                            </a>
                            <a href className="me-4 link-secondary">
                                <i className="fab fa-linkedin" />
                            </a>
                            <a href className="me-4 link-secondary">
                                <i className="fab fa-github" />
                            </a>
                        </div>
                        {/* Right */}
                    </section>
                    {/* Section: Social media */}
                    {/* Section: Links  */}
                    <section className>
                        <div className="container text-center text-md-start mt-5">
                            {/* Grid row */}
                            <div className="row mt-3">
                                {/* Grid column */}
                                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                    {/* Content */}
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
                                    <h6 className="text-uppercase fw-bold mb-4">
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
                                        <i className="fas fa-home me-3 text-secondary" />{" "}
                                        {empresa.direccion}
                                    </p>
                                    <p>
                                        <i className="fas fa-envelope me-3 text-secondary" />
                                        {empresa.correo1}
                                    </p>
                                    <p>
                                        <i className="fas fa-phone me-3 text-secondary" />{" "}
                                        {empresa.prefix1 +
                                            "-" +
                                            empresa.telefono1}
                                    </p>
                                    <p>
                                        <i className="fas fa-print me-3 text-secondary" />{" "}
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
                    {/* Section: Links  */}
                    {/* Copyright */}

                    {/* Copyright */}
                    <div
                        className="text-center text-white p-3 mx-0"
                        style={{
                            // backgroundColor: configuracion.color2,
                            backgroundColor: configuraciones.color2,
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
                </footer>
                {/* Control Sidebar */}
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                </aside>
            </div>
        </div>
    );
};

export default Footer;
