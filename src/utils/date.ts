export function getCurrentMonthAndYear(): { month: string; year: number } {
  const currentDate = new Date();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero-indexed, add 1 and pad with zero if needed
  const year = currentDate.getFullYear();
  return { month, year };
}

// Make sure to export all functions that are intended to be used elsewhere
export default {
  getCurrentMonthAndYear,
};
