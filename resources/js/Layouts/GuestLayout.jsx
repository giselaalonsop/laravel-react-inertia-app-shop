import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children, configuracion }) {
    return (
        <div>
            <div
                className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100"
                style={{ backgroundColor: configuracion.color2 }}
            >
                <div></div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white bg-opacity-75 shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
