export function formatDate(isoDateString:string) {
    const date = new Date(isoDateString); // Parse ISO 8601 date string
    const year = date.getFullYear(); // Get full year (yyyy)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (MM) and pad with zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Get day (dd) and pad with zero if needed
    return `${year}-${month}-${day}`; // Return formatted date yyyy-MM-dd
  }