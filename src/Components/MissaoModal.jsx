// MissaoModal.jsx
import { useState } from "react";
import sucesso from "../assets/win.png";
import erro from "../assets/raios.png";
import { recompensas } from '../Dados/recompensas';

export function MissaoModal({ missao, onClose, onConcluir }) {
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);

  const verificarResposta = () => {
    if (!resposta.trim()) {
      alert("Por favor, digite uma resposta antes de enviar!");
      return;
    }

    if (resposta.trim().toLowerCase() === missao.respostaCorreta.trim().toLowerCase()) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");

      // ✅ Salvar missão concluída
      const missoesSalvas = JSON.parse(localStorage.getItem('missoesConcluidas') || '[]');
      if (!missoesSalvas.includes(missao.id)) {
        localStorage.setItem('missoesConcluidas', JSON.stringify([...missoesSalvas, missao.id]));
      }

      // ✅ DAR RECOMPENSA NO INVENTÁRIO
      const inventario = JSON.parse(localStorage.getItem('inventario') || '[]');
      const recompensa = recompensas[missao.id];
      
      if (recompensa && !inventario.find(item => item.id === recompensa.id)) {
        const novaRecompensa = {
          ...recompensa,
          dataConquista: new Date().toLocaleString('pt-BR'),
          missaoId: missao.id
        };
        
        const novoInventario = [...inventario, novaRecompensa];
        localStorage.setItem('inventario', JSON.stringify(novoInventario));
        console.log('🎁 Recompensa adicionada ao inventário:', recompensa.nome);
        
        // Disparar evento para atualizar o inventário
        window.dispatchEvent(new Event('inventarioAtualizado'));
      }

      setTimeout(() => {
        onConcluir(missao.id);
      }, 2000);
    } else {
      setResultado("Resposta incorreta. Tente novamente!");
      setStatus("erro");
    }
  };

  return (
    <dialog open className="modal">
      <h2 className="titulo" id="titulo-missao">
        {missao.titulo}
      </h2>
      <p id="descricao-missao">{missao.descricao}</p>

      <label htmlFor="resposta" className="sr-only">
        Digite sua resposta
      </label>
      <input
        className="caixaTexto"
        id="resposta"
        type="text"
        placeholder="Digite sua resposta..."
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        required
      />

      <div className="modal-botoes">
        <button onClick={verificarResposta}>Enviar</button>
        <button onClick={onClose}>Fechar</button>
      </div>

      {resultado && (
        <div className="resultado">
          <p>{resultado}</p>
          {status === "sucesso" && (
            <div>
              <img
                src={sucesso}
                alt="Missão concluída com sucesso"
                width="100"
              />
              <p style={{marginTop: '10px', fontWeight: 'bold', color: '#4CAF50'}}>
                🎁 Você ganhou: {recompensas[missao.id]?.nome}
              </p>
            </div>
          )}
          {status === "erro" && (
            <img
              src={erro}
              alt="Erro na resposta da missão"
              width="100"
            />
          )}
        </div>
      )}
    </dialog>
  );
}