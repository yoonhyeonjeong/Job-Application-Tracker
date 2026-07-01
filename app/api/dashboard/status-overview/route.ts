import { NextResponse } from 'next/server';
import { getStatusOverview } from '@/services/dashboardService';

export const dynamic = 'force-dynamic';

export const GET = async (): Promise<NextResponse> => {
  const statusOverview = await getStatusOverview();
  return NextResponse.json(statusOverview);
};
