import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './hooks/useTheme';
import { useLanyard } from './hooks/useLanyard';
import { useAppStore } from './store';


import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CTAButtons from './components/CTAButtons';
import ScrollToTop from './components/ScrollToTop';
import Greeting from './components/Greeting';


import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Feedbacks from './components/sections/Feedbacks';
import Contact from './components/sections/Contact';

const MainPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <Greeting />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Feedbacks />
        <Contact />
      </main>
      <Footer />
      <CTAButtons />
      <ScrollToTop />
    </>
  );
};

function App() {
  const { effectiveTheme } = useTheme();
  const { discordUser, spotifyData } = useLanyard();
  const setDiscordUser = useAppStore((state) => state.setDiscordUser);
  const setSpotifyData = useAppStore((state) => state.setSpotifyData);

  // Update global state with Discord user data
  useEffect(() => {
    if (discordUser) {
      setDiscordUser(discordUser);
    }
  }, [discordUser, setDiscordUser]);

  // Update global state with Spotify data
  useEffect(() => {
    if (spotifyData) {
      setSpotifyData(spotifyData);
    }
  }, [spotifyData, setSpotifyData]);

  // Set theme class on the document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark');
  }, [effectiveTheme]);

  return (
    <div className="min-h-screen text-gray-900 transition-colors duration-300 bg-white dark:bg-slate-900 dark:text-white">
      {/* Custom Cursor (only on non-touch devices) */}
      <div className="hidden md:block">
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        theme={effectiveTheme === 'dark' ? 'dark' : 'light'}
        autoClose={4000}
      />
    </div>
  );
}

export default App;