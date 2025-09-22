import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { LayoutDashboard, Box, Video } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 border-r bg-background h-screen fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </h2>
        <nav>
          <ul className="space-y-1">
            <li>
              <Button
                asChild
                variant={location.pathname === '/items' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <Link to="/items" className="flex items-center gap-2">
                  <Box className="h-4 w-4" />
                  Items
              </Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant={location.pathname === '/videos' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <Link to="/videos" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Videos
              </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;