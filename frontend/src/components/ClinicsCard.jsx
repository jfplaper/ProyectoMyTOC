import React from "react";

function ClinicsCard({ clinic }) {
    return (
        <div className="h-full flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
            {(clinic.url ? (
            <a href={clinic.url} target="_blank">
                <img className="rounded-t-lg h-56 w-full object-cover shadow-lg" 
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${clinic.image}`} 
                    alt={`Imagen de la clínica ${clinic.name}`} />
            </a>
            ) : (
            <img className="rounded-t-lg h-56 w-full object-cover shadow-lg" 
                src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${clinic.image}`} 
                alt={`Imagen de la clínica ${clinic.name}`} />
            ))}
            <div className="p-5">
                {(clinic.url ? (
                <a href={clinic.url} target="_blank">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{clinic.name}</h5>
                </a>
                ) : (
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{clinic.name}</h5>
                ))}
                <p className="mb-3 font-normal text-gray-700">{clinic.description}</p>
                <div className="flex gap-3">
                    <i className="fa fa-map-marker-alt text-[#2AB7FA]"></i>
                    <p className="mb-3 font-normal text-black">{clinic.location}</p>
                </div>
                {(clinic.email ? (
                <div className="flex gap-3">
                    <i className="fa fa-envelope text-[#2AB7FA]"></i>
                    <p className="mb-3 font-normal text-black">{clinic.email}</p>
                </div>
                ) : (
                <p className="mb-3 font-normal text-[#2AB7FA]">
                    <span className="text-red-500">X</span> Email no disponible
                </p>
                ))}
                {(clinic.phone ? (
                <div className="flex gap-3">
                    <i className="fa fa-phone-alt text-[#2AB7FA]"></i>
                    <p className="mb-3 font-normal text-black">{clinic.phone}</p>
                </div>
                ) : (
                <p className="mb-3 font-normal text-[#2AB7FA]">
                    <span className="text-red-500">X</span> Teléfono no disponible
                </p>
                ))}
                {(clinic.url ? (
                <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#2ABF7A] rounded-lg hover:bg-green-700" 
                    href={clinic.url} target="_blank">Visitar web
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
                ) : (
                <p className="mb-3 font-normal text-[#2AB7FA]">
                    <span className="text-red-500">X</span> Sin sitio web
                </p>
                ))}
            </div>
        </div>
    );
}

export default ClinicsCard;
