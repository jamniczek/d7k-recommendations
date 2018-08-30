import React from 'react';
import './App.css';
import Header from '../Header/index.jsx';
import MainBox from '../MainBox/index.jsx'
import { ThemeProvider, createTheme, Arwes, Row, Col, SoundsProvider, createSounds } from 'arwes';
import mySounds from '../soundConfig/index';


const App = () => (
  <ThemeProvider theme={createTheme()}>
  <SoundsProvider sounds={createSounds(mySounds)}>
    <Arwes
      animate
    >
      <Row style={{ maxHeight: '80vh' }}>
        <Col s={12} m={8} l={6} offset={['m2', 'l3']} >
          <Header />
          <MainBox />
        </Col>
      </Row>
    </Arwes>
    </SoundsProvider>
  </ThemeProvider>
);

export default App;
