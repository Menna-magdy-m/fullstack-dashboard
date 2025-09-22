import React from 'react';
import { Button } from './ui/button';
import { useTheme } from './theme-provider';
import { MoonIcon, SunIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-b bg-background">
      <div className="text-xl font-semibold">Dashboard</div>
      <Button variant="outline" onClick={toggleTheme}>
        {theme === 'dark' ? (<SunIcon className="h-4 w-4" />) : (<MoonIcon className="h-4 w-4" />)}
      </Button>
    </nav>
  );
};

export default Navbar;
