import { useState, useEffect } from 'react';
import { calculateParkingDetails } from './parkingUtils';

/**
 * Custom hook to calculate parking cost in real-time:)
 * @param {object} savedLocation 
 * @param {number | string} hourlyRate 
 * @returns {{duration: string, total: number}}
 */
const useParkingCost = (savedLocation, hourlyRate) => {
  const [currentCost, setCurrentCost] = useState({ duration: '0h 0m', total: 0 });

  useEffect(() => {
    if (savedLocation && savedLocation.timestamp && hourlyRate > 0) {
      const calculate = () => {
        const { duration, total } = calculateParkingDetails(savedLocation.timestamp, new Date(), hourlyRate);
        setCurrentCost({ duration, total });
      };

      calculate(); 
      const intervalId = setInterval(calculate, 60000); 

      return () => clearInterval(intervalId); 
    } else {
      setCurrentCost({ duration: '0h 0m', total: 0 });
    }
  }, [savedLocation, hourlyRate]);

  return currentCost;
};

export default useParkingCost;
