import type { ReactNode } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { ProjectGuide } from '@/components/guide/ProjectGuide';

const GuidePage = (): ReactNode => {
  return (
    <div className="page-stack">
      <PageHeader title="프로젝트 가이드" description="폴더 구조, 상태관리, API 흐름을 확인합니다." />
      <ProjectGuide />
    </div>
  );
};

export default GuidePage;
