// import 'antd/dist/reset.css';
import "@/styles/globals.scss";
import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppLayout } from "@/components/common/AppLayout";
import AntdProvider from "./components/AntdProvider";
import ReactQueryProvider from "./components/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Job Application Tracker",
  description: "이직 지원 관리 대시보드",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps): ReactNode => {
  return (
    <html lang="ko">
      <body>
        <AntdProvider>
          <ReactQueryProvider>
            <AppLayout>{children}</AppLayout>
          </ReactQueryProvider>
        </AntdProvider>
      </body>
    </html>
  );
};

export default RootLayout;
