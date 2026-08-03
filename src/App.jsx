import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ScrollToTop from './components/layout/ScrollToTop';
import Layout from './components/layout/Layout';

import Home from './components/pages/Home/Home';
import Events from './components/pages/Events/Events';
import EventDetails from './components/pages/EventDetails/EventDetails';
import Categories from './components/pages/Categories/Categories';
import BookEvent from './components/pages/BookEvent/BookEvents';
import MyBookings from './components/pages/MyBookings/MyBookings';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import FAQ from './components/pages/FAQ/FAQ';
import NotFound from './components/pages/NotFound/NotFound';

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