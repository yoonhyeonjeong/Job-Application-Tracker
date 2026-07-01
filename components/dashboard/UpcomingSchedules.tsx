import { Card, List, Space, Tag, Typography } from "antd";
import type { ReactNode } from "react";
import type { Schedule, ScheduleType } from "@/types/schedule";
import { formatDateTime } from "@/utils/date";

interface UpcomingSchedulesProps {
  schedules: Schedule[];
  loading: boolean;
}

const scheduleTypeLabels: Record<ScheduleType, string> = {
  interview: "면접",
  assignment: "과제 제출",
  deadline: "마감",
  followUp: "후속"
};

export const UpcomingSchedules = ({ schedules, loading }: UpcomingSchedulesProps): ReactNode => {
  return (
    <Card title="다가오는 일정">
      <List<Schedule>
        loading={loading}
        dataSource={schedules}
        renderItem={(schedule) => (
          <List.Item>
            <Space direction="vertical" size={2}>
              <Space>
                <Tag>{scheduleTypeLabels[schedule.type]}</Tag>
                <Typography.Text strong>{schedule.title}</Typography.Text>
              </Space>
              <Typography.Text type="secondary">{formatDateTime(schedule.scheduledAt)}</Typography.Text>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
};
