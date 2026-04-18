/**
 * Calculates parking duration and cost.
 * @param {string | Date} startTime 
 * @param {string | Date} endTime 
 * @param {number | string} hourly
 * @returns {{duration: string, total: number}}
 */
export const calculateParkingDetails = (startTime, endTime, hourlyRate) => {
  if (!startTime || !endTime || !hourlyRate || parseFloat(hourlyRate) <= 0) {
    return { duration: '0h 0m', total: 0 };
  }

  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end.getTime() - start.getTime();
  const diffHrs = diffMs / (1000 * 60 * 60);
  const total = diffHrs * parseFloat(hourlyRate);
  const hours = Math.floor(diffHrs);
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const duration = `${hours}h ${minutes}m`;

  return { duration, total };
};
