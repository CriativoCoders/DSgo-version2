// Missao.jsx
import { useState, useEffect } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Components/MissaoCard';
import { MissaoModal } from '../Components/MissaoModal';

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState([]);

  // Carregar missões concluídas do localStorage
  useEffect(() => {
    const concluidasSalvas = JSON.parse(localStorage.getItem('missoesConcluidas')) || [];
    setMissoesConcluidas(concluidasSalvas);
  }, []);

  const concluirMissao = (id) => {
    const novasConcluidas = [...missoesConcluidas, id];
    setMissoesConcluidas(novasConcluidas);
    localStorage.setItem('missoesConcluidas', JSON.stringify(novasConcluidas));
    setMissaoSelecionada(null);
  };

  return (
    <section className='conteiner'>
      <h2>Missões</h2>
      <div className="missoes-grid">
        {missoes.map((m) => (
          <MissaoCard
            key={m.id} 
            missao={m}  
            onIniciarMissao={setMissaoSelecionada} 
            concluida={missoesConcluidas.includes(m.id)} 
          />
        ))}
      </div>

      {missaoSelecionada && (
        <MissaoModal 
          missao={missaoSelecionada} 
          onClose={() => setMissaoSelecionada(null)} 
          onConcluir={() => concluirMissao(missaoSelecionada.id)} 
        />
      )}
    </section>
  );
}