import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register({ configuracion }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);
    const validateForm = () => {
        const newErrors = {};

        if (!data.name) {
            newErrors.name = "El nombre es obligatorio.";
        }

        if (!data.email) {
            newErrors.email = "El correo electrónico es obligatorio.";
        } else if (!isValidEmail(data.email)) {
            newErrors.email = "Ingresa un correo electrónico válido.";
        }

        if (!data.password) {
            newErrors.password = "La contraseña es obligatoria.";
        }

        if (data.password !== data.password_confirmation) {
            newErrors.password_confirmation = "Las contraseñas no coinciden.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const isValidEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
        const isValid = validateForm();
        if (!isValid) {
            return;
        }
    };

    return (
        <div>
            <GuestLayout configuracion={configuracion}>
                <div className="flex justify-center">
                    <img
                        src={configuracion.logo}
                        alt="Logo"
                        style={{ maxWidth: "200px" }}
                    />
                </div>
                <Head title="Registro" />

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Nombre" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            style={{ borderColor: configuracion.color2 }}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="email"
                            value="Correo Electronico"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            style={{ borderColor: configuracion.color2 }}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Contraseña" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                            style={{ borderColor: configuracion.color2 }}
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmacion de Contraseña"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                            style={{ borderColor: configuracion.color2 }}
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ color: configuracion.color3 }}
                        >
                            Ya estas Registrado?
                        </Link>

                        <PrimaryButton
                            className="ml-4"
                            disabled={processing}
                            style={{
                                backgroundColor: configuracion.color4,
                                borderColor: configuracion.color4,
                            }}
                        >
                            Registrarse
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
        </div>
    );
}
