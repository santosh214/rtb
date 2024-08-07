import './App.css';
import Sidebar from './components/Layout/Sidebar';

function App() {



  return (
    <>
      <div className="app">
        <Sidebar />
        <main className="content">
          {/* <Topbar /> */}
          {/* <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/form" element={<Form />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/geography" element={<Geography />} />
          </Routes> */}
        </main>
      </div>
    </>
  );
}

export default App;
