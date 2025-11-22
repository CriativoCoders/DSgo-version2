// Components/MapaVisual.jsx
import { useState, useEffect } from "react";

export function MapaVisual({ etapaAtual, animando }) {
  const [imagensCarregadas, setImagensCarregadas] = useState({});

  // Imagens para cada etapa (você pode substituir por suas próprias imagens)
  const imagensEtapas = {
    0: "/assets/mapa/inicio.png", // Ou importe: import inicio from '../assets/mapa/inicio.png'
    1: "/assets/mapa/exploracao.png",
    2: "/assets/mapa/descoberta.png", 
    3: "/assets/mapa/aventura.png",
    4: "/assets/mapa/conquista.png",
    5: "/assets/mapa/mestre.png",
    6: "/assets/mapa/lenda.png",
    7: "/assets/mapa/vitoria.png"
  };

  // Pré-carregar imagens
  useEffect(() => {
    const carregarImagens = async () => {
      const carregadas = {};
      
      for (const [etapa, src] of Object.entries(imagensEtapas)) {
        try {
          const img = new Image();
          img.src = src;
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
          carregadas[etapa] = true;
        } catch (error) {
          console.warn(`❌ Imagem não carregada: ${src}`);
          carregadas[etapa] = false;
        }
      }
      
      setImagensCarregadas(carregadas);
    };

    carregarImagens();
  }, []);

  const getImagemEtapa = (etapaIndex) => {
    return imagensEtapas[etapaIndex] || null;
  };

  const etapaImagem = getImagemEtapa(etapaAtual);
  const imagemCarregada = imagensCarregadas[etapaAtual];

  return (
    <div className="mapa-visual-container">
      {/* Fundo do Mapa */}
      <div className="fundo-mapa">
        <div className="mapa-camadas">
          {/* Camada de fundo estática */}
          <div className="camada-fundo"></div>
          
          {/* Imagem da etapa atual */}
          {etapaImagem && imagemCarregada && (
            <img 
              src={etapaImagem}
              alt={`Etapa ${etapaAtual + 1}`}
              className={`imagem-etapa ${animando ? 'animando' : ''}`}
            />
          )}
          
          {/* Overlay de transição */}
          <div className={`overlay-transicao ${animando ? 'ativo' : ''}`}></div>
        </div>
      </div>
      
      {/* Indicador de Progresso */}
      <div className="indicador-progresso">
        <div className="marcador-atual">
          <span className="numero-etapa">{etapaAtual + 1}</span>
          <div className="ponto-luminoso"></div>
        </div>
      </div>
    </div>
  );
}