
import React from 'react';
import { DefenseLocation } from '../types';

interface HomeProps {
  onNavigate: (page: string, id: string | null) => void;
  locations: DefenseLocation[];
}

const Home: React.FC<HomeProps> = ({ onNavigate, locations }) => {
  // Get 3 most recent or just first 3 locations for the preview
  const recentLocations = locations.slice(0, 3);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="relative h-[700px] bg-gray-900 flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&q=80&w=2000" 
          alt="Brandweer Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="inline-flex items-center bg-red-600/20 border border-red-600/50 px-5 py-2 mb-8 rounded-full text-red-500 font-black tracking-[0.2em] text-[10px] uppercase backdrop-blur-md">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Sinds 04-06-2020 Online
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] nav-font tracking-tighter">
            DEFENSIE<br/><span className="text-red-600">BRANDWEER</span> NL
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
            De onofficiële verzamelplaats voor historie, techniek en actuele informatie over de militaire brandweerwereld.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => onNavigate('locations', null)}
              className="group bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(220,38,38,0.3)] active:scale-95"
            >
              Ontdek Locaties <span className="inline-block group-hover:translate-x-2 transition-transform ml-2">→</span>
            </button>
            <button 
              onClick={() => onNavigate('equipment', null)}
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all backdrop-blur-xl active:scale-95"
            >
              Bekijk Materieel
            </button>
          </div>
        </div>
      </div>

      {/* Modern Info & Disclaimer Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-black mb-8 nav-font text-gray-900 uppercase tracking-tight border-l-[12px] border-red-600 pl-8">
                Over dit platform
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium">
                <p>
                  Welkom op de vernieuwde website van <strong className="text-gray-900">DEFENSIEBRANDWEER NL</strong>. Dit is een particulier initiatief en verzamelplaats met en over alle brandweeractiviteiten van het Nederlandse Ministerie van Defensie van vroeger tot nu in woord en beeld.
                </p>
                <div className="py-2">
                   <p className="text-red-600 font-black uppercase text-[10px] tracking-widest mb-2">Belangrijke Mededeling</p>
                   <p className="text-gray-900 font-bold leading-relaxed border-l-4 border-red-600 pl-6 py-1">
                     Deze website heeft <span className="underline decoration-red-600 decoration-2 underline-offset-4">GEEN</span> officiële status en is <span className="underline decoration-red-600 decoration-2 underline-offset-4">GEEN</span> onderdeel van het Nederlandse Ministerie van Defensie.
                   </p>
                </div>
                <p>
                  Wij doen ons best om je te informeren over belangrijke en soms onbelangrijke zaken in de (Nederlandse) militaire brandweerwereld. Deze unieke website is stapsgewijs gegroeid met Locatie-pagina's, het Kentekenregister, en uitgebreide fotopagina's van defensievoertuigen.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 relative">
             <div className="absolute -inset-10 bg-red-600/5 rounded-full blur-3xl -z-10"></div>
             
             <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-b-[12px] border-red-600 text-center transform hover:-translate-y-4 transition-all duration-500">
                <div className="text-5xl font-black text-gray-900 nav-font mb-2">230+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-black">Stamkaarten</div>
             </div>
             <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-b-[12px] border-gray-900 text-center transform hover:-translate-y-4 transition-all duration-500 mt-12">
                <div className="text-5xl font-black text-gray-900 nav-font mb-2">{locations.length}+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-black">Locaties</div>
             </div>
             <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-b-[12px] border-gray-900 text-center transform hover:-translate-y-4 transition-all duration-500 -mt-4">
                <div className="text-5xl font-black text-gray-900 nav-font mb-2">1K+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-black">Foto Archief</div>
             </div>
             <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-b-[12px] border-red-600 text-center transform hover:-translate-y-4 transition-all duration-500 mt-8">
                <div className="text-5xl font-black text-gray-900 nav-font mb-2">24/7</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-black">Online Toegang</div>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-32 border-y border-gray-200">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
               <div className="max-w-2xl">
                  <p className="text-red-600 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Verken de database</p>
                  <h2 className="text-5xl font-black nav-font text-gray-900 uppercase tracking-tight">Recent toegevoegde locaties</h2>
               </div>
               <button 
                 onClick={() => onNavigate('locations', null)}
                 className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl border border-gray-200 hover:bg-gray-900 hover:text-white transition-all"
               >
                 Bekijk Alle Locaties
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {recentLocations.map((loc) => (
                  <div 
                    key={loc.id} 
                    onClick={() => onNavigate('location-detail', loc.id)}
                    className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-pointer border border-gray-100"
                  >
                     <div className="h-64 overflow-hidden relative">
                        <img src={loc.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={loc.name} />
                        <div className="absolute top-6 left-6">
                           <span className="bg-red-600 text-white px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-xl">
                              {loc.type}
                           </span>
                        </div>
                     </div>
                     <div className="p-10">
                        <h3 className="font-black text-2xl mb-3 nav-font group-hover:text-red-600 transition-colors uppercase tracking-tight">{loc.name}</h3>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-6">{loc.city} • {loc.yearFrom} - {loc.yearTo}</p>
                        <div className="flex items-center text-red-600 font-black text-[10px] uppercase tracking-[0.2em] group-hover:translate-x-3 transition-transform">
                           Bekijk Gegevens <span className="ml-2">→</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="bg-white py-24">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-black nav-font mb-8 text-gray-900 uppercase">Heeft u meer informatie?</h2>
            <p className="text-xl text-gray-500 mb-12 font-medium leading-relaxed">
               Heeft u nog foto's, verhalen of wetenswaardigheden passend bij deze website? Wij horen het graag! Uw bijdrage helpt dit archief compleet te maken.
            </p>
            <button className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-2xl hover:bg-red-600 transition-all active:scale-95">
               Neem Contact Op
            </button>
         </div>
      </div>
    </div>
  );
};

export default Home;
