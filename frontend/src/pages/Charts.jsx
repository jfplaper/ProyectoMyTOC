import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { House } from "lucide-react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver"; // optional to automatically save
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Charts = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [compulsionsLoading, setCompulsionsLoading] = useState(false);
    const ref = useRef(null);

    const [januaryData, setJanuaryData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }, { name: '30', uv: 0 }, 
        { name: '31', uv: 0 }
    ]);

    const [februaryData, setFebruaryData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }
    ]);

    const [marchData, setMarchData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }, { name: '30', uv: 0 }, 
        { name: '31', uv: 0 }
    ]);

    const [aprilData, setAprilData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }, { name: '30', uv: 0 }
    ]);

    const [mayData, setMayData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }, { name: '30', uv: 0 }, 
        { name: '31', uv: 0 }
    ]);

    const [juneData, setJuneData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }, { name: '30', uv: 0 }
    ]);

    const [julyData, setJulyData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }, { name: '30', uv: 0 }, 
        { name: '31', uv: 0 }
    ]);

    const [augustData, setAugustData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }, { name: '30', uv: 0 }, 
        { name: '31', uv: 0 }
    ]);

    const [septemberData, setSeptemberData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }, { name: '30', uv: 0 }
    ]);

    const [octoberData, setOctoberData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }, { name: '30', uv: 0 }, 
        { name: '31', uv: 0 }
    ]);

    const [novemberData, setNovemberData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }, { name: '30', uv: 0 }
    ]);

    const [decemberData, setDecemberData] = useState([
        { name: '1', uv: 0 }, { name: '2', uv: 0 }, { name: '3', uv: 0 }, { name: '4', uv: 0 }, { name: '5', uv: 0 }, 
        { name: '6', uv: 0 }, { name: '7', uv: 0 }, { name: '8', uv: 0 }, { name: '9', uv: 0 }, { name: '10', uv: 0 }, 
        { name: '11', uv: 0 }, { name: '12', uv: 0 }, { name: '13', uv: 0 }, { name: '14', uv: 0 }, { name: '15', uv: 0 }, 
        { name: '16', uv: 0 }, { name: '17', uv: 0 }, { name: '18', uv: 0 }, { name: '19', uv: 0 }, { name: '20', uv: 0 }, 
        { name: '21', uv: 0 }, { name: '22', uv: 0 }, { name: '23', uv: 0 }, { name: '24', uv: 0 }, { name: '25', uv: 0 }, 
        { name: '26', uv: 0 }, { name: '27', uv: 0 }, { name: '28', uv: 0 }, { name: '29', uv: 0 }, { name: '30', uv: 0 }, 
        { name: '31', uv: 0 }
    ]);

    const handleDownload = () => {
        if (ref.current === null) return;

        toPng(ref.current)
            .then((dataUrl) => {
                /* // Option 1: open in a new tab
                const img = new Image();
                img.src = dataUrl;
                const w = window.open('');
                w.document.write(img.outerHTML);
                */

                // Option 2: download directly
                saveAs(dataUrl, `gráficos-mytoc-${user.username}.png`);
            })
            .catch((error) => {
                console.error("Error to generate image: ", error.message);
            });
    };

    const fetchCompulsionsByUserAndToc = async () => {
        try {
            setCompulsionsLoading(true);
            const response = await fetch(`${BASE_URL}/api/compulsion/user/${user.id}`);
            const data = await response.json();
            if (response.ok) {
                const tocData = data.filter((comp) => comp?.toc.id.toString() === id);

                let januaryCopy = [...januaryData];
                let februaryCopy = [...februaryData];
                let marchCopy = [...marchData];
                let aprilCopy = [...aprilData];
                let mayCopy = [...mayData];
                let juneCopy = [...juneData];
                let julyCopy = [...julyData];
                let augustCopy = [...augustData];
                let septemberCopy = [...septemberData];
                let octoberCopy = [...octoberData];
                let novemberCopy = [...novemberData];
                let decemberCopy = [...decemberData];
                
                tocData.forEach(entry => {
                    const date = new Date(entry.date);
                    const month = date.getMonth(); // 0=january, 11=december
                    const day = date.getDate() - 1; // Because arrays start with 0
                    switch (month) {
                        case 0: januaryCopy[day] = { ...januaryCopy[day], uv: januaryCopy[day].uv + 1 }; break;
                        case 1: februaryCopy[day] = { ...februaryCopy[day], uv: februaryCopy[day].uv + 1 }; break;
                        case 2: marchCopy[day] = { ...marchCopy[day], uv: marchCopy[day].uv + 1 }; break;
                        case 3: aprilCopy[day] = { ...aprilCopy[day], uv: aprilCopy[day].uv + 1 }; break;
                        case 4: mayCopy[day] = { ...mayCopy[day], uv: mayCopy[day].uv + 1 }; break;
                        case 5: juneCopy[day] = { ...juneCopy[day], uv: juneCopy[day].uv + 1 }; break;
                        case 6: julyCopy[day] = { ...julyCopy[day], uv: julyCopy[day].uv + 1 }; break;
                        case 7: augustCopy[day] = { ...augustCopy[day], uv: augustCopy[day].uv + 1 }; break;
                        case 8: septemberCopy[day] = { ...septemberCopy[day], uv: septemberCopy[day].uv + 1 }; break;
                        case 9: octoberCopy[day] = { ...octoberCopy[day], uv: octoberCopy[day].uv + 1 }; break;
                        case 10: novemberCopy[day] = { ...novemberCopy[day], uv: novemberCopy[day].uv + 1 }; break;
                        case 11: decemberCopy[day] = { ...decemberCopy[day], uv: decemberCopy[day].uv + 1 }; break;
                        default: break;
                    }
                });

                setJanuaryData(januaryCopy);
                setFebruaryData(februaryCopy);
                setMarchData(marchCopy);
                setAprilData(aprilCopy);
                setMayData(mayCopy);
                setJuneData(juneCopy);
                setJulyData(julyCopy);
                setAugustData(augustCopy);
                setSeptemberData(septemberCopy);
                setOctoberData(octoberCopy);
                setNovemberData(novemberCopy);
                setDecemberData(decemberCopy);
            } else {
                console.error("Error to get compulsions by user - Response status: ", response.status);
                toast.error("Error al obtener las compulsiones por usuario");
            }
        } catch (error) {
            console.error("Error to fetch compulsions by user: ", error.message);
        } finally {
            setCompulsionsLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id)
            fetchCompulsionsByUserAndToc();
    }, [user?.id, id]);

    if (compulsionsLoading) {
        return <LoadingSpinner />
    } else {
        return (
            <>
                <div ref={ref} style={{ padding: "20px", backgroundColor: "white" }}>
                    <div className="flex items-center gap-2 mt-4 ml-4">
                        <Link to="/" className="text-[#2AB7FA] hover:text-blue-700 ms-2">
                            <House className="w-6 h-6 text-[#2AB7FA] hover:text-blue-700" />
                        </Link>
                        /
                        <Link to={`/charts/${id}`} className="text-[#2AB7FA] hover:text-blue-700 ms-2">
                            Gráficos
                        </Link>
                    </div>

                    <div className="flex flex-col justify-center items-center mx-24 mb-12">
                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Enero</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={januaryData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>

                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Febrero</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={februaryData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>

                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Marzo</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={marchData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>

                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Abril</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={aprilData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>

                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Mayo</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={mayData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>

                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Junio</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={juneData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>

                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Julio</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={julyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>

                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Agosto</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={augustData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>

                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Septiembre</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={septemberData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>

                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Octubre</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={octoberData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>

                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Noviembre</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={novemberData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>

                        <h2 className="text-3xl font-light text-[#2ABF7A] mt-8 mb-6">Gráfico del TOC - Diciembre</h2>
                        <div className="grid grid-cols-1 gap-6 p-4">
                            <LineChart width={900} height={300} data={decemberData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>
                    </div>
                </div>
                <button className="bg-[#2AB7FA] text-white border-2 border-blue-500 
                    hover:border-blue-700 hover:text-blue-700 hover:bg-slate-300 rounded-lg shadow-md 
                    p-2 mb-24 mx-auto" onClick={handleDownload}>
                    Descargar 
                    <i className="fas fa-file-download text-white hover:text-blue-700 ms-1"></i>
                </button>
            </>
        );
    }
};

export default Charts;
