import './App.css';
import Layout from './components/Layout/Layout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Layout />
    </>
  );
}

export default App;
