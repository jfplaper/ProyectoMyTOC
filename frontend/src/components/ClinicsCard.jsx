import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";

function ClinicsCard({ clinic }) {
    return (
        <motion.div className="flex flex-col justify-between bg-white border border-gray-200 rounded-2xl 
            shadow-md overflow-hidden transition-shadow hover:shadow-xl hover:scale-105 transform-gpu" 
            whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <div className="relative h-56 w-full overflow-hidden">
                <img className="h-full w-full object-cover shadow-lg" 
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${clinic.image}`}
                    alt={`Imagen de la clínica ${clinic.name}`} loading="lazy" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent 
                    p-2">
                    <h5 className="text-lg font-semibold text-white truncate">{clinic.name}</h5>
                </div>
                {clinic.url && (
                <a href={clinic.url} target="_blank" rel="noopener noreferrer" 
                    className="absolute inset-0 w-full h-full"></a>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                    <p className="mb-4 text-gray-700 text-sm line-clamp-3">{clinic.description}</p>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#2AB7FA]" />
                        <span className="text-gray-900 truncate">{clinic.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-[#2AB7FA]" />
                        {clinic.email ? (
                        <a href={`mailto:${clinic.email}`} className="text-gray-900 truncate">{clinic.email}</a>
                        ) : (
                        <span className="text-red-500">No disponible</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-[#2AB7FA]" />
                        {clinic.phone ? (
                        <a href={`tel:${clinic.phone}`} className="text-gray-900">{clinic.phone}</a>
                        ) : (
                        <span className="text-red-500">No disponible</span>
                        )}
                    </div>
                </div>

                {clinic.url && (
                <a href={clinic.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex 
                    items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r 
                    from-[#2AB7FA] to-[#2ABF7A] text-white hover:from-blue-600 hover:to-green-600 
                    transition-colors">
                    Visitar web
                    <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                )}
            </div>
        </motion.div>
    );
}

export default ClinicsCard;
