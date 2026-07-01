import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { ApplicationDetail } from '@/components/applications/ApplicationDetail';
import { PageHeader } from '@/components/common/PageHeader';
import { getApplicationById } from '@/services/applicationService';

interface ApplicationDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ApplicationDetailPage = async ({ params }: ApplicationDetailPageProps): Promise<ReactNode> => {
  const { id } = await params;
  const application = await getApplicationById(id);

  if (!application) {
    notFound();
  }

  return (
    <div className="page-stack">
      <PageHeader title="지원 상세" description="지원 정보와 다음 액션을 확인합니다." />
      <ApplicationDetail application={application} />
    </div>
  );
};

export default ApplicationDetailPage;
