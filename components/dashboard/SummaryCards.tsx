import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Card, Col, Row, Skeleton, Statistic } from 'antd';
import type { ReactNode } from 'react';
import type { DashboardSummary } from '@/types/dashboard';

interface SummaryCardsProps {
  summary?: DashboardSummary;
  loading: boolean;
}

export const SummaryCards = ({ summary, loading }: SummaryCardsProps): ReactNode => {
  if (loading || !summary) {
    return <Skeleton active paragraph={{ rows: 2 }} />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} xl={6}>
        <Card>
          <Statistic title="전체 지원" value={summary.totalCount} prefix={<FileDoneOutlined />} />
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <Card>
          <Statistic title="진행 중" value={summary.activeCount} prefix={<ClockCircleOutlined />} />
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <Card>
          <Statistic title="면접 예정" value={summary.interviewCount} prefix={<CalendarOutlined />} />
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <Card>
          <Statistic title="응답 대기" value={summary.waitingCount} prefix={<CheckCircleOutlined />} />
        </Card>
      </Col>
    </Row>
  );
};
