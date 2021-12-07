import {
  Layout,
  PageHeader,
  Breadcrumb,
  Button,
  Steps,
  message,
  Form,
  Input,
  Checkbox,
  Row,
  Col,
  Typography,
  InputNumber,
  Divider,
} from "antd";
import Head from "next/head";
import PageLayout from "../../components/layouts/Layout";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import InformationForm from "../../components/outlets/InformationForm";
import GoodsForm from "../../components/outlets/GoodsForm";
import LocationForm from "../../components/outlets/LocationForm";
import { FormInstance } from "rc-field-form";
import _merge from "lodash/merge";
import axios from "axios";

const { Content } = Layout;
const { Step } = Steps;

interface Step {
  title: string;
  content?: string;
  description?: string;
}

const steps: Step[] = [
  {
    title: "Informasi",
    content: "First-content",
    description: "Informasi dasar outlet",
  },
  {
    title: "Barang & Stok",
    content: "Second-content",
    description: "Barang dan stok outlet",
  },
  {
    title: "Lokasi",
    content: "Last-content",
    description: "Alamat dan lokasi outlet",
  },
];

interface ILocation {
  latitude?: number;
}

interface IInformation {
  account_name: string;
  address: string;
  code: string;
  daily_target: number;
  name: string;
  phone: string;
  tank_capacity: string;
}

interface ILocation {
  latitude?: number;
  longitude?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const OutletCreate: NextPage = () => {
  const router = useRouter();
  const [informationForm] = Form.useForm();
  const [goodsForm] = Form.useForm();
  const [locationForm] = Form.useForm();

  const [current, setCurrent] = useState(0);

  const [information, setInformation] = useState<IInformation | null>(null);
  const [goods, setGoods] = useState(null);
  const [location, setLocation] = useState<ILocation | null>(null);
  const [loading, setLoading] = useState(false);

  const onInformationFormFinish = (values: any) => {
    setInformation(values);
    next();
  };

  const onGoodsFormFinish = (values: any) => {
    setGoods(values);
    next();
  };

  const onLocationFormFinish = (values: any) => {
    setLocation(values);

    // console.log(information, goods, values);
    const mergedFormValues = _merge(information, goods, values);
    console.log(mergedFormValues);
    sendData(mergedFormValues);
  };

  const sendData = (requestObject: any) => {
    const hide = message.loading("Action in progress..", 0);
    setLoading(true);
    axios
      .post(API_URL + "/api/outlets", requestObject)
      .then((res) => {
        hide();
        console.log(res);
      })
      .catch((err) => {
        hide();
        console.log(err.response);
        const { data } = err.response;
        message.error(data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFormFinishFailed = (content: string) => {
    message.error(content);
  };

  const onSubmitForm = (form: FormInstance) => {
    form.submit();
  };

  const [lng, setLng] = useState(106.816666);
  const [lat, setLat] = useState(-6.2);
  const [zoom, setZoom] = useState(9);

  const setLatLng = (lat: number, lng: number) => {
    setLat(lat);
    setLng(lng);
    locationForm.setFieldsValue({ latitude: lat });
    locationForm.setFieldsValue({ longitude: lng });
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <>
      <Head>
        <title>Aer Plus - Tambah Outlet</title>
        <meta name="description" content="Aer plus is aer plus app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div style={{ padding: "0 24px", marginTop: 64 + 24 }}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href="/outlets">
                <a>Outlet</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tambah</Breadcrumb.Item>
          </Breadcrumb>
          <PageHeader
            className="site-page-header"
            title="Outlet"
            // breadcrumb={{ routes }}
            subTitle="Tambah Outlet"
            onBack={() => router.push("/outlets")}
            style={{
              // borderBottom: "1px solid rgb(235, 237, 240)",
              // marginBottom: 24,
              padding: 0,
              paddingBottom: 16,
            }}
          />
          <Content className="site-layout">
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: "calc(100vh - (24px + 24px + 24px + 64px))",
              }}
            >
              <Row justify="center" style={{ padding: "10px 0" }}>
                <Col span={16} xl={16} md={24}>
                  <Steps current={current}>
                    {steps.map((item: Step) => (
                      <Step
                        key={item.title}
                        title={item.title}
                        description={item.description}
                      />
                    ))}
                  </Steps>
                </Col>
              </Row>
              <div className="steps-content" style={{ marginTop: 50 }}>
                <Row justify="center">
                  <Col
                    span={16}
                    xl={16}
                    md={24}
                    // style={{ border: "1px solid #f0f0f0", padding: 40 }}
                  >
                    {current == 0 && (
                      <InformationForm
                        form={informationForm}
                        onFinish={onInformationFormFinish}
                        onFinishFailed={() =>
                          onFormFinishFailed("Isi Form dengan sesuai")
                        }
                      />
                    )}
                    {current == 1 && (
                      <GoodsForm
                        form={goodsForm}
                        onFinish={onGoodsFormFinish}
                        onFinishFailed={() =>
                          onFormFinishFailed("Isi Form dengan sesuai")
                        }
                      />
                    )}
                    {current == 2 && (
                      <LocationForm
                        form={locationForm}
                        onFinish={onLocationFormFinish}
                        onFinishFailed={() =>
                          onFormFinishFailed("Isi Form dengan sesuai")
                        }
                        current={current}
                        lat={lat}
                        lng={lng}
                        zoom={zoom}
                        setLatLng={setLatLng}
                        onChangeLat={setLat}
                        onChangeLng={setLng}
                      />
                    )}
                  </Col>
                </Row>
              </div>
              <div className="steps-action" style={{ marginTop: 20 }}>
                <Row justify="center">
                  <Col>
                    {current == 0 && (
                      <Button
                        style={{ margin: "0 8px" }}
                        onClick={() => {
                          onSubmitForm(informationForm);
                        }}
                        type="primary"
                      >
                        Barang & Stok
                        <ArrowRightOutlined />
                      </Button>
                    )}
                    {current == 1 && (
                      <>
                        <Button
                          style={{ margin: "0 8px" }}
                          onClick={() => prev()}
                          icon={<ArrowLeftOutlined />}
                        >
                          Informasi
                        </Button>
                        <Button
                          style={{ margin: "0 8px" }}
                          onClick={() => {
                            onSubmitForm(goodsForm);
                          }}
                          type="primary"
                        >
                          Lokasi
                          <ArrowRightOutlined />
                        </Button>
                      </>
                    )}
                    {current == 2 && (
                      <>
                        <Button
                          style={{ margin: "0 8px" }}
                          onClick={() => prev()}
                          icon={<ArrowLeftOutlined />}
                          disabled={loading}
                        >
                          Barang & Stok
                        </Button>
                        <Button
                          style={{ margin: "0 8px" }}
                          onClick={() => {
                            onSubmitForm(locationForm);
                          }}
                          type="primary"
                          disabled={loading}
                        >
                          Simpan
                          <CheckCircleOutlined />
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </Content>
        </div>
      </PageLayout>
    </>
  );
};

export default OutletCreate;
