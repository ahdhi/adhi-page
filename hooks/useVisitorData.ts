import { useState, useEffect } from 'react';
import type { VisitorData } from '../types';

export const useVisitorData = () => {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        // Try multiple CORS-friendly APIs for visitor data
        let response;
        try {
          // First try: ipapi.co with CORS headers
          response = await fetch('https://ipapi.co/json/', {
            headers: {
              'Accept': 'application/json',
            },
          });
        } catch (corsError) {
          // Fallback: Use a different API that supports CORS
          try {
            response = await fetch('https://api.ipify.org?format=json');
            if (response.ok) {
              const ipData = await response.json();
              // Set minimal data for development
              setData({
                ip: ipData.ip,
                city: 'Development',
                region: 'Local',
                country_name: 'Development Environment',
                country_code: 'DEV',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              });
              return;
            }
          } catch (fallbackError) {
            // Ultimate fallback: use browser info
            setData({
              ip: 'localhost',
              city: 'Development',
              region: 'Local', 
              country_name: 'Development Environment',
              country_code: 'DEV',
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            return;
          }
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch visitor data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Graceful fallback for any remaining errors
        setData({
          ip: 'localhost',
          city: 'Development',
          region: 'Local',
          country_name: 'Development Environment', 
          country_code: 'DEV',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
        console.warn('Visitor data API unavailable, using fallback data');
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorData();
  }, []);

  return { data, loading, error };
};
