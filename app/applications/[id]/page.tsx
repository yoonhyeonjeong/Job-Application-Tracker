"use client";

import { queryKeys } from "@/services/queryCache";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ApplicationDetail } from "@/components/applications/ApplicationDetail";
import { PageHeader } from "@/components/common/PageHeader";
import {
  fetchDetailApplication,
  fetchDetailSchedule,
} from "@/services/applicationApi";
import { Alert, Col, Row, Skeleton, Typography } from "antd";
import { ScheduleCard } from "@/components/schedule/ScheduleCard";
import { ScheduleDetailResponse } from "@/types/schedule";
import ScheduleDetailModal from "@/components/applications/ScheduleDetailModal";
import { useQuery } from "@tanstack/react-query";
import {
  ERROR_MESSAGES,
  type DetailErrorType,
} from "@/constants/applicationErrors";

const ApplicationDetailPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const isValidId = Number.isFinite(id) && id > 0;

  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] =
    useState<ScheduleDetailResponse | null>(null);

  const {
    data: detailData,
    isPending,
    isError,
  } = useQuery({
    queryKey: queryKeys.application(id),
    queryFn: () => fetchDetailApplication(id),
    enabled: isValidId,
  });

  const {
    data: detailScheduleData = [],
    isPending: scheduleLoading,
    isError: scheduleError,
  } = useQuery({
    queryKey: queryKeys.applicationSchedules(id),
    queryFn: () => fetchDetailSchedule(id),
    enabled: isValidId,
  });

  const handleOpenScheduleDetail = (v: ScheduleDetailResponse) => {
    setDetailModalOpen(true);
    setSelectedSchedule(v);
  };

  const handleCloseScheduleDetail = () => {
    setDetailModalOpen(false);
  };

  const errorStatus: DetailErrorType | null =
    !isValidId ? "invalidId"
    : isError ? "application"
    : null;

  if (errorStatus) {
    return (
      <Alert type="error" message={ERROR_MESSAGES[errorStatus]} showIcon />
    );
  }

  if (scheduleLoading || isPending || !detailData) {
    return <Skeleton active paragraph={{ rows: 2 }} />;
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="지원 상세"
        description="지원 정보와 다음 액션을 확인합니다."
      />
      {/* 지원 상세 */}
      <ApplicationDetail application={detailData} />

      {scheduleError && (
        <Alert type="error" message={ERROR_MESSAGES.schedule} showIcon />
      )}

      {detailScheduleData.length > 0 && (
        <div className="mt-30">
          <Typography.Title level={3}>일정 및 메모</Typography.Title>
          <Row gutter={[20, 20]}>
            {detailScheduleData.map((v) => (
              <Col key={`scheduleData-${v.id}`} xs={24} sm={12} lg={8}>
                <ScheduleCard
                  data={v}
                  onClick={() => {
                    handleOpenScheduleDetail(v);
                  }}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {detailModalOpen && selectedSchedule && (
        <ScheduleDetailModal
          schedule={selectedSchedule}
          open={detailModalOpen}
          onCancel={handleCloseScheduleDetail}
        />
      )}
    </div>
  );
};

export default ApplicationDetailPage;
