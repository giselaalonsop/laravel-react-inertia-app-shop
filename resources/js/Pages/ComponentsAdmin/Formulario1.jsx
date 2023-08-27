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

const Formulario1 = ({ empresa, states, countries, datosEmpresa, procesarFormulario, }) => {
    const [nombre, setNombre] = useState(empresa.nombre || "Ej: Mi Empresa S.A.");
    const [rif, setRif] = useState(empresa.rif || "Ej: J-123456789");
    const [correo1, setCorreo1] = useState(empresa.correo1 || "Ej: user@example.com");
    const [correo2, setCorreo2] = useState(empresa.correo2 || "Ej: user2@example.com");
    const [prefix1, setPrefix1] = useState(empresa.prefix1 || "");
    const [prefix2, setPrefix2] = useState(empresa.prefix2 || "");
    const [telefono1, setTelefono1] = useState(empresa.telefono1 || "Numero de telefono");
    const [telefono2, setTelefono2] = useState(empresa.telefono2 || "Numero de telefono");
    const [selectedCountry, setSelectedCountry] = useState(empresa.pais || "Selecciona un pais");
    const [selectedState, setSelectedState] = useState(empresa.estado || "Selecciona un estado");
    const [direccion, setDireccion] = useState(empresa.direccion || "Ej: Calle 123, Ciudad");
    const [errors, setErrors] = useState({});
    

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

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
            return;
        }
        

        if (!nombre || (!/[A-Za-z]/.test(nombre))) {
            newErrors.nombre = "Por favor, ingrese el nombre de la empresa";
            setErrors(newErrors);
            return false;
        }
        

        if (!/^J-\d{10}$/.test(rif)) {
            newErrors.rif =
                "El RIF debe comenzar con 'J-' y contener 10 caracteres numéricos";
            setErrors(newErrors);
            return;
        }

        if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(correo1)
        ) {
            newErrors.correo1 = "correo electronico no valido";
            setErrors(newErrors);
            return;
        }
        if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(correo2)
        ) {
            newErrors.correo2 = "correo electronico no valido";
            setErrors(newErrors);
            return;
        }

        if (!/^\d{7}$/.test(telefono1)) {
            newErrors.telefono1 = "El telefono debe tener 7 digito";
            setErrors(newErrors);
            return;
        }
        if (!/^\d{7}$/.test(telefono2)) {
            newErrors.telefono2 = "El telefono debe tener 7 digito";
            setErrors(newErrors);
            return;
        }

        if (!selectedCountry) {
            newErrors.pais = "Seleccione un pais";
            setErrors(newErrors);

            return false;
        }
        if (!selectedState) {
            newErrors.estado = "Seleccione un estado";
            setErrors(newErrors);

            return false;
        }
        if (!direccion) {
            newErrors.direccion = "Escriba una direccion";
            setErrors(newErrors);

            return false;
        }

        return true;
    };
    const handleChange=()=>{
        setNombre(nombre
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            .trim()
            )
        setRif(rif.charAt(0).toUpperCase() + rif.slice(1))
        validateForm()
       
    }
    const handleSubmit = async (e) => {
        setErrors({});
        e.preventDefault();
        handleChange();

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
            telefono2:  telefono2,
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
            <div className="bg-light" style={{ minHeight: "100vh" }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card mt-5">
                            <div class="card-header bg-gray-200">
                                <h2
                                    className="text-center mt-3"
                                    style={{ fontFamily: "Arial, sans-serif" }}
                                >
                                    Formulario de Registro
                                </h2>
                            </div>
                            <div className="text-center">
                                {errors.todos && (
                                    <div className="text-danger text center ">
                                        {errors.todos}
                                    </div>
                                )}
                            </div>

                            <div className="card-body">
                                <Container className="py-4">
                                    <Form onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Label>
                                                    Nombre de la Empresa
                                                </Form.Label>
                                                <div className="input-group">
                                                    <Form.Control
                                                        type="text"
                                                        
                                                        name="nombre"
                                                        value={nombre}
                                                        onChange={(e) =>
                                                            setNombre(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <span className="input-group-text">
                                                        <FaBuilding />
                                                    </span>
                                                </div>
                                                {errors.nombre && (
                                                    <div className="text-danger text center">
                                                        {errors.nombre}
                                                    </div>
                                                )}
                                            </Col>
                                            <Col>
                                                <Form.Label>RIF</Form.Label>
                                                <div className="input-group">
                                                    <Form.Control
                                                        type="text"
                                                        name="rif"
                                                        value={rif}
                                                        // defaultValue= {empresa=={} ? "Ej: J-123456789": empresa.rif}
                                                        onChange={(e) =>
                                                            setRif(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <span className="input-group-text">
                                                        <FaIdCard />
                                                    </span>
                                                </div>
                                                {errors.rif && (
                                                    <div className="text-danger text center ">
                                                        {errors.rif}
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Label>
                                                    Correo 1
                                                </Form.Label>
                                                <div className="input-group">
                                                    <Form.Control
                                                        type="email"
                                                        value={correo1}
                                                        name="correo1"
                                                        
                                                        onChange={(e) =>
                                                            setCorreo1(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <span className="input-group-text">
                                                        <FaEnvelope />
                                                    </span>
                                                </div>
                                                {errors.correo1 && (
                                                    <div className="text-danger text center ">
                                                        {errors.correo1}
                                                    </div>
                                                )}
                                            </Col>
                                            <Col>
                                                <Form.Label>
                                                    Correo 2
                                                </Form.Label>
                                                <div className="input-group">
                                                    <Form.Control
                                                        type="email"
                                                        name="correo2"
                                                        value={correo2}
                                                        onChange={(e) =>
                                                            setCorreo2(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <span className="input-group-text">
                                                        <FaEnvelope />
                                                    </span>
                                                </div>
                                                {errors.correo2 && (
                                                    <div className="text-danger text center ">
                                                        {errors.correo2}
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Label>
                                                    Teléfono 1
                                                </Form.Label>
                                                <div className="input-group flex">
                                                    <div class="w-1/6 mr-2">
                                                    <select
                                                        className="form-select me-2"
                                                        value={prefix1}
                                                        onChange={(e) => setPrefix1(e.target.value)}
                                                    >
                                                        <option value="">#</option>
                                                        <option value="0412">0412</option>
                                                        <option value="0424">0424</option>
                                                        <option value="0416">0416</option>
                                                    </select>

                                                    </div>
                                                    <div class="flex justify-between w-4/6">
                                                        <Form.Control
                                                            type="tel"
                                                            value={telefono1}
                                                            className="flex-grow-1"
                                                            name="telefono1"
                                            
                                                            onChange={(e) =>
                                                                setTelefono1(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <span className="input-group-text">
                                                            <FaPhone />
                                                        </span>
                                                    </div>
                                                </div>
                                                {errors.telefono1 && (
                                                    <div className="text-danger text-center">
                                                        {errors.telefono1}
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Label>
                                                    Teléfono 2
                                                </Form.Label>
                                                <div className="input-group flex">
                                                    <div class="w-1/6 mr-2">
                                                    <select
                                                        className="form-select me-2"
                                                        value={prefix2}
                                                        onChange={(e) => setPrefix2(e.target.value)}
                                                    >
                                                        <option value="">#</option>
                                                        <option value="0412">0412</option>
                                                        <option value="0424">0424</option>
                                                        <option value="0416">0416</option>
                                                    </select>

                                                    </div>
                                                    <div class="flex justify-between w-4/6">
                                                        <Form.Control
                                                            type="tel"
                                                            value={telefono2}
                                                            className="flex-grow-1"
                                                            name="telefono1"
                                                            
                                                            onChange={(e) =>
                                                                setTelefono2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <span className="input-group-text">
                                                            <FaPhone />
                                                        </span>
                                                    </div>
                                                </div>
                                                {errors.telefono2 && (
                                                    <div className="text-danger text-center">
                                                        {errors.telefono2}
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                        <div>
                                            <Row className="mb-3">
                                                <Col>
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

                                                <Col>
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
                                            <Col>
                                                <Form.Label>
                                                    Dirección
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={direccion}
                                                    name={direccion}
                                                    
                                                    onChange={(e) =>
                                                        setDireccion(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-center">
                                            <Col xs="auto">
                                                <Button
                                                    variant="secondary"
                                                    size="lg"
                                                    className="text-gray-700"
                                                    onClick={handleSubmit}
                                                >
                                                    Registrar
                                                </Button>
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
