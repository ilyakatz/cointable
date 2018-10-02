import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'
import App from './App';
import Establishments from './establishments/Establishments';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import WalletStore from './store/ContractStore';
import EstablishmentsStore from './store/EstablishmentsStore';

const CoinTable = () => {
  const walletStore = new WalletStore();
  const establishmentsStore = new EstablishmentsStore();
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>

        <hr />

        <Route exact={true} path="/" component={() => (
          <div>
            <Establishments store={walletStore} establishmentsStore={establishmentsStore} />
          </div>
        )}
        />
        <Route path="/about" component={App} />
      </div>
    </Router>
  );
}

ReactDOM.render(
  <CoinTable />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
