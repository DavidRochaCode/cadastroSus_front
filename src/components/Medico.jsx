import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Medico() {
  // Estado para armazenar a lista de médicos
  const [medicos, setMedicos] = useState([]);
  const [error, setError] = useState(null); // Para capturar erros

  // Função para buscar médicos
  const fetchMedicos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/medicos');
      setMedicos(response.data.data); // Atualiza o estado com os dados recebidos
    } catch (err) {
      setError('Erro ao buscar os médicos. Tente novamente mais tarde.');
      console.error(err);
    }
  };

  // useEffect para buscar os médicos quando o componente for montado
  useEffect(() => {
    fetchMedicos();
  }, []);

  return (
    <div className="common-template">
      <h2>Lista de Médicos</h2>

      {/* Exibe mensagem de erro, se houver */}
      {error && <p className="error-message">{error}</p>}

      {/* Container para os médicos */}
      <div className="medicos-container">
        {medicos.length > 0 ? (
          medicos.map((medico, index) => (
            <div key={index} className="medico-card">
              <h3>{medico.nome}</h3>
              <p><strong>CRM:</strong> {medico.crm}</p>
              <p><strong>Especialidade:</strong> {medico.atuacao}</p>
            </div>
          ))
        ) : (
          <p>Carregando médicos...</p>
        )}
      </div>
    </div>
  );
}

export default Medico;
