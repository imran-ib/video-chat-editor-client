import React from "react";
import { Form, Input, Button, Alert, notification } from "antd";
import { useGetInTouchMutation } from "../../../generated/graphql";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const GetInTouch = () => {
  const [GetInTouch, { loading, error }] = useGetInTouchMutation({
    onCompleted: () => {
      notification.open({
        message: "Success! 🙂 ",
        description:
          "Thank You For Contacting with us. We Will Get Back To You As Soon As Possible ",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    },
  });
  const onFinish = (values: {
    name: string;
    email: string;
    message: string;
  }) => {
    console.log(values);
    GetInTouch({
      variables: {
        ...values,
      },
    });
  };
  return (
    <div>
      <h1>Contact</h1>
      {error && (
        <Alert
          message="Error"
          description={error.message}
          type="error"
          showIcon
        />
      )}
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="message" label="Message">
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            {loading ? "Please wait.." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GetInTouch;
