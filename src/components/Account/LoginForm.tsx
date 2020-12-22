import React from "react";
import { Form, Input, Button, Checkbox, notification, Alert } from "antd";
import styled from "styled-components";
import { customMedia } from "../styles/Global";
import { useLoginMutation } from "../../../generated/graphql";
import { useAuthStore } from "./AccountState/authState";
import { useRouter } from "next/router";
import { useUser } from "./AccountState/Hooks/useUser";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const LoginForm = () => {
  const dispatch = useAuthStore((state) => state.dispatch);
  const user = useUser();
  console.log("🚀 ~ file: LoginForm.tsx ~ line 23 ~ LoginForm ~ user", user);
  const Router = useRouter();
  const [UserLogin, { loading, error }] = useLoginMutation({
    onCompleted: (data) => {
      notification.open({
        message: "Success! 🙂 ",
        description: "Your Are Logged in Successfully. ",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
      dispatch({
        type: "Login",
        payload: data?.UserLogin,
      });
      Router.push(`/task?token=${data.UserLogin.token}`);
    },
  });

  const onFinish = (values: { email: string; password: string }) => {
    UserLogin({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {error && (
        <Alert
          message="Error"
          description={error.message}
          type="error"
          showIcon
        />
      )}
      <LoginFormStyles
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox disabled={loading}>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button disabled={loading} type="primary" htmlType="submit">
            {loading ? "Submitting...." : "Submit"}
          </Button>
        </Form.Item>
      </LoginFormStyles>
    </>
  );
};

const LoginFormStyles = styled(Form)`
  width: 70%;
  margin-top: 10rem;
  ${customMedia.lessThan("medium")`;
        width: 100%;
`}
`;
