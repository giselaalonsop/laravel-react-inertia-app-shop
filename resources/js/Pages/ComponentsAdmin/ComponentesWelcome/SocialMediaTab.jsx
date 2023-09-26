import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../../css/SocialMediaTab.css"; // Asegúrate de importar tus estilos CSS

function SocialMediaTab({ configuracion, redes }) {
    const isDrawerVisible =
        redes.Instagram !== null ||
        redes.Facebook !== null ||
        redes.Twitter !== null;

    const [isOpen, setIsOpen] = useState(true);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const getArrowIcon = () => {
        return isOpen ? faAngleRight : faAngleLeft;
    };

    const handleArrowClick = (e) => {
        e.stopPropagation();
        toggleDrawer();
    };

    const handleContainerClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className={`social-media-tab-container ${isOpen ? "open" : ""}`}
            onClick={handleContainerClick}
        >
            {isDrawerVisible && (
                <div
                    className={`drawer ${isOpen ? "open" : ""}`}
                    style={{
                        zIndex: 999,
                        transition: "right 0.5s",
                        top: "42.5%",
                        zIndex: 999,
                        height: "20%",
                        position: "fixed",
                        right: isOpen ? "-160px" : "-250px", // Ajusta el valor según el ancho del Drawer
                        width: "250px", // Ajusta el ancho del Drawer según tus necesidades
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        {redes.Instagram !== null && (
                            <a href={redes.Instagram} target="_blank">
                                <div className="espacio3D">
                                    <div className="cubo3D">
                                        <div className="base" />
                                        <img
                                            src="images/socialMedia/instagram.png"
                                            alt="imagen1"
                                            className="cara cara1"
                                        />
                                        <img
                                            src="images/socialMedia/instagram.png"
                                            alt="imagen1"
                                            className="cara cara2"
                                        />
                                        <img
                                            src="images/socialMedia/instagram.png"
                                            alt="imagen1"
                                            className="cara cara3"
                                        />
                                        <img
                                            src="images/socialMedia/instagram.png"
                                            alt="imagen1"
                                            className="cara cara4"
                                        />
                                        <img
                                            src="images/socialMedia/instagram.png"
                                            alt="imagen1"
                                            className="cara cara5"
                                        />
                                        <img
                                            src="images/socialMedia/instagram.png"
                                            alt="imagen1"
                                            className="cara cara6"
                                        />
                                    </div>
                                </div>
                            </a>
                        )}
                        {redes.Twitter !== null && (
                            <a href={redes.Twitter} target="_blank">
                                <div className="espacio3D">
                                    <div className="cubo3D">
                                        <div className="base" />
                                        <img
                                            src="images/socialMedia/twitter.png"
                                            alt="imagen1"
                                            className="cara cara1 bg-white"
                                        />
                                        <img
                                            src="images/socialMedia/twitter.png"
                                            alt="imagen1"
                                            className="cara cara2  bg-white"
                                        />
                                        <img
                                            src="images/socialMedia/twitter.png"
                                            alt="imagen1"
                                            className="cara cara3  bg-white"
                                        />
                                        <img
                                            src="images/socialMedia/twitter.png"
                                            alt="imagen1"
                                            className="cara cara4  bg-white"
                                        />
                                        <img
                                            src="images/socialMedia/twitter.png"
                                            alt="imagen1"
                                            className="cara cara5  bg-white"
                                        />
                                        <img
                                            src="images/socialMedia/twitter.png"
                                            alt="imagen1"
                                            className="cara cara6  bg-white"
                                        />
                                    </div>
                                </div>
                            </a>
                        )}
                        {redes.Facebook !== null && (
                            <a href={redes.Facebook} target="_blank">
                                <div className="espacio3D">
                                    <div className="cubo3D">
                                        <div className="base" />
                                        <img
                                            src="images/socialMedia/facebook.png"
                                            alt="imagen1"
                                            className="cara cara1"
                                        />
                                        <img
                                            src="images/socialMedia/facebook.png"
                                            alt="imagen1"
                                            className="cara cara2"
                                        />
                                        <img
                                            src="images/socialMedia/facebook.png"
                                            alt="imagen1"
                                            className="cara cara3"
                                        />
                                        <img
                                            src="images/socialMedia/facebook.png"
                                            alt="imagen1"
                                            className="cara cara4"
                                        />
                                        <img
                                            src="images/socialMedia/facebook.png"
                                            alt="imagen1"
                                            className="cara cara5"
                                        />
                                        <img
                                            src="images/socialMedia/facebook.png"
                                            alt="imagen1"
                                            className="cara cara6"
                                        />
                                    </div>
                                    {/* termina cubo 3d */}
                                </div>
                                {/* termina espacio 3d */}
                            </a>
                        )}
                    </div>
                </div>
            )}
            <div
                className="arrow-icon"
                onClick={toggleDrawer}
                style={{
                    position: "fixed",
                    top: "50%",
                    right: isOpen ? "80px" : "0px",
                    zIndex: 999,
                    transition: "right 0.5s",
                    cursor: "pointer",
                }}
            >
                <FontAwesomeIcon
                    icon={getArrowIcon()}
                    size="2x"
                    style={{ color: configuracion.color2, marginTop: "20px" }}
                    onClick={handleArrowClick}
                />
            </div>
            <div />
        </div>
    );
}

export default SocialMediaTab;
