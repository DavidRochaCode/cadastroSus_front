import React, { useState } from 'react';
import axios from 'axios';

function Atendimento() {
  const [activeTab, setActiveTab] = useState('cadastrar'); // Estado para controlar a aba ativa
  const [formData, setFormData] = useState({ cod_atendimento: '', cpf_paciente : '', crm: '' });
  const [consultaCodigo, setConsultaCodigo] = useState('');
  const [modalData, setModalData] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for cadastro
  const handleCadastro = async (e) => {
    e.preventDefault();
    if (formData.crm && formData.cpf_paciente && formData.cod_atendimento) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/atendimentos', null, {
          params: {
            cod_atendimento: parseInt(formData.cod_atendimento, 10),
            cpf_paciente: formData.cpf_paciente,
            crm: parseInt(formData.crm, 10),
          },
        });
        alert('Atendimento cadastrado com sucesso!');
        setFormData({ crm: '', cpf_paciente: '', cod_atendimento: '' });
      } catch (error) {
        alert(`Erro ao cadastrar atendimento: ${error.response?.data?.detail || error.message}`);
      }
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };
  

  // Handle consulta
  const handleConsulta = async () => {
    if (consultaCodigo) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/atendimentos/${consultaCodigo}`);
        setModalData(response.data.data); // Armazena os dados do atendimento no modal
      } catch (error) {
        alert(`Erro ao consultar atendimento: ${error.response?.data?.detail || error.message}`);
      }
    } else {
      alert('Por favor, insira o código do atendimento para consultar!');
    }
  };

  // Close modal
  const closeModal = () => setModalData(null);

  return (
    <div className="common-template">
      <h2>Atendimento</h2>

      {/* Header de abas */}
      <div className="tabs">
        <button
          className={activeTab === 'cadastrar' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('cadastrar')}
        >
          Cadastrar
        </button>
        <button
          className={activeTab === 'consultar' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('consultar')}
        >
          Consultar
        </button>
      </div>

      {/* Conteúdo das abas */}
      {activeTab === 'cadastrar' && (
        <section className="cadastro-section">
          <h3>Cadastrar Atendimento</h3>
          <form onSubmit={handleCadastro} className="cadastro-form">
            <div className="form-group">
              <label>CRM do Médico:</label>
              <input
                type="text"
                name="crm"
                value={formData.crm}
                onChange={handleInputChange}
                placeholder="Digite o CRM"
              />
            </div>
            <div className="form-group">
              <label>CPF do Paciente:</label>
              <input
                type="text"
                name="cpf_paciente"
                value={formData.cpf_paciente }
                onChange={handleInputChange}
                placeholder="Digite o CPF"
              />
            </div>
            <div className="form-group">
              <label>Código do Atendimento:</label>
              <input
                type="text"
                name="cod_atendimento"
                value={formData.cod_atendimento }
                onChange={handleInputChange}
                placeholder="Digite o Código"
              />
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </section>
      )}

      {activeTab === 'consultar' && (
        <section className="consulta-section">
          <h3>Consultar Atendimento</h3>
          <div className="consulta-form">
            <div className="form-group">
              <label>Código do Atendimento:</label>
              <input
                type="text"
                value={consultaCodigo}
                onChange={(e) => setConsultaCodigo(e.target.value)}
                placeholder="Digite o Código"
              />
            </div>
            <button onClick={handleConsulta}>Consultar</button>
          </div>
        </section>
      )}

      {/* Modal de Informações */}
      {modalData && (
        <div className="modal">
          <div className="modal-content">
            <h3>Informações do Atendimento</h3>
            <p><strong>Código do Atendimento:</strong> {modalData.codigo}</p>
            <p><strong>Data do Atendimento:</strong> {modalData.data_atendimento}</p>
            <h4>Dados do Paciente:</h4>
            <p><strong>Nome:</strong> {modalData.nome_paciente} {modalData.sobrenome_paciente}</p>
            <p><strong>Celular:</strong> {modalData.celular}</p>
            <p><strong>Prontuário:</strong> {modalData.prontuario}</p>
            <p><strong>Cartão SUS:</strong> {modalData.cartao_sus}</p>
            <p><strong>CPF:</strong> {modalData.cpf_paciente}</p>
            <h4>Dados do Médico:</h4>
            <p><strong>Nome:</strong> {modalData.nome_medico}</p>
            <p><strong>Atuação:</strong> {modalData.atuacao_medico}</p>
            <p><strong>CRM:</strong> {modalData.crm_medico}</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Atendimento;
