import React from 'react';
import { useThreads } from '../contexts/ThreadsContext';
import { useComments } from '../contexts/CommentsContext';
import LoadingSpinner from "../components/LoadingSpinner";

const Forum = () => {
  const { threads, threadsLoading } = useThreads();
  const { comments, commentsLoading } = useComments();

  if (threadsLoading || commentsLoading) {
    return <LoadingSpinner />
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-light text-[#2ABF7A] mt-12 mb-6">FORO / COMUNIDAD MYTOC</h2>

        <div className="my-4">
          <h2 className="text-xl text-center">Crea nuevo tema/hilo:</h2>
          <br/>
          <form action="index.php?c=thread" method="post">
            <input type="text" name="thread_title" placeholder="Título" required />
            <input type="submit" name="newThread" value="CREAR" />
          </form>
        </div>

        <div className="w-full max-w-7xl my-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900">¡Entra, lee y participa en cualquier tema!</h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {threads.map((thread) => (
              <li key={thread.id} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="shrink-0">
                    <img className="w-8 h-8 rounded-full" src={`${import.meta.env.VITE_BASE_URL}/uploads/images/${thread.author.image}`} alt={`Imagen del usuario ${thread.author.username}`} />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-md font-medium text-gray-900 truncate">
                      {thread.title}
                    </p>
                    <p className="text-md text-gray-500 truncate">
                      Creado el {new Date(thread.date).toLocaleDateString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false })}h. por <b className="text-[#2AB7FA]">{thread.author.username}</b>
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    3 comentarios
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

export default Forum;
