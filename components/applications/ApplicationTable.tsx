'use client';

import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { StatusTag } from '@/components/common/StatusTag';
import type { Application } from '@/types/application';
import { formatDate } from '@/utils/date';
import { employmentTypeLabels, workTypeLabels } from '@/utils/format';

interface ApplicationTableProps {
  applications: Application[];
  loading: boolean;
}

const columns: ColumnsType<Application> = [
  {
    title: '회사',
    dataIndex: 'companyName',
    key: 'companyName',
    sorter: (left, right) => left.companyName.localeCompare(right.companyName),
    render: (value: string, record) => <Link href={`/applications/${record.id}`}>{value}</Link>
  },
  {
    title: '직무',
    dataIndex: 'position',
    key: 'position'
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => <StatusTag status={record.status} />
  },
  {
    title: '고용',
    dataIndex: 'employmentType',
    key: 'employmentType',
    render: (_, record) => employmentTypeLabels[record.employmentType]
  },
  {
    title: '근무',
    dataIndex: 'workType',
    key: 'workType',
    render: (_, record) => workTypeLabels[record.workType]
  },
  {
    title: '지원일',
    dataIndex: 'appliedAt',
    key: 'appliedAt',
    sorter: (left, right) => Date.parse(left.appliedAt ?? '') - Date.parse(right.appliedAt ?? ''),
    render: formatDate
  },
  {
    title: '마감일',
    dataIndex: 'deadline',
    key: 'deadline',
    render: formatDate
  },
  {
    title: '관리',
    key: 'actions',
    render: (_, record) => (
      <Space>
        <Button size="small">
          <Link href={`/applications/${record.id}`}>상세</Link>
        </Button>
      </Space>
    )
  }
];

export const ApplicationTable = ({ applications, loading }: ApplicationTableProps): ReactNode => {
  return (
    <Table<Application>
      rowKey="id"
      columns={columns}
      dataSource={applications}
      loading={loading}
      scroll={{ x: 1000 }}
    />
  );
};
