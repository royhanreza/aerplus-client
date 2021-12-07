import { useState } from "react";
import { Layout, Menu } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Sider } = Layout;
const { SubMenu } = Menu;

const rootSubmenuKeys = ["outlet"];

const LayoutSider = () => {
  const [openKeys, setOpenKeys] = useState(["outlet"]);

  const onOpenChange = (keys: any[]) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["outlet_outlet"]}
        style={{ paddingTop: "calc(63px + 10px)" }}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <SubMenu key="outlet" icon={<ShopOutlined />} title="Outlet">
          <Menu.Item key="outlet_outlet">
            <Link href="/outlets">
              <a>Outlet</a>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default LayoutSider;
