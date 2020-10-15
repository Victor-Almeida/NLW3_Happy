import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Mapa from './pages/Mapa';
import Orfanato from "./pages/Orfanato";
import AdicionarOrfanato from "./pages/AdicionarOrfanato";

function Routes(){
	return(
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Landing}/>
				<Route path="/mapa" component={Mapa}/>
				<Route path="/orfanatos/adicionar" exact component={AdicionarOrfanato}/>
				<Route path="/orfanatos/:id" exact component={Orfanato}/>
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;