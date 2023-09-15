import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Admin from "./Admin";
import Header from "./ComponentsAdmin/Header";
import { usePage } from "@inertiajs/inertia-react";

const countries = [
    { name: "Venezuela", code: "VE" },
    { name: "Uruguay", code: "UY" },
    { name: "El Salvador", code: "SV" },
    { name: "Cuba", code: "CU" },
];

const states = [
    // Venezuela
    { name: "Amazonas", country: "Venezuela" },
    { name: "Anzoategui", country: "Venezuela" },
    { name: "Apure", country: "Venezuela" },
    { name: "Aragua", country: "Venezuela" },
    { name: "Barinas", country: "Venezuela" },
    { name: "Bolivar", country: "Venezuela" },
    { name: "Carabobo", country: "Venezuela" },
    { name: "Cojedes", country: "Venezuela" },
    { name: "Delta Amacuro", country: "Venezuela" },
    { name: "Falcon", country: "Venezuela" },
    { name: "Guarico", country: "Venezuela" },
    { name: "Lara", country: "Venezuela" },
    { name: "Merida", country: "Venezuela" },
    { name: "Miranda", country: "Venezuela" },
    { name: "Monagas", country: "Venezuela" },
    { name: "Nueva Esparta", country: "Venezuela" },
    { name: "Portuguesa", country: "Venezuela" },
    { name: "Sucre", country: "Venezuela" },
    { name: "Tachira", country: "Venezuela" },
    { name: "Trujillo", country: "Venezuela" },
    { name: "Vargas", country: "Venezuela" },
    { name: "Yaracuy", country: "Venezuela" },
    { name: "Zulia", country: "Venezuela" },

    // Uruguay
    { name: "Artigas", country: "Uruguay" },
    { name: "Canelones", country: "Uruguay" },
    { name: "Cerro Largo", country: "Uruguay" },
    { name: "Colonia", country: "Uruguay" },
    { name: "Durazno", country: "Uruguay" },
    { name: "Flores", country: "Uruguay" },
    { name: "Florida", country: "Uruguay" },
    { name: "Lavalleja", country: "Uruguay" },
    { name: "Maldonado", country: "Uruguay" },
    { name: "Montevideo", country: "Uruguay" },
    { name: "Paysandú", country: "Uruguay" },
    { name: "Rio Negro", country: "Uruguay" },
    { name: "Rivera", country: "Uruguay" },
    { name: "Rocha", country: "Uruguay" },
    { name: "Salto", country: "Uruguay" },
    { name: "San José", country: "Uruguay" },
    { name: "Soriano", country: "Uruguay" },
    { name: "Tacuarembo", country: "Uruguay" },
    { name: "Treinta y Tres", country: "Uruguay" },

    // El Salvador
    { name: "Ahuachapán", country: "El Salvador" },
    { name: "Cabañas", country: "El Salvador" },
    { name: "Cuscatlán", country: "El Salvador" },
    { name: "Chalatenango", country: "El Salvador" },
    { name: "La Libertad", country: "El Salvador" },
    { name: "La Paz", country: "El Salvador" },
    { name: "La Union", country: "El Salvador" },
    { name: "Morazán", country: "El Salvador" },
    { name: "San Miguel", country: "El Salvador" },
    { name: "San Salvador", country: "El Salvador" },
    { name: "San Vicente", country: "El Salvador" },
    { name: "Santa Ana", country: "El Salvador" },
    { name: "Sonsonate", country: "El Salvador" },
    { name: "Usulután", country: "El Salvador" },

    // Cuba
    { name: "Pinar del Río", country: "Cuba" },
    { name: "Artemisa", country: "Cuba" },
    { name: "La Habana", country: "Cuba" },
    { name: "Mayabeque", country: "Cuba" },
    { name: "Isla de la Juventud", country: "Cuba" },
    { name: "Matanzas", country: "Cuba" },
    { name: "Cienfuegos", country: "Cuba" },
    { name: "Villa Clara", country: "Cuba" },
    { name: "Sancti Spíritus", country: "Cuba" },
    { name: "Ciego de Ávila", country: "Cuba" },
    { name: "Camagüey", country: "Cuba" },
    { name: "Las Tunas", country: "Cuba" },
    { name: "Holguín", country: "Cuba" },
    { name: "Granma", country: "Cuba" },
    { name: "Santiago de Cuba", country: "Cuba" },
    { name: "Guantánamo", country: "Cuba" },
];

export default function Dashboard({ auth, empresa, configuraciones }) {
    // useEffect(() => localStorage.setItem("empresa", JSON.stringify(empresa)),[empresa]);
    document.title = empresa.nombre;
    if (configuraciones && configuraciones.favicon) {
        const favicon =
            document.querySelector("link[rel*='icon']") ||
            document.createElement("link");
        favicon.type = "image/x-icon";
        favicon.rel = "icon";
        favicon.href = configuraciones.favicon;
        document.getElementsByTagName("head")[0].appendChild(favicon);
    }

    const [home, setHome] = useState("none");
    const cambiarHome = (home) => {
        setHome(home);
    };
    return (
        <>
            <div className="wrapper hold-transition sidebar-mini">
                <Head title="Dashboard" />
                {auth.user.role === "admin" ? (
                    <>
                        <Admin
                            empresa={empresa}
                            auth={auth}
                            cambiarHome={cambiarHome}
                            home={home}
                            states={states}
                            countries={countries}
                            configuraciones={configuraciones}
                        />
                    </>
                ) : (
                    <>
                        <Header
                            auth={auth}
                            configuraciones={configuraciones}
                            empresa={empresa}
                        />
                        <div className="py-4">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="bg-white border rounded p-4">
                                    <div className="text-dark font-weight-bold h4 mb-4">
                                        Welcome to Your Dashboard
                                    </div>
                                    <p className="text-muted">
                                        You are logged in as {auth.user.name}.
                                    </p>
                                    <p className="text-muted">
                                        Feel free to explore the features and
                                        manage your account.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
