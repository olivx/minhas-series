import React from 'react';
import Header from './Components/Header'
import Home from './Components/Home'


import {
  BrowserRouter as Router, 
  Route,
  Switch
} from 'react-router-dom'

import Generos from './Components/Generos/Generos'
import NovoGenero from './Components/Generos/NovoGenero'
import EditarGenero from './Components/Generos/EditarGenero'
import Series from './Components/Series/Series'
import SerieNova from './Components/Series/SerieNova'
import InfoSerie from './Components/Series/InfoSeries'


function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/generos' exact component={Generos} />
        <Route path='/genero/novo' exact component={NovoGenero} />
        <Route path='/genero/:id' exact component={EditarGenero} />
        <Route path='/series' exact component={Series} />
        <Route path='/series/novo/' exact component={SerieNova} />
        <Route path="/series/:id" exact component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
