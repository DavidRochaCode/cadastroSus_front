import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const [activeTab, setActiveTab] = useState('medico'); // Controla a aba ativa
  const [operation, setOperation] = useState('cadastrar'); // Controla a operação (Cadastrar, Consultar, Atualizar, Apagar)
  const [formData, setFormData] = useState({});
  const [entities, setEntities] = useState({
    medico: [],
    atendente: [],
    paciente: [],
    atendimento: [],
    enfermeira: [], // Adicionando nova entidade
  });
  const [modalData, setModalData] = useState(null); // Controla os dados exibidos no modal

  // Atualiza os valores do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Limpa os campos após operação
  const resetForm = () => setFormData({});

  // Fecha o modal
  const closeModal = () => setModalData(null);

  // Mapeamento entre aba e endpoint
  const endpointMap = {
    medico: 'medicos',
    atendente: 'atendentes',
    paciente: 'pacientes',
    atendimento: 'atendimentos',
    enfermeira: 'enfermeiras',
  };


  // Operação de Cadastrar
  const handleCadastrar = async () => {
    try {
      const url = `http://127.0.0.1:8000/${endpointMap[activeTab]}`;
      const params = new URLSearchParams();

      // Preenche os parâmetros de acordo com a aba ativa
      if (activeTab === 'medico') {
        params.append('crm', formData.crm);
        params.append('nome', formData.nome);
        params.append('atuacao', formData.especialidade);
      } else if (activeTab === 'atendente') {
        params.append('nome', formData.nome);
        params.append('sobrenome', formData.sobrenome);
        params.append('cod_atendente', formData.codigo);
      } else if (activeTab === 'paciente') {
        params.append('nome', formData.nome);
        params.append('sobrenome', formData.sobrenome);
        params.append('cpf', formData.cpf);
        params.append('cartao_sus', formData.sus);
        params.append('endereco', formData.endereco);
        params.append('celular', formData.celular);
        params.append('prontuario', formData.prontuario);
      } else if (activeTab === 'enfermeira') {
        params.append('nome', formData.nome);
        params.append('setor', formData.setor);
      }

      await axios.post(`${url}?${params.toString()}`);
      alert('Cadastro realizado com sucesso!');
      resetForm();
    } catch (err) {
      alert(`Erro ao cadastrar: ${err.response?.data?.detail || err.message}`);
    }
  };

  // Operação de Atualizar
  const handleAtualizar = async () => {
    try {
      const url = `http://127.0.0.1:8000/${endpointMap[activeTab]}/${formData[activeTab === 'medico' ? 'crm' : activeTab === 'atendente' ? 'codigo' : activeTab === 'enfermeira' ? 'codigo' : 'cpf']}`;
      const params = new URLSearchParams();

      if (activeTab === 'medico') {
        params.append('nome', formData.nome);
        params.append('atuacao', formData.especialidade);
      } else if (activeTab === 'atendente') {
        params.append('nome', formData.nome);
        params.append('sobrenome', formData.sobrenome);
      } else if (activeTab === 'paciente') {
        params.append('nome', formData.nome);
        params.append('sobrenome', formData.sobrenome);
        params.append('cartao_sus', formData.sus);
        params.append('endereco', formData.endereco);
        params.append('celular', formData.celular);
        params.append('prontuario', formData.prontuario);
        params.append('status', formData.status);
      } else if (activeTab === 'enfermeira') {
        params.append('codigo', formData.codigo);
        params.append('nome', formData.nome);
        params.append('setor', formData.setor);
      }

      await axios.put(`${url}?${params.toString()}`);
      alert('Atualização realizada com sucesso!');
      resetForm();
    } catch (err) {
      alert(`Erro ao atualizar: ${err.response?.data?.detail || err.message}`);
    }
  };

  // Operação de Apagar

  const handleApagar = async () => {
    try {
      let url = `http://127.0.0.1:8000/${endpointMap[activeTab]}`;
      if (activeTab === 'enfermeira') {
        url += `?codigo=${formData.codigo}`; // Adiciona o código na query string
      } else {
        url += `/${formData[activeTab === 'medico' ? 'crm' : activeTab === 'atendente' ? 'codigo' : activeTab === 'atendimento' ? 'codigo': 'cpf']}`;
      }
      await axios.delete(url);
      alert('Exclusão realizada com sucesso!');
      resetForm();
    } catch (err) {
      alert(`Erro ao apagar: ${err.response?.data?.detail || err.message}`);
    }
  };


  // Requisição de Consultar Paciente
  const handleConsultar = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/pacientes/${formData.cpf}`);
      setModalData(response.data.data);
    } catch (err) {
      alert(`Erro ao consultar paciente: ${err.response?.data?.detail || err.message}`);
    }
    resetForm();
  };

  return (
    <div className="common-template">
      <h2>Administração</h2>

      {/* Header de abas */}
      <div className="tabs">
        {['medico', 'atendente', 'paciente', 'atendimento', 'enfermeira'].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'tab active' : 'tab'}
            onClick={() => {
              setActiveTab(tab);
              setOperation('cadastrar'); // Quando mudar de aba, volta para o "Cadastrar"
              resetForm();
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Operações */}
      <div className="operations">
        {activeTab !== 'atendimento' && (
          <button
            className={operation === 'cadastrar' ? 'operation active' : 'operation'}
            onClick={() => {
              setOperation('cadastrar');
              resetForm(); // Limpa o formulário
            }}
          >
            Cadastrar
          </button>
        )}
        {activeTab === 'paciente' && (
          <button
            className={operation === 'consultar' ? 'operation active' : 'operation'}
            onClick={() => {
              setOperation('consultar');
              resetForm();
            }}
          >
            Consultar
          </button>
        )}
        {activeTab !== 'atendimento' && (
          <button
            className={operation === 'atualizar' ? 'operation active' : 'operation'}
            onClick={() => {
              setOperation('atualizar');
              resetForm();
            }}
          >
            Atualizar
          </button>
        )}
        <button
          className={operation === 'apagar' ? 'operation active' : 'operation'}
          onClick={() => {
            setOperation('apagar');
            resetForm();
          }}
        >
          {activeTab === 'atendimento' ? 'Apagar Atendimento' : 'Apagar'}
        </button>
      </div>

      {/* Formulário Dinâmico */}
      {['cadastrar', 'atualizar'].includes(operation) && activeTab !== 'atendimento' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (operation === 'cadastrar') {
              handleCadastrar(activeTab);
            } else if (operation === 'atualizar') {
              const id =
                activeTab === 'medico' ? formData.crm :
                  activeTab === 'atendente' ? formData.codigo :
                    formData.cpf; // Paciente e enfermeira usam CPF como identificador
              handleAtualizar(activeTab, id);
            }
          }}
          className="form-cadastro"
        >
          {activeTab === 'medico' && (
            <>
              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>CRM:</label>
                <input
                  type="text"
                  name="crm"
                  value={formData.crm || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Especialidade:</label>
                <input
                  type="text"
                  name="especialidade"
                  value={formData.especialidade || ''}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
          {activeTab === 'atendente' && (
            <>
              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Sobrenome:</label>
                <input
                  type="text"
                  name="sobrenome"
                  value={formData.sobrenome || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Código:</label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo || ''}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
          {activeTab === 'paciente' && (
            <>
              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Sobrenome:</label>
                <input
                  type="text"
                  name="sobrenome"
                  value={formData.sobrenome || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Endereço:</label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Celular:</label>
                <input
                  type="text"
                  name="celular"
                  value={formData.celular || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>CPF:</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Cartão do SUS:</label>
                <input
                  type="text"
                  name="sus"
                  value={formData.sus || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Prontuário:</label>
                <input
                  type="text"
                  name="prontuario"
                  value={formData.prontuario || ''}
                  onChange={handleInputChange}
                />
              </div>
              {/* Campo Status aparece somente durante a atualização do paciente */}
              {activeTab === 'paciente' && operation === 'atualizar' && (
                <div className="form-group">
                  <label>Status:</label>
                  <input
                    type="text"
                    name="status"
                    value={formData.status || ''}
                    onChange={handleInputChange}
                  />
                </div>
              )}

            </>
          )}
          {activeTab === 'enfermeira' && (
            <>
              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Setor:</label>
                <input
                  type="text"
                  name="setor"
                  value={formData.setor || ''}
                  onChange={handleInputChange}
                />

                {/* Campo Status aparece somente durante a atualização do paciente */}
                {activeTab === 'enfermeira' && operation === 'atualizar' && (
                  <div className="form-group">
                    <label>Registro:</label>
                    <input
                      type="text"
                      name="codigo"
                      value={formData.codigo || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          <button type="submit">{operation === 'cadastrar' ? 'Cadastrar' : 'Salvar Alterações'}</button>
        </form>
      )}

      {operation === 'consultar' && activeTab === 'paciente' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConsultar();
          }}
          className="form-consultar"
        >
          <div className="form-group">
            <label>CPF do Paciente:</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf || ''}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Consultar</button>
        </form>
      )}

      {operation === 'apagar' && (
        <>
          {/* Formulário para Apagar Enfermeira */}
          {activeTab === 'enfermeira' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleApagar();
              }}
              className="form-apagar"
            >
              <h3>Apagar Enfermeira</h3>
              <div className="form-group">
                <label>Código:</label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo || ''}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Apagar</button>
            </form>
          )}

          {/* Outros formulários de apagar, se houver */}
          {activeTab !== 'enfermeira' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const id =
                  activeTab === 'medico' ? formData.crm :
                    activeTab === 'atendente' ? formData.codigo :
                      activeTab === 'atendimento' ? formData.codigo :
                        formData.cpf;
                handleApagar(activeTab, id);
              }}
              className="form-apagar"
            >
              <h3>Apagar {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
              <div className="form-group">
                <label>
                  {activeTab === 'medico'
                    ? 'CRM:'
                    : activeTab === 'atendente'
                      ? 'Código:'
                      : activeTab === 'atendimento'
                        ? 'Código:'
                        : 'CPF:'}
                </label>
                <input
                  type="text"
                  name={
                    activeTab === 'medico'
                      ? 'crm'
                      : activeTab === 'atendente'
                        ? 'codigo'
                        : activeTab === 'atendimento'
                          ? 'codigo'
                          : 'cpf'
                  }
                  value={
                    formData[
                    activeTab === 'medico'
                      ? 'crm'
                      : activeTab === 'atendente'
                        ? 'codigo'
                        : activeTab === 'atendimento'
                          ? 'codigo'
                          : 'cpf'
                    ] || ''
                  }
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Apagar</button>
            </form>
          )}
        </>
      )}


      {/* Modal de Informações */}
      {modalData && (
        <div className="modal">
          <div className="modal-content">
            <h3>Informações do Paciente</h3>
            <p><strong>Nome:</strong> {modalData.nome}</p>
            <p><strong>Endereço:</strong> {modalData.endereco}</p>
            <p><strong>Celular:</strong> {modalData.celular}</p>
            <p><strong>CPF:</strong> {modalData.cpf_paciente}</p>
            <p><strong>Cartão do SUS:</strong> {modalData.cartao_sus}</p>
            <p><strong>Status:</strong> {modalData.status || 'Não especificado'}</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
