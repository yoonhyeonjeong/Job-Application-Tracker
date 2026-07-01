# Job Application Tracker Guide

이 문서는 프로젝트 폴더별 역할, 데이터 흐름, Zustand store 사용법, Axios API 구조를 빠르게 파악하기 위한 가이드입니다.

## 전체 구조

```txt
app/
components/
hooks/
services/
types/
utils/
styles/
```

이 프로젝트는 Next.js App Router 기반입니다. `app`은 라우팅과 API Route를 담당하고, 실제 UI 조각은 `components`에 둡니다. 상태와 데이터 호출은 `hooks`와 `services`로 분리합니다.

## app

`app` 폴더는 페이지 라우트와 백엔드 역할을 하는 API Route를 담습니다.

주요 파일:

- `app/layout.tsx`: 전체 HTML 레이아웃과 `AppLayout` 적용
- `app/page.tsx`: 메인 대시보드
- `app/applications/page.tsx`: 지원 목록 관리 화면
- `app/applications/[id]/page.tsx`: 지원 상세 화면
- `app/calendar/page.tsx`: 일정 화면
- `app/statistics/page.tsx`: Recharts 기반 통계 화면
- `app/components/page.tsx`: 컴포넌트 가이드 화면
- `app/api/*`: Mock 백엔드 API

API Route는 현재 단계의 백엔드입니다.

```txt
app/api/applications/route.ts
app/api/applications/[id]/route.ts
app/api/dashboard/summary/route.ts
app/api/dashboard/recent-applications/route.ts
app/api/dashboard/upcoming-schedules/route.ts
app/api/dashboard/status-overview/route.ts
```

## components

`components`는 화면에서 재사용하는 UI 컴포넌트를 도메인별로 나눕니다.

```txt
components/
  common/
  dashboard/
  applications/
  calendar/
  guide/
```

### common

공통 UI입니다.

- `AppLayout.tsx`: 사이드바, 헤더, 콘텐츠 레이아웃
- `PageHeader.tsx`: 페이지 제목/설명/액션 버튼 영역
- `StatusTag.tsx`: 지원 상태를 Ant Design `Tag`로 표시
- `EmptyState.tsx`: 빈 데이터 상태 표시

### dashboard

대시보드와 통계에 쓰는 컴포넌트입니다.

- `SummaryCards.tsx`: 전체 지원, 진행 중, 면접 예정, 응답 대기 카드
- `RecentApplicationsTable.tsx`: 최근 지원 테이블
- `UpcomingSchedules.tsx`: 다가오는 일정 목록
- `StatusOverview.tsx`: 상태별 진행률 요약
- `StatisticsCards.tsx`: 면접 전환율, 오퍼율, 불합격률 카드
- `StatisticsDashboardChart.tsx`: Recharts 기반 파이 차트와 막대 차트

### applications

지원 관리 화면에서 쓰는 컴포넌트입니다.

- `ApplicationFilter.tsx`: 검색, 상태, 고용 형태, 근무 형태 필터
- `ApplicationTable.tsx`: 지원 목록 테이블
- `ApplicationFormModal.tsx`: 지원 추가 모달
- `ApplicationDetail.tsx`: 지원 상세 정보 카드

### calendar

일정 화면 관련 컴포넌트입니다.

- `ScheduleList.tsx`: 일정 목록
- `ScheduleCalendar.tsx`: Ant Design Calendar 기반 컴포넌트
- `CalendarPageClient.tsx`: Calendar를 클라이언트에서 렌더링하기 위한 래퍼

### guide

프로젝트 파악용 화면입니다.

- `ComponentGuide.tsx`: 주요 컴포넌트를 샘플 데이터로 한 페이지에 렌더링

브라우저에서 확인:

```txt
http://127.0.0.1:3000/components
```

## hooks

`hooks`는 화면에서 사용하는 상태 접근 로직을 담습니다.

```txt
hooks/
  useApplicationStore.ts
  useApplications.ts
  useApplicationFilters.ts
  useDashboard.ts
```

### useApplicationStore.ts

Zustand 전역 store입니다. 지원 목록, 필터, 로딩, 에러 상태를 관리합니다.

관리하는 상태:

```ts
applications: Application[];
filters: ApplicationFilterParams;
loading: boolean;
error?: string;
```

제공하는 액션:

```ts
filteredApplications()
setFilters(filters)
loadApplications()
addApplication(payload)
```

사용 예시:

```tsx
'use client';

import { useEffect } from 'react';
import { useApplicationStore } from '@/hooks/useApplicationStore';

export const Example = () => {
  const applications = useApplicationStore((state) => state.filteredApplications());
  const loading = useApplicationStore((state) => state.loading);
  const loadApplications = useApplicationStore((state) => state.loadApplications);

  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  return <div>{loading ? 'Loading...' : applications.length}</div>;
};
```

