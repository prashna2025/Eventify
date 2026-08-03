import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ScrollToTop from './components/layout/ScrollToTop';
import Layout from './components/layout/Layout';

import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import EventDetails from './pages/EventDetails/EventDetails';
import Categories from './pages/Categories/Categories';
import BookEvent from './pages/BookEvent/BookEvent';
import MyBookings from './pages/MyBookings/MyBookings';
import About from './pages/About/About'; // (Assume created)
import Contact from './pages/Contact/Contact'; // (Assume created)
import FAQ from './pages/FAQ/FAQ'; // (Assume created)
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="events" element={<Events />} />
              <Route path="events/:id" element={<EventDetails />} />
              <Route path="categories" element={<Categories />} />
              <Route path="book/:id" element={<BookEvent />} />
              <Route path="my-bookings" element={<MyBookings />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;