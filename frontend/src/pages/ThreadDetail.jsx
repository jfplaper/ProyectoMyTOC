import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useComments } from '../contexts/CommentsContext';
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ThreadDetail = () => {
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();
    const { comments, commentsLoading, createComment } = useComments();
    const [textInput, setTextInput] = useState("");
    const [threadFound, setThreadFound] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = textInput.trim();
        if (!text) {
            alert("Debes rellenar el campo con el mensaje");
            return;
        }
        createComment(user.id, id, text);
        setTextInput("");
    };
    
    const fetchThread = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/thread/${id}`);
            if (!response.ok) {
                console.error("Error to fetch thread - Response status: ", response.status);
                toast.error("Error al obtener el hilo/thread");
            }
            const data = await response.json();
            setThreadFound(data);
        } catch (error) {
            console.error("Error to fetch thread: ", error.message);
        }
    };

    useEffect(() => {
        fetchThread();
    }, []);

    if (commentsLoading || !threadFound) {
        return <LoadingSpinner />
    } else {
        return (
            <div className="flex flex-col justify-center items-center mx-96">
                <h2 className="text-3xl font-light text-[#2ABF7A] text-center mt-12 mb-6">
                    "{(threadFound.title).toUpperCase()}"
                </h2>

                {/* Only logged in users can create comments */}
                {(isAuthenticated && !user.banned) && (
                <div className="my-4">
                    <h2 className="text-xl text-center text-gray-900">Comentar sobre el tema:</h2>
                    <br/>
                    <form className="flex justify-between items-center" onSubmit={handleSubmit}>
                        <input className="p-2 mx-2 border border-gray-200 rounded-lg focus:outline-[#2AB7FA]" 
                            type="text" placeholder="Mensaje" 
                            value={textInput} onChange={(e) => setTextInput(e.target.value)} />
                        <button className="p-2 mx-2 rounded-md bg-[#2AB7FA] text-white hover:bg-blue-700" 
                            type="submit">Crear</button>
                    </form>
                </div>
                )}

                <div className="w-full max-w-7xl my-4 p-4 mb-24 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900">
                            ¡Regístrate y comenta libremente sobre el tema!
                        </h5>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                        {comments.filter((comment) => comment.visible && comment.thread.id === parseInt(id)).map((comment) => (
                            <li key={comment.id} className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="shrink-0">
                                        <img className="w-8 h-8 rounded-full" 
                                            src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${comment.author.image}`} 
                                            alt={`Imagen del usuario ${comment.author.username}`} />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-md font-medium text-gray-900">{comment.text}</p>
                                        <p className="text-md text-gray-500">
                                            Creado el {new Date(comment.date).toLocaleDateString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false })}h. por
                                            <b className="text-[#2AB7FA]"> {comment.author.username}</b>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
};

export default ThreadDetail;
