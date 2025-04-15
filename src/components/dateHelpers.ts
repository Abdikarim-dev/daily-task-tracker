import {
  format,
  formatDistanceToNow,
  isThisMonth,
  isThisWeek,
  isToday,
  isYesterday,
} from "date-fns";

// Format Date
export const formatDate = (date: Date): string => format(date, "do MMM yyyy");
// TimeAgo
export const timeAgo = (date: Date): string =>
  formatDistanceToNow(date, { addSuffix: true });
// Is Today
export const isTodayTask = (date: Date): boolean => isToday(date);
// Is Yesterday
export const isYesterdayTask = (date: Date) => isYesterday(date);
// Is This Week
export const isThisWeekTask = (date: Date): boolean => isThisWeek(date);

// Is This Month
export const isThisMonthTask = (date: Date): boolean => isThisMonth(date);
