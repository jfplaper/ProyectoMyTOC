import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useThreads } from '../contexts/ThreadsContext';
import { useComments } from '../contexts/CommentsContext';
import LoadingSpinner from "../components/LoadingSpinner";

const Forum = () => {
    const { isAuthenticated, user } = useAuth();
    const { threads, threadsLoading, createThread } = useThreads();
    const { comments, commentsLoading } = useComments();
    const [titleInput, setTitleInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = titleInput.trim();
        if (!title) {
            alert("Debes rellenar el campo con el título");
            return;
        }
        createThread(user.id, title);
        setTitleInput("");
    };

    if (threadsLoading || commentsLoading) {
        return <LoadingSpinner />
    } else {
        return (
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-light text-[#2ABF7A] mt-12 mb-6">FORO / COMUNIDAD MYTOC</h2>

                {/* Only logged in users can create threads */}
                {(isAuthenticated && !user.banned) && (
                <div className="my-4">
                    <h2 className="text-xl text-center text-gray-900">Crear nuevo tema:</h2>
                    <br/>
                    <form className="flex justify-between items-center" onSubmit={handleSubmit}>
                        <input className="p-2 mx-2 border border-gray-200 rounded-lg focus:outline-[#2AB7FA]" 
                            type="text" placeholder="Título" 
                            value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
                        <button className="p-2 mx-2 rounded-md bg-[#2AB7FA] text-white hover:bg-blue-700" 
                            type="submit">Crear</button>
                    </form>
                </div>
                )}

                <div className="w-full max-w-7xl my-4 p-4 mb-24 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900">
                            ¡Entra, lee y participa en cualquier tema!
                        </h5>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                        {threads.filter((thread) => thread.visible).map((thread) => (
                            <li key={thread.id} className="py-3 sm:py-4">
                                <Link to={`/thread/${thread.id}`} className="group">
                                    <div className="flex items-center">
                                        <div className="shrink-0">
                                            <img className="w-8 h-8 rounded-full" 
                                                src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${thread.author.image}`} 
                                                alt={`Imagen del usuario ${thread.author.username}`} />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-md font-medium text-gray-900 truncate">
                                                {thread.title}
                                            </p>
                                            <p className="text-md text-gray-500">
                                                Creado el {new Date(thread.date).toLocaleDateString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false })}h. por
                                                <b className="text-[#2AB7FA]"> {thread.author.username}</b>
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-[#2ABF7A]">
                                            {comments.filter((comment) => comment.thread.id === thread.id).length} comentarios
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
};

export default Forum;
