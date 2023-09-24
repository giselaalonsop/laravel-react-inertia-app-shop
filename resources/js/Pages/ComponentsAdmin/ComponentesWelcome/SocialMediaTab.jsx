import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "../../../../css/SocialMediaTab.css";
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
    const drawerStyles = {
        maxHeight: "50%", // Ajusta la altura máxima según sea necesario
        width: "5%",
        marginTop: "200px",
        backgroundColor: "rgba(255, 255, 255, 0)",
        boxShadow: "none",
    };

    return (
        <div>
            {isDrawerVisible && (
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction="right"
                    className="drawer-content"
                    style={drawerStyles}
                    backgroundColor="none"
                    overlayColor="none"
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
                </Drawer>
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
                />
            </div>
        </div>
    );
}

export default SocialMediaTab;
