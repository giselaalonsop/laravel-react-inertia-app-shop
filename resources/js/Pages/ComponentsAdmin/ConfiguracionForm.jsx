import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from "sweetalert2";

import { Container, Form, Row, Col, Button } from "react-bootstrap";

const ConfiguracionForm = ({empresa}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // Validar que el archivo sea una imagen
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        setErrorMessage('');
      } else {
        setSelectedImage(null);
        setErrorMessage('El archivo debe ser una imagen');
      }
    }
  }, []);
  const handleLogoUpload = useCallback(() => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('logo', selectedImage);
  
      Inertia.post("/dashboard", formData, {
        onSuccess: (response) => {
          if (response.status === 201) {
            Swal.fire("Registro procesado", "", "success");
            // Realizar otras acciones si es necesario, como redireccionar
          } else {
            // Manejar errores si la respuesta no es exitosa
            console.error("Error al guardar los datos");
          }
        },
      });
    }
  }, [selectedImage]);
  

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: 'image/*', // Solo se permiten archivos de imagen
    });

  return (
    <div>
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
                                
                            </div>

                            <div className="card-body">
                                <Container className="py-4">
                                    
                      <h2>Configuraciones</h2>
                      <form encType="multipart/form-data">
                          <div className="image-dropzone" {...getRootProps()}>
                            <input {...getInputProps()} onChange={handleLogoUpload}/>
                            <p>Arrastra y suelta una imagen aquí o haz clic para seleccionarla</p>
                          </div>
                          {errorMessage && <p className="error-message">{errorMessage}</p>}
                          {selectedImage && (
                            <div className="preview">
                              <p>Imagen seleccionada:</p>
                              <img src={URL.createObjectURL(selectedImage)} alt="Imagen seleccionada" />
                            </div>
                          )}
                          <Button
                                                    variant="secondary"
                                                    size="lg"
                                                    className="text-gray-700"
                                                    onClick={handleLogoUpload}
                                                >
                                                    Registrar
                                                    </Button>
                      </form>
                    </Container>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    
  );
};

export default ConfiguracionForm;
