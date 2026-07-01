import { NextResponse } from 'next/server';
import { getDashboardSummary } from '@/services/dashboardService';

export const dynamic = 'force-dynamic';

export const GET = async (): Promise<NextResponse> => {
  const summary = await getDashboardSummary();
  return NextResponse.json(summary);
};
