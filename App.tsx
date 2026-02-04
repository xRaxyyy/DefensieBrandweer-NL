
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Locations from './pages/Locations';
import LocationDetail from './pages/LocationDetail';
import EquipmentPage from './pages/Equipment';
import EquipmentDetailPage from './pages/EquipmentDetail';
import Dashboard from './pages/Dashboard';
import { DefenseLocation, Equipment } from './types';
import { getStoredLocations, saveLocations, getStoredEquipment, saveEquipment } from './services/storage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [locations, setLocations] = useState<DefenseLocation[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    setLocations(getStoredLocations());
    setEquipment(getStoredEquipment());
  }, []);

  const handleNavigate = (page: string, id: string | null = null) => {
    setCurrentPage(page);
    setSelectedId(id);
    window.scrollTo(0, 0);
  };

  const handleUpdateLocations = (newLocations: DefenseLocation[]) => {
    setLocations(newLocations);
    saveLocations(newLocations);
  };

  const handleUpdateEquipment = (newEquipment: Equipment[]) => {
    setEquipment(newEquipment);
    saveEquipment(newEquipment);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} locations={locations} />;
      case 'locations':
        return <Locations locations={locations} onNavigate={handleNavigate} />;
      case 'location-detail':
        const loc = locations.find(l => l.id === selectedId);
        return loc ? <LocationDetail location={loc} onBack={() => handleNavigate('locations')} /> : <Home onNavigate={handleNavigate} locations={locations} />;
      case 'equipment':
        return <EquipmentPage equipment={equipment} onNavigate={handleNavigate} />;
      case 'equipment-detail':
        const eq = equipment.find(e => e.id === selectedId);
        return eq ? <EquipmentDetailPage equipment={eq} onBack={() => handleNavigate('equipment')} /> : <Home onNavigate={handleNavigate} locations={locations} />;
      case 'dashboard':
        return <Dashboard 
          locations={locations} 
          equipment={equipment} 
          onUpdateLocations={handleUpdateLocations} 
          onUpdateEquipment={handleUpdateEquipment} 
        />;
      default:
        return <Home onNavigate={handleNavigate} locations={locations} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
