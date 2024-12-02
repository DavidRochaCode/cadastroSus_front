import React from 'react';

function Header({ setActiveComponent, activeComponent }) {
  return (
    <header className="header">
      <nav>
        <button
          className={activeComponent === 'Medico' ? 'active' : ''}
          onClick={() => setActiveComponent('Medico')}
        >
          Médico
        </button>
        <button
          className={activeComponent === 'Enfermeira' ? 'active' : ''}
          onClick={() => setActiveComponent('Enfermeira')}
        >
          Enfermeira
        </button>
        <button
          className={activeComponent === 'Atendente' ? 'active' : ''}
          onClick={() => setActiveComponent('Atendente')}
        >
          Atendente
        </button>
        <button
          className={activeComponent === 'Atendimento' ? 'active' : ''}
          onClick={() => setActiveComponent('Atendimento')}
        >
          Atendimento
        </button>
        <button
          className={activeComponent === 'Admin' ? 'active' : ''}
          onClick={() => setActiveComponent('Admin')}
        >
          Admin
        </button>
      </nav>
    </header>
  );
}

export default Header;
