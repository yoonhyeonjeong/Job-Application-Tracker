# Job Application Tracker Guide

이 프로젝트는 Next.js App Router 기반의 구직 지원 관리 프론트엔드입니다.
프론트엔드는 Axios로 `/api` 경로를 호출하고, `next.config.ts`의 rewrite가 요청을 실제 백엔드 서버로 전달합니다.

## Structure

```txt
app/
components/
hooks/
services/
types/
utils/
styles/
```

## app

`app` 폴더는 페이지와 레이아웃을 담습니다.

- `app/layout.tsx`: 전체 HTML 레이아웃과 `AppLayout` 적용
- `app/page.tsx`: 메인 대시보드
- `app/applications/page.tsx`: 지원 목록
- `app/applications/new/page.tsx`: 지원 등록
- `app/applications/[id]/page.tsx`: 지원 상세
- `app/calendar/page.tsx`: 일정
- `app/statistics/page.tsx`: 통계
- `app/guide/*`: 프로젝트/컴포넌트 가이드

프론트 샘플 API route는 제거되었습니다. API 요청은 백엔드 서버가 처리합니다.

## services

`services` 폴더는 실제 API 호출 함수만 담습니다.

- `apiClient.ts`: Axios 인스턴스
- `applicationApi.ts`: 지원 API
- `scheduleApi.ts`: 일정 API
- `dashboardApi.ts`: 대시보드 API
- `statisticsApi.ts`: 통계 API

```ts
export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

`next.config.ts` rewrite:

```ts
{
  source: "/api/:path*",
  destination: "http://localhost:8080/api/:path*",
}
```

## Data Flow

지원 목록:

```txt
app/applications/page.tsx
  -> useApplications()
  -> useApplicationStore
  -> applicationApi.ts
  -> apiClient.ts
  -> /api/applications
  -> backend server
```

대시보드:

```txt
app/page.tsx
  -> useDashboard()
  -> dashboardApi.ts
  -> apiClient.ts
  -> /api/dashboard
  -> backend server
```

일정:

```txt
app/calendar/page.tsx
  -> useCalendar()
  -> scheduleApi.ts
  -> apiClient.ts
  -> /api/schedules
  -> backend server
```

## Query cache consistency

`services/queryCache.ts` owns query keys and cache invalidation rules.
`hooks/useApplicationMutations.ts` and `hooks/useScheduleMutations.ts` apply
those rules after successful writes. Components should use these hooks instead
of passing parent-specific refetch callbacks.

- Schedule writes invalidate the affected application's schedules, all calendar
  months, upcoming schedules, and dashboard.
- Application writes invalidate the list, dashboard, statistics, and schedule
  views (which include company names). Updates also invalidate that application's
  detail and schedules; deletion removes those two detail caches.
- Active queries refetch immediately; inactive queries refresh when next used.
- A failed refetch preserves stale data and does not report the successful write
  as a failed save. Error presentation is a separate concern.

Run `npm test` with Node.js 22.18+ (or Node.js 24) for the cache regression tests.
These use the real QueryClient and do not require a running backend.

## Development commands

```bash
npm run dev
npm run build
npm run typecheck
npm run lint
```
