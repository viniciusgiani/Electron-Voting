import { createRoot } from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './shared/store';
import RootComponent from './components/RootComponent';

const root = createRoot(document.body);
/** Changed after the tutorial */
root.render(<Provider store={store}><RootComponent /></Provider>);