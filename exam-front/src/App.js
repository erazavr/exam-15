import React from 'react';

import {ToastContainer} from "react-toastify";
import {Container} from "reactstrap";
import AppToolbar from "./components/UI/Toolbar/AppToolbar";
import {CssBaseline} from "@material-ui/core";
import Routes from "./Routes";

const App = () => {
  return (
      <>
        <CssBaseline/>
        <ToastContainer autoClose={2000}/>
        <header>
          <AppToolbar/>
        </header>
        <Container className='mt-5'>
          <Routes/>
        </Container>
      </>
  );
};

export default App;