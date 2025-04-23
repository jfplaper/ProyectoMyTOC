import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function TocsCard({ toc }) {
    const { user } = useAuth();
    const [currentDayCompulsions, setCurrentDayCompulsions] = useState(0);
    const [currentMonthCompulsions, setCurrentMonthCompulsions] = useState(0);
    const [currentYearCompulsions, setCurrentYearCompulsions] = useState(0);
    const [compulsionsLoading, setCompulsionsLoading] = useState(false);

    const increaseCompulsions = () => {
        setCurrentDayCompulsions(prev => prev + 1);
        setCurrentMonthCompulsions(prev => prev + 1);
        setCurrentYearCompulsions(prev => prev + 1);
    };

    const fetchTotalCompulsions = async () => {
        try {
            setCompulsionsLoading(true);
            const response = await fetch(`${BASE_URL}/api/compulsion`);
            const data = await response.json();
            if (response.ok) {
                data.forEach((compulsion) => {
                    if (compulsion.user.id == user.id && compulsion.toc.id == toc.id) {
                        // Get the total compulsions for the current day
                        if (new Date(compulsion.date).getDate() === new Date().getDate() && 
                            new Date(compulsion.date).getMonth() === new Date().getMonth() && 
                            new Date(compulsion.date).getFullYear() === new Date().getFullYear()) {
                                setCurrentDayCompulsions(prev => prev + 1);
                        }
                        // Get the total compulsions for the current month
                        if (new Date(compulsion.date).getMonth() === new Date().getMonth() && 
                            new Date(compulsion.date).getFullYear() === new Date().getFullYear()) {
                                setCurrentMonthCompulsions(prev => prev + 1);
                        }
                        // Gets the total compulsions for the current year
                        if (new Date(compulsion.date).getFullYear() === new Date().getFullYear()) {
                                setCurrentYearCompulsions(prev => prev + 1);
                        }
                    }
                });
            } else if (!response.ok) {
                console.error("Error to get compulsions - Response status: ", response.status);
                toast.error("Error al obtener las compulsiones");
            }
            return data;
        } catch (error) {
            throw new Error("Error to fetch compulsions: " + error.message);
        } finally {
            setCompulsionsLoading(false);
        }
    };

    useEffect(() => {
        fetchTotalCompulsions();
    }, []);

    if (compulsionsLoading) {
        return <LoadingSpinner />
    } else {
        return (
            <div className="h-full flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="relative">
                    <img className="rounded-t-lg h-56 w-full object-cover shadow-lg" src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${toc.image}`} alt={`Imagen del TOC ${toc.name}`} />
                    <h5 className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm font-bold text-gray-900 shadow">{toc.name}</h5>
                    <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-sm text-gray-900 shadow flex items-center gap-2">
                        <i className="fa fa-brain text-[#2AB7FA]"></i>
                        <p className="font-semibold text-gray-900">
                            Total del día: &nbsp;<span className="text-[#2AB7FA] font-semibold">{currentDayCompulsions}</span>
                        </p>
                    </div>
                    <button className="absolute bottom-2 right-2 bg-[#2ABF7A] hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xl font-medium shadow" 
                        onClick={increaseCompulsions}>+1&#8593;</button>
                </div>
                <div className="p-5">
                    <p className="mb-3 font-normal text-gray-700">
                        <span className="text-gray-900 font-semibold">Descripción: </span>{toc.description}
                    </p>
                    <p className="mb-3 font-normal text-gray-700">
                        <span className="text-gray-900 font-semibold">Total del mes: </span>{currentMonthCompulsions}
                    </p>
                    <p className="mb-3 font-normal text-gray-700">
                        <span className="text-gray-900 font-semibold">Total del año: </span>{currentYearCompulsions}
                    </p>
                </div>
            </div>
        );
    }
}

export default TocsCard;
