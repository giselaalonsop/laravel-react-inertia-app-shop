import React from "react";
import Sidebar from './ComponentsAdmin/Sidebar';
import Header from './ComponentsAdmin/Header';
import Footer from './ComponentsAdmin/Footer';
import Home from './ComponentsAdmin/Home';
import Formulario1 from "./ComponentsAdmin/formulario1";
import Wizard from "./ComponentsAdmin/Wizard";
import Item from './ComponentsAdmin/Item';
import ConfiguracionForm from "./ComponentsAdmin/ConfiguracionForm";


export default function Admin({empresa, auth, cambiarHome, home, states, countries, datosEmpresa,procesarFormulario}) { 
    return(
        <>
            <div className="wrapper" style={{ backgroundColor: "#eee" }}>
                <Header auth={auth } empresa={empresa}/>
                
                   {(() => {
                    switch (home) {
                      case 'general':
                        return <div>
                            <Formulario1  empresa={empresa} states={states} countries={countries} datosEmpresa={datosEmpresa} procesarFormulario={procesarFormulario}/>                        
                            </div>;
                      case 'wizard':
                        return <div>
                          <Wizard empresa={empresa} states={states} countries={countries} datosEmpresa={datosEmpresa} procesarFormulario={procesarFormulario}/></div>;
                      case 'datos':
                        return <div><Item  empresa={empresa}/></div>;
                      case 'tools':
                        return <div>
                        <ConfiguracionForm empresa={empresa}/>
                        </div>
                      default:
                        return <div> 
                            <Home/>                        
                            </div>;
                    }
                  })()}
                
                <Sidebar auth={auth} cambiarHome={cambiarHome} datosEmpresa={datosEmpresa} empresa={empresa}/>
                <Footer empresa={empresa}/>
            </div>
            
        </>
    );
}
