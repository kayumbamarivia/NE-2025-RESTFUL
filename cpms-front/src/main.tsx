import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../../styles/index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <App />
  );
} else {
  throw new Error("Root element with id 'root' not found");
}
