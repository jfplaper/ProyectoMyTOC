import React from "react";
import { render, screen } from "@testing-library/react";
import EventsCard from "../components/EventsCard";
import '@testing-library/jest-dom';

describe("EventsCard", () => {
    const testEvent = {
        title: "Conferencia \"Aborda el TOC\"",
        text: "Os invitamos a una conferencia de puertas abiertas donde uno de los más expertos y prestigiosos psicólogos nos concederá una master class explicándonos qué herramientas y recursos emplear para afrontar el trastorno obsesivo-compulsivo. ¡Animaos a venir!",
        date: "2025-06-21 18:00:00",
        location: "Facultad de Psicología, Granada",
        image: "evento-conferencia-67ddb0cb97cc4.jpg",
    };

    test("Muestra correctamente la información del evento", () => {
        render(<EventsCard event={testEvent} />);

        // Check that title, text and location are rendered
        expect(screen.getByText('Conferencia "Aborda el TOC"')).toBeInTheDocument();
        expect(screen.getByText("Os invitamos a una conferencia de puertas abiertas donde uno de los más expertos y prestigiosos psicólogos nos concederá una master class explicándonos qué herramientas y recursos emplear para afrontar el trastorno obsesivo-compulsivo. ¡Animaos a venir!")).toBeInTheDocument();
        expect(screen.getByText("Facultad de Psicología, Granada")).toBeInTheDocument();
    });

    test("Muestra Gratuito si no hay price", () => {
        const noPriceEvent = { ...testEvent, price: "" };
        render(<EventsCard event={noPriceEvent} />);

        expect(screen.getByText(/Gratuito/)).toBeInTheDocument();
    });
});
