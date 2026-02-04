
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { DefenseLocation, ViewMode } from '../types';

// Declare Leaflet global
declare const L: any;

interface LocationsProps {
  locations: DefenseLocation[];
  onNavigate: (page: string, id: string | null) => void;
}

type StatusFilter = 'all' | 'active' | 'historical';

const Locations: React.FC<LocationsProps> = ({ locations, onNavigate }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);

  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           loc.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const isActive = loc.yearTo === 'Heden';
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'active' && isActive) || 
                           (statusFilter === 'historical' && !isActive);
      
      return matchesSearch && matchesStatus;
    });
  }, [locations, searchTerm, statusFilter]);

  useEffect(() => {
    if (viewMode === 'map' && mapRef.current) {
      // Re-initialize map if it doesn't exist or cleanup old one
      if (leafletMap.current) {
        leafletMap.current.remove();
      }
      
      leafletMap.current = L.map(mapRef.current).setView([52.1326, 5.2913], 7);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(leafletMap.current);

      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin"></div>`,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -40]
      });

      const markers: any[] = [];
      filteredLocations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng], { icon: customIcon })
          .addTo(leafletMap.current)
          .bindPopup(`
            <div class="p-0 overflow-hidden font-sans">
              <div class="h-36 relative overflow-hidden">
                <img src="${loc.imageUrl}" class="w-full h-full object-cover" />
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p class="text-[10px] font-bold text-red-400 uppercase tracking-widest">${loc.type}</p>
                </div>
              </div>
              <div class="p-4 bg-white">
                <h4 class="font-bold text-xl mb-1 text-gray-900 leading-tight">${loc.name}</h4>
                <div class="flex items-center text-gray-500 text-xs mb-4">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  ${loc.city}
                </div>
                <button 
                   id="popup-btn-${loc.id}"
                   class="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-md active:scale-95"
                >
                  Bekijk Details
                </button>
              </div>
            </div>
          `);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`popup-btn-${loc.id}`);
          if (btn) {
            btn.onclick = () => onNavigate('location-detail', loc.id);
          }
        });
        
        markers.push([loc.lat, loc.lng]);
      });

      if (markers.length > 0) {
        leafletMap.current.fitBounds(markers, { padding: [50, 50] });
      }
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [viewMode, filteredLocations, onNavigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header & Main Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 nav-font">Defensie Locaties</h1>
          <p className="text-gray-500 max-w-lg">Ontdek onze database van militaire brandweerkazernes, van operationele bases tot historisch erfgoed.</p>
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-auto">
          {/* Top Control Bar: Search + View Switcher */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow sm:w-80">
              <input 
                type="text" 
                placeholder="Zoeken op kazerne, stad of type..." 
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex bg-gray-100 p-1.5 rounded-2xl shadow-inner border border-gray-200/50">
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-sm tracking-wide ${viewMode === 'list' ? 'bg-white shadow-md text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
                Lijst
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-sm tracking-wide ${viewMode === 'map' ? 'bg-white shadow-md text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7l5-2.5 5.553 2.776a1 1 0 01.447.894v10.764a1 1 0 01-1.447.894L15 17l-6 3z" /></svg>
                Kaart
              </button>
            </div>
          </div>

          {/* Bottom Filter Bar: Status Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mr-2">Filter status:</span>
            {[
              { id: 'all', label: 'Alle' },
              { id: 'active', label: 'Actueel' },
              { id: 'historical', label: 'Historisch' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setStatusFilter(filter.id as StatusFilter)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border-2 ${
                  statusFilter === filter.id 
                    ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/20' 
                    : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
            <div className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {filteredLocations.length} Resultaten
            </div>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
          {filteredLocations.map(loc => (
            <div 
              key={loc.id} 
              onClick={() => onNavigate('location-detail', loc.id)}
              className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 group flex flex-col h-full overflow-hidden"
            >
              <div className="h-56 relative overflow-hidden bg-gray-100">
                <img src={loc.imageUrl} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute top-5 left-5">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl backdrop-blur-md ${loc.yearTo === 'Heden' ? 'bg-emerald-600/90' : 'bg-rose-600/90'}`}>
                    {loc.yearTo === 'Heden' ? 'Operationeel' : 'Historisch'}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">{loc.type}</p>
                </div>
                <h3 className="text-2xl font-extrabold mb-3 group-hover:text-red-600 transition-colors leading-tight nav-font">{loc.name}</h3>
                <div className="flex items-center text-gray-500 font-medium text-sm mb-6">
                  <svg className="w-5 h-5 mr-2 text-red-500 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {loc.city}, {loc.province}
                </div>
                <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                   <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {loc.yearFrom} — {loc.yearTo}
                   </div>
                   <span className="text-red-600 group-hover:translate-x-2 transition-transform duration-300">Details &rarr;</span>
                </div>
              </div>
            </div>
          ))}
          {filteredLocations.length === 0 && (
            <div className="col-span-full py-32 text-center bg-white rounded-[2.5rem] border-4 border-dashed border-gray-100 shadow-inner">
               <div className="text-red-600 mb-6 mx-auto w-20 h-20 flex items-center justify-center bg-red-50 rounded-full animate-pulse">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2.5" /></svg>
               </div>
               <p className="text-2xl font-black text-gray-900 mb-2 nav-font uppercase">Geen Locaties Gevonden</p>
               <p className="text-gray-500 max-w-sm mx-auto">Pas uw zoekopdracht of filters aan om het gewenste resultaat te vinden.</p>
               <button 
                 onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                 className="mt-8 text-red-600 font-bold uppercase tracking-widest text-xs hover:underline"
               >
                 Filters Herstellen
               </button>
            </div>
          )}
        </div>
      ) : (
        <div className="relative group animate-fadeIn">
          <div 
            ref={mapRef} 
            className="h-[700px] rounded-[2.5rem] border-[12px] border-white shadow-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)]"
          >
            {/* Leaflet map loads here */}
          </div>
          
          {/* Map Floating Legend */}
          <div className="absolute top-8 left-8 z-[5] bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Kaart Legenda</h4>
             <div className="space-y-3">
               <div className="flex items-center gap-3">
                 <div className="w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white shadow-sm ring-1 ring-red-600/20"></div>
                 <span className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Defensie Kazerne</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-3.5 h-3.5 bg-blue-500 rounded-sm"></div>
                 <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest line-through decoration-red-500/50">Luchtmacht Basis</span>
               </div>
             </div>
          </div>

          <div className="absolute bottom-8 right-8 z-[5] flex flex-col gap-3">
             <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-red-600">Gefilterd resultaat</span>
                  <span className="text-lg font-black text-gray-900 nav-font">{filteredLocations.length} Locaties</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex -space-x-3 overflow-hidden">
                  {filteredLocations.slice(0, 4).map((l, i) => (
                    <img key={i} className="inline-block h-8 w-8 rounded-full ring-4 ring-white object-cover" src={l.imageUrl} alt="" />
                  ))}
                  {filteredLocations.length > 4 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white text-[10px] font-bold text-gray-500">
                      +{filteredLocations.length - 4}
                    </div>
                  )}
                </div>
             </div>
          </div>

          {filteredLocations.length === 0 && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xl flex items-center justify-center z-[10] rounded-[2.5rem]">
              <div className="text-center p-12 bg-white rounded-[2rem] shadow-2xl border border-gray-100 transform -translate-y-10">
                <div className="text-gray-300 mb-6 flex justify-center">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <p className="text-xl font-black text-gray-900 uppercase nav-font tracking-widest">Geen locaties om te plotten</p>
                <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">De huidige filters hebben geen resultaten opgeleverd voor de kaartweergave.</p>
                <button 
                   onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                   className="mt-6 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-colors"
                >
                  Reset Zoekopdracht
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Locations;
