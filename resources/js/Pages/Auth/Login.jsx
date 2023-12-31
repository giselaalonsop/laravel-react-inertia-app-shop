import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword, configuracion }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);
    const validateEmail = (email) => {
        const isValid = /\S+@\S+\.\S+/.test(email);
        return isValid ? "" : "El correo electrónico no es válido";
    };

    const validatePassword = (password) => {
        return password.length >= 8
            ? ""
            : "La contraseña debe tener al menos 8 caracteres";
    };
    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
        }
    };

    return (
        <div style={{ height: "100vh", backgroundColor: configuracion.color3 }}>
            <GuestLayout
                configuracion={configuracion}
                style={{
                    backgroundColor: configuracion.color2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {" "}
                <div className="flex justify-center">
                    <img
                        src={configuracion.logo} // Agrega el logo
                        alt="Logo"
                        style={{ maxWidth: "200px" }}
                    />
                </div>
                <Head title="Log in" />
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Correo" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
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
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            style={{ borderColor: configuracion.color2 }}
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Recuerdame
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                style={{ color: configuracion.color2 }}
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}

                        <PrimaryButton
                            className="ml-4"
                            disabled={processing}
                            style={{
                                backgroundColor: configuracion.color4,
                                borderColor: configuracion.color4,
                            }}
                        >
                            Ingresar
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
        </div>
    );
}
