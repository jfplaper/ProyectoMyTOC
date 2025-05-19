import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EventsContext = createContext(null);

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState({});
    const [filteredEvents, setFilteredEvents] = useState({});
    const [eventsLoading, setEventsLoading] = useState(false);
    const [favoriteEvents, setFavoriteEvents] = useState([]);

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

    const addEventToFavorites = (event) => {
        if (favoriteEvents.some((eve) => eve.id === event.id)) {
            toast.error("El evento ya está en favoritos", {
                style: { background: "#fad1e6", color: "red", border: "2px solid red" },
            });
            return;
        }

        setFavoriteEvents((prev) => [...prev, event]);
        toast.success(`Evento ${event.title} añadido a favoritos`, {
            style: { background: "#d1fae5", color: "black", border: "2px solid green" },
            icon: "👍",
        });
    };
  
    const removeEventFromFavorites = (eventId) => {
        setFavoriteEvents((prev) => prev.filter((eve) => eve?.id !== eventId));
        toast.success("Evento eliminado de favoritos", {
            style: { background: "#d1fae5", color: "black", border: "2px solid green" },
            icon: "🗑️",
        });
    };

    useEffect(() => {
        fetchEvents();
    }, []);
    
    return (
        <EventsContext.Provider 
            value={{ 
                events, 
                filteredEvents, 
                setFilteredEvents, 
                eventsLoading, 
                favoriteEvents, 
                addEventToFavorites, 
                removeEventFromFavorites 
            }}>
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
