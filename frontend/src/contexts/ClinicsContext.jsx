import { createContext, useContext, useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ClinicsContext = createContext(null);

export const ClinicsProvider = ({ children }) => {
    const [clinics, setClinics] = useState({});
    const [clinicsLoading, setClinicsLoading] = useState(false);

    const fetchClinics = async () => {
        try {
            setClinicsLoading(true);
            const response = await fetch(`${BASE_URL}/api/clinic`);
            const data = await response.json();
            if (response.ok) {
                setClinics(data);
            } else if (!response.ok) {
                console.error("Error to get clinics - Response status: ", response.status);
                toast.error("Error al obtener las clínicas");
            }
            return data;
        } catch (error) {
            throw new Error("Error to fetch clinics: ", error);
        } finally {
            setClinicsLoading(false);
        }
    };

    useEffect(() => {
        fetchClinics();
    }, []);
    
    return (
        <ClinicsContext.Provider value={{ clinics, clinicsLoading }}>
            {children}
        </ClinicsContext.Provider>
    );
};

export const useClinics = () => {
    const context = useContext(ClinicsContext);
    if (!context) {
        throw new Error("useClinics must be used within a ClinicsProvider");
    }
    return context;
};
