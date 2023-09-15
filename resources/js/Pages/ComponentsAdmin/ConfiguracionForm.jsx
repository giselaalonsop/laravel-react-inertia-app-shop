import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import axios from "axios";
import { Container, Button, Col, Row } from "react-bootstrap";
import { ChromePicker } from "react-color";
import React, { useState, useRef, useEffect } from "react";
import "../../../css/app.css";

const ConfiguracionForm = ({ empresa, configuraciones }) => {
    const nombre = ["Base", "Complementario", "Detalles", "Otros"];
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFavicon, setSelectedFavicon] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [chrome, setChrome] = useState(0); // Inicialmente ningún círculo seleccionado
    const [circleColors, setCircleColors] = useState([
        configuraciones.color1 || "",
        configuraciones.color2 || "",
        configuraciones.color3 || "",
        configuraciones.color4 || "",
    ]);

    const handleCircleColorChange = (index, color) => {
        const updatedColors = [...circleColors];
        updatedColors[index] = color;
        setCircleColors(updatedColors);
    };
    {
        /*validar que solo sea imagen*/
    }
    const handleDrop = (acceptedFiles, type) => {
        const file = acceptedFiles[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                if (type === "logo") {
                    setSelectedImage(file);
                } else if (type === "favicon") {
                    setSelectedFavicon(file);
                }
                setErrorMessage("");
            } else {
                setSelectedImage(null);
                setSelectedFavicon(null);
                setErrorMessage("El archivo debe ser una imagen");
            }
        }
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            if (selectedImage) {
                formData.append("logo", selectedImage);
            }
            if (selectedFavicon) {
                formData.append("favicon", selectedFavicon);
            }
            for (let i = 0; i < circleColors.length; i++) {
                formData.append(`color${i + 1}`, circleColors[i]);
            }

            const response = await axios.post("/configuracion", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                Swal.fire("Registro procesado", "", "success");
            } else {
                console.error("Error al guardar los datos");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const logoDropzone = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, "logo"),
        accept: "image/*",
    });

    const faviconDropzone = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, "favicon"),
        accept: "image/*",
    });

    return (
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
                                    Configuraciones
                                </h2>
                            </div>
                            <div
                                className="card-body"
                                style={{
                                    backgroundColor: configuraciones.color1,
                                }}
                            >
                                <section className="container">
                                    {errorMessage && (
                                        <p className="error-message  text-center text-red-600">
                                            {errorMessage}
                                        </p>
                                    )}
                                    <Container>
                                        <form
                                            encType="multipart/form-data"
                                            className="text-center d-flex align-items-center justify-content-center"
                                        >
                                            <div className="text-center mx-2">
                                                <p className="border border-dashed bg-gray-200 mt-5 rounded">
                                                    Logo
                                                </p>
                                                <div
                                                    className={`image-dropzone dropzone border border-primary border-dashed text-center 
                                                    rounded d-flex align-items-center justify-content-center pointer ${
                                                        logoDropzone.isDragActive
                                                            ? "bg-light border-secondary"
                                                            : ""
                                                    }`}
                                                    style={{
                                                        width: "170px", // Ancho completo en dispositivos grandes
                                                        height: "200px", // Altura fija
                                                    }}
                                                    {...logoDropzone.getRootProps()}
                                                >
                                                    <input
                                                        {...logoDropzone.getInputProps()}
                                                    />
                                                    {selectedImage ? (
                                                        <div className="preview">
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    selectedImage
                                                                )}
                                                                alt="Imagen seleccionada"
                                                                className="max-h-60 img-fluid"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit:
                                                                        "cover",
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="py-5">
                                                            {configuraciones.logo ? (
                                                                <img
                                                                    src={
                                                                        configuraciones.logo
                                                                    }
                                                                    alt="Logo actual"
                                                                    className="max-h-60 img-fluid"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit:
                                                                            "cover",
                                                                    }}
                                                                />
                                                            ) : (
                                                                <p>
                                                                    Arrastra y
                                                                    suelta una
                                                                    imagen aquí
                                                                    o haz clic
                                                                    para
                                                                    seleccionarla
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="text-center mx-2">
                                                <p className="border border-dashed   mt-5 bg-gray-200 rounded ">
                                                    Favicon
                                                </p>
                                                <div
                                                    className={`image-dropzone dropzone border border-primary border-dashed text-center 
                                                    d-flex align-items-center justify-content-center rounded pointer  ${
                                                        faviconDropzone.isDragActive
                                                            ? "bg-light border-secondary"
                                                            : ""
                                                    }`}
                                                    style={{
                                                        width: "170px", // Ancho completo en dispositivos grandes
                                                        height: "200px", // Altura fija
                                                    }}
                                                    {...faviconDropzone.getRootProps()}
                                                >
                                                    <input
                                                        {...faviconDropzone.getInputProps()}
                                                    />
                                                    {selectedFavicon ? (
                                                        <div className="preview">
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    selectedFavicon
                                                                )}
                                                                alt="Imagen seleccionada"
                                                                className="max-h-60 img-fluid"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit:
                                                                        "cover",
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="py-5">
                                                            {configuraciones.favicon ? (
                                                                <img
                                                                    src={
                                                                        configuraciones.favicon
                                                                    }
                                                                    alt="Favicon actual"
                                                                    className="max-h-60 img-fluid"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit:
                                                                            "cover",
                                                                    }}
                                                                />
                                                            ) : (
                                                                <p>
                                                                    Arrastra y
                                                                    suelta una
                                                                    imagen aquí
                                                                    o haz clic
                                                                    para
                                                                    seleccionarla
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </form>

                                        <div className="wrapper mt-5">
                                            <div className="card mt-5 border border-dashed">
                                                <div className=" card-header text-center card-title bg-gray-200">
                                                    Colores de la pagina
                                                </div>
                                                <div className="card-body">
                                                    <section className="container ">
                                                        <div className="text-center">
                                                            <h5></h5>
                                                        </div>

                                                        <Row>
                                                            <Col xs={3}>
                                                                {circleColors.map(
                                                                    (
                                                                        color,
                                                                        index
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="color-circle-wrapper my-3"
                                                                            onClick={() =>
                                                                                setChrome(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <Button
                                                                                className="py-2 d-flex justify-content-center align-items-center bg-gradient border-gray-500 rounded"
                                                                                style={{
                                                                                    background:
                                                                                        color,
                                                                                    height: "2rem",
                                                                                    width: "2rem",
                                                                                    borderRadius:
                                                                                        "50%",
                                                                                    borderWidth:
                                                                                        "2px",
                                                                                }}
                                                                            ></Button>
                                                                            <p className="color-name d-none d-sm-flex">
                                                                                Color{" "}
                                                                                {index +
                                                                                    1}
                                                                            </p>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </Col>
                                                            <Col xs={9}>
                                                                {chrome !==
                                                                    -1 && (
                                                                    <ChromePicker
                                                                        styles={{
                                                                            default:
                                                                                {
                                                                                    picker: {
                                                                                        width: "100%",
                                                                                    },
                                                                                },
                                                                        }}
                                                                        color={
                                                                            circleColors[
                                                                                chrome
                                                                            ]
                                                                        }
                                                                        onChange={(
                                                                            color
                                                                        ) =>
                                                                            handleCircleColorChange(
                                                                                chrome,
                                                                                color.hex
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </section>
                                                </div>
                                            </div>
                                        </div>
                                    </Container>
                                    <div className="text-center mt-0">
                                        <button
                                            className="btn btn-primary"
                                            style={{
                                                backgroundColor:
                                                    configuraciones.color4,
                                                borderColor:
                                                    configuraciones.color4, // Cambia el color del borde si es necesario
                                            }}
                                            onClick={handleUpload}
                                        >
                                            Registrar
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
};

export default ConfiguracionForm;
