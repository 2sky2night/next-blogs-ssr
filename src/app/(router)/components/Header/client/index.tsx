"use client";
import { Button, Modal } from "antd";
import { useCallback, useState } from "react";
import ThirdPartyLogin from "./components/ThridPartyLogin";
import { useUserStore } from "@/store";

export default function ClientHeader() {
  const uid = useUserStore((s) => s.user.uid);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <header className="flex py-3 px-2 justify-between items-center bg-sky-400 sticky top-0">
        <h1 className="text-2xl select-none cursor-pointer transition-transform text-white font-bold hover:animate-wiggle">
          Next.js Blogs
        </h1>
        {!uid && (
          <Button onClick={handleOpenModal}>
            <span className="font-bold">Sign in</span>
          </Button>
        )}
      </header>

      <Modal
        title={<div className="text-3xl">Third-Party Logins</div>}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}>
        <ThirdPartyLogin />
      </Modal>
    </>
  );
}
