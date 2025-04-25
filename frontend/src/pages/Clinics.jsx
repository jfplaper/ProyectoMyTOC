import React from 'react';
import { useClinics } from "../contexts/ClinicsContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ClinicsCard from "../components/ClinicsCard";

const Clinics = () => {
    const { clinics, clinicsLoading } = useClinics();

    if (clinicsLoading) {
        return <LoadingSpinner />
    } else {
        return (
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-light text-[#2ABF7A] mt-12 mb-6">CLÍNICAS ESPECIALIZADAS</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
                {clinics.map((clinic) => (
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
