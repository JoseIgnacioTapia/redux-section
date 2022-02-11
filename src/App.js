import { Provider } from 'react-redux';
import CrudApi from './components/CrudApi';
import Contador from './components/Contador';
import ShoppingCart from './components/ShoppingCart';
import TeoriaRedux from './components/TeoriaRedux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div style={{ textAlign: 'center' }}>
        <h1>Redux</h1>
        <CrudApi />
        <hr />
        <ShoppingCart />
        <Contador />
        <hr />
        <TeoriaRedux />
      </div>
    </Provider>
  );
}

export default App;
