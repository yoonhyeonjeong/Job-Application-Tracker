import { Empty } from 'antd';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  description?: string;
}

export const EmptyState = ({ description = '표시할 데이터가 없습니다.' }: EmptyStateProps): ReactNode => {
  return <Empty description={description} />;
};
