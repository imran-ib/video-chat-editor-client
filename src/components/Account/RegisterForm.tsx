import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
  notification,
  Alert,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useCreateUsersMutation } from "../../../generated/graphql";
import { useAuthStore } from "./AccountState/authState";

type RegisterProps = {
  agreement: boolean;
  confirm: string;
  displayName: string;
  email: string;
  password: string;
  username: string;
};

const RegisterForm = () => {
  const [NewUser, { loading, error }] = useCreateUsersMutation({
    onCompleted: (data) => {
      notification.open({
        message: " Registration Successful! 🙂 ",
        description:
          "New account is created and Your Are Logged in Successfully. ",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
      dispatch({
        type: "Login",
        payload: data?.NewUser,
      });
    },
  });
  const [form] = Form.useForm();
  const dispatch = useAuthStore((state) => state.dispatch);

  const onFinish = (values: RegisterProps) => {
    NewUser({
      variables: {
        displayName: values.displayName,
        email: values.email,
        username: values.username,
        password: values.password,
      },
    });
  };

  return (
    <div>
      {error && (
        <Alert
          message="Error"
          description={error.message}
          type="error"
          showIcon
        />
      )}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="UserName"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="displayName"
          label={
            <span>
              DisplayName&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please input your displayName!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept agreement"),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox disabled={loading}>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button disabled={loading} type="primary" htmlType="submit">
            {loading ? "Please wait..." : "Register"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default RegisterForm;
