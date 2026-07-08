"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ApplicationDetail } from "@/components/applications/ApplicationDetail";
import { PageHeader } from "@/components/common/PageHeader";
import { ApplicationResponse } from "@/types/application";
import { fetchDetailApplication } from "@/services/applicationApi";
import { Skeleton } from "antd";

const ApplicationDetailPage = () => {
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<ApplicationResponse | null>(
    null,
  );

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
  }, []);

  useEffect(() => {
    getFetchDetailData();
  }, [getFetchDetailData]);

  if (loading || !detailData) {
    return <Skeleton active paragraph={{ rows: 2 }} />;
  }
  console.log(detailData);
  return (
    <div className="page-stack">
      <PageHeader
        title="지원 상세"
        description="지원 정보와 다음 액션을 확인합니다."
      />

      <ApplicationDetail application={detailData} />
    </div>
  );
};

export default ApplicationDetailPage;
