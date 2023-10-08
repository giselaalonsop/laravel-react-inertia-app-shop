import Swal from "sweetalert2";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function PostForm({ configuraciones, empresa, links }) {
    const [platforms, setPlatforms] = useState([]);
    const [newPlatform, setNewPlatform] = useState({
        type: "Instagram",
        link: "",
    });

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

    const handleAddPlatform = () => {
        setPlatforms([...platforms, { ...newPlatform, id: null }]);
        setNewPlatform({ type: "Instagram", link: "" });
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
        setPlatforms(newPlatforms);
    };

    const handleLinkChange = (event, index) => {
        const newPlatforms = [...platforms];
        newPlatforms[index].link = event.target.value;
        setPlatforms(newPlatforms);
    };

    const handleSubmit = async (e) => {
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
                                                                className="mb-3 align-items-center  rounded p-3"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#f8f9fa",
                                                                }}
                                                            >
                                                                <Row>
                                                                    <Col xs={1}>
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
                                                                    </Col>
                                                                    <Col
                                                                        xs={6}
                                                                        sm={5}
                                                                    >
                                                                        <Form.Group>
                                                                            <Form.Label>
                                                                                Plataforma
                                                                            </Form.Label>
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
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col
                                                                        xs={6}
                                                                        sm={5}
                                                                    >
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
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col xs={1}>
                                                                        {index >
                                                                            -1 && (
                                                                            <Button
                                                                                variant="danger"
                                                                                onClick={() =>
                                                                                    handleRemovePlatform(
                                                                                        platformItem.id,
                                                                                        index
                                                                                    )
                                                                                }
                                                                                className="mt-3"
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        "Red",
                                                                                }}
                                                                            >
                                                                                -
                                                                            </Button>
                                                                        )}
                                                                    </Col>
                                                                </Row>
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
