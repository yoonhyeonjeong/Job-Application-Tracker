import { Card, Flex, List, Skeleton, Space, Tag, Typography } from "antd";
import type { ReactNode } from "react";
import { formatDateTime, getDayLabel, getDday } from "@/utils/date";
import { dayColorMap, scheduleTypeLabels } from "@/utils/schedules";
import dayjs from "dayjs";
import { ClockCircleOutlined } from "@ant-design/icons";
import { ScheduleResponse } from "@/types/schedule";

interface UpcomingSchedulesProps {
  schedules: ScheduleResponse[];
  loading: boolean;
}

export const UpcomingSchedules = ({
  schedules,
  loading,
}: UpcomingSchedulesProps): ReactNode => {
  if (loading || !schedules) {
    return <Skeleton active paragraph={{ rows: 2 }} />;
  }
  const schedulesData = [...schedules].slice(0, 3);
  return (
    <Card title="다가오는 일정">
      <List<ScheduleResponse>
        className="scedule-list"
        loading={loading}
        dataSource={schedulesData}
        renderItem={(schedule) => {
          const ddayDiff = getDday(schedule.scheduledAt);
          const isDueSoon = ddayDiff > 0 && ddayDiff <= 30;
          const isToday = ddayDiff === 0;

          return (
            <List.Item>
              <Flex align="center" gap={16} className="full-width">
                <Flex
                  vertical
                  align="center"
                  style={{
                    backgroundColor:
                      dayColorMap[getDayLabel(schedule.scheduledAt)]?.bg ??
                      "#fff",
                    color:
                      dayColorMap[getDayLabel(schedule.scheduledAt)]?.color ??
                      "#000",
                    padding: 10,
                    borderRadius: 8,
                    minWidth: 80,
                  }}
                  gap={4}
                >
                  <p>{dayjs(schedule.scheduledAt).format("MM.DD")}</p>
                  <strong>{getDayLabel(schedule.scheduledAt)}</strong>
                  <p>{dayjs(schedule.scheduledAt).format("HH:mm")}</p>
                </Flex>
                <Flex vertical gap={4} align="start">
                  <Tag color={isToday ? "red" : ""}>
                    {scheduleTypeLabels[schedule.scheduleType]}{" "}
                    {isDueSoon && (
                      <span>D-{getDday(schedule.scheduledAt)}</span>
                    )}
                  </Tag>
                  <Typography.Text strong>
                    {schedule.companyName}
                  </Typography.Text>
                  <Typography.Text strong>{schedule.title}</Typography.Text>
                  <Typography.Text type="secondary">
                    <ClockCircleOutlined />{" "}
                    {formatDateTime(schedule.scheduledAt)}
                  </Typography.Text>
                </Flex>
              </Flex>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};
