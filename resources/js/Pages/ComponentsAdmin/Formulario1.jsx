import { React, useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {
    FaBuilding,
    FaIdCard,
    FaEnvelope,
    FaPhone,
    FaMapMarkedAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const Formulario1 = ({ empresa, states, countries, configuraciones }) => {
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

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
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

    useEffect(() => {
        // Usar useEffect para esperar a que los valores se actualicen antes de validar
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
    const validateForm = () => {
        const newErrors = {};
        if (
            !nombre ||
            !rif ||
            !correo1 ||
            !prefix1 ||
            !telefono1 ||
            !prefix2 ||
            !telefono2 ||
            !selectedCountry ||
            !selectedState ||
            !direccion
        ) {
            newErrors.todos = "Por favor, complete todos los campos";
            setErrors(newErrors);
        }

        if (!nombre || !/^[A-Za-z\s]+$/.test(nombre) || nombre.trim() === "") {
            newErrors.nombre = "Por favor, ingrese un nombre de empresa válido";
        }

        if (!/^J-\d{10}$/.test(rif)) {
            newErrors.rif =
                "El RIF debe comenzar con 'J-' y contener 10 caracteres numéricos";
        }

        if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(correo1)
        ) {
            newErrors.correo1 = "Correo electrónico no válido";
        }

        if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(correo2)
        ) {
            newErrors.correo2 = "Correo electrónico no válido";
        }

        if (!/^\d{7}$/.test(telefono1)) {
            newErrors.telefono1 = "El teléfono debe tener 7 dígitos";
        }

        if (!/^\d{7}$/.test(telefono2)) {
            newErrors.telefono2 = "El teléfono debe tener 7 dígitos";
        }

        if (!selectedCountry) {
            newErrors.pais = "Seleccione un país";
        }

        if (!selectedState) {
            newErrors.estado = "Seleccione un estado";
        }

        if (!direccion) {
            newErrors.direccion = "Escriba una dirección";
        }

        // Verificar si hay errores
        if (Object.keys(newErrors).length === 0) {
            // No hay errores, borrar todos los errores
            setErrors({});
            return true;
        } else {
            // Hay errores, establecer los nuevos errores
            setErrors(newErrors);
            return false;
        }
    };

    //     const newErrors = {};
    //     if (
    //         !nombre ||
    //         !rif ||
    //         !correo1 ||
    //         !prefix1 ||
    //         !telefono1 ||
    //         !prefix2 ||
    //         !telefono2 ||
    //         !selectedCountry ||
    //         !selectedState ||
    //         !direccion
    //     ) {
    //         newErrors.todos = "Por favor, complete todos los campos";
    //         setErrors(newErrors);
    //         return;
    //     }

    //     if (!nombre || !/[A-Za-z]/.test(nombre)) {
    //         newErrors.nombre = "Por favor, ingrese el nombre de la empresa";
    //         setErrors(newErrors);
    //         return false;
    //     }

    //     if (!/^J-\d{10}$/.test(rif)) {
    //         newErrors.rif =
    //             "El RIF debe comenzar con 'J-' y contener 10 caracteres numéricos";
    //         setErrors(newErrors);
    //         return;
    //     }

    //     if (
    //         !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(correo1)
    //     ) {
    //         newErrors.correo1 = "correo electronico no valido";
    //         setErrors(newErrors);
    //         return;
    //     }
    //     if (
    //         !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(correo2)
    //     ) {
    //         newErrors.correo2 = "correo electronico no valido";
    //         setErrors(newErrors);
    //         return;
    //     }

    //     if (!/^\d{7}$/.test(telefono1)) {
    //         newErrors.telefono1 = "El telefono debe tener 7 digito";
    //         setErrors(newErrors);
    //         return;
    //     }
    //     if (!/^\d{7}$/.test(telefono2)) {
    //         newErrors.telefono2 = "El telefono debe tener 7 digito";
    //         setErrors(newErrors);
    //         return;
    //     }

    //     if (!selectedCountry) {
    //         newErrors.pais = "Seleccione un pais";
    //         setErrors(newErrors);

    //         return false;
    //     }
    //     if (!selectedState) {
    //         newErrors.estado = "Seleccione un estado";
    //         setErrors(newErrors);

    //         return false;
    //     }
    //     if (!direccion) {
    //         newErrors.direccion = "Escriba una direccion";
    //         setErrors(newErrors);

    //         return false;
    //     }

    //     return true;
    // };

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
    };

    const filteredStates = states.filter(
        (state) => state.country === selectedCountry
    );
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

                            <div className="text-center position-absolute top-20 start-50 translate-middle-x is-invalid">
                                {errors.todos && (
                                    <div className="text-danger text-center small">
                                        {errors.todos}
                                    </div>
                                )}
                            </div>
                            <div className="card-body">
                                <Container className="py-4">
                                    <Form onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Col className="mt-1">
                                                <Form.Label>
                                                    Nombre de la Empresa
                                                </Form.Label>
                                                <div className="input-group ">
                                                    <Form.Control
                                                        type="text"
                                                        name="nombre"
                                                        value={nombre}
                                                        onChange={
                                                            handleChangeNombre
                                                        }
                                                        isInvalid={
                                                            !!errors.nombre
                                                        }
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
                                            <Col className="mt-1">
                                                <Form.Label>RIF</Form.Label>
                                                <div className="input-group">
                                                    <Form.Control
                                                        type="text"
                                                        name="rif"
                                                        value={rif}
                                                        // defaultValue= {empresa=={} ? "Ej: J-123456789": empresa.rif}
                                                        onChange={
                                                            handleChangeRif
                                                        }
                                                        isInvalid={!!errors.rif}
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
                                        <Row className="mb-3 ">
                                            <Col className="mt-2">
                                                <Form.Label>
                                                    Correo 1
                                                </Form.Label>
                                                <div className="input-group ">
                                                    <Form.Control
                                                        type="email"
                                                        value={correo1}
                                                        name="correo1"
                                                        onChange={
                                                            handleChangeCorreo1
                                                        }
                                                        isInvalid={
                                                            !!errors.correo
                                                        }
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
                                            <Col className="mt-2">
                                                <Form.Label>
                                                    Correo 2
                                                </Form.Label>
                                                <div className="input-group">
                                                    <Form.Control
                                                        type="email"
                                                        name="correo2"
                                                        value={correo2}
                                                        onChange={
                                                            handleChangeCorreo2
                                                        }
                                                        isInvalid={
                                                            !!errors.correo2
                                                        }
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
                                            <Col className="mt-1">
                                                <Form.Label>
                                                    Teléfono 1
                                                </Form.Label>
                                                <div className="input-group flex">
                                                    <div class="w-1/6 mr-2">
                                                        <select
                                                            className="form-select me-2"
                                                            value={prefix1}
                                                            onChange={(e) =>
                                                                setPrefix1(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option value="">
                                                                #
                                                            </option>
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
                                                    </div>
                                                    <div class="flex justify-between w-4/6">
                                                        <Form.Control
                                                            type="tel"
                                                            value={telefono1}
                                                            className="flex-grow-1"
                                                            name="telefono1"
                                                            onChange={
                                                                handleChangeTelefono1
                                                            }
                                                            isInvalid={
                                                                !!errors.telefon1
                                                            }
                                                        />
                                                        <span className="input-group-text">
                                                            <FaPhone />
                                                        </span>
                                                    </div>
                                                </div>
                                                <Form.Control.Feedback
                                                    type="invalid"
                                                    className="d-block mt-1  text-xs"
                                                >
                                                    {errors.telefono1}
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col className="mt-1">
                                                <Form.Label>
                                                    Teléfono 2
                                                </Form.Label>
                                                <div className="input-group flex">
                                                    <div class="w-1/6 mr-2">
                                                        <select
                                                            className="form-select me-2"
                                                            value={prefix2}
                                                            onChange={(e) =>
                                                                setPrefix2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option value="">
                                                                #
                                                            </option>
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
                                                    </div>
                                                    <div class="flex justify-between w-4/6">
                                                        <Form.Control
                                                            type="tel"
                                                            value={telefono2}
                                                            className="flex-grow-1"
                                                            name="telefono1"
                                                            onChange={
                                                                handleChangeTelefono2
                                                            }
                                                            isInvalid={
                                                                !!errors.telefono2
                                                            }
                                                        />
                                                        <span className="input-group-text">
                                                            <FaPhone />
                                                        </span>
                                                    </div>
                                                </div>
                                                <Form.Control.Feedback
                                                    type="invalid"
                                                    className="d-block mt-1  text-xs"
                                                >
                                                    {errors.telefono2}
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                        <div>
                                            <Row className="mb-3">
                                                <Col className="mt-1">
                                                    <Form.Label>
                                                        País
                                                    </Form.Label>
                                                    <Form.Select
                                                        value={selectedCountry}
                                                        onChange={
                                                            handleCountryChange
                                                        }
                                                    >
                                                        <option value="">
                                                            {
                                                                (empresa = {}
                                                                    ? "Seleccione un pais"
                                                                    : empresa.pais)
                                                            }
                                                        </option>
                                                        {countries.map(
                                                            (country) => (
                                                                <option
                                                                    key={
                                                                        country.code
                                                                    }
                                                                    value={
                                                                        country.name
                                                                    }
                                                                >
                                                                    {
                                                                        country.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Select>
                                                    {errors.pais && (
                                                        <div className="text-danger text center ">
                                                            {errors.pais}
                                                        </div>
                                                    )}
                                                </Col>

                                                <Col className="mt-1">
                                                    <Form.Label>
                                                        Estado
                                                    </Form.Label>
                                                    <Form.Select
                                                        value={selectedState}
                                                        onChange={
                                                            handleStateChange
                                                        }
                                                    >
                                                        <option>
                                                            Seleccione un estado
                                                        </option>
                                                        {filteredStates.map(
                                                            (state, index) => (
                                                                <option
                                                                    key={index}
                                                                >
                                                                    {state.name}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Select>
                                                    {errors.estado && (
                                                        <div className="text-danger text center ">
                                                            {errors.estado}
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </div>
                                        <Row className="mb-3">
                                            <Col className="mt-1">
                                                <Form.Label>
                                                    Dirección
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={direccion}
                                                    name={direccion}
                                                    onChange={
                                                        handleChangeDireccion
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-center">
                                            <Col xs="auto" className="mt-1">
                                                <button
                                                    className="btn btn-primary"
                                                    style={{
                                                        backgroundColor:
                                                            configuraciones.color4,
                                                        borderColor:
                                                            configuraciones.color4, // Cambia el color del borde si es necesario
                                                    }}
                                                    onClick={handleSubmit}
                                                >
                                                    Registrar
                                                </button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Formulario1;
