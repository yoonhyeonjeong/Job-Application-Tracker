import { NextResponse } from "next/server";
import {
  createApplication,
  getApplications,
} from "@/services/applicationService";
import type { ApplicationCreatePayload } from "@/types/application";

export const dynamic = "force-dynamic";

export const GET = async (): Promise<NextResponse> => {
  const applications = await getApplications();
  return NextResponse.json(applications);
};

export const POST = async (request: Request): Promise<NextResponse> => {
  const payload = (await request.json()) as ApplicationCreatePayload;
  const application = await createApplication(payload);
  return NextResponse.json(application, { status: 201 });
};
