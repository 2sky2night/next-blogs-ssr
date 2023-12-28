"use client";
import React, { FormEvent, useCallback, useMemo, useState } from "react";
import { Button, Form, Input, Select, Tag, message } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { postAricleAPI } from "@/api/article";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";

type FieldType = {
  title?: string;
  content?: string;
};

export default function PostsForm({
  tags,
}: {
  tags: { value: number; label: string }[];
}) {
  // 路由导航
  const router = useRouter();
  // 用户数据
  const token = useUserStore((s) => s.token);
  // 数据
  const [data, setData] = useState<PostArticleBody>({
    tids: [],
    title: "",
    content: "",
  });
  // 格式化tids
  const tids = useMemo(
    () => data.tids.map((item) => String(item)),
    [data.tids]
  );

  // 更新标题
  const handleUpdateTitle = useCallback((e: FormEvent) => {
    setData((pre) => ({ ...pre, title: (e.target as HTMLInputElement).value }));
  }, []);

  // 更新内容
  const handleUpdateContent = useCallback((e: FormEvent) => {
    setData((pre) => ({
      ...pre,
      content: (e.target as HTMLInputElement).value,
    }));
  }, []);

  // 更新标签
  const handleUpdateTids = useCallback((value: string[]) => {
    setData((pre) => {
      return {
        ...pre,
        tids: value.map((item) => Number(item)),
      };
    });
  }, []);

  // 定制渲染标签
  const tagRender = useCallback((props: CustomTagProps) => {
    const { value, closable, onClose } = props;
    const item = tags.find((item) => item.value == value);
    // 点击关闭的回调
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}>
        {item?.label}
      </Tag>
    );
  }, []);

  // 提交表单
  const onFinish = async () => {
    await postAricleAPI(data, token as string);
    router.push("/");
    message.success("Publish article successfuly!");
  };
  // 失败
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: "80%", position: "absolute", left: "-30px" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input article title!" }]}>
          <Input
            value={data.title}
            onInput={handleUpdateTitle}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Content"
          name="content"
          rules={[
            { required: true, message: "Please input article content!" },
          ]}>
          <Input.TextArea
            style={{ height: 200, resize: "none" }}
            value={data.content}
            onInput={handleUpdateContent}
          />
        </Form.Item>

        <Form.Item
          label="Artile Tags"
          name="tids">
          <Select
            mode="multiple"
            options={tags}
            value={tids}
            tagRender={tagRender}
            onChange={handleUpdateTids}></Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
          style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
