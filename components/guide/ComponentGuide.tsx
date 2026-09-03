'use client';

import { ApiOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Row, Space, Tag, Typography } from 'antd';
import { useState, type ReactNode } from 'react';
import { ApplicationFilter } from '@/components/applications/ApplicationFilter';
import { ApplicationTable } from '@/components/applications/ApplicationTable';
import { StatusTag } from '@/components/common/StatusTag';
import { RecentApplicationsTable } from '@/components/dashboard/RecentApplicationsTable';
import { StatisticsDashboardChart } from '@/components/dashboard/StatisticsDashboardChart';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { UpcomingSchedules } from '@/components/dashboard/UpcomingSchedules';
import { useApplications } from '@/hooks/useApplications';
import useDashboard from '@/hooks/useDashboard';
import useSchedules from '@/hooks/useSchedules';
import type { ApplicationFilterParams, ApplicationStatus } from '@/types/application';

const statuses: ApplicationStatus[] = ['applied', 'documentPassed', 'interview', 'offer', 'rejected'];

export const ComponentGuide = (): ReactNode => {
  const [filters, setFilters] = useState<ApplicationFilterParams>({});
  const { applications, loading } = useApplications();
  const { scheduleData, scheduleLoading } = useSchedules();
  const { summaryData, dashboardData, dashboardLoading } = useDashboard();

  return (
    <div className="page-stack">
      <Card>
        <Typography.Title level={3}>컴포넌트 가이드</Typography.Title>
        <Typography.Paragraph type="secondary">
          실제 API 응답을 기준으로 주요 화면 컴포넌트를 확인합니다.
        </Typography.Paragraph>
        <Space wrap>
          <Tag icon={<DatabaseOutlined />} color="blue">
            Zustand: hooks/useApplicationStore.ts
          </Tag>
          <Tag icon={<ApiOutlined />} color="green">
            Axios: services/apiClient.ts
          </Tag>
        </Space>
      </Card>

      <GuideSection title="Common" description="여러 페이지에서 사용하는 공통 UI입니다.">
        <Space wrap>
          {statuses.map((status) => (
            <StatusTag key={status} status={status} />
          ))}
        </Space>
      </GuideSection>

      <GuideSection
        title="Dashboard"
        description="대시보드 요약 카드, 최근 지원, 다가오는 일정 컴포넌트입니다."
      >
        <SummaryCards summary={summaryData} loading={dashboardLoading} />
        <Row gutter={[16, 16]}>
          <Col xs={24} xl={16}>
            <RecentApplicationsTable applications={applications.slice(0, 4)} loading={loading} />
          </Col>
          <Col xs={24} xl={8}>
            <UpcomingSchedules schedules={scheduleData} loading={scheduleLoading} />
          </Col>
        </Row>
      </GuideSection>

      <GuideSection title="Applications" description="지원 목록 화면의 필터와 테이블입니다.">
        <Card>
          <ApplicationFilter filters={filters} onChange={setFilters} />
        </Card>
        <Card>
          <ApplicationTable applications={applications} loading={loading} />
        </Card>
      </GuideSection>

      <GuideSection title="Statistics" description="상태별 지원 분포를 보여주는 차트입니다.">
        <StatisticsDashboardChart items={dashboardData?.statusCounts ?? []} />
      </GuideSection>
    </div>
  );
};

interface GuideSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

const GuideSection = ({ title, description, children }: GuideSectionProps): ReactNode => {
  return (
    <Card>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Paragraph type="secondary">{description}</Typography.Paragraph>
      <Divider />
      <Space direction="vertical" size="middle" className="full-width">
        {children}
      </Space>
    </Card>
  );
};
