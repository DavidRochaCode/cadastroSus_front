import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Atendente() {
  // Estado para armazenar a lista de atendentes
  const [atendentes, setAtendentes] = useState([]);
  const [error, setError] = useState(null); // Para capturar erros

  // Função para buscar atendentes
  const fetchAtendentes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/atendentes');
      setAtendentes(response.data.data); // Atualiza o estado com os dados recebidos
    } catch (err) {
      setError('Erro ao buscar os atendentes. Tente novamente mais tarde.');
      console.error(err);
    }
  };

  // useEffect para buscar os atendentes quando o componente for montado
  useEffect(() => {
    fetchAtendentes();
  }, []);

  return (
    <div className="common-template">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="atendentes-container">
          {atendentes.length > 0 ? (
            atendentes.map((atendente, index) => (
              <div key={index} className="atendente-card">
                <h3>{atendente.nome} {atendente.sobrenome}</h3>
                <p><strong>ID:</strong> {atendente.cod_atendente}</p>
              </div>
            ))
          ) : (
            <p>Carregando atendentes...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Atendente;
