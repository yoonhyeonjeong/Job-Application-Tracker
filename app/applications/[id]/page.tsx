import ApplicationDetailContent from "@/components/applications/ApplicationDetailContent";
import { fetchDetailApplicationOnServer } from "@/services/applicationServerApi";
import { notFound } from "next/navigation";

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

const ApplicationDetailPage = async ({ params }: ApplicationDetailPageProps) => {
  const { id } = await params;
  const applicationId = Number(id);

  if (!Number.isInteger(applicationId) || applicationId <= 0) {
    notFound();
  }

  const application = await fetchDetailApplicationOnServer(applicationId);
  return <ApplicationDetailContent initialApplication={application} id={applicationId} />;
};

export default ApplicationDetailPage;
