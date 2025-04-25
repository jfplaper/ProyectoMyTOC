import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ThreadsContext = createContext(null);

export const ThreadsProvider = ({ children }) => {
    const [threads, setThreads] = useState({});
    const [threadsLoading, setThreadsLoading] = useState(false);

    const fetchThreads = async () => {
        try {
            setThreadsLoading(true);
            const response = await fetch(`${BASE_URL}/api/thread`);
            const data = await response.json();
            if (response.ok) {
                setThreads(data);
            } else {
                console.error("Error to get threads - Response status: ", response.status);
                toast.error("Error al obtener los hilos/threads");
            }
        } catch (error) {
            console.error("Error to fetch threads: ", error.message);
        } finally {
            setThreadsLoading(false);
        }
    };

    const createThread = async (user_id, title) => {
        try {
            const response = await fetch(`${BASE_URL}/api/thread`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "author": user_id, "title": title })
            });
        
            if (!response.ok) {
                console.error("Error to create new thread - Response status: ", response.status);
                toast.error("Error al crear nuevo tema. Rellena correctamente el campo del título");
            }
            toast.success("¡Acabas de publicar un nuevo tema!");
        } catch (error) {
            console.error("Error to create new thread: ", error.message);
        }
    };

    useEffect(() => {
        fetchThreads();
    }, []);
    
    return (
        <ThreadsContext.Provider value={{ threads, threadsLoading, createThread }}>
            {children}
        </ThreadsContext.Provider>
    );
};

export const useThreads = () => {
    const context = useContext(ThreadsContext);
    if (!context)
        throw new Error("useThreads must be used within a ThreadsProvider");
    return context;
};
