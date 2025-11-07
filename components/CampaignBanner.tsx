import React, { useState } from 'react';

export const CampaignBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return null;
    }

    const handleInceleClick = () => {
        // In a real app, this would navigate to the specific campaign/product page.
        console.log("Navigating to campaign page for 'Alvic Zenit'...");
        alert("Kampanya detayları sayfasına yönlendiriliyor.");
    };

    return (
        <div className="relative bg-brand-dark text-white w-full">
            <div className="container mx-auto px-6 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center flex-grow min-w-0">
                    <span className="flex-shrink-0 bg-brand-gold text-white text-xs font-bold px-2 py-1 rounded-md mr-3">YENİ</span>
                    <p className="text-sm font-medium truncate hidden sm:inline">
                        Alvic Zenit serisinde %15 indirim!
                    </p>
                     <p className="text-sm font-medium sm:hidden truncate">
                        Alvic Zenit %15 İndirim!
                    </p>
                    <button
                        onClick={handleInceleClick}
                        className="ml-4 flex-shrink-0 text-xs sm:text-sm font-semibold bg-transparent border border-brand-gold text-brand-gold rounded-full px-3 py-1 hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300"
                    >
                        İncele
                    </button>
                </div>
                <button 
                    onClick={() => setIsVisible(false)} 
                    className="flex-shrink-0 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                    aria-label="Duyuruyu kapat"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>
    );
}