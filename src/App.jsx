// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inicial } from './Paginas/Inicial';
import { DSGo } from './Paginas/DSGo';
import { Missao } from './Paginas/Missao';
import { Camera } from './Components/Camera';
import { Galeria } from './Components/Galeria';
import { Inventario } from './Paginas/Inventario';
import { Geolocalizacao } from './Components/Geolocalizacao';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="/dsgo" element={<DSGo />}>
          <Route index element={<Missao />} /> {/* Rota padrão dentro de DSGo */}
          <Route path="missao" element={<Missao />} />
          <Route path="camera" element={<Camera />} />
          <Route path="galeria" element={<Galeria />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="geolocalizacao" element={<Geolocalizacao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;