import React from "react";
import * as List from "./list";
import * as Show from "./show";
import * as Create from "./create";
import * as Edit from "./edit";
import { Login } from "./login";
import { Header } from "./header";
import { Authenticated } from "@refinedev/core";
import { ErrorComponent, Layout } from "@refinedev/antd";
import { Route, Routes, Outlet } from "react-router-dom";
import {
    NavigateToResource,
    CatchAllNavigate,
} from "@refinedev/react-router-v6";

export const RoutesBundle: React.FC = () => {
    return (
        <Routes>
            <Route
                element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                        <Layout Header={Header}>
                            <Outlet />
                        </Layout>
                    </Authenticated>
                }
            >
                <Route
                    index
                    element={<NavigateToResource resource="company" />}
                />

                <Route path="/company">
                    <Route index element={<List.CompanyList />} />
                    <Route path="show/:id" element={<Show.CompanyMainShow />} />
                    <Route path="edit/:id" element={<Edit.CompanyEdit />} />
                </Route>

                <Route path="/country">
                    <Route index element={<List.CountryList />} />
                    <Route path="show/:id" element={<Show.CountryMainShow />} />
                    <Route path="edit/:id" element={<Edit.CountryEdit />} />
                </Route>

                <Route path="/email">
                    <Route index element={<List.EmailList />} />
                    <Route path="show/:id" element={<Show.EmailMainShow />} />
                    <Route path="edit/:id" element={<Edit.EmailEdit />} />
                </Route>

                <Route path="/image">
                    <Route index element={<List.ImageList />} />
                    <Route path="show/:id" element={<Show.ImageMainShow />} />
                    <Route path="edit/:id" element={<Edit.ImageEdit />} />
                </Route>

                <Route path="/location">
                    <Route index element={<List.LocationList />} />
                    <Route
                        path="show/:id"
                        element={<Show.LocationMainShow />}
                    />
                    <Route path="edit/:id" element={<Edit.LocationEdit />} />
                </Route>

                <Route path="/phone">
                    <Route index element={<List.PhoneList />} />
                    <Route path="show/:id" element={<Show.PhoneMainShow />} />
                    <Route path="edit/:id" element={<Edit.PhoneEdit />} />
                </Route>

                <Route path="/product">
                    <Route index element={<List.ProductList />} />
                    <Route path="show/:id" element={<Show.ProductMainShow />} />
                    <Route path="edit/:id" element={<Edit.ProductEdit />} />
                </Route>

                <Route path="/vendor">
                    <Route index element={<List.VendorList />} />
                    <Route path="show/:id" element={<Show.VendorMainShow />} />
                    <Route path="edit/:id" element={<Edit.VendorEdit />} />
                </Route>

                <Route path="/warehouse">
                    <Route index element={<List.WarehouseList />} />
                    <Route
                        path="show/:id"
                        element={<Show.WarehouseMainShow />}
                    />
                    <Route path="edit/:id" element={<Edit.WarehouseEdit />} />
                </Route>

                <Route path="/website">
                    <Route index element={<List.WebsiteList />} />
                    <Route path="show/:id" element={<Show.WebsiteMainShow />} />
                    <Route path="edit/:id" element={<Edit.WebsiteEdit />} />
                </Route>
            </Route>

            <Route
                element={
                    <Authenticated fallback={<Outlet />}>
                        <NavigateToResource resource="posts" />
                    </Authenticated>
                }
            >
                <Route path="/login" element={<Login />} />
            </Route>

            <Route
                element={
                    <Authenticated>
                        <Layout>
                            <Outlet />
                        </Layout>
                    </Authenticated>
                }
            >
                <Route path="*" element={<ErrorComponent />} />
            </Route>
        </Routes>
    );
};
