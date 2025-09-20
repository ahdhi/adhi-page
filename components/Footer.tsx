import React from 'react';
import { useVisitorData } from '../hooks/useVisitorData';
import { MapPin, Globe, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const { data, loading, error } = useVisitorData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800/50 p-4 rounded-lg mb-6 border border-gray-700/50">
          <h4 className="text-center text-sm font-semibold text-gray-400 mb-3">Visitor Information</h4>
          {loading && <p className="text-center text-xs text-gray-500">Fetching location data...</p>}
          {error && <p className="text-center text-xs text-red-400">Could not load visitor data.</p>}
          {data && (
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-gray-400">
              <div className="flex items-center">
                <MapPin size={14} className="mr-1.5 text-blue-400" />
                {data.city}, {data.region}, {data.country_name}
                {data.country_code && (
                  <img 
                    src={`https://flagcdn.com/w20/${data.country_code.toLowerCase()}.png`} 
                    alt={`${data.country_name} flag`}
                    className="w-4 h-auto ml-2 rounded-sm"
                  />
                )}
              </div>
              <div className="flex items-center">
                <Globe size={14} className="mr-1.5 text-blue-400" />
                IPv4: {data.ip}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1.5 text-blue-400" />
                {data.timezone}
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-sm text-gray-500">
          &copy; {currentYear} Adhithyan Ajith. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
