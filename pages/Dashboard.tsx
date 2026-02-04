
import React, { useState, useRef, useEffect } from 'react';
import { DefenseLocation, Equipment, EquipmentCategory } from '../types';

interface DashboardProps {
  locations: DefenseLocation[];
  equipment: Equipment[];
  onUpdateLocations: (locations: DefenseLocation[]) => void;
  onUpdateEquipment: (equipment: Equipment[]) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ locations, equipment, onUpdateLocations, onUpdateEquipment }) => {
  const [activeTab, setActiveTab] = useState<'locations' | 'equipment'>('locations');
  const [editingLoc, setEditingLoc] = useState<Partial<DefenseLocation> | null>(null);
  const [editingEq, setEditingEq] = useState<Partial<Equipment> | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'main-loc' | 'main-eq' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (localStorage limit is ~5MB total, we limit to 0.8MB per file to be safe)
    if (file.size > 0.8 * 1024 * 1024) {
      alert('Bestand is te groot. Kies een afbeelding kleiner dan 800KB voor optimale prestaties.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      if (!base64String) return;

      if (target === 'main-loc') {
        setEditingLoc(prev => prev ? { ...prev, imageUrl: base64String } : null);
      } else if (target === 'main-eq') {
        setEditingEq(prev => prev ? { ...prev, imageUrl: base64String } : null);
      } else if (target === 'gallery') {
        setEditingLoc(prev => prev ? {
          ...prev,
          galleryImages: [...(prev.galleryImages || []), base64String]
        } : null);
      }
      
      // Clear input so same file can be selected again
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const removeMainImage = () => {
    const placeholder = 'https://via.placeholder.com/800x600?text=Geen+Afbeelding';
    if (editingLoc) {
      setEditingLoc(prev => prev ? { ...prev, imageUrl: placeholder } : null);
    } else if (editingEq) {
      setEditingEq(prev => prev ? { ...prev, imageUrl: placeholder } : null);
    }
  };

  const removeGalleryImage = (index: number) => {
    setEditingLoc(prev => {
      if (!prev) return null;
      const newGallery = (prev.galleryImages || []).filter((_, i) => i !== index);
      return { ...prev, galleryImages: newGallery };
    });
  };

  // Handlers for Locations
  const handleAddLocation = () => {
    setEditingLoc({
      id: Math.random().toString(36).substr(2, 9),
      name: '', city: '', province: '', country: 'NL', type: '',
      yearFrom: '', yearTo: 'Heden', description: '',
      imageUrl: 'https://via.placeholder.com/800x600?text=Upload+Afbeelding',
      galleryImages: [],
      lat: 52.0, lng: 5.0
    });
    setEditingEq(null);
  };

  const handleSaveLocation = () => {
    if (!editingLoc || !editingLoc.id) return;
    try {
      const updatedLoc = editingLoc as DefenseLocation;
      const exists = locations.find(l => l.id === updatedLoc.id);
      if (exists) {
        onUpdateLocations(locations.map(l => l.id === updatedLoc.id ? updatedLoc : l));
      } else {
        onUpdateLocations([...locations, updatedLoc]);
      }
      setEditingLoc(null);
    } catch (e) {
      alert('Fout bij opslaan: Waarschijnlijk is het geheugen van de browser vol door te grote afbeeldingen.');
    }
  };

  const handleDeleteLocation = (id: string) => {
    if (confirm('Weet u zeker dat u deze locatie wilt verwijderen?')) {
      onUpdateLocations(locations.filter(l => l.id !== id));
    }
  };

  // Handlers for Equipment
  const handleAddEquipment = () => {
    setEditingEq({
      id: Math.random().toString(36).substr(2, 9),
      name: '', category: EquipmentCategory.BLUSMIDDELEN,
      year: '', description: '',
      imageUrl: 'https://via.placeholder.com/800x600?text=Upload+Afbeelding',
      technicalSpecs: [{ label: 'Gewicht', value: '...' }]
    });
    setEditingLoc(null);
  };

  const handleSaveEquipment = () => {
    if (!editingEq || !editingEq.id) return;
    try {
      const updatedEq = editingEq as Equipment;
      const exists = equipment.find(e => e.id === updatedEq.id);
      if (exists) {
        onUpdateEquipment(equipment.map(e => e.id === updatedEq.id ? updatedEq : e));
      } else {
        onUpdateEquipment([...equipment, updatedEq]);
      }
      setEditingEq(null);
    } catch (e) {
      alert('Fout bij opslaan.');
    }
  };

  const handleDeleteEquipment = (id: string) => {
    if (confirm('Weet u zeker dat u dit materieel wilt verwijderen?')) {
      onUpdateEquipment(equipment.filter(e => e.id !== id));
    }
  };

  // Determine what is currently being edited for the modal preview
  const currentImageUrl = editingLoc ? editingLoc.imageUrl : (editingEq ? editingEq.imageUrl : '');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold nav-font border-b-4 border-red-600 inline-block mb-2 text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Beheer alle data van het platform vanuit één overzicht.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
           {activeTab === 'locations' ? (
              <button onClick={handleAddLocation} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 uppercase text-xs tracking-widest">+ Nieuwe Locatie</button>
           ) : (
              <button onClick={handleAddEquipment} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 uppercase text-xs tracking-widest">+ Nieuw Materieel</button>
           )}
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto whitespace-nowrap">
        <button 
          onClick={() => setActiveTab('locations')}
          className={`px-8 py-4 font-bold nav-font transition-all ${activeTab === 'locations' ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          LOCATIE BEHEER ({locations.length})
        </button>
        <button 
          onClick={() => setActiveTab('equipment')}
          className={`px-8 py-4 font-bold nav-font transition-all ${activeTab === 'equipment' ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          MATERIEEL BEHEER ({equipment.length})
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] nav-font">Naam / Info</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] nav-font">{activeTab === 'locations' ? 'Plaats' : 'Categorie'}</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] nav-font">{activeTab === 'locations' ? 'Periode' : 'Jaar'}</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] nav-font">Acties</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {activeTab === 'locations' ? locations.map(loc => (
                <tr key={loc.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img className="h-12 w-12 rounded-xl object-cover shadow-sm group-hover:scale-110 transition-transform" src={loc.imageUrl} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-black text-gray-900 uppercase nav-font">{loc.name}</div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{loc.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-500">{loc.city}</td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-400">{loc.yearFrom} - {loc.yearTo}</td>
                  <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-bold space-x-4">
                    <button onClick={() => setEditingLoc(loc)} className="text-blue-600 hover:text-blue-800 uppercase tracking-widest text-xs">Aanpassen</button>
                    <button onClick={() => handleDeleteLocation(loc.id)} className="text-red-600 hover:text-red-800 uppercase tracking-widest text-xs">Verwijderen</button>
                  </td>
                </tr>
              )) : equipment.map(eq => (
                <tr key={eq.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img className="h-12 w-12 rounded-xl object-cover shadow-sm group-hover:scale-110 transition-transform" src={eq.imageUrl} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-black text-gray-900 uppercase nav-font">{eq.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                     <span className="px-3 py-1 text-[10px] font-black rounded-full bg-red-50 text-red-600 uppercase tracking-widest">{eq.category}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-400">{eq.year}</td>
                  <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-bold space-x-4">
                    <button onClick={() => setEditingEq(eq)} className="text-blue-600 hover:text-blue-800 uppercase tracking-widest text-xs">Aanpassen</button>
                    <button onClick={() => handleDeleteEquipment(eq.id)} className="text-red-600 hover:text-red-800 uppercase tracking-widest text-xs">Verwijderen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editing Modal */}
      {(editingLoc || editingEq) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[100] animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-3xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <div className="p-8 border-b sticky top-0 bg-white/95 backdrop-blur-md z-[110] flex justify-between items-center">
               <h2 className="text-3xl font-black nav-font text-gray-900 uppercase tracking-tight">
                 {editingLoc ? 'Locatie Beheer' : 'Materieel Beheer'}
               </h2>
               <button onClick={() => { setEditingLoc(null); setEditingEq(null); }} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            
            <div className="p-10 space-y-12">
              {/* Main Image Section */}
              <div className="flex flex-col">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Hoofdafbeelding</label>
                <div className="relative group w-full h-80 bg-gray-100 rounded-3xl overflow-hidden shadow-inner border-4 border-white ring-1 ring-gray-200">
                  <img src={currentImageUrl} className="w-full h-full object-cover" key={currentImageUrl} />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 transition-all duration-300">
                     <button 
                       type="button" 
                       onClick={() => fileInputRef.current?.click()} 
                       className="bg-white text-gray-900 px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-red-600 hover:text-white transition-all"
                     >
                        Bestand Kiezen
                     </button>
                     <button 
                       type="button" 
                       onClick={removeMainImage} 
                       className="bg-red-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-red-700 transition-all"
                     >
                        Verwijderen
                     </button>
                  </div>
                </div>
                <input 
                  ref={fileInputRef} 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e, editingLoc ? 'main-loc' : 'main-eq')} 
                />
                <p className="mt-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                  * Gebruik bestanden kleiner dan 800KB.
                </p>
              </div>

              {/* Gallery Section for Locations */}
              {editingLoc && (
                <div className="space-y-6 bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                      <div>
                        <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em] mb-1">Foto Galerij</h4>
                        <p className="text-xs text-gray-500 font-medium">Extra foto's voor de detailpagina van deze locatie.</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => galleryInputRef.current?.click()} 
                        className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 transition-all shadow-lg"
                      >
                        + Foto Toevoegen
                      </button>
                      <input 
                        ref={galleryInputRef} 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleFileChange(e, 'gallery')} 
                      />
                   </div>
                   
                   <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {(editingLoc.galleryImages || []).map((img, i) => (
                        <div key={i} className="relative aspect-square group rounded-2xl overflow-hidden border-2 border-white shadow-md">
                           <img src={img} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                              <button 
                                onClick={() => removeGalleryImage(i)}
                                className="bg-red-600 text-white p-2 rounded-xl shadow-xl hover:scale-110 transition-transform"
                                title="Verwijder afbeelding"
                              >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                           </div>
                        </div>
                      ))}
                      {(editingLoc.galleryImages || []).length === 0 && (
                        <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-[10px] font-black uppercase tracking-widest">
                           Geen galerij afbeeldingen geüpload
                        </div>
                      )}
                   </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {editingLoc ? (
                  <>
                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Naam Basis / Kazerne</label>
                       <input 
                         value={editingLoc.name} 
                         onChange={e => setEditingLoc({...editingLoc!, name: e.target.value})} 
                         className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:bg-white focus:border-red-500 outline-none transition-all font-bold text-gray-900" 
                         placeholder="Bijv. Vliegbasis Leeuwarden"
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Plaats</label>
                       <input 
                         value={editingLoc.city} 
                         onChange={e => setEditingLoc({...editingLoc!, city: e.target.value})} 
                         className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:bg-white focus:border-red-500 outline-none transition-all font-bold text-gray-900" 
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Type Faciliteit</label>
                       <input 
                         value={editingLoc.type} 
                         onChange={e => setEditingLoc({...editingLoc!, type: e.target.value})} 
                         className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:bg-white focus:border-red-500 outline-none transition-all font-bold text-gray-900" 
                         placeholder="Bijv. Vliegbasis"
                       />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Historische Beschrijving</label>
                       <textarea 
                         rows={4} 
                         value={editingLoc.description} 
                         onChange={e => setEditingLoc({...editingLoc!, description: e.target.value})} 
                         className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:bg-white focus:border-red-500 outline-none transition-all font-medium text-gray-900 leading-relaxed"
                       ></textarea>
                    </div>
                    <div className="md:col-span-2 pt-4">
                       <button 
                         onClick={handleSaveLocation} 
                         className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-6 rounded-3xl shadow-2xl uppercase tracking-[0.3em] transition-all active:scale-95"
                       >
                         Locatie Gegevens Opslaan
                       </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="md:col-span-2">
                       <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Naam Materieel</label>
                       <input 
                         value={editingEq!.name} 
                         onChange={e => setEditingEq({...editingEq!, name: e.target.value})} 
                         className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:bg-white focus:border-red-500 outline-none transition-all font-bold text-gray-900" 
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Categorie</label>
                       <select 
                         value={editingEq!.category} 
                         onChange={e => setEditingEq({...editingEq!, category: e.target.value as EquipmentCategory})} 
                         className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:bg-white focus:border-red-500 outline-none transition-all font-bold text-gray-900"
                       >
                          {Object.values(EquipmentCategory).map(c => <option key={c} value={c}>{c}</option>)}
                       </select>
                    </div>
                    <div className="md:col-span-2 pt-4">
                       <button 
                         onClick={handleSaveEquipment} 
                         className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-6 rounded-3xl shadow-2xl uppercase tracking-[0.3em] transition-all active:scale-95"
                       >
                         Materieel Gegevens Opslaan
                       </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
