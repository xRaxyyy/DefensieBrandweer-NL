
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1b263b] text-gray-400 py-20 border-t-[12px] border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center">
              <div className="bg-red-600 p-2 rounded-xl mr-4 shadow-xl">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                 </svg>
              </div>
              <span className="text-3xl font-black nav-font tracking-tight text-white uppercase">
                Defensiebrandweer <span className="text-red-600">NL</span>
              </span>
            </div>
            
            <div className="py-2">
              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Onofficieel Platform</p>
              <p className="text-sm leading-relaxed text-gray-400 font-medium max-w-md">
                Deze website is een particulier initiatief en heeft <span className="text-white font-bold">GEEN</span> officiële status en is <span className="text-white font-bold">GEEN</span> onderdeel van het Nederlandse Ministerie van Defensie.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-gray-500">Language</p>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                   <div className="w-6 h-4 overflow-hidden rounded-sm shadow-sm">
                      <svg viewBox="0 0 60 30">
                        <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
                        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" clipPath="url(#s)"/>
                        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#s)"/>
                        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" clipPath="url(#s)"/>
                        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" clipPath="url(#s)"/>
                      </svg>
                   </div>
                   <span className="text-[10px] font-black text-white uppercase tracking-widest group-hover:text-red-500">English version</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-white text-xs font-black mb-8 nav-font uppercase tracking-[0.3em] border-l-4 border-red-600 pl-4">Navigatie</h3>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
              <li><a href="#" className="text-gray-500 hover:text-white hover:translate-x-2 transition-all inline-block">Welkom</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white hover:translate-x-2 transition-all inline-block">Locatie Database</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white hover:translate-x-2 transition-all inline-block">Materieel Register</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white hover:translate-x-2 transition-all inline-block">Kenteken Register</a></li>
              <li><a href="#" className="text-red-600 hover:text-red-500 hover:translate-x-2 transition-all inline-block">Credits Pagina</a></li>
            </ul>
          </div>

          {/* Social/Contact Column */}
          <div>
            <h3 className="text-white text-xs font-black mb-8 nav-font uppercase tracking-[0.3em] border-l-4 border-red-600 pl-4">Interactie</h3>
            <ul className="space-y-6">
              <li className="flex flex-col gap-2">
                 <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Heeft u kopij of foto's?</span>
                 <a href="mailto:info@defensiebrandweer.nl" className="text-sm font-bold text-white hover:text-red-500 transition-colors">info@defensiebrandweer.nl</a>
              </li>
              <li className="flex flex-col gap-2">
                 <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Social Media</span>
                 <div className="flex gap-4">
                    <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                       <span className="text-[10px] font-black uppercase tracking-widest">FB</span>
                    </a>
                    <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                       <span className="text-[10px] font-black uppercase tracking-widest">IG</span>
                    </a>
                 </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest text-center md:text-left">
            &copy; {new Date().getFullYear()} DEFENSIEBRANDWEER NL • SEMPER PARATUS
          </div>
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
             <a href="#" className="text-gray-600 hover:text-white transition-colors">Privacybeleid</a>
             <a href="#" className="text-gray-600 hover:text-white transition-colors">Disclaimer</a>
             <div className="flex items-center text-red-600">
                <span className="animate-pulse mr-2">●</span>
                LIVE ARCHIEF
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
