import { useState, useEffect } from "react";

export function Galeria() {
    const [fotos, setFotos] = useState([]);

    // Função para carregar fotos
    const carregarFotos = () => {
        try {
            const fotosSalvas = localStorage.getItem('fotosTiradas');
            if (fotosSalvas) {
                const fotosArray = JSON.parse(fotosSalvas);
                console.log('📸 Fotos carregadas:', fotosArray.length);
                setFotos(fotosArray);
            } else {
                setFotos([]);
            }
        } catch (error) {
            console.error('❌ Erro ao carregar fotos:', error);
            setFotos([]);
        }
    };

    useEffect(() => {
        // Carregar fotos inicialmente
        carregarFotos();

        // Escutar evento de atualização
        const handleFotosAtualizadas = () => {
            console.log('🔄 Evento de atualização recebido!');
            carregarFotos();
        };

        window.addEventListener('fotosAtualizadas', handleFotosAtualizadas);

        // Também escutar mudanças no storage (para outras abas)
        window.addEventListener('storage', (e) => {
            if (e.key === 'fotosTiradas') {
                carregarFotos();
            }
        });

        return () => {
            window.removeEventListener('fotosAtualizadas', handleFotosAtualizadas);
            window.removeEventListener('storage', carregarFotos);
        };
    }, []);

    const deletarFoto = (id) => {
        const novasFotos = fotos.filter(foto => foto.id !== id);
        setFotos(novasFotos);
        localStorage.setItem('fotosTiradas', JSON.stringify(novasFotos));
        window.dispatchEvent(new Event('fotosAtualizadas'));
    };

    const deletarTodasFotos = () => {
        if (window.confirm("Tem certeza que deseja deletar TODAS as fotos?")) {
            setFotos([]);
            localStorage.removeItem('fotosTiradas');
            window.dispatchEvent(new Event('fotosAtualizadas'));
        }
    };

    // Componente de galeria simples sem Material-UI
    if (fotos.length === 0) {
        return (
            <div className="galeria-vazia">
                <div className="icone-camera">📷</div>
                <h2>Galeria Vazia</h2>
                <p>Tire algumas fotos usando a câmera para vê-las aqui!</p>
            </div>
        );
    }

    return (
        <div className="galeria-container">
            <div className="galeria-header">
                <h1>Minha Galeria</h1>
                <div className="galeria-info">
                    <span className="contador-fotos">
                        {fotos.length} {fotos.length === 1 ? 'foto' : 'fotos'}
                    </span>
                    <button onClick={deletarTodasFotos} className="btn-limpar-tudo">
                        🗑️ Limpar Tudo
                    </button>
                </div>
            </div>

            <div className="galeria-grid">
                {fotos.map((foto, index) => (
                    <div key={foto.id} className="foto-item">
                        <img src={foto.src} alt={`Foto ${index + 1}`} />
                        <div className="foto-info">
                            <span>Foto {index + 1}</span>
                            <span>{foto.data}</span>
                            <button 
                                onClick={() => deletarFoto(foto.id)}
                                className="btn-deletar"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}