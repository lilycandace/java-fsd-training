import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./styles/app.css";
import "./styles/forms.css";
import "./styles/tables.css";
import "./styles/dashboard.css";
import "./styles/navbar.css";
import "./styles/login.css";
import "./styles/homestyle.css"
import { toast } from "react-toastify";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

    <App/>

</Provider>
  </StrictMode>,
)
