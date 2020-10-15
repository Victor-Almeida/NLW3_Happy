import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/pages/landing.css';
import logoimg from '../images/Logo.svg';
import {FiArrowRight} from 'react-icons/fi';

function Landing(){
	return(
		<div id="page-landing">
			<div className="content-wrapper">
				<img src={logoimg} alt="happy"/>
				<main>
					<h1>Leve felicidade para o mundo</h1>
					<p>Visite um orfanato e mude o dia de muitas crianças.</p>
				</main>
				<div className="location">
					<strong>Iguaba Grande</strong>
					<span>Rio de Janeiro</span>
				</div>
				<Link to="/mapa" className="enter-app">
					<FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
				</Link>
			</div>
		</div>
	);
}

export default Landing;