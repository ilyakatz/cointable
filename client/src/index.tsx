import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'
import { Container, Grid } from 'semantic-ui-react';
import Establishment from './establishment/Establishment';
import Establishments from './establishments/Establishments';
import Heading from './Heading';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import WalletStore from './store/ContractStore';
import EstablishmentsStore from './store/EstablishmentsStore';

const CoinTable = () => {
  const walletStore = new WalletStore();
  const establishmentsStore = new EstablishmentsStore(walletStore);
  return (
    <Router>
      <Container>
        <Heading contractStore={walletStore} />
        <Route exact={true} path="/" component={() => (
          <Establishments store={walletStore} establishmentsStore={establishmentsStore} />
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
      </Container>
    </Router>
  );
}

ReactDOM.render(
  <CoinTable />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
