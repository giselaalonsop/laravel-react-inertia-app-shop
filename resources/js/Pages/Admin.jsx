import React from "react";
import Sidebar from './ComponentsAdmin/Sidebar';
import Header from './ComponentsAdmin/Header';
import Footer from './ComponentsAdmin/Footer';
import Home from './ComponentsAdmin/Home';
import Formulario1 from "./ComponentsAdmin/formulario1";
import Wizard from "./ComponentsAdmin/Wizard";
import Item from './ComponentsAdmin/Item';


export default function Admin({auth, cambiarHome, home, states, countries, empresa,procesarFormulario}) { // Asegúrate de recibir 'auth' como prop
    return(
        <>
            <div className="wrapper" style={{ backgroundColor: "#eee" }}>
                <Header auth={auth}/>
                
                   {(() => {
                    switch (home) {
                      case 'general':
                        return <div>
                            <Formulario1 states={states} countries={countries} empresa={empresa} procesarFormulario={procesarFormulario}/>                        
                            </div>;
                      case 'wizard':
                        return <div>
                          <Wizard states={states} countries={countries} empresa={empresa} procesarFormulario={procesarFormulario}/></div>;
                      case 'datos':
                        return <div><Item empresa={empresa}/></div>;
                      default:
                        return <div> 
                            <Home/>                        
                            </div>;
                    }
                  })()}
                
                <Sidebar auth={auth} cambiarHome={cambiarHome} empresa={empresa}/>
                <Footer/>
            </div>
            
        </>
    );
}
