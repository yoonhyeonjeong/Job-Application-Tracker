"use client";

import {
  AppstoreOutlined,
  BarChartOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ProfileOutlined,
  ReadOutlined
} from "@ant-design/icons";
import { ConfigProvider, Layout, Menu, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const { Header, Sider, Content } = Layout;

const fontFamily =
  '"NotoSansKR", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

interface AppLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    key: "/",
    icon: <AppstoreOutlined />,
    label: <Link href="/">대시보드</Link>
  },
  {
    key: "/applications",
    icon: <FileTextOutlined />,
    label: <Link href="/applications">지원 관리</Link>
  },
  {
    key: "/calendar",
    icon: <CalendarOutlined />,
    label: <Link href="/calendar">일정</Link>
  },
  {
    key: "/statistics",
    icon: <BarChartOutlined />,
    label: <Link href="/statistics">통계</Link>
  },
  {
    key: "guide",
    icon: <ReadOutlined />,
    label: "가이드",
    children: [
      {
        key: "/guide",
        label: <Link href="/guide">프로젝트 가이드</Link>
      },
      {
        key: "/guide/components",
        icon: <ProfileOutlined />,
        label: <Link href="/guide/components">컴포넌트</Link>
      }
    ]
  }
];

const getSelectedKey = (pathname: string): string => {
  if (pathname.startsWith("/applications")) {
    return "/applications";
  }

  if (pathname.startsWith("/calendar")) {
    return "/calendar";
  }

  if (pathname.startsWith("/statistics")) {
    return "/statistics";
  }

  if (pathname.startsWith("/guide/components")) {
    return "/guide/components";
  }

  if (pathname.startsWith("/guide")) {
    return "/guide";
  }

  return "/";
};

export const AppLayout = ({ children }: AppLayoutProps): ReactNode => {
  const pathname = usePathname();

  return (
    <ConfigProvider theme={{ token: { fontFamily } }}>
      <Layout className="app-shell">
        <Sider breakpoint="lg" collapsedWidth="0" className="app-sidebar">
          <div className="app-logo">
            <Typography.Text strong>Job Tracker</Typography.Text>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[getSelectedKey(pathname)]}
            defaultOpenKeys={pathname.startsWith("/guide") ? ["guide"] : []}
            items={menuItems}
          />
        </Sider>
        <Layout className="app-main">
          <Header className="app-header">
            <Typography.Text type="secondary">지원 관리 대시보드</Typography.Text>
          </Header>
          <Content className="app-content">{children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
