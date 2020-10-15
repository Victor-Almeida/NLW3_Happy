import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import api from "../services/api";
import IconeMapa from "../utils/IconeMapa";
import marcador from '../images/map marker.svg';
import '../styles/pages/mapa.css';

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

function Mapa(){
	const [orfanatos, setOrfanatos] = useState<Orfanato[]>([]);

	useEffect(() => {
		api.get("orfanatos").then(resposta => {
			setOrfanatos(resposta.data);
		});
	}, []);

	return(
		<div id="page-map">
			<aside>
				<header>
					<img src={marcador} alt="marcador"/>
					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando pela sua visita :)</p>
				</header>
				<footer>
					<strong>Iguaba Grande</strong>
					<span>Rio de Janeiro</span>
				</footer>
			</aside>
			<Map center={[-22.83593, -42.2203609]} zoom={14.75} style={{width: '100%', height: '100%'}}>
				<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
				{
					orfanatos.map(orfanato => {
						return(
							<Marker icon={IconeMapa} position={[orfanato.latitude, orfanato.longitude]} key={orfanato.id}>
								<Popup closeButton={false} minWidth={240} maxWidth={280} className="popup-mapa">
									{orfanato.nome},
									<Link to={`/orfanatos/${orfanato.id}`}>
										<FiArrowRight size={20} color="#FFF"/>
									</Link>
								</Popup>
							</Marker>
						);
				}	)};
			</Map>
			<Link to="/orfanatos/adicionar" className="create-orphanage">
				<FiPlus size={32} color="#FFF"/>
			</Link>
		</div>
	);
}

export default Mapa;