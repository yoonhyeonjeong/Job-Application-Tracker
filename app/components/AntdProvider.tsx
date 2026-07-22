"use client";

import { App as AntdApp } from "antd";
import type { ReactNode } from "react";

interface AntdProviderProps {
  children: ReactNode;
}

const AntdProvider = ({ children }: AntdProviderProps) => {
  return <AntdApp>{children}</AntdApp>;
};

export default AntdProvider;
