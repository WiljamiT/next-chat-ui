/**
 * Formats a number to ensure it has at least two digits
 * @param n Number to format
 * @returns String with at least two digits
 */
export const padToTwoDigits = (n: number): string => {
  return n.toString().padStart(2, '0');
};

/**
 * Formats hours to 12-hour format with AM/PM
 * @param hours Hours in 24-hour format
 * @returns Object containing formatted hours and period
 */
export const formatHours = (
  hours: number
): { hours: string; period: string } => {
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return {
    hours: formattedHours.toString(),
    period,
  };
};

/**
 * Formats a date to display time in HH:MM AM/PM format
 * @param date Date to format
 * @returns Formatted time string
 */
export const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const { hours: formattedHours, period } = formatHours(hours);

  return `${formattedHours}:${padToTwoDigits(minutes)} ${period}`;
};

/**
 * Formats a date to display time with optional date if not today
 * @param date Date to format
 * @param options Configuration options
 * @returns Formatted date/time string
 */
export const formatTimestamp = (
  date: Date,
  options: {
    showDate?: boolean;
    showSeconds?: boolean;
  } = {}
): string => {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (!isToday && options.showDate) {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      ...(options.showSeconds && { second: '2-digit' }),
    });
  }

  return formatTime(date);
};
