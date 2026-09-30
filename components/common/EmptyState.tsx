import { Empty } from 'antd';

interface EmptyStateProps {
  description?: string;
}

export const EmptyState = ({ description = '표시할 데이터가 없습니다.' }: EmptyStateProps) => {
  return <Empty description={description} />;
};
