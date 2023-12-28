"use client";

import { useMemo, useState } from "react";
import { Avatar, Dropdown, Spin, message } from "antd";
import {
  LogoutOutlined as LogoutIcon,
  FormOutlined as PostIcon,
  UserOutlined as UserIcon,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";

/**
 * 渲染菜单栏
 * @param username
 * @param isLoading
 * @returns
 */
function renderMenu(username: string, isLoading: boolean): MenuProps["items"] {
  return [
    {
      key: "1",
      type: "group",
      label: <span>Welcome,{username}!</span>,
    },
    {
      key: "my~",
      label: (
        <>
          <UserIcon></UserIcon>
          <span className="ml-3">My</span>
        </>
      ),
    },
    {
      key: "/posts",
      label: (
        <>
          <PostIcon></PostIcon>
          <span className="ml-3">Publish Article</span>
        </>
      ),
    },
    {
      key: "0000",
      type: "divider",
    },
    {
      key: "logout",
      label: isLoading ? (
        <Spin>
          <LogoutIcon></LogoutIcon>
          <span className="ml-3">Logout</span>
        </Spin>
      ) : (
        <>
          <LogoutIcon></LogoutIcon>
          <span className="ml-3">Logout</span>
        </>
      ),
    },
  ];
}

export default function UserInfoMenu({ avatar_url, uid, username }: UserInfo) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const logout = useUserStore((state) => state.logout);
  const items = useMemo(() => renderMenu(username, isLoading), [isLoading]);
  const handleClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout" && !isLoading) {
      setLoading((pre) => !pre);
      logout().then(() => {
        setLoading((pre) => !pre);
        // 登出后重新加载页面
        router.refresh();
      });
    } else if (e.key.includes("/")) {
      // 路由导航
      router.push(e.key);
    } else if (e.key.includes("~")) {
      // 待开发
      message.info("Coming soon.");
    }
  };
  return (
    <Dropdown
      trigger={["click", "hover"]}
      menu={{ items, onClick: handleClick }}
      placement="bottomLeft"
      arrow={{ pointAtCenter: true }}>
      <Avatar
        src={avatar_url}
        alt={`${username}'s avatar`}></Avatar>
    </Dropdown>
  );
}
