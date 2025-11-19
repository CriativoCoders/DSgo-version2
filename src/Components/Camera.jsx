import { useState, useEffect, useRef } from "react";

export function Camera(){
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [fotoAtual, setFotoAtual] = useState(null);

    useEffect(() =>{
        console.log("🎥 Iniciando câmera...");
        iniciarCamera();
        
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    },[]);

    const iniciarCamera = async () => {
        try{
            console.log("🔄 Solicitando acesso à câmera...");
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment'
                } 
            });
            if(videoRef.current){
                videoRef.current.srcObject = stream;
                console.log("✅ Câmera iniciada com sucesso!");
            }
        }
        catch(error){
            console.error("❌ Erro ao iniciar a camera:", error);
            alert("Não foi possível acessar a câmera. Verifique as permissões.");
        }
    };

    const tirarFoto = () => {
        console.log("📸 Botão de tirar foto clicado!");
        
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        if (!video || !canvas) {
            console.error("❌ Elementos de vídeo ou canvas não encontrados");
            return;
        }

        console.log("📐 Dimensões do vídeo:", video.videoWidth, "x", video.videoHeight);
        
        if (video.videoWidth === 0 || video.videoHeight === 0) {
            console.error("❌ Vídeo não está pronto para captura");
            alert("Aguarde a câmera carregar completamente!");
            return;
        }

        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        console.log("🎨 Configurando canvas com:", canvas.width, "x", canvas.height);

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imagem = canvas.toDataURL("image/png");
        console.log("🖼️ Data URL gerada (início):", imagem.substring(0, 50) + "...");
        
        setFotoAtual(imagem);
        console.log("✅ Estado fotoAtual atualizado");
        
        // SALVAR NO LOCALSTORAGE
        const fotosExistentes = JSON.parse(localStorage.getItem('fotosTiradas') || '[]');
        console.log("📁 Fotos existentes no localStorage:", fotosExistentes.length);
        
        const novaFoto = {
            id: Date.now(),
            src: imagem,
            data: new Date().toLocaleString('pt-BR')
        };
        
        const novasFotos = [...fotosExistentes, novaFoto];
        localStorage.setItem('fotosTiradas', JSON.stringify(novasFotos));
        
        console.log('💾 Foto salva no localStorage!');
        console.log('📊 Total de fotos agora:', novasFotos.length);
        console.log('🆔 ID da nova foto:', novaFoto.id);
        
        // ⭐ DISPARA EVENTO CUSTOMIZADO PARA NOTIFICAR A GALERIA
        const evento = new CustomEvent('fotoAdicionada', { 
            detail: { foto: novaFoto, total: novasFotos.length } 
        });
        window.dispatchEvent(evento);
        console.log('📢 Evento "fotoAdicionada" disparado!');
        
        const verificar = JSON.parse(localStorage.getItem('fotosTiradas') || '[]');
        console.log('🔍 Verificação - Fotos no localStorage após salvar:', verificar.length);
    }

    const reiniciarCamera = () => {
        console.log("🔄 Reiniciando câmera...");
        setFotoAtual(null);
        iniciarCamera();
    }

    const baixarFoto = () => {
        if (!fotoAtual) return;
        
        console.log("💾 Baixando foto...");
        const link = document.createElement('a');
        link.download = `foto-${Date.now()}.png`;
        link.href = fotoAtual;
        link.click();
    }

    return (
        <div className="camera-container">
            <section className="camera-box">
                <h2>📷 Captura da Câmera</h2>
                <div className="preview">
                    {!fotoAtual ? (
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            aria-label="Fluxo da câmera"
                            style={{ transform: 'scaleX(-1)' }}
                            onLoadedMetadata={() => console.log("✅ Vídeo carregado e pronto!")}
                            onLoadStart={() => console.log("🚀 Vídeo iniciando carregamento...")}
                        />
                    ) : (
                        <img src={fotoAtual} alt="Foto capturada" />
                    )}
                </div>
                
                <div className="camera-controls">
                    {!fotoAtual ? (
                        <button onClick={tirarFoto} className="btn-tirar-foto">
                            📸 Tirar Foto
                        </button>
                    ) : (
                        <div className="botoes-pos-foto">
                            <button onClick={reiniciarCamera} className="btn-nova-foto">
                                🔄 Nova Foto
                            </button>
                            <button onClick={baixarFoto} className="btn-baixar">
                                💾 Baixar Foto
                            </button>
                        </div>
                    )}
                </div>
                
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </section>

            <div className="mini-galeria-preview">
                <h3>📁 Fotos na Galeria: 
                    <span id="contador-fotos">
                        {JSON.parse(localStorage.getItem('fotosTiradas') || '[]').length}
                    </span>
                </h3>
                <p>As fotos são salvas automaticamente na galeria!</p>
            </div>
        </div>
    )
}