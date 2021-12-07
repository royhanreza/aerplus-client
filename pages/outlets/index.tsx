import {
  Layout,
  PageHeader,
  Table,
  Tag,
  Space,
  Avatar,
  Button,
  Tooltip,
  Row,
  Col,
  Card,
  Statistic,
  Breadcrumb,
} from "antd";
import Head from "next/head";
// import styles from "../styles/Home.module.css";
import {
  UserOutlined,
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  DashOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import PageLayout from "../../components/layouts/Layout";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const { Content } = Layout;

const columns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (text: any) => <Avatar size="large" icon={<UserOutlined />} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags: any[]) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text: any, record: any) => (
      <div style={{ textAlign: "center" }}>
        <Space>
          <Tooltip title="Hapus">
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
            />
          </Tooltip>
          <Tooltip title="Ubah">
            <Button shape="circle" icon={<EditOutlined />} />
          </Tooltip>
          <Button shape="circle" icon={<DashOutlined />} />
        </Space>
      </div>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
    style: { textAlign: "center" },
  },
];

const routes = [
  {
    path: "index",
    breadcrumbName: "Home",
  },
  {
    path: "first",
    breadcrumbName: "Pegawai",
  },
  {
    path: "second",
    breadcrumbName: "Kelola",
  },
];

const OutletIndex: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Aer Plus - Outlet</title>
        <meta name="description" content="Aer plus is aer plus app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div style={{ padding: "0 24px", marginTop: 64 + 24 }}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Outlet</Breadcrumb.Item>
          </Breadcrumb>
          <PageHeader
            className="site-page-header"
            title="Outlet"
            subTitle="Kelola Outlet"
            // onBack={() => null}
            style={{
              // borderBottom: "1px solid rgb(235, 237, 240)",
              // marginBottom: 24,
              padding: 0,
              paddingBottom: 16,
            }}
          />
          <Content className="site-layout">
            <div style={{ marginBottom: 24 }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Total"
                      value={200}
                      precision={2}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<UserOutlined />}
                      // suffix="%"
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Aktif"
                      value={11.28}
                      precision={2}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<ArrowUpOutlined />}
                      suffix="%"
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Inaktif"
                      value={9.3}
                      precision={2}
                      valueStyle={{ color: "#cf1322" }}
                      prefix={<ArrowDownOutlined />}
                      suffix="%"
                    />
                  </Card>
                </Col>
              </Row>
            </div>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: "calc(100vh - (24px + 24px + 24px + 64px))",
              }}
            >
              <div style={{ marginBottom: 24, textAlign: "right" }}>
                <Space>
                  <Button icon={<DownloadOutlined />}>Export .xlsx</Button>
                  <Button
                    type="primary"
                    onClick={() => router.push("/outlets/create")}
                    icon={<PlusOutlined />}
                  >
                    {/* <Link href="/outlets/create">
                      <a>Outlet Baru</a>
                    </Link> */}
                    Outlet Baru
                  </Button>
                </Space>
              </div>
              <Table columns={columns} dataSource={data} />
            </div>
          </Content>
        </div>
      </PageLayout>
    </>
  );
};

export default OutletIndex;
