import Countdown from '@/components/Countdown';
import { useEffect, useState } from 'react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleDarkMode = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') as 'light' | 'dark';
    setTheme(localTheme ?? 'light');
  }, []);

  return (
    <>
      <header>
        <a href="https://github.com/thisisrexa/eye-guardian" target="_blank" title='GitHub repo'>
          <h1 className="logotype">Eye Guardian</h1>
        </a>
        <button className="toggle-button" onClick={handleDarkMode}>
          {theme === 'dark' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9"
              />
            </svg>
          )}
        </button>
      </header>
      <div className="container">
        <Countdown initialTime={20 * 60} restTime={20} />
      </div>
    </>
  );
}
