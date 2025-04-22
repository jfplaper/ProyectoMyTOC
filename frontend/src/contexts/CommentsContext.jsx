import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CommentsContext = createContext(null);

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState({});
    const [commentsLoading, setCommentsLoading] = useState(false);

    const fetchComments = async () => {
        try {
            setCommentsLoading(true);
            const response = await fetch(`${BASE_URL}/api/comment`);
            const data = await response.json();
            if (response.ok) {
                setComments(data);
            } else if (!response.ok) {
                console.error("Error to get comments - Response status: ", response.status);
                toast.error("Error al obtener los comentarios");
            }
            return data;
        } catch (error) {
            throw new Error("Error to fetch comments: ", error);
        } finally {
            setCommentsLoading(false);
        }
    };

    const createComment = async (user_id, thread_id, text) => {
        try {
            const response = await fetch(`${BASE_URL}/api/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"author": user_id, "thread": thread_id, "text": text})
            });
    
            if (!response.ok) {
                console.error("Error to create new comment - Response status: ", response.status);
                toast.error("Error al crear nuevo comentario. Rellena correctamente el campo del mensaje");
            }
            toast.success("¡Acabas de publicar un comentario!");
        } catch (error) {
            throw new Error("Error to create new comment: ", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);
    
    return (
        <CommentsContext.Provider value={{ comments, commentsLoading, createComment }}>
            {children}
        </CommentsContext.Provider>
    );
};

export const useComments = () => {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error("useComments must be used within a CommentsProvider");
    }
    return context;
};
