import type { ReactNode } from 'react';
import { ScheduleList } from '@/components/calendar/ScheduleList';
import { PageHeader } from '@/components/common/PageHeader';
import { getUpcomingSchedules } from '@/services/dashboardService';

const CalendarPage = async (): Promise<ReactNode> => {
  const schedules = await getUpcomingSchedules();

  return (
    <div className="page-stack">
      <PageHeader title="일정" description="면접, 과제, 마감일, 후속 연락 일정을 확인합니다." />
      <ScheduleList schedules={schedules} />
    </div>
  );
};

export default CalendarPage;
