'use client';

import { Badge, Calendar, Card, List, Space, Typography } from 'antd';
import type { Dayjs } from 'dayjs';
import type { ReactNode } from 'react';
import type { Schedule, ScheduleType } from '@/types/schedule';
import { formatDateTime } from '@/utils/date';

interface ScheduleCalendarProps {
  schedules: Schedule[];
}

const scheduleTypeLabels: Record<ScheduleType, string> = {
  interview: '면접',
  assignment: '과제',
  deadline: '마감',
  followUp: '후속'
};

const badgeStatuses: Record<ScheduleType, 'success' | 'processing' | 'warning' | 'default'> = {
  interview: 'processing',
  assignment: 'warning',
  deadline: 'default',
  followUp: 'success'
};

export const ScheduleCalendar = ({ schedules }: ScheduleCalendarProps): ReactNode => {
  const dateCellRender = (date: Dayjs): ReactNode => {
    const daySchedules = schedules.filter((schedule) => date.isSame(schedule.scheduledAt, 'day'));

    return (
      <List
        size="small"
        dataSource={daySchedules}
        renderItem={(schedule) => (
          <List.Item className="calendar-list-item">
            <Badge status={badgeStatuses[schedule.type]} text={scheduleTypeLabels[schedule.type]} />
          </List.Item>
        )}
      />
    );
  };

  return (
    <Card>
      <Calendar cellRender={(date) => dateCellRender(date)} />
      <Space direction="vertical" className="full-width">
        <Typography.Title level={4}>다가오는 일정</Typography.Title>
        <List<Schedule>
          dataSource={schedules}
          renderItem={(schedule) => (
            <List.Item>
              <Space direction="vertical" size={2}>
                <Typography.Text strong>{schedule.title}</Typography.Text>
                <Typography.Text type="secondary">{formatDateTime(schedule.scheduledAt)}</Typography.Text>
              </Space>
            </List.Item>
          )}
        />
      </Space>
    </Card>
  );
};
