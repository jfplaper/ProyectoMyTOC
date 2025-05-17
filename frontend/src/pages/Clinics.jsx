import React, { useState } from 'react';
import { useClinics } from "../contexts/ClinicsContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ClinicsCard from "../components/ClinicsCard";

const Clinics = () => {
    const { clinics, filteredClinics, setFilteredClinics, clinicsLoading } = useClinics();
    const [selectedFilter, setSelectedFilter] = useState("");
    const optionsFilter = ["Granada", "Madrid", "Málaga", "Valencia", "Sevilla", "Bilbao", "Santiago de Compostela", "Barcelona", "Todas"];
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFilter === "Todas" || selectedFilter === "") {
            setFilteredClinics(clinics);
        } else {
            const filtered = clinics.filter((cli) => cli.location.includes(selectedFilter));
            setFilteredClinics(filtered);
        }
    };

    if (clinicsLoading) {
        return <LoadingSpinner />
    } else {
        return (
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-light text-[#2ABF7A] mt-12 mb-6">CLÍNICAS ESPECIALIZADAS</h2>

                {/* Users can filter by location */}
                <div className="my-4">
                    <form className="flex justify-between items-center gap-2" onSubmit={handleSubmit}>
                        <h2 className="text-xl text-center text-gray-900 whitespace-nowrap">Filtrar por</h2>
                        <select className="p-2 border-gray-200 border rounded-lg focus:outline-[#2AB7FA] text-gray-700 text-sm" 
                            value={selectedFilter || ""} onChange={(e) => setSelectedFilter(e.target.value)}>
                            <option value="">Localización</option>
                            {optionsFilter.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                        </select>
                        <button className="p-2 mx-2 rounded-md bg-[#2AB7FA] text-white hover:bg-blue-700" 
                            type="submit">Aplicar</button>
                    </form>
                </div>

                <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredClinics.map((clinic) => (
                    <div key={clinic.id} className="h-full">
                        <ClinicsCard clinic={clinic} />
                    </div>
                ))}
                </div>
            </div>
        );
    }
};

export default Clinics;
