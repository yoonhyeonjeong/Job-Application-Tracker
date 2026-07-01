'use client';

import { Card, Col, Divider, Row, Space, Tag, Typography } from 'antd';
import type { ReactNode } from 'react';

const { Paragraph, Text, Title } = Typography;

const folderSections = [
  {
    title: 'app',
    description: 'Next.js App Router의 페이지, 레이아웃, API Route를 담당합니다.',
    items: [
      'layout.tsx: 전역 레이아웃과 AppLayout 적용',
      'page.tsx: 메인 대시보드',
      'applications: 지원 목록/상세 페이지',
      'calendar: 일정 페이지',
      'statistics: Recharts 기반 통계 페이지',
      'guide: 프로젝트/컴포넌트 가이드 페이지',
      'api: 현재 단계의 mock 백엔드'
    ]
  },
  {
    title: 'components',
    description: '화면을 구성하는 재사용 UI입니다. common, dashboard, applications, calendar, guide로 나눕니다.',
    items: [
      'common: AppLayout, PageHeader, StatusTag, EmptyState',
      'dashboard: SummaryCards, RecentApplicationsTable, StatisticsDashboardChart',
      'applications: ApplicationFilter, ApplicationTable, ApplicationFormModal',
      'calendar: ScheduleList, ScheduleCalendar',
      'guide: ComponentGuide, ProjectGuide'
    ]
  },
  {
    title: 'hooks',
    description: '클라이언트 상태와 화면용 데이터 접근 로직입니다.',
    items: [
      'useApplicationStore.ts: Zustand 전역 store',
      'useApplications.ts: 지원 목록 페이지용 store wrapper',
      'useApplicationFilters.ts: Select 옵션 생성',
      'useDashboard.ts: 대시보드 데이터 로딩'
    ]
  },
  {
    title: 'services',
    description: 'Axios 클라이언트, API 호출 함수, mock 백엔드 서비스를 둡니다.',
    items: [
      'apiClient.ts: Axios baseURL, timeout 설정',
      'applicationApi.ts: /api/applications 호출',
      'applicationService.ts: mock 지원 데이터 CRUD',
      'dashboardService.ts: 요약/통계 데이터 계산',
      'mock: 샘플 데이터'
    ]
  },
  {
    title: 'types',
    description: '프로젝트 전역 TypeScript 타입입니다.',
    items: ['application.ts', 'dashboard.ts', 'schedule.ts', 'common.ts']
  },
  {
    title: 'utils',
    description: '날짜, 상태, 라벨 포맷처럼 UI 표시용 순수 함수를 둡니다.',
    items: ['date.ts: 날짜 포맷', 'format.ts: 고용/근무 형태 라벨', 'status.ts: 상태 라벨/색상']
  },
  {
    title: 'styles',
    description: 'SCSS 전역 스타일과 변수입니다.',
    items: ['globals.scss: 레이아웃/공통 클래스', 'variables.scss: 전역 변수']
  }
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
  -> applicationService.ts
  -> services/mock/applications.mock.ts`
  },
  {
    title: '통계',
    code: `app/statistics/page.tsx
  -> getApplications()
  -> getStatusOverview()
  -> StatisticsCards
  -> StatisticsDashboardChart`
  },
  {
    title: '대시보드',
    code: `app/page.tsx
  -> useDashboard()
  -> dashboardService.ts
  -> SummaryCards / RecentApplicationsTable / UpcomingSchedules`
  }
];

export const ProjectGuide = (): ReactNode => {
  return (
    <div className="page-stack">
      <Card>
        <Title level={3}>프로젝트 가이드</Title>
        <Paragraph type="secondary">
          폴더별 역할, Zustand store 사용법, Axios API 흐름을 한 화면에서 확인합니다.
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

      <Card title="Zustand Store">
        <Paragraph>
          `useApplicationStore.ts`는 지원 목록, 필터, 로딩, 에러 상태를 관리합니다. 페이지에서는 필요한 상태만 selector로 꺼내 씁니다.
        </Paragraph>
        <pre className="guide-code">{`const applications = useApplicationStore((state) => state.filteredApplications());
const loading = useApplicationStore((state) => state.loading);
const loadApplications = useApplicationStore((state) => state.loadApplications);

useEffect(() => {
  void loadApplications();
}, [loadApplications]);`}</pre>
        <Divider />
        <Paragraph>새 지원 추가는 store action을 호출합니다.</Paragraph>
        <pre className="guide-code">{`const addApplication = useApplicationStore((state) => state.addApplication);

await addApplication({
  companyName: 'Example Company',
  position: 'Frontend Developer',
  status: 'applied',
  employmentType: 'fullTime',
  workType: 'hybrid'
});`}</pre>
      </Card>

      <Card title="Axios API">
        <Paragraph>
          클라이언트 API 호출은 `services/apiClient.ts`의 Axios 인스턴스를 통합니다. baseURL은 `/api`입니다.
        </Paragraph>
        <pre className="guide-code">{`export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
});`}</pre>
        <Divider />
        <Paragraph>`applicationApi.ts`는 지원 목록 API 호출만 담당합니다.</Paragraph>
        <pre className="guide-code">{`export const fetchApplications = async (): Promise<Application[]> => {
  const response = await apiClient.get<Application[]>('/applications');
  return response.data;
};`}</pre>
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

      <Card title="새 기능 추가 기준">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Title level={5}>새 페이지</Title>
            <pre className="guide-code compact">app/&lt;route&gt;/page.tsx</pre>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>새 UI 컴포넌트</Title>
            <pre className="guide-code compact">components/&lt;domain&gt;/&lt;ComponentName&gt;.tsx</pre>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>새 API 호출</Title>
            <pre className="guide-code compact">services/&lt;domain&gt;Api.ts</pre>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>새 전역 상태</Title>
            <pre className="guide-code compact">hooks/use&lt;Domain&gt;Store.ts</pre>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
