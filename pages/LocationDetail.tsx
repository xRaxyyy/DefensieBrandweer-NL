
import React, { useState } from 'react';
import { DefenseLocation } from '../types';

interface LocationDetailProps {
  location: DefenseLocation;
  onBack: () => void;
}

const LocationDetail: React.FC<LocationDetailProps> = ({ location, onBack }) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Use real gallery images from location or fallback to mock if empty for demonstration
  const displayGallery = location.galleryImages && location.galleryImages.length > 0 
    ? location.galleryImages 
    : [1, 2, 3, 4].map(i => `https://picsum.photos/seed/locdetail${i}${location.id}/1200/800`);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn relative">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-red-600 mb-8 font-bold transition-colors group uppercase text-xs tracking-widest"
      >
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Terug naar overzicht
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <div 
              className="h-[500px] cursor-zoom-in"
              onClick={() => setFullscreenImage(location.imageUrl)}
            >
              <img src={location.imageUrl} alt={location.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-10">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                 <span className="bg-red-600 text-white px-4 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-widest">{location.type}</span>
                 <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-widest">{location.yearFrom} - {location.yearTo}</span>
              </div>
              <h1 className="text-5xl font-extrabold mb-4 nav-font leading-tight">{location.name}</h1>
              <p className="text-xl text-gray-400 mb-8 font-medium italic">{location.city}, {location.province}</p>
              
              <div className="prose prose-red max-w-none text-gray-600 leading-relaxed text-lg">
                <p>{location.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
             <h2 className="text-2xl font-black mb-8 nav-font border-b pb-4 text-gray-900 uppercase tracking-tight">Foto Galerij</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {displayGallery.map((src, i) => (
                  <div 
                    key={i} 
                    className="aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-sm border border-gray-100"
                    onClick={() => setFullscreenImage(src)}
                  >
                     <img src={src} alt={`Galerij item ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-gray-900 text-white rounded-3xl p-10 shadow-2xl border-t-8 border-red-600">
              <h3 className="text-xl font-bold mb-8 nav-font text-red-500 uppercase tracking-widest">Informatie</h3>
              <ul className="space-y-6">
                 <li className="flex justify-between items-center border-b border-gray-800 pb-4">
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Status</span>
                    <span className="font-bold text-sm">{location.yearTo === 'Heden' ? 'Operationeel' : 'Niet actief'}</span>
                 </li>
                 <li className="flex justify-between items-center border-b border-gray-800 pb-4">
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Land</span>
                    <span className="font-bold text-sm">{location.country}</span>
                 </li>
                 <li className="flex justify-between items-center pb-2">
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Coördinaten</span>
                    <span className="font-bold text-[10px] font-mono bg-gray-800 px-2 py-1 rounded">{location.lat.toFixed(3)}, {location.lng.toFixed(3)}</span>
                 </li>
              </ul>
              <button className="w-full mt-10 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl text-xs active:scale-95">
                 Navigeer naar kazerne
              </button>
           </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-8 animate-fadeIn"
          onClick={() => setFullscreenImage(null)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-red-500 transition-colors">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img 
            src={fullscreenImage} 
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border-2 border-white/10" 
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default LocationDetail;
