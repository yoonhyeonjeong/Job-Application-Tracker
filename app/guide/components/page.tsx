import type { ReactNode } from 'react';
import { ComponentGuide } from '@/components/guide/ComponentGuide';
import { PageHeader } from '@/components/common/PageHeader';

const GuideComponentsPage = (): ReactNode => {
  return (
    <div className="page-stack">
      <PageHeader title="컴포넌트" description="프로젝트 UI 구성 요소와 데이터 흐름을 확인합니다." />
      <ComponentGuide />
    </div>
  );
};

export default GuideComponentsPage;
