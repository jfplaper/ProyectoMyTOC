import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ClinicsContext = createContext(null);

export const ClinicsProvider = ({ children }) => {
    const [clinics, setClinics] = useState({});
    const [filteredClinics, setFilteredClinics] = useState({});
    const [clinicsLoading, setClinicsLoading] = useState(false);
    const [favoriteClinics, setFavoriteClinics] = useState([]);

    const fetchClinics = async () => {
        try {
            setClinicsLoading(true);
            const response = await fetch(`${BASE_URL}/api/clinic`);
            const data = await response.json();
            if (response.ok) {
                setClinics(data);
                setFilteredClinics(data);
            } else {
                console.error("Error to get clinics - Response status: ", response.status);
                toast.error("Error al obtener las clínicas");
            }
        } catch (error) {
            console.error("Error to fetch clinics: ", error.message);
        } finally {
            setClinicsLoading(false);
        }
    };

    const addClinicToFavorites = (clinic) => {
        if (favoriteClinics.some((cli) => cli.id === clinic.id)) {
            toast.error("La clínica ya está en favoritos", {
                style: { background: "#fad1e6", color: "red", border: "2px solid red" },
            });
            return;
        }

        setFavoriteClinics((prev) => [...prev, clinic]);
        toast.success(`Clínica ${clinic.name} añadida a favoritos`, {
            style: { background: "#d1fae5", color: "black", border: "2px solid green" },
            icon: "👍",
        });
    };
  
    const removeClinicFromFavorites = (clinicId) => {
        setFavoriteClinics((prev) => prev.filter((cli) => cli?.id !== clinicId));
        toast.success("Clínica eliminada de favoritos", {
            style: { background: "#d1fae5", color: "black", border: "2px solid green" },
            icon: "🗑️",
        });
    };

    useEffect(() => {
        fetchClinics();
    }, []);
    
    return (
        <ClinicsContext.Provider 
            value={{ 
                clinics, 
                filteredClinics, 
                setFilteredClinics, 
                clinicsLoading, 
                favoriteClinics, 
                addClinicToFavorites, 
                removeClinicFromFavorites 
            }}>
            {children}
        </ClinicsContext.Provider>
    );
};

export const useClinics = () => {
    const context = useContext(ClinicsContext);
    if (!context)
        throw new Error("useClinics must be used within a ClinicsProvider");
    return context;
};
