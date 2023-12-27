"use client";
import { useCallback, useState } from "react";
import { Button, Modal } from "antd";
import ThirdPartyLogin from "./components/ThridPartyLogin";

import { useUserStore } from "@/store";
import UserInfoMenu from "../UserInfoMenu";

// 客户端中渲染的
export default function RightAction() {
  const user = useUserStore((s) => s.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // 未登录
  if (user.uid === 0) {
    return (
      <>
        <Button onClick={handleOpenModal}>
          <span className="font-bold">Sign in</span>
        </Button>
        <Modal
          title={<div className="text-2xl">Third-Party Logins</div>}
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={null}>
          <ThirdPartyLogin />
        </Modal>
      </>
    );
  } else {
    return <UserInfoMenu {...user} />;
  }
}
