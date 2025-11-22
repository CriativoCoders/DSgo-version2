// Components/Geolocalizacao.jsx
import { useState, useEffect } from "react";

export function Geolocalizacao() {
  const [localizacao, setLocalizacao] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [historico, setHistorico] = useState([]);

  // Carregar histórico do localStorage
  useEffect(() => {
    const historicoSalvo = JSON.parse(localStorage.getItem('historicoGeolocalizacao') || '[]');
    setHistorico(historicoSalvo);
  }, []);

  const obterLocalizacao = () => {
    setCarregando(true);
    setErro(null);

    if (!navigator.geolocation) {
      setErro("Geolocalização não é suportada pelo seu navegador.");
      setCarregando(false);
      return;
    }

    const opcoes = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      // Sucesso
      (posicao) => {
        const { latitude, longitude } = posicao.coords;
        const novaLocalizacao = {
          latitude,
          longitude,
          timestamp: new Date().toLocaleString('pt-BR'),
          precisao: posicao.coords.accuracy
        };

        setLocalizacao(novaLocalizacao);
        setCarregando(false);

        // Salvar no histórico
        const novoHistorico = [novaLocalizacao, ...historico.slice(0, 9)]; // Mantém apenas 10 registros
        setHistorico(novoHistorico);
        localStorage.setItem('historicoGeolocalizacao', JSON.stringify(novoHistorico));

        console.log('📍 Localização obtida:', novaLocalizacao);
      },
      // Erro
      (erro) => {
        setCarregando(false);
        switch (erro.code) {
          case erro.PERMISSION_DENIED:
            setErro("Permissão de localização negada. Por favor, permita o acesso à localização.");
            break;
          case erro.POSITION_UNAVAILABLE:
            setErro("Localização indisponível no momento.");
            break;
          case erro.TIMEOUT:
            setErro("Tempo limite excedido ao obter localização.");
            break;
          default:
            setErro("Erro desconhecido ao obter localização.");
        }
      },
      opcoes
    );
  };

  const limparHistorico = () => {
    if (window.confirm("Deseja limpar o histórico de localizações?")) {
      setHistorico([]);
      localStorage.removeItem('historicoGeolocalizacao');
    }
  };

  const abrirNoGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const copiarCoordenadas = (lat, lng) => {
    const texto = `${lat}, ${lng}`;
    navigator.clipboard.writeText(texto)
      .then(() => {
        alert('Coordenadas copiadas para a área de transferência!');
      })
      .catch(() => {
        alert('Erro ao copiar coordenadas.');
      });
  };

  return (
    <main className="conteiner">
      <section className="geolocalizacao">
        <h2>🗺️ Geolocalização</h2>
        
        <div className="geolocalizacao-info">
          <p>Obtenha sua localização atual e visualize no mapa.</p>
          
          <button 
            onClick={obterLocalizacao} 
            disabled={carregando}
            className="btn-obter-localizacao"
          >
            {carregando ? '🔄 Obtendo localização...' : '📍 Obter Minha Localização'}
          </button>
        </div>

        {erro && (
          <div className="geolocalizacao-erro">
            <span className="erro-icone">⚠️</span>
            <p>{erro}</p>
          </div>
        )}

        {localizacao && (
          <div className="geolocalizacao-resultado">
            <h3>📍 Sua Localização Atual</h3>
            
            <div className="coordenadas">
              <div className="coordenada-item">
                <strong>Latitude:</strong>
                <span>{localizacao.latitude.toFixed(6)}</span>
              </div>
              <div className="coordenada-item">
                <strong>Longitude:</strong>
                <span>{localizacao.longitude.toFixed(6)}</span>
              </div>
              <div className="coordenada-item">
                <strong>Precisão:</strong>
                <span>±{Math.round(localizacao.precisao)} metros</span>
              </div>
              <div className="coordenada-item">
                <strong>Horário:</strong>
                <span>{localizacao.timestamp}</span>
              </div>
            </div>

            <div className="acoes-localizacao">
              <button 
                onClick={() => abrirNoGoogleMaps(localizacao.latitude, localizacao.longitude)}
                className="btn-mapa"
              >
                🗺️ Abrir no Google Maps
              </button>
              <button 
                onClick={() => copiarCoordenadas(localizacao.latitude, localizacao.longitude)}
                className="btn-copiar"
              >
                📋 Copiar Coordenadas
              </button>
            </div>

            {/* Mapa estático (opcional) */}
            <div className="mapa-estatico">
              <img 
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${localizacao.latitude},${localizacao.longitude}&zoom=15&size=400x200&markers=color:red%7C${localizacao.latitude},${localizacao.longitude}&key=YOUR_API_KEY`}
                alt="Mapa da localização"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="mapa-placeholder">
                <span>🗺️</span>
                <p>Visualize a localização no Google Maps</p>
              </div>
            </div>
          </div>
        )}

        {historico.length > 0 && (
          <div className="geolocalizacao-historico">
            <div className="historico-header">
              <h3>📊 Histórico de Localizações</h3>
              <button onClick={limparHistorico} className="btn-limpar-historico">
                🗑️ Limpar
              </button>
            </div>
            
            <div className="lista-historico">
              {historico.map((item, index) => (
                <div key={index} className="item-historico">
                  <div className="historico-info">
                    <span className="coordenadas-historico">
                      {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                    </span>
                    <span className="timestamp-historico">{item.timestamp}</span>
                  </div>
                  <div className="historico-acoes">
                    <button 
                      onClick={() => abrirNoGoogleMaps(item.latitude, item.longitude)}
                      className="btn-historico-mapa"
                      title="Abrir no mapa"
                    >
                      🗺️
                    </button>
                    <button 
                      onClick={() => copiarCoordenadas(item.latitude, item.longitude)}
                      className="btn-historico-copiar"
                      title="Copiar coordenadas"
                    >
                      📋
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}