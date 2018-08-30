import React from 'react';
import './App.css';
import Header from '../Header/index.jsx';
import MainBox from '../MainBox/index.jsx'
import { ThemeProvider, createTheme, Arwes, Row, Col } from 'arwes';;



const App = () => (
  <ThemeProvider theme={createTheme()}>
    <Arwes
      animate
      background={{xl: 'botbackground.jpg'}}
    >
      <Row style={{ maxHeight: '80vh' }}>
        <Col s={12} m={8} l={6} offset={['m2', 'l3']} >
          <Header />
          <MainBox />
        </Col>
      </Row>
    </Arwes>
  </ThemeProvider>
);

export default App;
