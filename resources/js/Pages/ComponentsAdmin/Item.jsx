import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import React from "react";
ResponsiveNavLink;

const Item = ({ empresa, configuraciones }) => {
    return (
        <div>
            <div className="content-wrapper  justify-content-center ">
                <div className="bg-light" style={{ minHeight: "100vh" }}>
                    <div className="row  mt-20">
                        <div className="col-lg-2"></div>
                        <div className="card text-center">
                            <div className="card-header text-center">
                                {empresa.nombre}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    Informacion de la empresa
                                </h5>
                                <p className="card-text">{empresa.correo1}</p>
                                <p className="card-text">{empresa.telefono1}</p>
                                <a
                                    href="profile.edit"
                                    className="btn btn-primary"
                                >
                                    <ResponsiveNavLink
                                        className="dropdown-item btn btn-primary"
                                        href={route("profile.edit")}
                                    >
                                        Editar
                                    </ResponsiveNavLink>
                                </a>
                            </div>
                            <div className="card-footer text-muted">
                                2 days ago
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
