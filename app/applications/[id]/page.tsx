"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ApplicationDetail } from "@/components/applications/ApplicationDetail";
import { PageHeader } from "@/components/common/PageHeader";
import { ApplicationResponse } from "@/types/application";
import {
  fetchDetailApplication,
  fetchDetailSchedule,
} from "@/services/applicationApi";
import { Col, Row, Skeleton, Typography } from "antd";
import { ScheduleCard } from "@/components/schedule/ScheduleCard";
import { ScheduleDetailResponse } from "@/types/schedule";
import ScheduleDetailModal from "@/components/applications/ScheduleDetailModal";

const ApplicationDetailPage = () => {
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<ApplicationResponse | null>(
    null,
  );
  const [detailScheduleData, setDetailScheduleData] = useState<
    ScheduleDetailResponse[]
  >([]);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [selectedSchedule, SetSelectedSchedule] =
    useState<ScheduleDetailResponse | null>(null);

  const getFetchDetailData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDetailApplication(Number(id));
      setDetailData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const getFetchDetailScheduleData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDetailSchedule(Number(id));
      setDetailScheduleData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleOpenScheduleDetail = (v: ScheduleDetailResponse) => {
    setDetailModalOpen(true);
    SetSelectedSchedule(v);
  };

  const handleCloseScheduleDetail = () => {
    setDetailModalOpen(false);
  };

  const handleScheduleUpdated = async () => {
    await getFetchDetailScheduleData();
    handleCloseScheduleDetail();
  };
  useEffect(() => {
    getFetchDetailData();
    getFetchDetailScheduleData();
  }, [getFetchDetailData, getFetchDetailScheduleData]);

  if (loading || !detailData) {
    return <Skeleton active paragraph={{ rows: 2 }} />;
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="지원 상세"
        description="지원 정보와 다음 액션을 확인합니다."
      />
      {/* 지원 상세 */}
      <ApplicationDetail
        application={detailData}
        onSuccess={getFetchDetailScheduleData}
        onApplicationUpdateSuccess={getFetchDetailData}
      />

      {/* 일정 및 메모 */}
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
          onSuccess={handleScheduleUpdated}
        />
      )}
    </div>
  );
};

export default ApplicationDetailPage;
