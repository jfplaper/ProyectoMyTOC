import React, { useState } from 'react';
import { useEvents } from '../contexts/EventsContext';
import LoadingSpinner from "../components/LoadingSpinner";
import EventsCard from "../components/EventsCard";
import FavEventsCard from "../components/FavEventsCard";

const Events = () => {
    const { events, filteredEvents, setFilteredEvents, eventsLoading, favoriteEvents, 
        addEventToFavorites, removeEventFromFavorites } = useEvents();
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
                <div className="mt-4 mb-8">
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

                {favoriteEvents.length !== 0 && (
                    <h2 className="text-2xl font-light text-[#2ABF7A] mt-2 mb-6">Eventos favoritos</h2>
                )}

                {/* Favorite events */}
                {favoriteEvents.length !== 0 && (
                <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteEvents.map((favEvent) => (
                        <div key={favEvent.id} className="h-full">
                            <FavEventsCard event={favEvent} removeEventFromFavorites={removeEventFromFavorites} />
                        </div>
                    ))}
                </div>
                )}

                {favoriteEvents.length !== 0 && (
                    <div className="w-75 h-0.5 my-8 bg-gray-300"></div>
                )}

                {/* All and filtered events */}
                <div className="container mx-auto px-4 py-8 mb-16 flex flex-col space-y-6">
                {filteredEvents.map((event) => (
                    <EventsCard key={event.id} event={event} addEventToFavorites={addEventToFavorites} />
                ))}
                </div>
            </div>
        );
    }
};

export default Events;
