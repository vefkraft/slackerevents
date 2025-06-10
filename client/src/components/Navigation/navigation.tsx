import { fallDown as Menu } from 'react-burger-menu';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navigation.styled.css';
import Logo from '../../assets/Logo.png'

const navLinks = [
  { to: '/', text: 'HOME' },
  { to: '/events', text: 'EVENTS' },
  { to: '/gallery', text: 'GALLERY' },
  { to: '/contact', text: 'CONTACT US' },
  { to: '/favorites', text: 'FAVORITES' },
  { to: '/my-tickets', text: 'MY TICKETS' },
  { to: '/settings', text: 'SETTINGS' },
];

const Navigation: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = 'hidden';
      document.body.dataset.scrollY = String(scrollY);
    } else {
      const scrollY = document.body.dataset.scrollY || '0';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY, 10));
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <Link to="/">
        <img className='Logo' src={Logo} alt="Logo" />
      </Link>
      {isMobile && (
        <Menu className='position-absolute'
          isOpen={menuOpen}
          onStateChange={(state: { isOpen: boolean }) => setMenuOpen(state.isOpen)}
          right
          burgerButtonClassName={menuOpen ? "bm-burger-button open" : "bm-burger-button"}
        >
          {navLinks.map(({ to, text }) => (
            <Link
              key={to}
              to={to}
              className="text-white text-2xl font-bold hover:text-pink-400 transition-all duration-200 py-4 text-center"
              onClick={() => setMenuOpen(false)}
            >
              {text}
            </Link>
          ))}
        </Menu>
      )}
    </nav>
  );
};

export default Navigation;
