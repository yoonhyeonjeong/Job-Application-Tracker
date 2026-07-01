import { Tag } from "antd";
import type { ReactNode } from "react";
import type { ApplicationStatus } from "@/types/application";
import { statusColors, statusLabels } from "@/utils/status";

interface StatusTagProps {
  status: ApplicationStatus;
}

export const StatusTag = ({ status }: StatusTagProps): ReactNode => {
  return <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>;
};
