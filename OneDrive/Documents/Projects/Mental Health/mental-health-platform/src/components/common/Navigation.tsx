import { NavLink } from 'react-router-dom';
import { Heart, Phone, FileText, Users, BookOpen, TrendingUp, HelpCircle, User } from 'lucide-react';

interface NavigationProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function Navigation({ mobile, onNavigate }: NavigationProps) {
  const navItems = [
    { path: '/', label: 'Home', icon: Heart },
    { path: '/crisis-support', label: 'Crisis Support', icon: Phone },
    { path: '/assessment', label: 'Assessment', icon: FileText },
    { path: '/professionals', label: 'Find Help', icon: Users },
    { path: '/education', label: 'Learn', icon: BookOpen },
    { path: '/mood-tracker', label: 'Track Mood', icon: TrendingUp },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/resources', label: 'Resources', icon: HelpCircle },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const linkClasses = (isActive: boolean) =>
    `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-100 text-blue-700'
        : mobile
        ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        : 'text-gray-500 hover:text-gray-700'
    }`;

  return (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => linkClasses(isActive)}
            onClick={onNavigate}
            end={item.path === '/'}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </>
  );
}