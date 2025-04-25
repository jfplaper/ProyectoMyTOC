import React, { useState } from 'react';
import { useEvents } from '../contexts/EventsContext';
import LoadingSpinner from "../components/LoadingSpinner";
import EventsCard from "../components/EventsCard";

const Events = () => {
    const { events, filteredEvents, setFilteredEvents, eventsLoading } = useEvents();
    const [selectedFilter, setSelectedFilter] = useState("");
    const optionsFilter = ["Gratuito", "No gratuito", "Todos"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFilter === "Todos" || selectedFilter === "") {
            setFilteredEvents(events);
        } else if (selectedFilter === "Gratuito") {
            const filtered = events.filter((eve) => !eve.price);
            setFilteredEvents(filtered);
        } else { // No gratuito
            const filtered = events.filter((eve) => eve.price);
            setFilteredEvents(filtered);
        }
    };

    if (eventsLoading) {
        return <LoadingSpinner />
    } else {
        return (
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-light text-[#2ABF7A] mt-12 mb-6">EVENTOS PARA LA COMUNIDAD MYTOC</h2>

                {/* Users can filter by price */}
                <div className="my-4">
                    <form className="flex justify-between items-center gap-2" onSubmit={handleSubmit}>
                        <h2 className="text-xl text-center text-gray-900 whitespace-nowrap">Filtrar por</h2>
                        <select className="p-2 border-gray-200 border rounded-lg focus:outline-[#2AB7FA] text-gray-700 text-sm" 
                            value={selectedFilter || ""} onChange={(e) => setSelectedFilter(e.target.value)}>
                            <option value="">Precio</option>
                            {optionsFilter.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                        </select>
                        <button className="p-2 mx-2 rounded-md bg-[#2AB7FA] text-white hover:bg-blue-700" 
                            type="submit">Aplicar</button>
                    </form>
                </div>

                <div className="grid grid-cols-1 gap-6 p-4">
                {filteredEvents.map((event) => (
                    <div key={event.id} className="h-full">
                        <EventsCard event={event} />
                    </div>
                ))}
                </div>
            </div>
        );
    }
};

export default Events;
