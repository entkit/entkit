import React, { useState } from "react";
import { AuthBindings, Authenticated, Refine } from "@refinedev/core";
import { ErrorComponent, Layout, notificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { GraphQLClient } from "graphql-request";
import dataProvider from "./data-provider";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { RoutesBundle } from "./routes";
import { graphqlUrl } from "./environment";
import * as AntdIcons from "@ant-design/icons";

const client = new GraphQLClient(graphqlUrl);

function App() {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(client)}
                notificationProvider={notificationProvider}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "company",
                        list: "/company",
                        show: "/company/show/:id",
                        edit: "/company/edit/:id",
                        meta: {
                            icon: <AntdIcons.ShopOutlined />,
                        },
                    },
                    {
                        name: "country",
                        list: "/country",
                        show: "/country/show/:id",
                        edit: "/country/edit/:id",
                        meta: {
                            icon: <AntdIcons.GlobalOutlined />,
                        },
                    },
                    {
                        name: "email",
                        list: "/email",
                        show: "/email/show/:id",
                        edit: "/email/edit/:id",
                        meta: {
                            icon: <AntdIcons.MailOutlined />,
                        },
                    },
                    {
                        name: "image",
                        list: "/image",
                        show: "/image/show/:id",
                        edit: "/image/edit/:id",
                        meta: {
                            icon: <AntdIcons.CameraOutlined />,
                        },
                    },
                    {
                        name: "location",
                        list: "/location",
                        show: "/location/show/:id",
                        edit: "/location/edit/:id",
                        meta: {
                            icon: <AntdIcons.PushpinOutlined />,
                        },
                    },
                    {
                        name: "phone",
                        list: "/phone",
                        show: "/phone/show/:id",
                        edit: "/phone/edit/:id",
                        meta: {
                            icon: <AntdIcons.PhoneOutlined />,
                        },
                    },
                    {
                        name: "product",
                        list: "/product",
                        show: "/product/show/:id",
                        edit: "/product/edit/:id",
                        meta: {
                            icon: <AntdIcons.FileOutlined />,
                        },
                    },
                    {
                        name: "vendor",
                        list: "/vendor",
                        show: "/vendor/show/:id",
                        edit: "/vendor/edit/:id",
                        meta: {
                            icon: <AntdIcons.StarOutlined />,
                        },
                    },
                    {
                        name: "warehouse",
                        list: "/warehouse",
                        show: "/warehouse/show/:id",
                        edit: "/warehouse/edit/:id",
                        meta: {
                            icon: <AntdIcons.OrderedListOutlined />,
                        },
                    },
                    {
                        name: "website",
                        list: "/website",
                        show: "/website/show/:id",
                        edit: "/website/edit/:id",
                        meta: {
                            icon: <AntdIcons.LinkOutlined />,
                        },
                    },
                ]}
            >
                <RoutesBundle />
                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
}

export default App;
