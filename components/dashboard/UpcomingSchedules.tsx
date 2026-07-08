import { Card, Flex, List, Space, Tag, Typography } from "antd";
import type { ReactNode } from "react";
import type { Schedule } from "@/types/schedule";
import { formatDateTime, getDayLabel, getDday } from "@/utils/date";
import { dayColorMap, scheduleTypeLabels } from "@/utils/schedules";
import dayjs from "dayjs";
import { ClockCircleOutlined } from "@ant-design/icons";

interface UpcomingSchedulesProps {
  schedules: Schedule[];
  loading: boolean;
}

// 일정 순서 오름차순
export const UpcomingSchedules = ({
  schedules,
  loading,
}: UpcomingSchedulesProps): ReactNode => {
  // 오름차순 정렬 + 3개만
  const schedulesData = [...schedules]
    .filter((schedule) => getDday(schedule.scheduledDate) >= 0)
    .sort(
      (a, b) =>
        dayjs(a.scheduledDate).valueOf() - dayjs(b.scheduledDate).valueOf(),
    )
    .slice(0, 3);
  return (
    <Card title="다가오는 일정">
      <List<Schedule>
        className="scedule-list"
        loading={loading}
        dataSource={schedulesData}
        renderItem={(schedule) => {
          const ddayDiff = getDday(schedule.scheduledDate);
          const isDueSoon = ddayDiff > 0 && ddayDiff <= 7;
          const isToday = ddayDiff === 0;

          return (
            <List.Item>
              <Flex align="center" gap={16} className="full-width">
                <Flex
                  vertical
                  align="center"
                  style={{
                    backgroundColor:
                      dayColorMap[getDayLabel(schedule.scheduledDate)]?.bg ??
                      "#fff",
                    color:
                      dayColorMap[getDayLabel(schedule.scheduledDate)]?.color ??
                      "#000",
                    padding: 10,
                    borderRadius: 8,
                    minWidth: 80,
                  }}
                  gap={4}
                >
                  <p>{dayjs(schedule.scheduledDate).format("MM.DD")}</p>
                  <strong>{getDayLabel(schedule.scheduledDate)}</strong>
                  <p>{dayjs(schedule.scheduledDate).format("HH:mm")}</p>
                </Flex>
                <Flex vertical gap={4} align="start">
                  <Tag color={isToday ? "red" : ""}>
                    {scheduleTypeLabels[schedule.type]}{" "}
                    {isDueSoon && (
                      <span>D-{getDday(schedule.scheduledDate)}</span>
                    )}
                  </Tag>
                  <Typography.Text strong>{schedule.title}</Typography.Text>
                  <Typography.Text type="secondary">
                    <ClockCircleOutlined />{" "}
                    {formatDateTime(schedule.scheduledDate)}
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
