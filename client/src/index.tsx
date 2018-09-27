import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import WalletStore from './store/ContractStore';

const CoinTable = () => {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>

        <hr />

        <Route exact={true} path="/" component={() => (
          <div>
            <App store={new WalletStore()} />
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
