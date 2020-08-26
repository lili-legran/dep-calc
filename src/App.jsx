import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import DepCalc from './containers/DepCalc/DepCalc';
import PDFPage from './containers/PDFPage/PDFPage';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path='/'
          exact
          render={() => (
            <Layout>
              <DepCalc />
            </Layout>
          )}
        />
        <Route
          path='/pdf'
          exact
          component={PDFPage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
