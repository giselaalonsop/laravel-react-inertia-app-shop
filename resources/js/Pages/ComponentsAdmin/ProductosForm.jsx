import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Col, Row, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { MDBIcon } from "mdb-react-ui-kit";

export default function ({ configuraciones, productos }) {
    const [nombre, setNombre] = useState("producto");
    const [precio, setPrecio] = useState("100");
    const [tabla, setTabla] = useState(false);
    const [descripcion, setDescripcion] = useState("Nuevo");
    const [multimedia, setMultimedia] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [productInEdit, setProductInEdit] = useState(null);
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [selectedImage3, setSelectedImage3] = useState(null);
    const [platform, setPlatform] = useState({
        type: "Instagram",
        link: "https://www.instagram.com/p/ejemplo",
    });
    const [errors, setErrors] = useState([]);
    const [isChecked, setIsChecked] = useState(true);

    const nombreInputRef = useRef(null);
    const precioInputRef = useRef(null);
    const linkInputRef = useRef(null);
    const imagen1Ref = useRef(null);
    const imagen2Ref = useRef(null);
    const imagen3Ref = useRef(null);
    const descripcionInputRef = useRef(null);

    const handleChangeTabla = () => {
        setTabla(!tabla);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Cambia el estado del hook al contrario del valor actual
    };

    const handleChangeNombre = (e) => {
        setNombre(e.target.value);
    };
    const handleChangePrecio = (e) => {
        setPrecio(e.target.value);
    };
    const handleChangeDescripcion = (e) => {
        setDescripcion(e.target.value);
    };
    const handleDrop = (acceptedFiles, imageType) => {
        const file = acceptedFiles[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                if (imageType === "image1") {
                    setSelectedImage1(file);
                } else if (imageType === "image2") {
                    setSelectedImage2(file);
                } else if (imageType === "image3") {
                    setSelectedImage3(file);
                }
            } else {
                setSelectedImage1(null);
                setSelectedImage2(null);
                setSelectedImage3(null);
            }
        }
    };

    const image1Dropzone = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, "image1"),
        accept: "image/*",
    });

    const image2Dropzone = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, "image2"),
        accept: "image/*",
    });

    const image3Dropzone = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, "image3"),
        accept: "image/*",
    });

    const validate = (link) => {
        const error = {};
        if (!nombre || !precio || !descripcion) {
            error.todos = "Por favor, complete todos los campos";
        }
        if (!/.*[A-Za-z].*/.test(nombre)) {
            error.nombre = "Por favor, ingrese un nombre de producto válido";
        }

        if (!/^[0-9]+$/.test(precio)) {
            error.precio = "Por favor, ingrese un precio válido";
        }

        if (isChecked) {
            if (platform.type === "Instagram") {
                const instagramRegex = /https:\/\/www\.instagram\.com\/.+/;
                error.link =
                    !instagramRegex.test(link) &&
                    "El enlace no es valido para Instagram";
            } else if (platform.type === "Youtube") {
                const youtubeRegex = /https:\/\/www\.youtube\.com\/.+/;
                error.link =
                    !youtubeRegex.test(link) &&
                    "El enlace no es valido para Youtube";
            }
        }

        if (Object.keys(error).length === 0) {
            // No hay errores, borrar todos los errores
            setErrors({});
            return true;
        } else {
            // Hay errores, establecer los nuevos errores
            setErrors(error);
            return false;
        }
    };
    useEffect(() => {
        validate(platform.link);
    }, [platform.link, isChecked, nombre, precio, descripcion, tabla]);

    const handleSave = async (e) => {
        e.preventDefault();
        const isValid = validate(platform.link);

        try {
            const formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("precio", precio);
            formData.append("descripcion", descripcion);
            if (selectedImage1) {
                formData.append("imagen1", selectedImage1);
            }
            if (selectedImage2) {
                formData.append("imagen2", selectedImage2);
            }
            if (selectedImage3) {
                formData.append("imagen3", selectedImage3);
            }

            formData.append("multimedia", multimedia);
            if (isEdit) {
                const response = await axios.post(`/productos/edit`, formData);
                if (response.status === 200) {
                    Swal.fire(
                        "Producto actualizado",
                        "El producto se ha actualizado correctamente",
                        "success"
                    );
                    // Realiza cualquier otra acción necesaria, como redirigir o actualizar la lista de productos
                } else {
                    Swal.fire(
                        "Error al actualizar",
                        "El producto no se ha actualizado correctamente",
                        "error"
                    );
                }
            } else {
                const response = await axios.post("/productos/save", formData);
                if (response.status === 201) {
                    Swal.fire(
                        "Producto registrado",
                        "El producto se ha registrado correctamente",
                        "success"
                    );
                } else {
                    Swal.fire(
                        "Error al registrar",
                        "El producto no se ha registrado correctamente",
                        "error"
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveProduct = async (id) => {
        if (id) {
            await axios.delete(`/productos/${id}`);
            Swal.fire(
                "Producto eliminado",
                "El producto se ha eliminado correctamente",
                "success"
            );
        }
    };

    const handleUpdateProducto = (producto) => {
        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setDescripcion(producto.descripcion);
        setMultimedia(producto.multimedia);
        setSelectedImage1(producto.imagen1);
        setSelectedImage2(producto.imagen2);
        setSelectedImage3(producto.imagen3);
        setIsEdit(true);
        setProductInEdit(producto.id);
        setTabla(false);
    };
    const handleLinkChange = (e) => {
        setPlatform({
            ...platform,
            link: e.target.value,
        });
    };
    const handlePlatformChange = (e) => {
        setPlatform({
            ...platform,
            type: e.target.value,
        });
        setPlatform({
            ...platform,
            link: `https://www.${event.target.value.toLowerCase()}.com/ejemplo`,
        });
    };
    useEffect(() => {
        nombreInputRef.current.focus();
    }, []);

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
                        <div className="col-lg-6 ">
                            <div
                                className="card mt-2 "
                                style={{
                                    backgroundColor: configuraciones.color1,
                                }}
                            >
                                <div class="card-header text-center bg-gray-200">
                                    <h2
                                        className="text-center mt-3"
                                        style={{
                                            fontFamily: "Arial, sans-serif",
                                            color: configuraciones.color3,
                                        }}
                                    >
                                        Formulario de Productos
                                    </h2>
                                </div>

                                <div className="card-body ">
                                    {tabla ? (
                                        <div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">
                                                            Nombre
                                                        </th>
                                                        <th className="text-center d-none d-md-table-cell">
                                                            Precio
                                                        </th>
                                                        <th className="text-center d-none d-md-table-cell">
                                                            Descripción
                                                        </th>
                                                        <th className="text-center">
                                                            Imagen
                                                        </th>
                                                        <th className="text-center">
                                                            Acción
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productos.map(
                                                        (producto) => (
                                                            <tr
                                                                key={
                                                                    producto.id
                                                                }
                                                            >
                                                                <td className="text-center">
                                                                    {
                                                                        producto.nombre
                                                                    }
                                                                </td>
                                                                <td className="text-center d-none d-md-table-cell">
                                                                    {
                                                                        producto.precio
                                                                    }
                                                                </td>
                                                                <td className="text-center d-none d-md-table-cell">
                                                                    {
                                                                        producto.descripcion
                                                                    }
                                                                </td>
                                                                <td className="text-center">
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <img
                                                                            src={
                                                                                producto.imagen1
                                                                            }
                                                                            alt=""
                                                                            style={{
                                                                                maxWidth:
                                                                                    "70px",
                                                                                maxHeight:
                                                                                    "70px",
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="text-center ">
                                                                    <MDBIcon
                                                                        className="mt-4 cursor-pointer mx-4"
                                                                        icon="trash-alt"
                                                                        size="lg"
                                                                        onClick={() =>
                                                                            handleRemoveProduct(
                                                                                producto.id
                                                                            )
                                                                        }
                                                                    />

                                                                    <MDBIcon
                                                                        fas
                                                                        icon="edit"
                                                                        className="mt-4 cursor-pointer mx-2"
                                                                        size="lg"
                                                                        onClick={() =>
                                                                            handleUpdateProducto(
                                                                                producto
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                            <Row className="justify-content-center">
                                                <Col xs="auto" className="mt-1">
                                                    <button
                                                        className="btn btn-primary"
                                                        style={{
                                                            backgroundColor:
                                                                configuraciones.color3,
                                                            borderColor:
                                                                configuraciones.color3, // Cambia el color del borde si es necesario
                                                        }}
                                                        name="tabla"
                                                        onClick={
                                                            handleChangeTabla
                                                        }
                                                    >
                                                        Ver Registro
                                                    </button>
                                                </Col>
                                            </Row>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="text-center position-absolute top-20 start-50 translate-middle-x is-invalid">
                                                {errors.todos && (
                                                    <div className="text-danger text-center small">
                                                        {errors.todos}
                                                    </div>
                                                )}
                                            </div>
                                            <Container className="py-4">
                                                <Form>
                                                    <Row className="mb-3">
                                                        <Col className="mt-1">
                                                            <Form.Label>
                                                                Nombre del
                                                                producto
                                                            </Form.Label>
                                                            <div className="input-group ">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="nombre"
                                                                    value={
                                                                        nombre
                                                                    }
                                                                    onChange={
                                                                        handleChangeNombre
                                                                    }
                                                                    ref={
                                                                        nombreInputRef
                                                                    }
                                                                    onKeyDown={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            e.key ===
                                                                            "Enter"
                                                                        ) {
                                                                            precioInputRef.current.focus();
                                                                        }
                                                                    }}
                                                                />
                                                                <span className="input-group-text"></span>
                                                            </div>
                                                            <Form.Control.Feedback
                                                                type="invalid"
                                                                className="d-block mt-1  text-xs"
                                                            >
                                                                {errors.nombre}
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                        <Col className="mt-1">
                                                            <Form.Label>
                                                                Precio del
                                                                Producto
                                                            </Form.Label>
                                                            <div className="input-group ">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="precio"
                                                                    value={
                                                                        precio
                                                                    }
                                                                    onChange={
                                                                        handleChangePrecio
                                                                    }
                                                                    ref={
                                                                        precioInputRef
                                                                    }
                                                                    onKeyDown={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            e.key ===
                                                                            "Enter"
                                                                        ) {
                                                                            e.preventDefault();
                                                                            isChecked
                                                                                ? linkInputRef.current.focus()
                                                                                : descripcionInputRef.current.focus();
                                                                        }
                                                                    }}
                                                                />
                                                                <span className="input-group-text"></span>
                                                            </div>
                                                            <Form.Control.Feedback
                                                                type="invalid"
                                                                className="d-block mt-1  text-xs"
                                                            >
                                                                {errors.precio}
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                    </Row>
                                                    <form
                                                        encType="multipart/form-data"
                                                        className="text-center d-flex align-items-center justify-content-center"
                                                    >
                                                        <div className="text-center mx-2">
                                                            <p className="border border-dashed bg-gray-200 mt-5 rounded">
                                                                Imagen1
                                                            </p>
                                                            <div
                                                                className={`image-dropzone dropzone border border-primary border-dashed text-center 
                                                    rounded d-flex align-items-center justify-content-center pointer ${
                                                        image1Dropzone.isDragActive
                                                            ? "bg-light border-secondary"
                                                            : ""
                                                    }`}
                                                                style={{
                                                                    width: "170px", // Ancho completo en dispositivos grandes
                                                                    height: "200px", // Altura fija
                                                                }}
                                                                {...image1Dropzone.getRootProps()}
                                                            >
                                                                <input
                                                                    ref={
                                                                        imagen1Ref
                                                                    }
                                                                    {...image1Dropzone.getInputProps()}
                                                                />
                                                                {selectedImage1 ? (
                                                                    <div className="preview">
                                                                        <img
                                                                            src={URL.createObjectURL(
                                                                                selectedImage1
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
                                                                        <p>
                                                                            Arrastra
                                                                            y
                                                                            suelta
                                                                            una
                                                                            imagen
                                                                            aquí
                                                                            o
                                                                            haz
                                                                            clic
                                                                            para
                                                                            seleccionarla
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="text-center mx-2 ">
                                                            <div
                                                                className="border border-dashed bg-gray-200 mt-5 rounded"
                                                                style={{
                                                                    maxWidth:
                                                                        "170px",
                                                                }}
                                                            >
                                                                Imagen 2
                                                            </div>
                                                            <div
                                                                className={`image-dropzone dropzone border border-primary border-dashed text-center 
                                                                rounded d-flex align-items-center justify-content-center pointer ${
                                                                    image2Dropzone.isDragActive
                                                                        ? "bg-light border-secondary"
                                                                        : ""
                                                                }`}
                                                                style={{
                                                                    width: "170px", // Ancho completo en dispositivos grandes
                                                                    height: "200px", // Altura fija
                                                                }}
                                                                {...image2Dropzone.getRootProps()}
                                                            >
                                                                <input
                                                                    {...image2Dropzone.getInputProps()}
                                                                />
                                                                {selectedImage2 ? (
                                                                    <div className="preview">
                                                                        <img
                                                                            src={URL.createObjectURL(
                                                                                selectedImage2
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
                                                                        <p>
                                                                            Arrastra
                                                                            y
                                                                            suelta
                                                                            una
                                                                            imagen
                                                                            del
                                                                            producto
                                                                            aquí
                                                                            o
                                                                            haz
                                                                            clic
                                                                            para
                                                                            seleccionarla
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="text-center mx-2 ">
                                                            <div
                                                                className="border border-dashed bg-gray-200 mt-5 rounded"
                                                                style={{
                                                                    maxWidth:
                                                                        "170px",
                                                                }}
                                                            >
                                                                Imagen 3
                                                            </div>
                                                            <div
                                                                className={`image-dropzone dropzone border border-primary border-dashed text-center 
                                                                rounded d-flex align-items-center justify-content-center pointer ${
                                                                    image3Dropzone.isDragActive
                                                                        ? "bg-light border-secondary"
                                                                        : ""
                                                                }`}
                                                                style={{
                                                                    width: "170px", // Ancho completo en dispositivos grandes
                                                                    height: "200px", // Altura fija
                                                                }}
                                                                {...image3Dropzone.getRootProps()}
                                                            >
                                                                <input
                                                                    {...image3Dropzone.getInputProps()}
                                                                />
                                                                {selectedImage3 ? (
                                                                    <div className="preview">
                                                                        <img
                                                                            src={URL.createObjectURL(
                                                                                selectedImage1
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
                                                                        <p>
                                                                            Arrastra
                                                                            y
                                                                            suelta
                                                                            una
                                                                            imagen
                                                                            del
                                                                            producto
                                                                            aquí
                                                                            o
                                                                            haz
                                                                            clic
                                                                            para
                                                                            seleccionarla
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <section className="container mt-4">
                                                        <Container>
                                                            <section>
                                                                <Form>
                                                                    <div>
                                                                        <div
                                                                            className={` row mb-3 align-items-center  rounded p-2
                                                                        }`}
                                                                            style={{
                                                                                backgroundColor:
                                                                                    "#f8f9fa",
                                                                            }}
                                                                        >
                                                                            <div className="col-13 col-md-1"></div>
                                                                            <div className="col-1 col-md-1">
                                                                                <Form.Check
                                                                                    type="checkbox"
                                                                                    checked={
                                                                                        isChecked
                                                                                    }
                                                                                    onChange={
                                                                                        handleCheckboxChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="col-5 col-md-5">
                                                                                <Form.Group>
                                                                                    <Form.Label>
                                                                                        Plataforma
                                                                                    </Form.Label>
                                                                                    <div className="input-group">
                                                                                        <span className="input-group-text">
                                                                                            {platform.type ===
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
                                                                                                    e
                                                                                                )
                                                                                            }
                                                                                            value={
                                                                                                platform
                                                                                            }
                                                                                            disabled={
                                                                                                !isChecked
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
                                                                                            platform.link
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleLinkChange(
                                                                                                e
                                                                                            )
                                                                                        }
                                                                                        isInvalid={
                                                                                            errors &&
                                                                                            errors.link
                                                                                        }
                                                                                        disabled={
                                                                                            !isChecked
                                                                                        }
                                                                                        ref={
                                                                                            linkInputRef
                                                                                        }
                                                                                        onKeyDown={(
                                                                                            e
                                                                                        ) => {
                                                                                            if (
                                                                                                e.key ===
                                                                                                "Enter"
                                                                                            ) {
                                                                                                e.preventDefault();
                                                                                                descripcionInputRef.current.focus();
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                    <Form.Control.Feedback type="invalid">
                                                                                        {errors &&
                                                                                            errors.link}
                                                                                    </Form.Control.Feedback>
                                                                                </Form.Group>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Form>
                                                            </section>
                                                        </Container>
                                                    </section>

                                                    <Row className="mb-3 mt-4">
                                                        <Col className="mt-1">
                                                            <Form.Label>
                                                                Descripcion
                                                            </Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                rows={3}
                                                                name="descripcion"
                                                                value={
                                                                    descripcion
                                                                }
                                                                onChange={
                                                                    handleChangeDescripcion
                                                                }
                                                                ref={
                                                                    descripcionInputRef
                                                                }
                                                                onKeyDown={(
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        e.key ===
                                                                        "Enter"
                                                                    ) {
                                                                        e.preventDefault();
                                                                        handleSave();
                                                                    }
                                                                }}
                                                            />
                                                            <Form.Control.Feedback
                                                                type="invalid"
                                                                className="d-block mt-1  text-xs"
                                                            >
                                                                {
                                                                    errors.descripcion
                                                                }
                                                            </Form.Control.Feedback>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col className="mt-1"></Col>
                                                    </Row>

                                                    <Row className="justify-content-center">
                                                        <Col
                                                            xs="auto"
                                                            className="mt-1"
                                                        >
                                                            <button
                                                                className="btn btn-primary"
                                                                style={{
                                                                    backgroundColor:
                                                                        configuraciones.color4,
                                                                    borderColor:
                                                                        configuraciones.color4, // Cambia el color del borde si es necesario
                                                                }}
                                                                onClick={
                                                                    handleSave
                                                                }
                                                            >
                                                                Registrar
                                                            </button>
                                                        </Col>
                                                        <Col
                                                            xs="auto"
                                                            className="mt-1"
                                                        >
                                                            <button
                                                                className="btn btn-primary"
                                                                style={{
                                                                    backgroundColor:
                                                                        configuraciones.color3,
                                                                    borderColor:
                                                                        configuraciones.color3, // Cambia el color del borde si es necesario
                                                                }}
                                                                onClick={
                                                                    handleChangeTabla
                                                                }
                                                            >
                                                                Ver Productos
                                                            </button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Container>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
