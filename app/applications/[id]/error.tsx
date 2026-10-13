"use client";

import { Alert, Button } from "antd";

interface ApplicationDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ApplicationDetailError = ({ reset }: ApplicationDetailErrorProps) => {
  return (
    <Alert
      type="error"
      showIcon
      message="지원 정보를 불러오지 못했습니다."
      description="잠시 후 다시 시도해 주세요."
      action={<Button onClick={() => reset()}>다시 시도</Button>}
    />
  );
};

export default ApplicationDetailError;
