import React from 'react';
import { useClinics } from "../contexts/ClinicsContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Clinics = () => {
  const { clinics, clinicsLoading } = useClinics();

  if (clinicsLoading) {
    return <LoadingSpinner />
  } else {
    return (
      <div>
      {clinics.map((clinic) => (
        <div key={clinic.id}>
          <h2>{clinic.name}</h2>
          <p>{clinic.location}</p>
        </div>
      ))}
      </div>
    );
  }
};

export default Clinics;
