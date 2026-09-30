# 프로젝트 코드 작성 규칙

현재 저장소에서 반복되는 구조를 기준으로 정리한 지침이다. 기존 코드에는 export 방식, 타입 import, 줄바꿈 등이 혼재하므로 이를 모두 개인의 확정된 선호로 보지 않는다. 수정하는 파일의 스타일과 아래 역할 분리를 우선한다.

## 1. 폴더와 역할

| 위치 | 역할 | 참고 코드 |
| --- | --- | --- |
| `app/` | 라우트, 페이지 구성, 화면 이동 | `app/applications/page.tsx` |
| `components/<도메인>/` | 도메인별 화면 조각과 모달 | `components/applications/` |
| `components/common/` | 여러 화면에서 공유하는 UI | `PageHeader`, `StatusTag`, `EmptyState` |
| `hooks/` | 조회, 변경 요청, 상태와 화면용 데이터 조합 | `useApplications`, `useApplicationMutations` |
| `services/` | HTTP 요청, 쿼리 키와 캐시 갱신 | `applicationApi.ts`, `queryCache.ts` |
| `types/` | 도메인별 요청·응답·폼 타입 | `application.ts`, `schedule.ts` |
| `utils/` | 날짜·문자열 변환, 라벨·색상·옵션 매핑 | `date.ts`, `form.ts`, `status.ts` |
| `styles/` | 공통 SCSS와 컴포넌트 스타일 | `globals.scss`, `_component.scss` |

새 코드를 추가하기 전에 같은 역할의 파일이나 함수가 있는지 확인하고 재사용한다.

## 2. 컴포넌트 작성 방식

- 함수형 컴포넌트를 사용한다. 일반적인 형태는 화살표 함수, 구조 분해한 props, 별도 `interface XxxProps`다.
- props 인터페이스는 해당 컴포넌트 파일에 둔다. 여러 곳에서 사용하는 도메인 데이터 타입은 `types/`에서 가져온다.
- 컴포넌트 반환 타입은 TypeScript 추론을 사용한다. `: ReactNode` 같은 반환 타입을 명시하지 않는다. `children`, `action` 등 props에 필요한 `ReactNode` 타입은 유지한다.
- 페이지는 하위 컴포넌트와 훅을 조합한다. 예를 들어 지원 목록 페이지는 `useApplications`의 결과를 `ApplicationFilter`와 `ApplicationTable`에 전달한다.
- 화면 조각은 도메인 폴더에 분리한다. 여러 화면에서 쓰는 UI는 `components/common/`에 둔다.
- 상태와 이벤트가 필요한 클라이언트 경계에는 `"use client"`를 사용한다. 기존 서버 레이아웃까지 일괄적으로 클라이언트 컴포넌트로 바꾸지 않는다.
- 페이지는 default export를 사용한다. 일반 컴포넌트에는 named export가 많지만 모달 등은 default export도 사용하므로 일괄 변경하지 않는다.

기본 형태:

```tsx
import type { ApplicationResponse } from "@/types/application";

interface ApplicationSummaryProps {
  application: ApplicationResponse;
}

export const ApplicationSummary = ({
  application,
}: ApplicationSummaryProps) => {
  return <div>{application.companyName}</div>;
};
```

## 3. React 상태와 데이터 흐름

- 모달 열림 여부, 화면의 에러 메시지처럼 해당 화면에 속한 상태는 `useState`로 관리한다.
- 부모가 데이터와 콜백을 props로 전달한다. 필터는 `filters`와 `onChange`, 모달은 `open`과 `onCancel`을 받는 구조를 따른다.
- 서버 데이터는 TanStack Query로 관리한다. 같은 응답을 별도 Zustand 상태에 복제하지 않는다.
- Zustand는 현재 지원 목록의 검색·필터 조건을 저장하는 데 사용한다. 전역 상태를 추가할 때도 공유가 필요한 클라이언트 상태인지 먼저 구분한다.
- 필터링한 목록처럼 원본에서 계산할 수 있는 값은 기존 `useApplications`처럼 계산해 반환한다.
- `useEffect`는 수정 폼에 서버 값을 채우는 등 동기화가 필요한 곳에 사용한다. 일반적인 데이터 조회는 query 훅을 통해 처리한다.

## 4. 커스텀 훅과 API 분리

- HTTP 요청은 `services/*Api.ts`의 함수에서 수행한다. 공통 Axios 인스턴스인 `apiClient`를 사용한다.
- 조회 훅은 `useQuery`와 API 함수를 연결한다. 쿼리 키는 `services/queryCache.ts`의 `queryKeys`를 사용한다.
- 조회 결과와 필터 등 여러 값을 조합하는 로직은 `useApplications` 같은 화면용 훅에 둔다.
- 등록·수정·삭제는 도메인별 mutation 훅으로 제공한다. 예: `useCreateApplication`, `useUpdateSchedule`.
- mutation 훅은 요청과 관련 캐시 갱신을 담당한다. 화면마다 같은 invalidation 로직을 복사하지 않는다.
- 컴포넌트는 `mutateAsync`를 호출하고 성공 메시지, 에러 표시, 폼 초기화, 모달 닫기, 라우트 이동을 처리한다.
- 새 변경 요청을 추가할 때 목록뿐 아니라 상세·대시보드·통계·일정에 미치는 영향을 확인하고 공통 캐시 갱신 함수에 반영한다.

