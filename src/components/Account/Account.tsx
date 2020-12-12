import React, { useState } from "react";
import { Drawer, Button } from "antd";

const Account = () => {
  const [visible, setVisible] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(true);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open drawer
      </Button>
      <Drawer
        title="Multi-level drawer"
        width={520}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Button type="primary" onClick={showChildrenDrawer}>
          Two-level drawer
        </Button>
        <Drawer
          closeIcon={true}
          title="Two-level Drawer"
          width={320}
          closable={false}
          onClose={onChildrenDrawerClose}
          visible={childrenDrawer}
        >
          This is two-level drawer
        </Drawer>
      </Drawer>
    </>
  );
};

export default Account;
