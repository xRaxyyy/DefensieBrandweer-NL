
import React, { useState } from 'react';
import { Equipment, EquipmentCategory } from '../types';

interface EquipmentProps {
  equipment: Equipment[];
  onNavigate: (page: string, id: string | null) => void;
}

const EquipmentPage: React.FC<EquipmentProps> = ({ equipment, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<EquipmentCategory | 'All'>('All');

  const categories = ['All', ...Object.values(EquipmentCategory)];

  const filteredEquipment = activeCategory === 'All' 
    ? equipment 
    : equipment.filter(e => e.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 nav-font">Materieel & Blusmiddelen</h1>
        <p className="text-gray-500 max-w-2xl">
          Een overzicht van het (rollend) materieel en de blusmiddelen gebruikt door de Defensiebrandweer door de jaren heen.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-6 py-3 rounded-full font-bold transition-all uppercase tracking-widest text-xs shadow-sm ${
              activeCategory === cat 
                ? 'bg-red-600 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredEquipment.map(item => (
          <div 
            key={item.id}
            onClick={() => onNavigate('equipment-detail', item.id)}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col h-full border border-gray-100"
          >
            <div className="h-48 overflow-hidden bg-gray-200">
               <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
               <div className="text-[10px] font-bold text-red-600 uppercase tracking-[0.2em] mb-2">{item.category}</div>
               <h3 className="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors leading-tight">{item.name}</h3>
               <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">{item.description}</p>
               <div className="pt-4 border-t border-gray-50 flex justify-between items-center mt-auto">
                  <span className="text-xs font-bold text-gray-400">JAAR: {item.year}</span>
                  <span className="text-red-600 font-bold text-xs uppercase group-hover:translate-x-1 transition-transform tracking-widest">&rarr;</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
           <p className="text-gray-500">Momenteel geen items beschikbaar in deze categorie.</p>
        </div>
      )}
    </div>
  );
};

export default EquipmentPage;
