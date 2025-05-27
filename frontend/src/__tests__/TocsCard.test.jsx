import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import TocsCard from "../components/TocsCard";
import '@testing-library/jest-dom';
import { vi } from "vitest";

describe("TocsCard", () => {
    const testToc = {
        name: "Limpieza",
        description: "Miedo a la suciedad o gérmenes que lleva a lavarse en exceso",
        image: "limpieza-67d846046a96c.jpg",
    };

    // This avoids the actual request to the external API.
    // And LoadingSpinner disappears because fetchTotalCompulsions works
    beforeEach(() => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]), // Return empty compulsions
            })
        );
    });

    test("Muestra correctamente la información del TOC", async () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <TocsCard toc={testToc} />
                </AuthProvider>
            </MemoryRouter>
        );

        // Check that name and description are rendered
        expect(await screen.findByText("Limpieza")).toBeInTheDocument();
        expect(screen.getByText("Miedo a la suciedad o gérmenes que lleva a lavarse en exceso")).toBeInTheDocument();
    });
});
