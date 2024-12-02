import React, { useState } from 'react';
import Header from './components/Header';
import Medico from './components/Medico';
import Atendente from './components/Atendente';
import Atendimento from './components/Atendimento';
import Admin from './components/Admin';
import Enfermeira from './components/Enfermeira';


function App() {
  const [activeComponent, setActiveComponent] = useState('Medico');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Medico':
        return <Medico />;
      case 'Atendente':
        return <Atendente />;
      case 'Atendimento':
        return <Atendimento />;
      case 'Admin':
        return <Admin />;
      case 'Enfermeira':
          return <Enfermeira />;
      default:
        return <Medico />;
    }
  };

  return (
    <div className='docker'>
      <Header activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      {renderComponent()}
    </div>
  );
}

export default App;
