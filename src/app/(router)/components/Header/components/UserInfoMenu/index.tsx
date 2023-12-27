"use client";

import { useMemo, useState } from "react";
import { Avatar, Dropdown, Spin } from "antd";
import { LogoutOutlined as LogoutIcon } from "@ant-design/icons";
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
    {
      key: "3",
      label: (
        <>
          <LogoutIcon></LogoutIcon>
          <span className="ml-3">Logout</span>
        </>
      ),
    },
    {
      key: "4",
      label: (
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
    }
  };
  return (
    <Dropdown
      trigger={["click", "hover"]}
      menu={{ items, onClick: handleClick }}
      placement="bottomLeft"
      arrow={{ pointAtCenter: true }}>
      <Avatar src={avatar_url}></Avatar>
    </Dropdown>
  );
}
