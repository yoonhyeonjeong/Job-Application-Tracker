import { NextResponse } from 'next/server';
import { getRecentApplications } from '@/services/dashboardService';

export const dynamic = 'force-dynamic';

export const GET = async (): Promise<NextResponse> => {
  const applications = await getRecentApplications();
  return NextResponse.json(applications);
};
