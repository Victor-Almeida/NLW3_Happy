import React, {useState, useEffect} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {useParams} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import IconeMapa from "../utils/IconeMapa";
import api from "../services/api";
import '../styles/pages/orfanato.css';

interface Orfanato {
  id: number,
  nome: string,
  latitude: number,
  longitude: number,
  sobre: string,
  instrucoes: string,
  horario_de_funcionamento: string,
  aberto_aos_fins_de_semana: boolean,
  imagens: {
    url: string,
    id: number
  }[]
};

interface Params {
  id: string
};

export default function Orfanato() {
  const params = useParams<Params>();
  const [orfanato, setOrfanato] = useState<Orfanato>();
  const [idImagemAtiva, setIdImagemAtiva] = useState(0);

  useEffect(() => {
    api.get(`orfanatos/${params.id}`).then(resposta => {
      setOrfanato(resposta.data);
    });
  }, [params.id]);

  if(!orfanato){
    return <p>Carregando...</p>
  };

  return (
    <div id="page-orphanage">
      <Sidebar/>
      <main>
        <div className="orphanage-details">
          <img src={orfanato.imagens[idImagemAtiva].url} alt={orfanato.nome} />

          <div className="images">
            {orfanato.imagens.map((imagem, index) => {
              return(
                <button 
                  className={idImagemAtiva === index ? "active" : ""} 
                  type="button" 
                  key={imagem.id} 
                  onClick={() => {
                    setIdImagemAtiva(index)
                  }
                }>
                  <img src={imagem.url} alt={orfanato.nome} />
                </button>
              );
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orfanato.nome}</h1>
            <p>{orfanato.sobre}</p>

            <div className="map-container">
              <Map 
                center={[orfanato.latitude, orfanato.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                <Marker interactive={false} icon={IconeMapa} position={[orfanato.latitude, orfanato.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orfanato.latitude}, ${orfanato.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orfanato.instrucoes}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orfanato.horario_de_funcionamento}
              </div>
              {orfanato.aberto_aos_fins_de_semana ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos aos <br/>
                  fins de semana
                </div>
                ) : (
                  <div className="not-open-on-weekends">
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos aos <br/>
                    fins de semana
                  </div>
                )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}