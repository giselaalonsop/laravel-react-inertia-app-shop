import React, { useState, useRef, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {
    FaBuilding,
    FaIdCard,
    FaEnvelope,
    FaPhone,
    FaMapMarkedAlt,
} from "react-icons/fa";
import AutocompleteInput from "./AutoCompleteInput";
import Swal from "sweetalert2";
import axios from "axios";

const Wizard = ({ empresa, states, countries, configuraciones }) => {
    const [nombre, setNombre] = useState(
        empresa.nombre || "Ej: Mi Empresa S.A."
    );

    const [rif, setRif] = useState(empresa.rif || "Ej: J-123456789");
    const [correo1, setCorreo1] = useState(
        empresa.correo1 || "Ej: user@example.com"
    );
    const [correo2, setCorreo2] = useState(
        empresa.correo2 || "Ej: user2@example.com"
    );
    const [prefix1, setPrefix1] = useState(empresa.prefix1 || "");
    const [prefix2, setPrefix2] = useState(empresa.prefix2 || "");
    const [telefono1, setTelefono1] = useState(
        empresa.telefono1 || "Numero de telefono"
    );
    const [telefono2, setTelefono2] = useState(
        empresa.telefono2 || "Numero de telefono"
    );
    const [selectedCountry, setSelectedCountry] = useState(
        empresa.pais || "Selecciona un pais"
    );
    const [selectedState, setSelectedState] = useState(
        empresa.estado || "Selecciona un estado"
    );
    const [direccion, setDireccion] = useState(
        empresa.direccion || "Ej: Calle 123, Ciudad"
    );

    const [errors, setErrors] = useState({});

    const nombreInputRef = useRef(null);
    const rifInputRef = useRef(null);
    const correo1InputRef = useRef(null);
    const correo2InputRef = useRef(null);
    const telefonoSelectRef = useRef(null);
    const telefonoInputRef = useRef(null);
    const telefono2SelectRef = useRef(null);
    const telefono2InputRef = useRef(null);
    const estadoInputRef = useRef(null);
    const direccionInputRef = useRef(null);
    const botonNextRef = useRef(null);
    const botonConfirmartRef = useRef(null);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleSelectState = (selectedState) => {
        setSelectedState(selectedState);
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };
    const handleChangeNombre = (event) => {
        const newNombre = event.target.value;

        // Mantener la primera letra de cada palabra en mayúscula
        setNombre(
            newNombre
                .split(" ") // Dividir por espacios en blanco
                .map((word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .join(" ") // Volver a unir con espacios en blanco
        );

        // Borrar los errores relacionados con el campo nombre tan pronto como se complete
        if (newNombre.trim() !== "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                todos: "",
                nombre: "",
            }));
        }
    };

    const handleChangeRif = (event) => {
        const newRif = event.target.value;
        setRif(newRif.toUpperCase());
        if (newRif.trim() !== "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                rif: "",
            }));
        } // Convertir el RIF a mayúsculas
    };
    const handleChangeCorreo1 = (event) => {
        const newCorreo1 = event.target.value;
        setCorreo1(newCorreo1);

        // Borrar los errores relacionados con el campo correo1
        if (newCorreo1.trim() !== "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                correo1: "",
            }));
        }
    };

    const handleChangeCorreo2 = (event) => {
        const newCorreo2 = event.target.value;
        setCorreo2(newCorreo2);

        // Borrar los errores relacionados con el campo correo2
        if (newCorreo2.trim() !== "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                correo2: "",
            }));
        }
    };
    const handleChangeTelefono1 = (event) => {
        const newTelefono1 = event.target.value;
        setTelefono1(newTelefono1);

        // Borrar los errores relacionados con el campo telefono1
        if (newTelefono1.trim() !== "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                telefono1: "",
            }));
        }
    };
    const handleChangeTelefono2 = (event) => {
        const newTelefono2 = event.target.value;
        setTelefono2(newTelefono2);

        // Borrar los errores relacionados con el campo telefono2
        if (newTelefono2.trim() !== "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                telefono2: "",
            }));
        }
    };
    const handleChangeDireccion = (event) => {
        const newDireccion = event.target.value;
        setDireccion(newDireccion);

        // Borrar el error de campo vacío si el campo se llena
        if (newDireccion.trim() !== "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                todos: "",
            }));
        }
    };

    const validateForm = () => {
        if (step == 1) {
            setErrors({});
            const newErrors = {};
            if (!nombre || !rif || !correo1 || !telefono1 || !telefono2) {
                newErrors.todos = "Por favor, complete todos los campos";
                setErrors(newErrors);
            }
            if (
                !nombre ||
                !/^[A-Za-z\s]+$/.test(nombre) ||
                nombre.trim() === ""
            ) {
                newErrors.nombre =
                    "Por favor, ingrese un nombre de empresa válido";
            }

            if (!/^J-\d{10}$/.test(rif)) {
                newErrors.rif =
                    "El RIF debe comenzar con 'J-' y contener 10 caracteres numéricos";
                setErrors(newErrors);
            }

            if (
                !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(
                    correo1
                )
            ) {
                newErrors.correo1 = "correo electronico no valido";
                setErrors(newErrors);
            }
            if (
                !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(
                    correo2
                )
            ) {
                newErrors.correo2 = "correo electronico no valido";
                setErrors(newErrors);
            }

            if (!/^\d{7}$/.test(telefono1)) {
                newErrors.telefono1 = "El telefono debe tener 7 digito";
                setErrors(newErrors);
            }
            if (!/^\d{7}$/.test(telefono2)) {
                newErrors.telefono2 = "El telefono debe tener 7 digito";
                setErrors(newErrors);
            }
            if (Object.keys(newErrors).length === 0) {
                // No hay errores, borrar todos los errores
                setErrors({});
                return true;
            } else {
                // Hay errores, establecer los nuevos errores
                setErrors(newErrors);
                return false;
            }
        } else {
            const newErrors = {};
            if (!selectedCountry || !selectedState || !direccion) {
                newErrors.todos = "Por favor, complete todos los campos";
                setErrors(newErrors);

                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        setErrors({});
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = {
            nombre: nombre,
            rif: rif,
            correo1: correo1,
            correo2: correo2,
            prefix1: prefix1,
            telefono1: telefono1,
            prefix2: prefix2,
            telefono2: telefono2,
            pais: selectedCountry,
            estado: selectedState,
            direccion: direccion,
        };
        try {
            const response = await axios.post("/dashboard", formData);

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

        procesarFormulario(formData);
    };
    const [step, setStep] = useState(1);

    const handleNext = () => {
        if (validateForm()) {
            setStep(step + 1);
            direccionInputRef.current?.focus();
        }
    };

    const handlePrev = () => {
        setErrors({});
        setStep(step - 1);
        nombreInputRef.current.focus();
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div>
                            <Form onSubmit={handleNext}>
                                <Row className="mb-3 ">
                                    <Col>
                                        <Form.Label>
                                            Nombre de la Empresa
                                        </Form.Label>
                                        <div className="input-group ">
                                            <Form.Control
                                                type="text"
                                                name="nombre"
                                                value={nombre}
                                                isInvalid={!!errors.nombre}
                                                onChange={handleChangeNombre}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        rifInputRef.current?.focus();
                                                    }
                                                }}
                                                ref={nombreInputRef}
                                            />
                                            <span className="input-group-text">
                                                <FaBuilding />
                                            </span>
                                        </div>
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block mt-1  text-xs"
                                        >
                                            {errors.nombre}
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col>
                                        <Form.Label>RIF</Form.Label>
                                        <div className="input-group">
                                            <Form.Control
                                                type="text"
                                                // placeholder={empresa == {} ? "Ej: J-123456789" : empresa.rif}
                                                name="rif"
                                                value={rif}
                                                isInvalid={!!errors.rif}
                                                onChange={handleChangeRif}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        correo1InputRef.current.focus();
                                                    }
                                                }}
                                                ref={rifInputRef}
                                            />
                                            <span className="input-group-text">
                                                <FaIdCard />
                                            </span>
                                        </div>
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block mt-1  text-xs"
                                        >
                                            {errors.rif}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Label>Correo 1</Form.Label>
                                        <div className="input-group">
                                            <Form.Control
                                                type="email"
                                                // placeholder={empresa == {} ? "Ej: user@example.com" : empresa.correo1}
                                                name="correo1"
                                                value={correo1}
                                                isInvalid={!!errors.correo1}
                                                onChange={handleChangeCorreo1}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        correo2InputRef.current.focus();
                                                    }
                                                }}
                                                ref={correo1InputRef}
                                            />
                                            <span className="input-group-text">
                                                <FaEnvelope />
                                            </span>
                                        </div>
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block mt-1  text-xs"
                                        >
                                            {errors.correo1}
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col>
                                        <Form.Label>Correo 2</Form.Label>
                                        <div className="input-group">
                                            <Form.Control
                                                type="email"
                                                // placeholder={empresa == {} ? "Ej: user@example.com" : empresa.correo2}
                                                name="correo2"
                                                value={correo2}
                                                onChange={handleChangeCorreo2}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        telefonoInputRef.current.focus();
                                                    }
                                                }}
                                                ref={correo2InputRef}
                                            />
                                            <span className="input-group-text">
                                                <FaEnvelope />
                                            </span>
                                        </div>
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block mt-1  text-xs"
                                        >
                                            {errors.correo2}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Label>Teléfono 1</Form.Label>
                                        <div
                                            className="input-group"
                                            onChange={(e) =>
                                                setPrefix1(e.target.value)
                                            }
                                            ref={telefonoSelectRef}
                                        >
                                            <select
                                                className="form-select me-2"
                                                value={prefix1}
                                                onChange={(e) =>
                                                    setPrefix1(e.target.value)
                                                }
                                            >
                                                <option value="">#</option>
                                                <option value="0412">
                                                    0412
                                                </option>
                                                <option value="0424">
                                                    0424
                                                </option>
                                                <option value="0416">
                                                    0416
                                                </option>
                                            </select>
                                            <Form.Control
                                                type="tel"
                                                // placeholder={empresa == {} ? "Número de teléfono" : empresa.telefono1.slice(3,10)}
                                                className="flex-grow-1"
                                                name="telefono1"
                                                value={telefono1}
                                                onChange={handleChangeTelefono1}
                                                isInvalid={!!errors.telefono1}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        telefono2InputRef.current.focus();
                                                    }
                                                }}
                                                ref={telefonoInputRef}
                                            />
                                            <span className="input-group-text">
                                                <FaPhone />
                                            </span>
                                        </div>
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block mt-1  text-xs"
                                        >
                                            {errors.telefono1}
                                        </Form.Control.Feedback>
                                    </Col>

                                    <Col>
                                        <Form.Label>Teléfono 2</Form.Label>
                                        <div className="input-group">
                                            <select
                                                className="form-select me-2"
                                                value={prefix2}
                                                onChange={(e) =>
                                                    setPrefix2(e.target.value)
                                                }
                                            >
                                                <option value="">#</option>
                                                <option value="0412">
                                                    0412
                                                </option>
                                                <option value="0424">
                                                    0424
                                                </option>
                                                <option value="0416">
                                                    0416
                                                </option>
                                            </select>
                                            <Form.Control
                                                type="tel"
                                                // placeholder={empresa == {} ? "Número de teléfono" :empresa.telefono2.slice(3,10)}
                                                className="flex-grow-1"
                                                name="telefono2"
                                                value={telefono2}
                                                isInvalid={!!errors.telefono2}
                                                onChange={handleChangeTelefono2}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        botonNextRef.current.click();
                                                    }
                                                }}
                                                ref={telefono2InputRef}
                                            />
                                            <span className="input-group-text">
                                                <FaPhone />
                                            </span>
                                        </div>
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block mt-1  text-xs"
                                        >
                                            {errors.telefono2}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </>
                );
            case 2:
                return (
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <div className="d-flex  justify-center">
                                <Row className="mb-3">
                                    <AutocompleteInput
                                        states={states}
                                        countries={countries}
                                        setSelectedCountry={setSelectedCountry}
                                        setSelectedState={setSelectedState}
                                        empresa={empresa}
                                        ref={estadoInputRef}
                                        direccionInputRef={direccionInputRef}
                                    />
                                </Row>
                            </div>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={direccion}
                                        onChange={handleChangeDireccion}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                botonConfirmartRef.current.click();
                                            }
                                        }}
                                        ref={direccionInputRef}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </div>
                );
            default:
                return null;
        }
    };
    useEffect(() => {
        validateForm();
    }, [
        nombre,
        rif,
        correo1,
        correo2,
        prefix1,
        telefono1,
        prefix2,
        telefono2,
        selectedCountry,
        selectedState,
        direccion,
    ]);

    // Establecer el enfoque inicial solo una vez, cuando el componente se monta
    useEffect(() => {
        if (step === 1) {
            nombreInputRef.current.focus();
        } else if (step === 2) {
            estadoInputRef.current.focus();
        }
    }, [step]);

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
                    <div className="col-lg-8">
                        <div
                            className="card mt-5"
                            style={{ backgroundColor: configuraciones.color1 }}
                        >
                            <div class="card-header bg-gray-200">
                                <h2
                                    className="text-center mt-3"
                                    style={{
                                        fontFamily: "Arial, sans-serif",
                                        color: configuraciones.color3,
                                    }}
                                >
                                    Formulario de Registro
                                </h2>
                            </div>
                            <div className="step-indicator text-center">
                                <div className="text-center">
                                    <span
                                        className={`step-text ${
                                            step === 1
                                                ? "fw-bold "
                                                : "text-muted"
                                        }`}
                                        style={{
                                            color: configuraciones.color4,
                                        }}
                                    >
                                        Paso 1
                                    </span>
                                    <span className="mx-2">|</span>
                                    <span
                                        className={`step-text ${
                                            step === 2
                                                ? "fw-bold"
                                                : "text-muted"
                                        }`}
                                        style={{
                                            color: configuraciones.color4,
                                        }}
                                    >
                                        Paso 2
                                    </span>
                                </div>
                            </div>
                            <div className="card-body ">
                                <div className="text-center position-absolute top-22 start-50 translate-middle-x is-invalid">
                                    {errors.todos && (
                                        <div className="text-danger text-center small">
                                            {errors.todos}
                                        </div>
                                    )}
                                </div>
                                <Container
                                    className="py-4"
                                    style={{ minHeight: "400px" }}
                                >
                                    {renderStep()}
                                    <Row className="justify-content-center mt-3">
                                        {step > 1 && (
                                            <Col xs="auto">
                                                <button
                                                    className="btn btn-primary mt-2 mx-2"
                                                    style={{
                                                        backgroundColor:
                                                            configuraciones.color4,
                                                        borderColor:
                                                            configuraciones.color4, // Cambia el color del borde si es necesario
                                                    }}
                                                    onClick={handlePrev}
                                                >
                                                    Anterior
                                                </button>
                                                <button
                                                    className="btn btn-primary mt-2 mx-2"
                                                    style={{
                                                        backgroundColor:
                                                            configuraciones.color4,
                                                        borderColor:
                                                            configuraciones.color4, // Cambia el color del borde si es necesario
                                                    }}
                                                    onClick={handleSubmit}
                                                    ref={botonConfirmartRef}
                                                >
                                                    Confirmar
                                                </button>
                                            </Col>
                                        )}
                                        {step < 2 && (
                                            <Col xs="auto">
                                                <button
                                                    className="btn btn-primary mt-2"
                                                    style={{
                                                        backgroundColor:
                                                            configuraciones.color4,
                                                        borderColor:
                                                            configuraciones.color4, // Cambia el color del borde si es necesario
                                                    }}
                                                    onClick={handleNext}
                                                    ref={botonNextRef}
                                                >
                                                    Siguiente
                                                </button>
                                            </Col>
                                        )}
                                    </Row>
                                </Container>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wizard;
