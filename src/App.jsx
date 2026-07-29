import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Home() {
  return <h1>Home Page</h1>;
}

function Events() {
  return <h1>Events Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;