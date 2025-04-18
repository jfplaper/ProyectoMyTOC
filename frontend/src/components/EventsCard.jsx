import React from "react";

function EventsCard({ event }) {
  return (   
        <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${event.image}`} alt={`Imagen del evento ${event.title}`} />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{event.title}</h5>
                <p className="mb-3 font-normal text-gray-700">{event.text}</p>
                <p className="mb-3 font-normal text-[#2AB7FA]">{event.location}</p>
                <div className="flex justify-around items-center">
                    <div className="flex gap-3">
                        <i className="fa fa-calendar text-[#2AB7FA]"></i>
                        <p className="mb-3 font-normal text-black">{new Date(event.date).toLocaleDateString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false })}h.</p>
                    </div>

                    {(event.price ? (
                    <p className="mb-3 text-lg font-semibold text-black">{event.price} €</p>
                    ) : (
                    <p className="mb-3 text-xl font-semibold text-[#2ABF7A]">Gratuito</p>
                    ))}
                </div>
            </div>
        </a>
  );
}

export default EventsCard;
