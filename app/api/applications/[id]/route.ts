import { NextResponse } from 'next/server';
import { deleteApplication, getApplicationById, updateApplication } from '@/services/applicationService';
import type { ApplicationUpdatePayload } from '@/types/application';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export const GET = async (_request: Request, context: RouteContext): Promise<NextResponse> => {
  const { id } = await context.params;
  const application = await getApplicationById(id);

  if (!application) {
    return NextResponse.json({ message: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json(application);
};

export const PATCH = async (request: Request, context: RouteContext): Promise<NextResponse> => {
  const { id } = await context.params;
  const payload = (await request.json()) as ApplicationUpdatePayload;
  const application = await updateApplication(id, payload);

  if (!application) {
    return NextResponse.json({ message: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json(application);
};

export const DELETE = async (_request: Request, context: RouteContext): Promise<NextResponse> => {
  const { id } = await context.params;
  const deleted = await deleteApplication(id);

  if (!deleted) {
    return NextResponse.json({ message: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json({ deleted });
};
