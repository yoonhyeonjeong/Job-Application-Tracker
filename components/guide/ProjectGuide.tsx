'use client';

import { Card, Col, Divider, Row, Space, Tag, Typography } from 'antd';
import type { ReactNode } from 'react';

const { Paragraph, Text, Title } = Typography;

const folderSections = [
  {
    title: 'app',
    description: 'Next.js App Router 페이지와 레이아웃을 둡니다.',
    items: [
      'layout.tsx: 전체 레이아웃과 AppLayout 적용',
      'page.tsx: 메인 대시보드',
      'applications: 지원 목록, 등록, 상세 페이지',
      'calendar: 일정 페이지',
      'statistics: 통계 페이지',
      'guide: 프로젝트/컴포넌트 가이드 페이지',
    ],
  },
  {
    title: 'components',
    description: '화면을 구성하는 재사용 UI입니다.',
    items: [
      'common: AppLayout, PageHeader, StatusTag, EmptyState',
      'dashboard: SummaryCards, RecentApplicationsTable, 차트/요약 컴포넌트',
      'applications: ApplicationFilter, ApplicationTable, 상세/일정 모달',
      'calendar: ScheduleCalendar',
      'guide: ComponentGuide, ProjectGuide',
    ],
  },
  {
    title: 'hooks',
    description: '화면 상태와 API 호출 흐름을 감싼 클라이언트 훅입니다.',
    items: [
      'useApplicationStore.ts: Zustand 전역 store',
      'useApplications.ts: 지원 목록 필터링 wrapper',
      'useSchedules.ts: 일정 데이터 로딩',
      'useDashboard.ts: 대시보드 데이터 로딩',
    ],
  },
  {
    title: 'services',
    description: '실제 백엔드 API를 호출하는 클라이언트 함수입니다.',
    items: [
      'apiClient.ts: Axios baseURL, timeout 설정',
      'applicationApi.ts: 지원 API 호출',
      'scheduleApi.ts: 일정 API 호출',
      'dashboardApi.ts: 대시보드 API 호출',
      'statisticsApi.ts: 통계 API 호출',
    ],
  },
  {
    title: 'types',
    description: '프로젝트 전역 TypeScript 타입입니다.',
    items: ['application.ts', 'dashboard.ts', 'schedule.ts', 'statistics.ts', 'common.ts'],
  },
  {
    title: 'utils',
    description: '날짜, 상태, 라벨 포맷 유틸입니다.',
    items: ['date.ts', 'format.ts', 'status.ts', 'schedules.ts'],
  },
];

const flowItems = [
  {
    title: '지원 목록',
    code: `app/applications/page.tsx
  -> useApplications()
  -> useApplicationStore
  -> applicationApi.ts
  -> apiClient.ts
  -> /api/applications
  -> backend server`,
  },
  {
    title: '대시보드',
    code: `app/page.tsx
  -> useDashboard()
  -> dashboardApi.ts
  -> apiClient.ts
  -> /api/dashboard
  -> backend server`,
  },
  {
    title: '일정',
    code: `app/calendar/page.tsx
  -> useCalendar()
  -> scheduleApi.ts
  -> apiClient.ts
  -> /api/schedules
  -> backend server`,
  },
];

export const ProjectGuide = (): ReactNode => {
  return (
    <div className="page-stack">
      <Card>
        <Title level={3}>프로젝트 가이드</Title>
        <Paragraph type="secondary">
          현재 프론트엔드는 Axios로 실제 백엔드 API를 호출합니다.
        </Paragraph>
        <Space wrap>
          <Tag color="blue">Next.js App Router</Tag>
          <Tag color="green">Zustand</Tag>
          <Tag color="purple">Axios</Tag>
          <Tag color="gold">Ant Design</Tag>
          <Tag color="cyan">Recharts</Tag>
        </Space>
      </Card>

      <Card title="폴더 구조">
        <Row gutter={[16, 16]}>
          {folderSections.map((section) => (
            <Col xs={24} lg={12} key={section.title}>
              <div className="guide-folder-card">
                <Title level={4}>{section.title}</Title>
                <Paragraph type="secondary">{section.description}</Paragraph>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>
                      <Text>{item}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      <Card title="Axios API">
        <Paragraph>
          클라이언트 API 호출은 <Text code>services/apiClient.ts</Text>의 Axios 인스턴스를 통합니다.
          <Text code>next.config.ts</Text>의 rewrite가 <Text code>/api</Text> 요청을 백엔드 서버로 전달합니다.
        </Paragraph>
        <pre className="guide-code">{`export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
});`}</pre>
      </Card>

      <Card title="데이터 흐름">
        <Row gutter={[16, 16]}>
          {flowItems.map((item) => (
            <Col xs={24} lg={8} key={item.title}>
              <Card size="small" title={item.title}>
                <pre className="guide-code compact">{item.code}</pre>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Card title="추가 기준">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Title level={5}>페이지</Title>
            <pre className="guide-code compact">app/&lt;route&gt;/page.tsx</pre>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>UI 컴포넌트</Title>
            <pre className="guide-code compact">components/&lt;domain&gt;/&lt;ComponentName&gt;.tsx</pre>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>API 호출</Title>
            <pre className="guide-code compact">services/&lt;domain&gt;Api.ts</pre>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>전역 상태</Title>
            <pre className="guide-code compact">hooks/use&lt;Domain&gt;Store.ts</pre>
          </Col>
        </Row>
        <Divider />
        <Paragraph type="secondary">
          프론트 샘플 API와 샘플 데이터 파일은 제거되어, 데이터는 백엔드 API 응답을 기준으로 표시됩니다.
        </Paragraph>
      </Card>
    </div>
  );
};
