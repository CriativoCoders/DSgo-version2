// // Inventario.jsx
// import { useEffect, useState } from "react";
// import { recompensas } from '../Dados/recompensas';

// export function Inventario() {
//   const [figurinhas, setFigurinhas] = useState([]);
//   const [missoesConcluidas, setMissoesConcluidas] = useState([]);

//   // Carregar inventário e missões concluídas
//   const carregarDados = () => {
//     try {
//       const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
//       console.log('📦 Inventário carregado:', armazenado);
//       setFigurinhas(armazenado);
      
//       const concluidas = JSON.parse(localStorage.getItem('missoesConcluidas')) || [];
//       setMissoesConcluidas(concluidas);
//     } catch (error) {
//       console.error('❌ Erro ao carregar inventário:', error);
//       setFigurinhas([]);
//     }
//   };

//   useEffect(() => {
//     carregarDados();

//     // Escutar atualizações do inventário
//     const handleInventarioAtualizado = () => {
//       console.log('🔄 Inventário atualizado!');
//       carregarDados();
//     };

//     window.addEventListener('inventarioAtualizado', handleInventarioAtualizado);
//     window.addEventListener('storage', carregarDados);

//     return () => {
//       window.removeEventListener('inventarioAtualizado', handleInventarioAtualizado);
//       window.removeEventListener('storage', carregarDados);
//     };
//   }, []);

//   const limparInventario = () => {
//     if (!window.confirm("Deseja realmente limpar todo o inventário?\nIsso removerá todas as suas recompensas!")) return;

//     localStorage.removeItem("inventario");
//     setFigurinhas([]);
//     window.dispatchEvent(new Event('inventarioAtualizado'));
//   };

//   // Função para obter a imagem da recompensa
//   const getImagemRecompensa = (figurinha) => {
//     const recompensa = recompensas[figurinha.missaoId || figurinha.id];
//     return recompensa?.imagem || null;
//   };

//   // Função para obter ícone de fallback
//   const getIconeFallback = (tipo) => {
//     switch(tipo) {
//       case 'professor':
//         return '👨‍🏫';
//       case 'conceito':
//         return '🔑';
//       default:
//         return '🎁';
//     }
//   };

//   // Calcular progresso
//   const totalMissoes = Object.keys(recompensas).length;
//   const missoesCompletas = figurinhas.length;
//   const progresso = Math.round((missoesCompletas / totalMissoes) * 100);

//   return (
//     <main className="conteiner">
//       <section className="inventario">
//         <h2>🎒 Meu Inventário</h2>
        
//         {/* Estatísticas */}
//         <div className="estatisticas">
//           <div className="progresso">
//             <div className="progresso-info">
//               <span>Progresso: {missoesCompletas}/{totalMissoes}</span>
//               <span>{progresso}%</span>
//             </div>
//             <div className="barra-progresso">
//               <div 
//                 className="progresso-preenchido" 
//                 style={{width: `${progresso}%`}}
//               ></div>
//             </div>
//           </div>
//         </div>

//         <button className="limpar-inventario" onClick={limparInventario}>
//           🗑️ Limpar Inventário
//         </button>

//         {/* Lista de Recompensas */}
//         {figurinhas.length === 0 ? (
//           <div className="vazio">
//             <div className="icone-vazio">🎁</div>
//             <h3>Nenhuma recompensa coletada ainda!</h3>
//             <p>Complete missões para ganhar figurinhas e recompensas.</p>
//           </div>
//         ) : (
//           <div className="grid-inventario-compacto">
//             {figurinhas.map((figurinha) => {
//               const recompensa = recompensas[figurinha.missaoId || figurinha.id];
//               const imagem = getImagemRecompensa(figurinha);
              
//               return (
//                 <div key={figurinha.id} className="card-figurinha">
//                   <div className="figurinha-container">
//                     {imagem ? (
//                       <img 
//                         src={imagem} 
//                         alt={recompensa?.nome || figurinha.nome}
//                         className="figurinha-imagem"
//                         onError={(e) => {
//                           console.warn('❌ Erro ao carregar imagem:', imagem);
//                           e.target.style.display = 'none';
//                           e.target.nextSibling.style.display = 'flex';
//                         }}
//                       />
//                     ) : null}
//                     <div className="figurinha-fallback">
//                       <span className="icone-fallback">
//                         {getIconeFallback(recompensa?.tipo)}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="figurinha-info">
//                     <h4>{recompensa?.nome || figurinha.nome}</h4>
//                     <p className="tipo">{recompensa?.tipo || figurinha.tipo || 'Recompensa'}</p>
//                     <p className="data">Conquistado em: {figurinha.dataConquista}</p>
//                     <p className="missao">Missão {figurinha.missaoId}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Missões que ainda faltam */}
//         {missoesConcluidas.length > 0 && missoesConcluidas.length < totalMissoes && (
//           <div className="missoes-restantes">
//             <h3>🎯 Missões Restantes</h3>
//             <div className="lista-missoes">
//               {Object.keys(recompensas).map(missaoId => {
//                 const id = parseInt(missaoId);
//                 const recompensa = recompensas[id];
//                 if (!missoesConcluidas.includes(id)) {
//                   return (
//                     <div key={id} className="missao-restante">
//                       <span className="icone-missao">
//                         {recompensa.imagem ? (
//                           <img 
//                             src={recompensa.imagem} 
//                             alt={recompensa.nome}
//                             className="icone-imagem"
//                           />
//                         ) : (
//                           getIconeFallback(recompensa.tipo)
//                         )}
//                       </span>
//                       <span>Missão {id}: {recompensa.nome}</span>
//                     </div>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }