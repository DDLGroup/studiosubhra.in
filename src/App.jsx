import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';

import Home from './pages/Home';
import Collections from './pages/Collections';
import ReadyToWear from './pages/ReadyToWear';
import About from './pages/About';
import Lookbook from './pages/Lookbook';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/collections"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Collections />
              </motion.div>
            }
          />
          <Route
            path="/ready-to-wear"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <ReadyToWear />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <About />
              </motion.div>
            }
          />
          <Route
            path="/lookbook"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Lookbook />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Contact />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <NotFound />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