역할의 흐름:

```text
페이지 / 컴포넌트 → 커스텀 훅 → API 함수 → apiClient
                       ↓
                 공통 캐시 갱신
```

## 5. 폼 작성 방식

- Ant Design의 `Form`, `Form.Item`, `Input`, `Select`, `DatePicker`를 사용한다.
- `Form.useForm<T>()`, `<Form<T>>`, 제출 핸들러의 values에는 같은 폼 타입을 사용한다.
- 등록과 수정에서 같은 입력 필드를 쓰면 `ApplicationFormFields`처럼 공통 컴포넌트로 분리한다. 저장 요청과 모달 동작은 사용하는 화면에서 담당한다.
- 수정 초기값은 `form.setFieldsValue`로 채운다. 서버 날짜 문자열은 DatePicker가 사용하는 `Dayjs`로 변환한다.
- 제출 시 API payload를 만들고 날짜 직렬화와 필요한 문자열 정규화를 적용한다.
- 요청 중에는 mutation의 `isPending`을 버튼의 `loading` 등에 연결한다.
- 수정 모달의 변경 없음 확인, `Popconfirm`, 에러 `Alert` 등 기존 사용자 흐름을 유지한다.

## 6. 타입 작성 방식

- API 요청은 `Payload`, 응답은 `Response`, 폼 입력은 `FormValues` 또는 현재 일정 타입인 `ScheduleFormValue`로 구분한다.
- 폼 날짜는 `Dayjs`, API 날짜는 `string`으로 구분한다. API 타입을 DatePicker 폼에 그대로 쓰지 않는다.
- 기존 타입과 대부분 같다면 `Omit`으로 달라지는 필드를 제외하고 다시 정의한다. 수정 API가 부분 변경을 허용하는 경우 `Partial`을 사용할 수 있다.
- 상태·고용 형태처럼 값이 정해진 필드는 문자열 유니온을 사용한다.
- 라벨·색상 매핑에는 `Record<도메인타입, string>` 등으로 키를 제한한다.
- 타입 전용 의존성은 `import type` 또는 `import { type ... }`를 사용한다.
- 선택 여부와 `null` 허용 여부는 실제 입력·API 동작에 맞춘다. 타입을 맞추기 위한 강제 단언으로 차이를 숨기지 않는다.

## 7. 유틸 함수로 분리하는 기준

- React 상태나 생명주기에 의존하지 않는 반복 계산·변환은 일반 유틸 함수로 분리한다.
- 날짜 표시·직렬화는 `utils/date.ts`, 폼 문자열 정규화는 `utils/form.ts`의 기존 함수를 우선 사용한다.
- 라벨, 색상, Select 옵션은 기존 도메인별 매핑을 재사용한다. JSX마다 같은 조건문이나 문자열을 반복하지 않는다.
- 화면 표시 형식과 API 전송 형식을 구분한다. 일정 전송 형식은 `YYYY-MM-DDTHH:mm:ss`다.
- `normalizeText`는 trim 후 없는 값을 `""`로 만든다. 비교용 사용과 API 전송용 사용의 의미를 구분한다.
- `undefined`, `null`, `""`를 통일하면 API 동작이 달라질 수 있다. 중복 제거 과정에서 빈 값 처리까지 임의로 바꾸지 않는다.
- `...values`를 사용할 때 변환한 필드는 그 뒤에 써서 원래 값을 덮어쓴다.
- 의미가 같은 중복을 공통화한다. 서로 다른 전송 규칙까지 하나로 합치기 위해 복잡한 범용 함수를 만들지 않는다.

## 8. UI, 스타일, 명명

- 기본 UI는 Ant Design, 아이콘은 `@ant-design/icons`를 사용한다.
- 레이아웃은 기존 `Card`, `Row`, `Col`, `Space`, `Flex`와 공통 클래스를 활용한다.
- 스타일은 기존 SCSS 구조를 따른다. `page-stack`, `full-width`, `application-form-card` 등 기존 클래스를 먼저 확인한다.
- 컴포넌트·타입은 PascalCase, 훅은 `useXxx`, 이벤트 핸들러는 `handleXxx`, props 콜백은 `onXxx` 형태를 따른다.
- 프로젝트 내부 참조는 `@/` 별칭을 주로 사용하며, 같은 폴더의 상대 경로도 기존 코드에 맞춰 유지한다.
- 사용자에게 보이는 문구와 설명 주석은 한국어로 작성한다. 주석은 변환 목적이나 캐시 갱신 이유처럼 필요한 맥락을 설명한다.

## 9. 변경 검증

- 타입·props·훅·폼 변경 후 `npm run typecheck`를 실행한다.
- 변경 범위에 맞게 `npm run lint`, `npm test`를 실행한다.
- 날짜 포맷과 빈 값 처리처럼 타입 검사로 확인할 수 없는 동작은 diff와 적절한 동작 검증으로 확인한다.
- 관련 없는 포맷 변경이나 export 통일을 섞지 않는다. 기존 중복·오타·혼재를 새로운 규칙으로 확대하지 않는다.
