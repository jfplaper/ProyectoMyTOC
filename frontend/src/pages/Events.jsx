import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { House } from "lucide-react";
import { useEvents } from '../contexts/EventsContext';
import LoadingSpinner from "../components/LoadingSpinner";
import EventsCard from "../components/EventsCard";
import FavEventsCard from "../components/FavEventsCard";

const Events = () => {
    const { events, filteredEvents, setFilteredEvents, eventsLoading, favoriteEvents, 
        addEventToFavorites, removeEventFromFavorites } = useEvents();

    const [selectedPriceFilter, setSelectedPriceFilter] = useState("");
    const optionsPriceFilter = ["Gratuito", "No gratuito", "Todos"];

    const [selectedDateFilter, setSelectedDateFilter] = useState("");
    const optionsDateFilter = ["2025-05", "2025-06", "Todas"];

    const [selectedLocationFilter, setSelectedLocationFilter] = useState("");
    const optionsLocationFilter = ["Granada", "Madrid", "Málaga", "Valencia", "Sevilla", "Bilbao", "Santiago de Compostela", "Barcelona", "Todas"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = events;

        if (selectedPriceFilter === "Gratuito")
            result = result.filter(eve => !eve.price);
        else if (selectedPriceFilter === "No gratuito")
            result = result.filter(eve => eve.price);

        if (selectedDateFilter && selectedDateFilter !== "Todas")
            result = result.filter(eve => eve.date.includes(selectedDateFilter));

        if (selectedLocationFilter && selectedLocationFilter !== "Todas")
            result = result.filter(eve => eve.location.includes(selectedLocationFilter));

        setFilteredEvents(result);
    };

    if (eventsLoading) {
        return <LoadingSpinner />
    } else {
        return (
            <>
                <div className="flex items-center gap-2 mt-4 ml-4">
                    <Link to="/" className="text-[#2AB7FA] hover:text-blue-700 ms-2">
                        <House className="w-6 h-6 text-[#2AB7FA] hover:text-blue-700" />
                    </Link>
                    /
                    <Link to="/events" className="text-[#2AB7FA] hover:text-blue-700 ms-2">
                        Eventos
                    </Link>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">EVENTOS PARA LA COMUNIDAD MYTOC</h2>

                    {/* Users can filter by price, date and/or location */}
                    <div className="mt-4 mb-8">
                        <form className="flex justify-between items-center gap-2" onSubmit={handleSubmit}>
                            <h2 className="text-xl text-center text-gray-900 whitespace-nowrap">Filtrar por</h2>
                            <select className="p-2 border-gray-200 border rounded-lg focus:outline-[#2AB7FA] text-gray-700 text-sm" 
                                value={selectedPriceFilter || ""} onChange={(e) => setSelectedPriceFilter(e.target.value)}>
                                <option value="">Precio</option>
                                {optionsPriceFilter.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                            </select>
                            <select className="p-2 border-gray-200 border rounded-lg focus:outline-[#2AB7FA] text-gray-700 text-sm" 
                                value={selectedDateFilter || ""} onChange={(e) => setSelectedDateFilter(e.target.value)}>
                                <option value="">Fecha</option>
                                {optionsDateFilter.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                            </select>
                            <select className="p-2 border-gray-200 border rounded-lg focus:outline-[#2AB7FA] text-gray-700 text-sm" 
                                value={selectedLocationFilter || ""} onChange={(e) => setSelectedLocationFilter(e.target.value)}>
                                <option value="">Localización</option>
                                {optionsLocationFilter.map((option, index) => (<option key={index} value={option}>{option}</option>))}
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
            </>
        );
    }
};

export default Events;