새 지원 추가 예시:

```ts
const addApplication = useApplicationStore((state) => state.addApplication);

await addApplication({
  companyName: 'Example Company',
  position: 'Frontend Developer',
  status: 'applied',
  employmentType: 'fullTime',
  workType: 'hybrid'
});
```

### useApplications.ts

지원 관리 페이지에서 쓰기 편하게 Zustand store를 감싼 hook입니다.

반환값:

```ts
applications
loading
filters
setFilters
refresh
```

`app/applications/page.tsx`는 이 hook으로 목록과 필터 상태를 가져옵니다.

### useApplicationFilters.ts

상태, 고용 형태, 근무 형태 Select 옵션을 생성합니다.

### useDashboard.ts

대시보드에서 필요한 summary, recent applications, upcoming schedules, status overview를 불러옵니다.

## services

`services`는 데이터 호출과 mock 백엔드 로직을 담습니다.

```txt
services/
  apiClient.ts
  applicationApi.ts
  applicationService.ts
  dashboardService.ts
  mock/
```

### apiClient.ts

Axios 인스턴스입니다.

```ts
export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

클라이언트 컴포넌트나 Zustand store에서 API Route를 호출할 때 사용합니다.

### applicationApi.ts

Axios로 `/api/applications`를 호출하는 클라이언트 API 함수입니다.

```ts
fetchApplications()
postApplication(payload)
```

현재 사용 흐름:

```txt
Application Page
  -> useApplications / useApplicationStore
  -> applicationApi.ts
  -> apiClient.ts
  -> app/api/applications
```

### applicationService.ts

Mock 데이터를 실제 백엔드처럼 다루는 서버/서비스 계층입니다.

제공 함수:

```ts
getApplications(filters?)
getApplicationById(id)
createApplication(payload)
updateApplication(id, payload)
deleteApplication(id)
```

API Route는 이 서비스를 호출합니다.

### dashboardService.ts

대시보드 데이터를 계산합니다.

제공 함수:

```ts
getDashboardSummary()
getRecentApplications()
getUpcomingSchedules()
getStatusOverview()
```

### mock

초기 샘플 데이터입니다.

- `applications.mock.ts`: 지원 내역
- `schedules.mock.ts`: 일정

## types

프로젝트 전체에서 공유하는 TypeScript 타입입니다.

```txt
types/
  application.ts
  dashboard.ts
  schedule.ts
  common.ts
```

주요 타입:

- `Application`
- `ApplicationStatus`
- `ApplicationCreatePayload`
- `ApplicationFilterParams`
- `Schedule`
- `DashboardSummary`
- `StatusOverviewItem`
- `SelectOption`

타입은 `any` 없이 명시적으로 작성합니다.

## utils

표시용 포맷과 상태 매핑을 담습니다.

```txt
utils/
  date.ts
  format.ts
  status.ts
```

- `date.ts`: 날짜 표시 함수
- `format.ts`: 고용 형태, 근무 형태 라벨
- `status.ts`: 지원 상태 라벨, 색상, active status 목록

예시:

```ts
statusLabels.applied; // '지원 완료'
statusColors.interview; // 'gold'
formatDate('2026-07-01'); // '2026.07.01'
```

## styles

SCSS 전역 스타일입니다.

```txt
styles/
  globals.scss
  variables.scss
```

- `globals.scss`: 레이아웃, 페이지 간격, 필터바, 차트 패널 스타일
- `variables.scss`: 전역 색상/크기 변수

## 데이터 흐름

지원 목록 화면 기준:

```txt
app/applications/page.tsx
  -> useApplications()
  -> useApplicationStore
  -> applicationApi.ts
  -> apiClient.ts
  -> /api/applications
  -> applicationService.ts
  -> services/mock/applications.mock.ts
```

통계 화면 기준:

```txt
app/statistics/page.tsx
  -> getApplications()
  -> getStatusOverview()
  -> StatisticsCards
  -> StatisticsDashboardChart
```

대시보드 화면 기준:

```txt
app/page.tsx
  -> useDashboard()
  -> dashboardService.ts
  -> SummaryCards / RecentApplicationsTable / UpcomingSchedules / StatusOverview
```

## 새 기능 추가 기준

새 페이지:

```txt
app/<route>/page.tsx
```

새 UI 컴포넌트:

```txt
components/<domain>/<ComponentName>.tsx
```

새 API 호출:

```txt
services/<domain>Api.ts
```

새 전역 상태:

```txt
hooks/use<Domain>Store.ts
```

새 타입:

```txt
types/<domain>.ts
```

## 실행 명령어

```bash
npm run dev
npm run build
npm run typecheck
```

브라우저:

```txt
http://127.0.0.1:3000
http://127.0.0.1:3000/components
```
