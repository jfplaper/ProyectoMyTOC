import { createContext, useContext, useState, useEffect } from "react";

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
            } else if (!response.ok) {
                console.error("Error to get threads - Response status: ", response.status);
                toast.error("Error al obtener los hilos/threads");
            }
            return data;
        } catch (error) {
            throw new Error("Error to fetch threads: ", error);
        } finally {
            setThreadsLoading(false);
        }
    };

    useEffect(() => {
        fetchThreads();
    }, []);
    
    return (
        <ThreadsContext.Provider value={{ threads, threadsLoading }}>
            {children}
        </ThreadsContext.Provider>
    );
};

export const useThreads = () => {
    const context = useContext(ThreadsContext);
    if (!context) {
        throw new Error("useThreads must be used within a ThreadsProvider");
    }
    return context;
};
