import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="relative w-full h-screen flex items-center justify-center bg-white">
            {/* Container for images entering from the sides */}
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Image entering from the right */}
                <div className="absolute right-8 animate-slide-right">
                    <img className="w-16 h-16" src="/images/spinner1.png" alt="Letra C del logotipo" />
                </div>
                {/* Image coming in from above */}
                <div className="absolute top-8 animate-slide-top">
                    <img className="w-16 h-16" src="/images/spinner2.png" alt="Cruz del logotipo" />
                </div>
                {/* Central image that appears after */}
                <div className="absolute left-14 top-4 animate-fade-center">
                    <img className="w-40 h-40" src="/images/logotype.png" alt="Logo completo del sitio web My TOC" />
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
