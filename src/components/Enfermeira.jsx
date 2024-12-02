import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Enfermeira() {
  // Estado para armazenar a lista de enfermeiras
  const [enfermeiras, setEnfermeiras] = useState([]);
  const [error, setError] = useState(null); // Para capturar erros

  // Função para buscar enfermeiras
  const fetchEnfermeiras = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/enfermeiras');
      setEnfermeiras(response.data.data); // Atualiza o estado com os dados recebidos
    } catch (err) {
      setError('Erro ao buscar as enfermeiras. Tente novamente mais tarde.');
      console.error(err);
    }
  };

  // useEffect para buscar as enfermeiras quando o componente for montado
  useEffect(() => {
    fetchEnfermeiras();
  }, []);

  return (
    <div className="common-template">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="atendentes-container">
          {enfermeiras.length > 0 ? (
            enfermeiras.map((enfermeira, index) => (
              <div key={index} className="atendente-card">
                <h3>{enfermeira.nome}</h3>
                <p><strong>ID:</strong> {enfermeira.codigo}</p>
                <p><strong>Setor:</strong> {enfermeira.setor}</p>
              </div>
            ))
          ) : (
            <p>Carregando enfermeiras...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Enfermeira;
