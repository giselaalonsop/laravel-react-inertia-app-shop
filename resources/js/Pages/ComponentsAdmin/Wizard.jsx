import React, { useState,useRef,useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {
  FaBuilding,
  FaIdCard,
  FaEnvelope,
  FaPhone,
  FaMapMarkedAlt,
} from "react-icons/fa";
import AutocompleteInput from "./AutoCompleteInput";
import Swal from 'sweetalert2';
import axios from 'axios';

const Wizard = ({states, countries, procesarFormulario,empresa}) => {
    const [nombre, setNombre] = useState("");
  const [rif, setRif] = useState("");
  const [correo1, setCorreo1] = useState("");
  const [correo2, setCorreo2] = useState("");
  const [telefonoPrefix1, setTelefonoPrefix1] = useState("");
  const [telefonoPrefix2, setTelefonoPrefix2] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [direccion, setDireccion] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [errors, setErrors] = useState({});


  const nombreInputRef = useRef(null)
  const rifInputRef = useRef(null);
  const correo1InputRef = useRef(null);
  const correo2InputRef = useRef(null);
  const telefonoSelectRef = useRef(null);
  const telefonoInputRef=useRef(null);
  const telefono2SelectRef = useRef(null);
  const telefono2InputRef=useRef(null);
  const estadoInputRef=useRef(null);
  const direccionInputRef=useRef(null);
  const botonNextRef=useRef(null);
  const botonConfirmartRef=useRef(null);


  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSelectState = (selectedState) => {
    setSelectedState(selectedState);
  };

  
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
  useEffect(() => {
    
      nombreInputRef.current.focus() // Enfocar el campo al cargar el componente

  }, []);
  

  const validateForm = () => {
    const newErrors = {};
    if (
      !selectedCountry ||
      !selectedState ||
      !direccion
    ) {
      newErrors.todos ="Por favor, complete todos los campos";
      setErrors(newErrors);
      
      return false;
    }
     
    return true;
  };

  const handleSubmit = async (e) => {
    setErrors({})
    e.preventDefault();

     if (!validateForm()) {
       return;
     }
    


    const formData = {
      nombre:nombre,
      rif:rif,
      correo1:correo1,
      correo2:correo2,
      telefono1: JSON.stringify(telefonoPrefix1, "-",  telefono1),
      telefono2: JSON.stringify(telefonoPrefix2, "-" ,telefono2),
      pais: selectedCountry,
      estado: selectedState,
      direccion:direccion
    };
    try {
      const response = await axios.post('/dashboard', formData);

      if (response.status === 201) {
          Swal.fire('Registro procesado', '', 'success');
          // Realizar otras acciones si es necesario, como redireccionar
      } else {
          // Manejar errores si la respuesta no es exitosa
          console.error('Error al guardar los datos');
      }
      } catch (error) {
      console.error('Error de red:', error);
      }
      

    
    procesarFormulario(formData);
    
    
    
  };
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setErrors({})
    const newErrors = {};
     if(!nombre ||
         !rif ||
        !correo1 ||
         !telefono1 ||
         !telefono2){
          newErrors.todos ="Por favor, complete todos los campos";
          setErrors(newErrors);
          return;
         }
         if (!/^([A-Z][a-z]*)+$/.test(nombre)) {
          newErrors.nombre ="La inicial del nombre debe ir en mayuscula";
          setErrors(newErrors);
      
          return ;
        }
    
        if (!/^J-\d{10}$/.test(rif)) {
          newErrors.rif ="El RIF debe comenzar con 'J-' y contener 10 caracteres numéricos";
          setErrors(newErrors);
          return;
         
        }
    
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(correo1)) {
          newErrors.correo1 ="correo electronico no valido";
          setErrors(newErrors);
          return;
        }
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(correo2)) {
          newErrors.correo2 ="correo electronico no valido";
          setErrors(newErrors);
          return;
        }
    
        if (!/^\d{7}$/.test(telefono1) )  {
          newErrors.telefono1 ="El telefono debe tener 7 digito";
          setErrors(newErrors);
          return;
        }
        if (!/^\d{7}$/.test(telefono2)){
          newErrors.telefono2 ="El telefono debe tener 7 digito";
          setErrors(newErrors);
          return;
        }
    setStep(step + 1);
  };

  const handlePrev = () => {
    setErrors({})
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
          <div>
            
            
                <Form onSubmit={handleNext}>
                    <Row className="mb-3">
                      <Col>
                        <Form.Label>Nombre de la Empresa</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type="text"
                            placeholder={empresa == {} ? "Ej: Mi Empresa S.A." : empresa.nombre}
                            name="nombre"
                            value={nombre}
                            onChange={(e)=> setNombre(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                rifInputRef.current.focus();
                              }
                            }}
                            ref={nombreInputRef}
                          />
                          <span className="input-group-text">
                            <FaBuilding />
                          </span>
                        </div>
                        {errors.nombre && (
                        <div className="text-danger text center">{errors.nombre}</div>
                      )}
                      </Col>
                      <Col>
                        <Form.Label>RIF</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type="text"
                            placeholder={empresa == {} ? "Ej: J-123456789" : empresa.rif}
                            name="rif"
                            value={rif}
                            onChange={(e) => setRif(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
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
                        {errors.rif && (
                        <div className="text-danger text center ">{errors.rif}</div>)}
                      
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Label>Correo 1</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type="email"
                            placeholder={empresa == {} ? "Ej: user@example.com" : empresa.correo1}
                            name="correo1"
                            value={correo1}
                            onChange={(e)=> setCorreo1(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
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
                        {errors.correo1 && (
                        <div className="text-danger text center ">{errors.correo1}</div>)}
                      
                      </Col>
                      <Col>
                        <Form.Label>Correo 2</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type="email"
                            placeholder={empresa == {} ? "Ej: user@example.com" : empresa.correo2}
                            name="correo2"
                            value={correo2}
                            onChange={(e)=> setCorreo2(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
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
                        {errors.correo2 && (
                        <div className="text-danger text center ">{errors.correo2}</div>)}
                      
                      </Col>
                    </Row>
                    <Row className="mb-3">
                    <Col>
                        <Form.Label>Teléfono 1</Form.Label>
                        <div className="input-group"
                        value={telefonoPrefix1}
                        onChange={(e) => setTelefonoPrefix1(e.target.value)}
                        ref={telefonoSelectRef}>
                            <select className="form-select me-2">
                            <option value="">#</option>
                            
                            <option value="0412">0412</option>
                            <option value="0424">0424</option>
                            <option value="0416">0416</option>
                            </select>
                            <Form.Control
                            type="tel"
                            placeholder={empresa == {} ? "Número de teléfono" : empresa.telefono1.slice(3,10)}
                            className="flex-grow-1"
                            name="telefono1"
                            value={telefono1}
                            onChange={(e)=> setTelefono1(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
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
                        {errors.telefono1 && (
                        <div className="text-danger text center ">{errors.telefono1}</div>)}
                    
                    </Col>

                      <Col>
                        <Form.Label>Teléfono 2</Form.Label>
                        <div className="input-group">
                            <select className="form-select me-2"
                            value={telefonoPrefix2}
                            onChange={(e) => setTelefonoPrefix2(e.target.value)}>
                            <option value="">#</option>
                            <option value="0412">0412</option>
                            <option value="0424">0424</option>
                            <option value="0416">0416</option>
                            </select>
                            <Form.Control
                            type="tel"
                            placeholder={empresa == {} ? "Número de teléfono" :empresa.telefono2.slice(3,10)}
                            className="flex-grow-1"
                            name="telefono2"
                            value={telefono2}
                            onChange={(e)=> setTelefono2(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                botonNextRef.current.click();
                                direccionInputRef.current.focus();
                              }
                            }}
                            ref={telefono2InputRef}
                            />
                            <span className="input-group-text">
                            <FaPhone />
                            </span>
                        </div>
                            {errors.telefono2 && (
                        <div className="text-danger text center ">{errors.telefono2}</div>)}
                        
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
                        {/* <Col>
                            <Form.Label></Form.Label>
                            <Form.Select>
                            <option>Seleccione un país</option>
                            
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label></Form.Label>
                            <Form.Select>
                            <option>Seleccione un estado</option>
                            
                            </Form.Select>
                        </Col> */}
                        <AutocompleteInput states={states} countries={countries} setSelectedCountry={setSelectedCountry}
                        setSelectedState={setSelectedState} />
                        


                </Row>
                    </div>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Ej: Calle 123, Ciudad"
                                onChange={(e)=> setDireccion(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
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

  return (
    <div className="content-wrapper">
      <div className="bg-light" style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card mt-5">
            <div class="card-header bg-gray-200">
                <h2 className="text-center mt-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Formulario de Registro
                </h2>

            </div>
            <div className="step-indicator text-center">
            <div className="text-center">
                  <span className={`step-text ${step === 1 ? 'active' : 'text-muted'}`}>Paso 1</span>
                  <span className="mx-2">|</span>
                  <span className={`step-text ${step === 2 ? 'fw-bold' : 'text-muted'}`}>Paso 2</span>
                </div>
            </div>
                {errors.todos && (
                        <div className="text-danger text center">{errors.todos}</div>
                      )}
              <div className="card-body">
                <Container className="py-4" style={{ minHeight: "400px" }}>
                  {renderStep()}
                  <Row className="justify-content-center mt-3">
                    {step > 1 && (
                      <Col xs="auto">
                        <Button
                          variant="outline-secondary"
                          onClick={handlePrev}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={handleSubmit}
                          ref={botonConfirmartRef}
                          
                          
                        >
                          Confirmar
                        </Button>
                      </Col>
                    )}
                    {step < 2 && (
                      <Col xs="auto">
                        <Button variant="outline-secondary" onClick={handleNext}  ref={botonNextRef}>
                          Next
                        </Button>
                      </Col>
                    )}
                  </Row>
                </Container>
              
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Wizard;
