// import 'antd/dist/reset.css';
import "@/styles/globals.scss";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppLayout } from "@/components/common/AppLayout";

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
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
};

export default RootLayout;
