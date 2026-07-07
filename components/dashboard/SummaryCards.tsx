import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Skeleton, Statistic } from "antd";
import type { ReactNode } from "react";
import type { DashboardSummary } from "@/types/dashboard";

interface SummaryCardsProps {
  summary?: DashboardSummary;
  loading: boolean;
}

export const SummaryCards = ({
  summary,
  loading,
}: SummaryCardsProps): ReactNode => {
  if (loading || !summary) {
    return <Skeleton active paragraph={{ rows: 2 }} />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} xl={6}>
        <Card>
          <Statistic
            title="총 지원 건수"
            value={summary.totalCount}
            prefix={<FileDoneOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <Card>
          <Statistic
            title="지원완료"
            value={summary.appliedCount}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <Card>
          <Statistic
            title="서류통과"
            value={summary.documentPassedCount}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <Card>
          <Statistic
            title="면접예정"
            value={summary.interviewCount}
            prefix={<CalendarOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};
