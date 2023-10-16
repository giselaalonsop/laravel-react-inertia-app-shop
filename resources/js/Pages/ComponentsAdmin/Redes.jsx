import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import {
    faFacebook,
    faTwitter,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Swal from "sweetalert2";

export default function Redes({ empresa, configuraciones, redes }) {
    // Estados individuales para cada red social y su enlace
    const [facebook, setFacebook] = useState(
        redes?.Facebook == null ? false : true
    );
    const [instagram, setInstagram] = useState(
        redes?.Instagram == null ? false : true
    );
    const [twitter, setTwitter] = useState(
        redes?.Twitter == null ? false : true
    );

    // Estados para controlar los enlaces de las redes sociales
    const [linkInstagram, setLinkInstagram] = useState(
        redes?.Instagram || "https://www.Instagram.com/ejemplo"
    );
    const [linkFacebook, setLinkFacebook] = useState(
        redes?.Facebook || "https://www.Facebook.com/ejemplo"
    );
    const [linkTwitter, setLinkTwitter] = useState(
        redes?.Twitter || "https://www.Twitter.com/ejemplo"
    );

    // Estados para controlar los errores
    const [errors, setErrors] = useState({
        Instagram: "",
        Facebook: "",
        Twitter: "",
    });

    // Función para guardar los cambios
    const handleSave = async (e) => {
        // Comprobar si las redes sociales están desactivadas y asignar null a los enlaces correspondientes
        const urlsToSave = {
            Instagram: instagram ? linkInstagram : null,
            Facebook: facebook ? linkFacebook : null,
            Twitter: twitter ? linkTwitter : null,
        };

        // Limpia los mensajes de error antes de la validación
        setErrors({
            Instagram: "",
            Facebook: "",
            Twitter: "",
        });

        // Valida los enlaces y muestra los errores si es necesario
        for (const network in urlsToSave) {
            const url = urlsToSave[network];

            if (url === null) {
                continue; // Saltar la validación si el enlace es null
            }

            if (url.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [network]: `${network} está vacío`,
                }));
            } else if (!isValidURL(url)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [network]: `${network} no es una URL válida`,
                }));
            }
        }

        const hasErrors = Object.values(errors).some((error) => error !== "");

        if (hasErrors) {
            return; // Detiene la función si hay errores
        }

        try {
            const response = await axios.post("/redes", urlsToSave);

            if (response.status === 201) {
                Swal.fire("Registro procesado", "", "success");
                // Realizar otras acciones si es necesario, como redireccionar
            } else {
                // Manejar errores si la respuesta no es exitosa
                console.error("Error al guardar los datos");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    // Función para verificar si una cadena es una URL válida
    function isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
    useEffect(() => {
        const urlsToValidate = {
            Instagram: linkInstagram,
            Facebook: linkFacebook,
            Twitter: linkTwitter,
        };

        for (const network in urlsToValidate) {
            const url = urlsToValidate[network];

            if (url.trim() === "") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [network]: `${network} está vacío`,
                }));
            } else if (!isValidURL(url)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [network]: `${network} no es una URL válida`,
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [network]: "",
                }));
            }
        }
    }, [linkInstagram, linkFacebook, linkTwitter]);
    return (
        <div className="content-wrapper ">
            <div
                style={{
                    minHeight: "100vh",

                    backgroundColor: configuraciones.color2,
                }}
            >
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card mt-2 ">
                            <div className="card-header  text-center bg-gray-200 ">
                                <h2
                                    className="text-center mt-3 "
                                    style={{
                                        fontFamily: "Arial, sans-serif",
                                        color: configuraciones.color3,
                                    }}
                                >
                                    Configuraciones
                                </h2>
                            </div>
                            <div
                                className="card-body rounded-lg "
                                style={{
                                    backgroundColor: configuraciones.color1,
                                }}
                            >
                                <section className="container">
                                    <Container>
                                        <section>
                                            <Form>
                                                <Row className="mb-3 align-items-center ">
                                                    <Col
                                                        xs={12}
                                                        sm={5}
                                                        className="d-flex flex-row form-check form-switch my-2"
                                                    >
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="InstagramSwitch"
                                                            defaultChecked={
                                                                instagram
                                                            }
                                                            onClick={() =>
                                                                setInstagram(
                                                                    !instagram
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="InstagramSwitch"
                                                        >
                                                            <div className="d-flex align-items-center">
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faInstagram
                                                                    }
                                                                    size="lg"
                                                                />
                                                                Instagram
                                                            </div>
                                                        </label>
                                                    </Col>
                                                    {instagram ? (
                                                        <Col
                                                            xs={12}
                                                            sm={7}
                                                            className="my-2"
                                                        >
                                                            <Form.Control
                                                                type="url"
                                                                value={
                                                                    linkInstagram
                                                                }
                                                                onChange={(e) =>
                                                                    setLinkInstagram(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                isInvalid={
                                                                    errors.Instagram !==
                                                                    ""
                                                                }
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {
                                                                    errors.Instagram
                                                                }
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                    ) : null}
                                                </Row>
                                                <Row className="mb-3 align-items-center">
                                                    <Col
                                                        xs={12}
                                                        sm={5}
                                                        className="d-flex flex-row form-check form-switch my-2"
                                                    >
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="FacebookSwitch"
                                                            defaultChecked={
                                                                facebook
                                                            }
                                                            onClick={() =>
                                                                setFacebook(
                                                                    !facebook
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="FacebookSwitch"
                                                        >
                                                            <div className="d-flex align-items-center">
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faFacebook
                                                                    }
                                                                    size="lg"
                                                                />
                                                                Facebook
                                                            </div>
                                                        </label>
                                                    </Col>
                                                    {facebook && (
                                                        <Col
                                                            xs={12}
                                                            sm={7}
                                                            className="my-2"
                                                        >
                                                            <Form.Control
                                                                type="url"
                                                                value={
                                                                    linkFacebook
                                                                }
                                                                onChange={(e) =>
                                                                    setLinkFacebook(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                isInvalid={
                                                                    errors.Facebook !==
                                                                    ""
                                                                }
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {
                                                                    errors.Facebook
                                                                }
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                    )}
                                                </Row>
                                                <Row className="mb-3 align-items-center">
                                                    <Col
                                                        xs={12}
                                                        sm={5}
                                                        className="d-flex flex-row form-check form-switch my-2"
                                                    >
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="TwitterSwitch"
                                                            defaultChecked={
                                                                twitter
                                                            }
                                                            onChange={() =>
                                                                setTwitter(
                                                                    !twitter
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="TwitterSwitch"
                                                        >
                                                            <div className="d-flex align-items-center">
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTwitter
                                                                    }
                                                                    size="lg"
                                                                />
                                                                Twitter
                                                            </div>
                                                        </label>
                                                    </Col>
                                                    {twitter ? (
                                                        <Col
                                                            xs={12}
                                                            sm={7}
                                                            className="my-2"
                                                        >
                                                            <Form.Control
                                                                type="url"
                                                                value={
                                                                    linkTwitter
                                                                }
                                                                onChange={(e) =>
                                                                    setLinkTwitter(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                isInvalid={
                                                                    errors.Twitter !==
                                                                    ""
                                                                }
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.Twitter}
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                    ) : null}
                                                </Row>
                                            </Form>
                                        </section>
                                    </Container>

                                    <div className="text-center mt-0">
                                        <button
                                            className="btn btn-primary"
                                            style={{
                                                backgroundColor:
                                                    configuraciones.color4,
                                                borderColor:
                                                    configuraciones.color4,
                                            }}
                                            onClick={handleSave}
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
