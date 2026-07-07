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
import { applicationsMock } from '@/services/mock/applications.mock';
import { schedulesMock } from '@/services/mock/schedules.mock';
import type { ApplicationFilterParams, ApplicationStatus } from '@/types/application';
import type { DashboardSummary, StatusOverviewItem } from '@/types/dashboard';

const summary: DashboardSummary = {
  totalCount: applicationsMock.length,
  activeCount: applicationsMock.filter((application) => application.status !== 'rejected').length,
  interviewCount: schedulesMock.filter((schedule) => schedule.type === 'interview').length,
  waitingCount: applicationsMock.filter((application) => application.status === 'applied').length
};

const statusOverview: StatusOverviewItem[] = applicationsMock.reduce<StatusOverviewItem[]>((items, application) => {
  const item = items.find((current) => current.status === application.status);

  if (item) {
    return items.map((current) =>
      current.status === application.status ? { ...current, count: current.count + 1 } : current
    );
  }

  return [...items, { status: application.status, count: 1 }];
}, []);

const statuses: ApplicationStatus[] = ['applied', 'documentPassed', 'interview', 'offer', 'rejected'];

export const ComponentGuide = (): ReactNode => {
  const [filters, setFilters] = useState<ApplicationFilterParams>({});

  return (
    <div className="page-stack">
      <Card>
        <Typography.Title level={3}>컴포넌트 가이드</Typography.Title>
        <Typography.Paragraph type="secondary">
          화면을 구성하는 주요 컴포넌트와 데이터 흐름을 한 페이지에서 확인합니다.
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

      <GuideSection
        title="Common"
        description="여러 페이지에서 재사용하는 기본 UI입니다. 상태 라벨, 페이지 헤더, 빈 상태 같은 작은 단위부터 시작합니다."
      >
        <Space wrap>
          {statuses.map((status) => (
            <StatusTag key={status} status={status} />
          ))}
        </Space>
      </GuideSection>

      <GuideSection title="Dashboard" description="대시보드 첫 화면을 구성하는 요약 카드, 최근 지원, 일정 컴포넌트입니다.">
        <SummaryCards summary={summary} loading={false} />
        <Row gutter={[16, 16]}>
          <Col xs={24} xl={16}>
            <RecentApplicationsTable applications={applicationsMock.slice(0, 4)} loading={false} />
          </Col>
          <Col xs={24} xl={8}>
            <UpcomingSchedules schedules={schedulesMock} loading={false} />
          </Col>
        </Row>
      </GuideSection>

      <GuideSection title="Applications" description="지원 목록 화면의 필터와 테이블입니다. 현재는 mock 데이터로 형태만 보여줍니다.">
        <Card>
          <ApplicationFilter filters={filters} onChange={setFilters} />
        </Card>
        <Card>
          <ApplicationTable applications={applicationsMock} loading={false} />
        </Card>
      </GuideSection>

      <GuideSection title="Statistics" description="Recharts를 사용하는 통계 차트입니다. 상태별 분포와 지원 수를 함께 보여줍니다.">
        <StatisticsDashboardChart items={statusOverview} />
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
