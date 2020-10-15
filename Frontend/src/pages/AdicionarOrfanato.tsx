import React, {useState, FormEvent, ChangeEvent} from "react";
import {useHistory} from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import {LeafletMouseEvent} from "leaflet";
import Sidebar from "../components/Sidebar";
import IconeMapa from "../utils/IconeMapa";
import api from "../services/api";
import '../styles/pages/adicionar_orfanato.css';

export default function AdicionarOrfanato() {
  const historico = useHistory();

  const [nome, setNome] = useState("");
  const [sobre, setSobre] = useState("");
  const [fotos, setFotos] = useState<File[]>([]);
  const [previewFotos, setPreviewFotos] = useState<string[]>([]);
  const [instrucoes, setInstrucoes] = useState("");
  const [horario, setHorario] = useState("");
  const [fimDeSemana, setFimDeSemana] = useState(false);
  const [geolocalizacao, setGeolocalizacao] = useState({latitude: -22.8285314, longitude: -42.1446923});

  function handleMapClick(evento: LeafletMouseEvent){
    const {lat, lng} = evento.latlng;

    setGeolocalizacao({
      latitude: lat,
      longitude: lng
    })
  };

  async function handleSubmit(evento: FormEvent){
    evento.preventDefault();

    const dados = new FormData();
    dados.append("nome", nome);
    dados.append("sobre", sobre);
    dados.append("instrucoes", instrucoes);
    dados.append("horario_de_funcionamento", horario);
    dados.append("aberto_aos_fins_de_semana", String(fimDeSemana));
    dados.append("latitude", String(geolocalizacao.latitude));
    dados.append("longitude", String(geolocalizacao.longitude));
    fotos.forEach(foto => {dados.append("imagens", foto)});

    await api.post("orfanatos", dados);
    alert("Orfanato adicionado ao app com sucesso!");
    historico.push("/mapa");
  };

  function handleSelecionarImagens(evento: ChangeEvent<HTMLInputElement>){
    if(!evento.target.files){
      return;
    }

    const imagens_selecionadas = Array.from(evento.target.files);
    setFotos(imagens_selecionadas);
    setPreviewFotos(imagens_selecionadas.map(foto => {
      return URL.createObjectURL(foto);
    }));
  };

  return (
    <div id="page-create-orphanage">
      <Sidebar/>
      <main>
        <form onSubmit={evento => handleSubmit(evento)} className="create-orphanage-form">
          <fieldset>
            <legend>Adicione um orfanato ao app</legend>

            <Map 
              center={[geolocalizacao.latitude, geolocalizacao.longitude]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
              />
              {geolocalizacao.latitude !== 0 && geolocalizacao.longitude !== 0 ? (
                  <Marker interactive={false} icon={IconeMapa} position={[geolocalizacao.latitude, geolocalizacao.longitude]}/>
                ) : (null)}
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={nome} onChange={evento => setNome(evento.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300}  value={sobre} onChange={evento => setSobre(evento.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="container-fotos">
                {previewFotos.map(foto  => {
                  return(<img src={foto} alt={nome} key={foto}/>)
                })}
                <label htmlFor="foto[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                <input multiple type="file" id="imagem[]" onChange={evento => handleSelecionarImagens(evento)}/>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instrucoes} onChange={evento => setInstrucoes(evento.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={horario} onChange={evento => setHorario(evento.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Aberto aos fins de semana</label>

              <div className="button-select">
                <button 
                  type="button"
                  className={fimDeSemana ? 'active' : ''}
                  onClick={() => setFimDeSemana(true)}>
                    Sim
                </button>
                <button
                  type="button"
                  className={fimDeSemana ? '' : 'active'}
                  onClick={() => setFimDeSemana(false)}>
                    Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
