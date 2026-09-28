import { Alert, Button, Card, Flex, List, Space, Tag, Typography } from "antd";
import type { ReactNode } from "react";
import { formatDateTime, getDayLabel, getDday } from "@/utils/date";
import { dayColorMap, scheduleTypeLabels } from "@/utils/schedules";
import dayjs from "dayjs";
import { ClockCircleOutlined } from "@ant-design/icons";
import { ScheduleResponse } from "@/types/schedule";
import { LoadingSpinner } from "@/components/common/Spin";

interface UpcomingSchedulesProps {
  schedules: ScheduleResponse[];
  loading: boolean;
  error?: boolean;
  refetch?: () => void;
}

export const UpcomingSchedules = ({ schedules, loading, error, refetch }: UpcomingSchedulesProps): ReactNode => {
  if (loading || !schedules) {
    return <LoadingSpinner />;
  }
  const schedulesData = [...schedules].slice(0, 3);

  return (
    <Card title="다가오는 일정" style={{ height: "100%" }}>
      {error ?
        <Alert
          type="error"
          showIcon
          message="다가오는 일정을 불러오지 못했습니다."
          action={
            <Button size="small" onClick={() => refetch?.()}>
              다시 시도
            </Button>
          }
        />
      : <>
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
                        backgroundColor: dayColorMap[getDayLabel(schedule.scheduledAt)]?.bg ?? "#fff",
                        color: dayColorMap[getDayLabel(schedule.scheduledAt)]?.color ?? "#000",
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
                        {isDueSoon && <span>D-{getDday(schedule.scheduledAt)}</span>}
                      </Tag>
                      <Typography.Text strong>{schedule.companyName}</Typography.Text>
                      <Typography.Text strong>{schedule.title}</Typography.Text>
                      <Typography.Text type="secondary">
                        <ClockCircleOutlined /> {formatDateTime(schedule.scheduledAt)}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </List.Item>
              );
            }}
          />
        </>
      }
    </Card>
  );
};
