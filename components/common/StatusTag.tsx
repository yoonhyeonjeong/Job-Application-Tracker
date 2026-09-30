import { Tag } from "antd";
import type { ApplicationStatus } from "@/types/application";
import { statusColors, statusLabels } from "@/utils/status";

interface StatusTagProps {
  status: ApplicationStatus;
}

export const StatusTag = ({ status }: StatusTagProps) => {
  return <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>;
};
