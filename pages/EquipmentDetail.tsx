
import React from 'react';
import { Equipment } from '../types';

interface EquipmentDetailProps {
  equipment: Equipment;
  onBack: () => void;
}

const EquipmentDetailPage: React.FC<EquipmentDetailProps> = ({ equipment, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-red-600 mb-8 font-bold transition-colors group"
      >
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        TERUG NAAR MATERIEEL
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-black h-[500px] border-4 border-white">
           <img src={equipment.imageUrl} alt={equipment.name} className="w-full h-full object-contain opacity-90" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="inline-block bg-red-600 text-white px-4 py-1 rounded text-xs font-bold uppercase tracking-widest mb-6 w-max shadow-lg">
            {equipment.category}
          </div>
          <h1 className="text-5xl font-extrabold mb-6 nav-font leading-tight">{equipment.name}</h1>
          <div className="flex items-center mb-8 space-x-4">
             <div className="h-1 w-20 bg-red-600"></div>
             <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Introductiejaar: {equipment.year}</span>
          </div>
          <div className="prose prose-lg text-gray-600 mb-10">
            <p>{equipment.description}</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
             <h3 className="text-xl font-bold mb-6 nav-font flex items-center">
                <svg className="w-6 h-6 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Technische Specificaties
             </h3>
             <div className="grid grid-cols-1 gap-4">
                {equipment.technicalSpecs.map((spec, i) => (
                   <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <span className="text-gray-500 font-medium">{spec.label}</span>
                      <span className="text-gray-900 font-bold">{spec.value}</span>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
         <h2 className="text-2xl font-bold mb-10 nav-font border-l-4 border-red-600 pl-4 uppercase">Historische Documentatie</h2>
         <div className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-500 max-w-xl mx-auto italic mb-6">
               "Elk stuk materieel vertelt een eigen verhaal van paraatheid en moed. We werken voortdurend aan het uitbreiden van dit digitale register."
            </p>
            <div className="flex justify-center gap-4">
               <button className="bg-white border-2 border-red-600 text-red-600 px-6 py-2 rounded-lg font-bold uppercase tracking-widest hover:bg-red-50 transition-colors">Download PDF</button>
               <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg">Archief Bezoeken</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default EquipmentDetailPage;
