import Swal from "sweetalert2";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { MDBIcon } from "mdb-react-ui-kit";

export default function PostForm({ configuraciones, empresa, links }) {
    const [errors, setErrors] = useState([]);

    const [platforms, setPlatforms] = useState([]);
    const [newPlatform, setNewPlatform] = useState({
        type: "Instagram",
        link: "https://www.instagram.com/p/ejemplo",
    });
    // Funciones para validar enlaces de Instagram y YouTube
    const isValidInstagramLink = (link) => {
        const instagramRegex = /https:\/\/www\.instagram\.com\/.+/;
        return instagramRegex.test(link);
    };

    const isValidYouTubeLink = (link) => {
        const youtubeRegex = /https:\/\/www\.youtube\.com\/.+/;
        return youtubeRegex.test(link);
    };
    const validar = (platforms) => {
        const newErrors = platforms.map((platformItem, index) => {
            const platformErrors = {};

            if (platformItem.type === "Instagram") {
                if (!platformItem.link) {
                    platformErrors.link =
                        "El enlace de Instagram no puede estar vacío.";
                } else if (!isValidInstagramLink(platformItem.link)) {
                    platformErrors.link =
                        "El enlace de Instagram no es válido.";
                }
            } else if (platformItem.type === "Youtube") {
                if (!platformItem.link) {
                    platformErrors.link =
                        "El enlace de YouTube no puede estar vacío.";
                } else if (!isValidYouTubeLink(platformItem.link)) {
                    platformErrors.link = "El enlace de YouTube no es válido.";
                }
            }

            return platformErrors;
        });

        // Actualiza el estado de errores
        setErrors(newErrors);
    };

    useEffect(() => {
        // Inicializar el estado platforms con los enlaces guardados
        if (links) {
            const initialPlatforms = [];

            Object.keys(links).forEach((tipo) => {
                links[tipo].forEach((link) => {
                    initialPlatforms.push({
                        id: link.id,
                        type: tipo,
                        link: link.link,
                    });
                });
            });

            setPlatforms(initialPlatforms);
        }
    }, [links]);
    useEffect(() => {
        validar(platforms);
    }, [platforms]);

    const handleAddPlatform = () => {
        setPlatforms([...platforms, { ...newPlatform, id: null }]);
        setNewPlatform({
            type: "Instagram",
            link: "https://www.instagram.com/p/ejemplo",
        });
    };

    const handleRemovePlatform = async (id, index) => {
        try {
            if (id) {
                await axios.delete(`/posts/${id}`);
            }

            const newPlatforms = [...platforms];
            newPlatforms.splice(index, 1);
            setPlatforms(newPlatforms);

            //     Swal.fire(
            //         "Éxito",
            //         "El enlace se ha eliminado correctamente.",
            //         "success"
            //     );
            // } catch (error) {
            //     console.error("Error al eliminar el enlace:", error);
            //     Swal.fire("Error", "Hubo un error al eliminar el enlace.", "error");
            // }
        } catch (error) {
            console.error("Error al eliminar el enlace:", error);
        }
    };

    const handlePlatformChange = (event, index) => {
        const newPlatforms = [...platforms];
        newPlatforms[index].type = event.target.value;
        newPlatforms[index].link = `https://www.${newPlatforms[
            index
        ].type.toLowerCase()}.com/ejemplo`;
        setPlatforms(newPlatforms);
    };

    const handleLinkChange = (event, index) => {
        const newPlatforms = [...platforms];
        newPlatforms[index].link = event.target.value;
        setPlatforms(newPlatforms);
    };

    const handleSubmit = async (e) => {
        const val = validar(platforms);
        if (val != null) {
            e.preventDefault();
            Swal.fire(
                "Error",
                "Hubo un error al guardar/actualizar los enlaces.",
                "error"
            );
            return;
        }
        try {
            const newPlatformsToSave = platforms.filter(
                (platform) => !platform.id
            );
            const existingPlatformsToUpdate = platforms.filter(
                (platform) => platform.id
            );

            if (newPlatformsToSave.length > 0) {
                await axios.post("/posts", { platforms: newPlatformsToSave });
            }

            if (existingPlatformsToUpdate.length > 0) {
                await axios.put("/posts.up", {
                    platforms: existingPlatformsToUpdate,
                });
            }

            Swal.fire(
                "Éxito",
                "Los enlaces se han guardado/actualizado correctamente.",
                "success"
            );
        } catch (error) {
            console.error("Error al guardar/actualizar los enlaces:", error);
            Swal.fire(
                "Error",
                "Hubo un error al guardar/actualizar los enlaces.",
                "error"
            );
        }
    };

    return (
        <div>
            <div className="content-wrapper">
                <div
                    className=""
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
                                        Publicaciones
                                    </h2>
                                </div>
                                <div
                                    className="card-body"
                                    style={{
                                        backgroundColor: configuraciones.color1,
                                    }}
                                >
                                    <section className="container">
                                        <Container>
                                            <section>
                                                <Form>
                                                    {platforms.map(
                                                        (
                                                            platformItem,
                                                            index
                                                        ) => (
                                                            <div
                                                                key={index}
                                                                className="mb-3 align-items-center rounded p-3"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#f8f9fa",
                                                                }}
                                                            >
                                                                <div className="row">
                                                                    <div className="col-12 col-md-1"></div>
                                                                    <div className="col-6 col-md-5">
                                                                        <Form.Group>
                                                                            <Form.Label>
                                                                                Plataforma
                                                                            </Form.Label>
                                                                            <div className="input-group">
                                                                                <span className="input-group-text">
                                                                                    {platformItem.type ===
                                                                                    "Instagram" ? (
                                                                                        <FontAwesomeIcon
                                                                                            icon={
                                                                                                faInstagram
                                                                                            }
                                                                                            size="lg"
                                                                                        />
                                                                                    ) : (
                                                                                        <FontAwesomeIcon
                                                                                            icon={
                                                                                                faYoutube
                                                                                            }
                                                                                            size="lg"
                                                                                        />
                                                                                    )}
                                                                                </span>
                                                                                <Form.Control
                                                                                    as="select"
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handlePlatformChange(
                                                                                            e,
                                                                                            index
                                                                                        )
                                                                                    }
                                                                                    value={
                                                                                        platformItem.type
                                                                                    }
                                                                                >
                                                                                    <option value="Instagram">
                                                                                        Instagram
                                                                                    </option>
                                                                                    <option value="Youtube">
                                                                                        Youtube
                                                                                    </option>
                                                                                </Form.Control>
                                                                            </div>
                                                                        </Form.Group>
                                                                    </div>
                                                                    <div className="col-6 col-md-5">
                                                                        <Form.Group>
                                                                            <Form.Label>
                                                                                Enlace
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                type="url"
                                                                                value={
                                                                                    platformItem.link
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleLinkChange(
                                                                                        e,
                                                                                        index
                                                                                    )
                                                                                }
                                                                                isInvalid={
                                                                                    errors[
                                                                                        index
                                                                                    ] &&
                                                                                    errors[
                                                                                        index
                                                                                    ]
                                                                                        .link
                                                                                }
                                                                            />
                                                                            <Form.Control.Feedback type="invalid">
                                                                                {errors[
                                                                                    index
                                                                                ] &&
                                                                                    errors[
                                                                                        index
                                                                                    ]
                                                                                        .link}
                                                                            </Form.Control.Feedback>
                                                                        </Form.Group>
                                                                    </div>
                                                                    <Col
                                                                        xs={1}
                                                                        className="order-2 order-sm-1"
                                                                    >
                                                                        {index >
                                                                            -1 && (
                                                                            <MDBIcon
                                                                                onClick={() =>
                                                                                    handleRemovePlatform(
                                                                                        platformItem.id,
                                                                                        index
                                                                                    )
                                                                                }
                                                                                className="mt-4 cursor-pointer"
                                                                                icon="trash-alt"
                                                                            />
                                                                        )}
                                                                    </Col>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}

                                                    <div className=" text-center my-2 a">
                                                        <Button
                                                            variant="primary"
                                                            onClick={
                                                                handleAddPlatform
                                                            }
                                                            className="mt-3"
                                                            style={{
                                                                backgroundColor:
                                                                    "blue",
                                                            }}
                                                        >
                                                            +
                                                        </Button>
                                                    </div>

                                                    <Row className="mb-3 align-items-center">
                                                        <Col xs={12}>
                                                            <div className="text-center mt-10">
                                                                <button
                                                                    className="btn btn-primary"
                                                                    style={{
                                                                        backgroundColor:
                                                                            configuraciones.color4,
                                                                        borderColor:
                                                                            configuraciones.color4,
                                                                    }}
                                                                    onClick={
                                                                        handleSubmit
                                                                    }
                                                                >
                                                                    Registrar
                                                                </button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </section>
                                        </Container>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
