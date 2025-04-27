
import { format, subDays, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';

/**
 * Generates date range based on period selection
 */
export const getDateRangeByPeriod = (period: 'today' | '7days' | '30days' | 'all') => {
  try {
    const today = new Date();
    const last7Days = subDays(today, 7);
    const last30Days = subDays(today, 30);
    
    // Format dates for Supabase queries
    const todayStart = startOfDay(today).toISOString();
    const todayEnd = endOfDay(today).toISOString();
    const last7DaysStart = startOfDay(last7Days).toISOString();
    const last30DaysStart = startOfDay(last30Days).toISOString();
    const monthStart = startOfMonth(today).toISOString();
    const monthEnd = endOfMonth(today).toISOString();

    return {
      today: { start: todayStart, end: todayEnd },
      last7Days: { start: last7DaysStart, end: todayEnd },
      last30Days: { start: last30DaysStart, end: todayEnd },
      month: { start: monthStart, end: monthEnd },
      all: { start: null, end: null }
    };
  } catch (error) {
    console.error("Error in getDateRangeByPeriod:", error);
    // Return fallback values
    const now = new Date().toISOString();
    return {
      today: { start: now, end: now },
      last7Days: { start: now, end: now },
      last30Days: { start: now, end: now },
      month: { start: now, end: now },
      all: { start: null, end: null }
    };
  }
};

/**
 * Creates date data points for charts
 */
export const createDateDataPoints = (days: number) => {
  try {
    const today = new Date();
    const dataPoints: Record<string, { count: number; revenue: number }> = {};
    
    for (let i = 0; i < days; i++) {
      const date = subDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      dataPoints[dateStr] = { count: 0, revenue: 0 };
    }
    
    return dataPoints;
  } catch (error) {
    console.error("Error in createDateDataPoints:", error);
    return {};
  }
};
