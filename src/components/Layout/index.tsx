import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  MailOutlined,
  UserAddOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useLayoutStore } from "./LayoutState/store";
import { LoginForm } from "../Account/LoginForm";
import RegisterForm from "../Account/RegisterForm";
import GetInTouch from "../GetInTouch/GetInTouch";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutComponent = () => {
  const store = useLayoutStore();
  const { setLoginActive, setRegisterActive, setContactActive } = store;
  const [user, setUser] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <LayoutStyles>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item
              onClick={() => setLoginActive()}
              key="1"
              icon={<LockOutlined />}
            >
              Login
            </Menu.Item>
            <Menu.Item
              onClick={() => setRegisterActive()}
              key="2"
              icon={<UserAddOutlined />}
            >
              Register
            </Menu.Item>
            {user && (
              <>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                  <Menu.Item key="3">Tom</Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
              </>
            )}

            <Menu.Item
              onClick={() => setContactActive()}
              key="9"
              icon={<MailOutlined />}
            >
              Get in touch
            </Menu.Item>
          </Menu>
        </Sider>
        <RenderLayout />
      </Layout>
    </LayoutStyles>
  );
};

const RenderLayout = () => {
  const store = useLayoutStore();
  const { contact, login, register } = store;

  return (
    <Layout className="site-layout">
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>account</Breadcrumb.Item>
          <Breadcrumb.Item>{login ? "Login" : null}</Breadcrumb.Item>
          <Breadcrumb.Item>{register ? "Register" : null}</Breadcrumb.Item>
          <Breadcrumb.Item>{contact ? "Contact" : null}</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          {login && <LoginForm />}
          {register && <RegisterForm />}
          {contact && <GetInTouch />}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©2021 Created by imran irshad
      </Footer>
    </Layout>
  );
};

const LayoutStyles = styled.div`
  #components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
`;

export default LayoutComponent;
