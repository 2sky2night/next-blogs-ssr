"use client";
import { Avatar } from "antd";

export default function UserInfo(props: UserInfo) {
  return (
    <>
      <Avatar src={props.avatar_url} size='large' alt={`${props.username}'s avatar`}></Avatar>
      <span>{props.username}</span>
    </>
  );
}
