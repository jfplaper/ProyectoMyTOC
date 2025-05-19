import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, BrushCleaning } from "lucide-react";

function FavEventsCard({ event, removeEventFromFavorites }) {
    const dateObj = new Date(event.date);
    const dateStr = dateObj.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    const timeStr = dateObj.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return (
        <motion.a href="#" className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden 
            hover:shadow-2xl transform transition hover:-translate-y-1" whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 250, damping: 20 }}>

            {/* Image on the left */}
            <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                <img src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${event.image}`} 
                    alt={`Imagen del evento ${event.title}`} className="object-cover w-full h-full" loading="lazy" />
                {/* Remove from favorite button overlay */}
                <button className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white" 
                    onClick={() => removeEventFromFavorites(event.id)}>
                    <BrushCleaning className="w-6 h-6 text-red-500 fill-red-500" />
                </button>
            </div>

            {/* The rest of the content on the right */}
            <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-700 mb-4 line-clamp-3">{event.text}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between text-gray-900 text-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-[#2AB7FA]" />
                        <span>{dateStr} · {timeStr}h</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2 text-gray-900">
                        <MapPin className="w-5 h-5 text-[#2AB7FA]" />
                        <span>{event.location}</span>
                    </div>

                    <span
                        className={`px-3 py-1 rounded-full font-semibold text-xs
                        ${event.price
                            ? "bg-gray-200 text-gray-900"
                            : "bg-green-100 text-green-800"}`}>
                        {event.price ? `${event.price} €` : "Gratuito"}
                    </span>
                </div>

                <div className="mt-4">
                    <button className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-[#2AB7FA] 
                        to-[#2ABF7A] text-white text-sm font-medium rounded-lg hover:from-blue-600 
                        hover:to-green-600 transition">
                        Ver detalles
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        </motion.a>
    );
}

export default FavEventsCard;
