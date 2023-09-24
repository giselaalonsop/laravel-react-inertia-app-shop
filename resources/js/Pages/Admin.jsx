import React from "react";
import Sidebar from "./ComponentsAdmin/Sidebar";
import Header from "./ComponentsAdmin/Header";
import Footer from "./ComponentsAdmin/Footer";
import Home from "./ComponentsAdmin/Home";
import Formulario1 from "./ComponentsAdmin/formulario1";
import Wizard from "./ComponentsAdmin/Wizard";

import ConfiguracionForm from "./ComponentsAdmin/ConfiguracionForm";
import Redes from "./ComponentsAdmin/Redes";

export default function Admin({
    empresa,
    auth,
    cambiarHome,
    home,
    states,
    countries,
    configuraciones,
    redes,
}) {
    {
        /* 
        paleta analoga: #fffff, #F2809F, #000000, #F24B4B,
        paleta monocromatica: #fffff, #F2809F,#000000, #735F64
        paleta complementaria: #fffff, #F24B4B,#000000, #80F28F
*/
    }
    return (
        <>
            <div className="wrapper" style={{ backgroundColor: "#eee" }}>
                <Header
                    auth={auth}
                    empresa={empresa}
                    configuraciones={configuraciones}
                    cambiarHome={cambiarHome}
                />

                {(() => {
                    switch (home) {
                        case "general":
                            return (
                                <div>
                                    <Formulario1
                                        empresa={empresa}
                                        states={states}
                                        countries={countries}
                                        configuraciones={configuraciones}
                                    />
                                </div>
                            );
                        case "wizard":
                            return (
                                <div>
                                    <Wizard
                                        empresa={empresa}
                                        states={states}
                                        countries={countries}
                                        configuraciones={configuraciones}
                                    />
                                </div>
                            );
                        case "tools":
                            return (
                                <div>
                                    <ConfiguracionForm
                                        empresa={empresa}
                                        configuraciones={configuraciones}
                                    />
                                </div>
                            );
                        case "redes":
                            return (
                                <div>
                                    <Redes
                                        empresa={empresa}
                                        configuraciones={configuraciones}
                                        redes={redes}
                                    />
                                </div>
                            );
                        default:
                            return (
                                <div>
                                    <Home />
                                </div>
                            );
                    }
                })()}

                <Sidebar
                    auth={auth}
                    cambiarHome={cambiarHome}
                    empresa={empresa}
                    configuraciones={configuraciones}
                />
                <Footer empresa={empresa} configuraciones={configuraciones} />
            </div>
        </>
    );
}
