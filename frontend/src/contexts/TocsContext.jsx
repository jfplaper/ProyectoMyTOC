import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const TocsContext = createContext(null);

export const TocsProvider = ({ children }) => {
    const [tocs, setTocs] = useState({});
    const [tocsLoading, setTocsLoading] = useState(false);

    const fetchTocs = async () => {
        try {
            setTocsLoading(true);
            const response = await fetch(`${BASE_URL}/api/toc`);
            const data = await response.json();
            if (response.ok) {
                setTocs(data);
            } else if (!response.ok) {
                console.error("Error to get tocs - Response status: ", response.status);
                toast.error("Error al obtener los tocs");
            }
            return data;
        } catch (error) {
            throw new Error("Error to fetch tocs: ", error);
        } finally {
            setTocsLoading(false);
        }
    };

    useEffect(() => {
        fetchTocs();
    }, []);
    
    return (
        <TocsContext.Provider value={{ tocs, tocsLoading }}>
            {children}
        </TocsContext.Provider>
    );
};

export const useTocs = () => {
    const context = useContext(TocsContext);
    if (!context) {
        throw new Error("useTocs must be used within a TocsProvider");
    }
    return context;
};
