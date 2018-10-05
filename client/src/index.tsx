import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'
import Establishment from './establishment/Establishment';
import Establishments from './establishments/Establishments';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import WalletStore from './store/ContractStore';
import EstablishmentsStore from './store/EstablishmentsStore';

const CoinTable = () => {
  const walletStore = new WalletStore();
  const establishmentsStore = new EstablishmentsStore(walletStore);
  return (
    <Router>
      <div>
        <Route exact={true} path="/" component={() => (
          <div>
            <Establishments store={walletStore} establishmentsStore={establishmentsStore} />
          </div>
        )}
        />
        <Route exact={true} path="/establishment/:id" component={(props) => {
          const p = Object.assign({}, ...props, { walletStore, establishmentsStore });
          return (
            <div>
              <Establishment {...p} />
            </div>
          )
        }
        }
        />
      </div>
    </Router>
  );
}

ReactDOM.render(
  <CoinTable />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
