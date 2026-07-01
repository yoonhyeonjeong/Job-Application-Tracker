'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import type { Schedule } from '@/types/schedule';

const ScheduleCalendar = dynamic(
  () => import('@/components/calendar/ScheduleCalendar').then((module) => module.ScheduleCalendar),
  { ssr: false }
);

interface CalendarPageClientProps {
  schedules: Schedule[];
}

export const CalendarPageClient = ({ schedules }: CalendarPageClientProps): ReactNode => {
  return <ScheduleCalendar schedules={schedules} />;
};
