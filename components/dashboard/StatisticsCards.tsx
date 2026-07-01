'use client';

import { Card, Col, Row, Statistic } from 'antd';
import type { ReactNode } from 'react';

interface StatisticsCardsProps {
  interviewRate: number;
  offerRate: number;
  rejectedRate: number;
}

export const StatisticsCards = ({ interviewRate, offerRate, rejectedRate }: StatisticsCardsProps): ReactNode => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Card>
          <Statistic title="면접 전환율" value={interviewRate} suffix="%" />
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card>
          <Statistic title="오퍼율" value={offerRate} suffix="%" />
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card>
          <Statistic title="불합격률" value={rejectedRate} suffix="%" />
        </Card>
      </Col>
    </Row>
  );
};
