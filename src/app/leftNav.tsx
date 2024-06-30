import {
  FaHome,
  FaTable,
  FaDoorOpen,
  FaCogs,
  FaChartBar,
} from 'react-icons/fa';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { icon: <FaHome size={24} />, label: 'Home' },
  { icon: <FaTable size={24} />, label: 'Tables' },
  { icon: <FaDoorOpen size={24} />, label: 'Rooms' },
  { icon: <FaCogs size={24} />, label: 'Settings' },
  { icon: <FaChartBar size={24} />, label: 'Statistics' },
];

const Navigation = () => (
  <ul>
    {navItems.map((item, index) => (
      <li key={index} className="mb-4 flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                {item.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent className="tooltip-content">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    ))}
  </ul>
);

export default Navigation;
