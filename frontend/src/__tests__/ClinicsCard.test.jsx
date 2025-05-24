import React from "react";
import { render, screen } from "@testing-library/react";
import ClinicsCard from "../components/ClinicsCard";
import '@testing-library/jest-dom';

describe("ClinicsCard", () => {
    const testClinic = {
        name: "ITEGRA Psicología",
        image: "itegra-67d8976829672.jpg",
        description: "Especializados en el tratamiento del TOC, ofrecen terapias personalizadas basadas en un análisis funcional del problema",
        location: "C/ Méndez Núñez, 7, Local 23, 18003 - Granada",
        phone: "628595531",
        url: "https://www.itegrapsicologia.com/psicologo-especialista-en-toc/"
    };

    test("Muestra correctamente la información de la clínica", () => {
        render(<ClinicsCard clinic={testClinic} />);

        // Check that name, description and other data are rendered
        expect(screen.getByText("ITEGRA Psicología")).toBeInTheDocument();
        expect(screen.getByText("Especializados en el tratamiento del TOC, ofrecen terapias personalizadas basadas en un análisis funcional del problema")).toBeInTheDocument();
        expect(screen.getByText("C/ Méndez Núñez, 7, Local 23, 18003 - Granada")).toBeInTheDocument();
        expect(screen.getByText("628595531")).toBeInTheDocument();
    });

    test("Muestra Email no disponible si no hay email", () => {
        const noEmailClinic = { ...testClinic, email: "" };
        render(<ClinicsCard clinic={noEmailClinic} />);

        expect(screen.getByText(/Email no disponible/)).toBeInTheDocument();
    });

    test("Muestra Teléfono no disponible si no hay phone", () => {
        const noPhoneClinic = { ...testClinic, phone: "" };
        render(<ClinicsCard clinic={noPhoneClinic} />);

        expect(screen.getByText(/Teléfono no disponible/)).toBeInTheDocument();
    });
});
