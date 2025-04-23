import React from 'react';
import { Link } from "react-router-dom";
import { useTocs } from "../contexts/TocsContext";
import LoadingSpinner from "../components/LoadingSpinner";
import TocsCard from "../components/TocsCard";

const MyTocAppWeb = () => {
  const { tocs, tocsLoading } = useTocs();

  if (tocsLoading) {
    return <LoadingSpinner />
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-light text-[#2ABF7A] mt-12 mb-6">APLICACIÓN WEB MYTOC</h2>
        <Link to="/mytocappmanual" className="text-xl text-center text-[#2AB7FA] underline hover:text-blue-700">(Leer manual de uso)</Link>
        <br/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
          {tocs.map((toc) => (
            <div key={toc.id} className="h-full">
              <TocsCard toc={toc} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MyTocAppWeb;
