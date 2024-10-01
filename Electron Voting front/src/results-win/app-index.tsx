import { createRoot } from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import { store } from '../shared/store';

const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={store}><App /></Provider>);