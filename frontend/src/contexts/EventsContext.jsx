import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EventsContext = createContext(null);

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState({});
    const [filteredEvents, setFilteredEvents] = useState({});
    const [eventsLoading, setEventsLoading] = useState(false);

    const fetchEvents = async () => {
        try {
            setEventsLoading(true);
            const response = await fetch(`${BASE_URL}/api/event`);
            const data = await response.json();
            if (response.ok) {
                setEvents(data);
                setFilteredEvents(data);
            } else {
                console.error("Error to get events - Response status: ", response.status);
                toast.error("Error al obtener los eventos");
            }
        } catch (error) {
            console.error("Error to fetch events: ", error.message);
        } finally {
            setEventsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);
    
    return (
        <EventsContext.Provider value={{ events, filteredEvents, setFilteredEvents, eventsLoading }}>
            {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventsContext);
    if (!context)
        throw new Error("useEvents must be used within an EventsProvider");
    return context;
};
