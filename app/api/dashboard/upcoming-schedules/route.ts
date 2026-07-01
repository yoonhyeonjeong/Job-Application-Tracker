import { NextResponse } from 'next/server';
import { getUpcomingSchedules } from '@/services/dashboardService';

export const dynamic = 'force-dynamic';

export const GET = async (): Promise<NextResponse> => {
  const schedules = await getUpcomingSchedules();
  return NextResponse.json(schedules);
};
