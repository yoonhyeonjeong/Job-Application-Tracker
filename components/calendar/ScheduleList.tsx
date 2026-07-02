'use client';

import { Card, Space, Tag, Typography } from 'antd';
import type { ReactNode } from 'react';
import type { Schedule, ScheduleType } from '@/types/schedule';
import { formatDateTime } from '@/utils/date';

interface ScheduleListProps {
  schedules: Schedule[];
}

const scheduleTypeLabels: Record<ScheduleType, string> = {
  interview: '면접',
  assignment: '과제',
  deadline: '마감'
};

const tagColors: Record<ScheduleType, string> = {
  interview: 'blue',
  assignment: 'gold',
  deadline: 'default'
};

export const ScheduleList = ({ schedules }: ScheduleListProps): ReactNode => {
  return (
    <Card>
      <Space direction="vertical" className="full-width" size="middle">
        {schedules.map((schedule) => (
          <div className="schedule-item" key={schedule.id}>
            <Space direction="vertical" size={4}>
              <Space>
                <Tag color={tagColors[schedule.type]}>{scheduleTypeLabels[schedule.type]}</Tag>
                <Typography.Text strong>{schedule.title}</Typography.Text>
              </Space>
              <Typography.Text type="secondary">{formatDateTime(schedule.scheduledAt)}</Typography.Text>
              {schedule.description ? <Typography.Text type="secondary">{schedule.description}</Typography.Text> : null}
            </Space>
          </div>
        ))}
      </Space>
    </Card>
  );
};
