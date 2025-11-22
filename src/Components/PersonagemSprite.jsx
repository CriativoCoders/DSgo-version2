// Components/PersonagemSprite.jsx
import { useState, useEffect } from "react";

export function PersonagemSprite({ etapaAtual, animando, direcao = 'right' }) {
  const [spriteAtual, setSpriteAtual] = useState(0);
  const [andando, setAndando] = useState(false);

  // Sprites do personagem (substitua pelos seus arquivos)
  const sprites = {
    idle: [
      "/assets/personagem/idle-1.png",
      "/assets/personagem/idle-2.png"
    ],
    walk: [
      "/assets/personagem/walk-1.png", 
      "/assets/personagem/walk-2.png",
      "/assets/personagem/walk-3.png",
      "/assets/personagem/walk-4.png"
    ],
    jump: [
      "/assets/personagem/jump-1.png",
      "/assets/personagem/jump-2.png"
    ]
  };

  // Animação de sprite
  useEffect(() => {
    if (animando) {
      setAndando(true);
      const interval = setInterval(() => {
        setSpriteAtual(prev => (prev + 1) % sprites.walk.length);
      }, 200);

      const timeout = setTimeout(() => {
        setAndando(false);
        clearInterval(interval);
      }, 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      // Animação idle
      const interval = setInterval(() => {
        setSpriteAtual(prev => (prev + 1) % sprites.idle.length);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [animando, sprites]);

  const spriteSrc = andando ? sprites.walk[spriteAtual] : sprites.idle[spriteAtual];

  return (
    <div className={`personagem-sprite ${direcao} ${andando ? 'andando' : 'parado'}`}>
      {spriteSrc ? (
        <img 
          src={spriteSrc}
          alt="Personagem"
          className="sprite"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
      ) : null}
      {/* Fallback com emoji se a imagem não carregar */}
      <div className="sprite-fallback">
        {andando ? '🚶' : '🧙‍♂️'}
      </div>
      <div className="sombra-sprite"></div>
    </div>
  );
}