import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface SpinProps {
  className?: string;
  size?: number;
}

export const LoadingSpinner = ({ size, className }: SpinProps) => {
  return (
    <Flex align="center" gap="medium" justify="center" className={className} style={{ width: "100%", height: "100%" }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: size || 48 }} spin />} />
    </Flex>
  );
};
