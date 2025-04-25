import React from 'react';
import { useEvents } from '../contexts/EventsContext';
import LoadingSpinner from "../components/LoadingSpinner";
import EventsCard from "../components/EventsCard";

const Events = () => {
    const { events, eventsLoading } = useEvents();

    if (eventsLoading) {
        return <LoadingSpinner />
    } else {
        return (
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-light text-[#2ABF7A] mt-12 mb-6">EVENTOS PARA LA COMUNIDAD MYTOC</h2>
                <div className="grid grid-cols-1 gap-6 p-4">
                {events.map((event) => (
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
