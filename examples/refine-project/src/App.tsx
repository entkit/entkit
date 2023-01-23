import React from "react";

import {Refine} from "@pankod/refine-core";
import {ErrorComponent, Layout, notificationProvider, ReadyPage,} from "@pankod/refine-antd";

import "@pankod/refine-antd/dist/reset.css";
import routerProvider from "@pankod/refine-react-router-v6";
import {GraphQLClient} from "graphql-request";
import {Resources} from "./ent-refine/resources";
import dataProvider from "./ent-refine/data-provider";
import {Header} from "./components/header";

const client = new GraphQLClient(process.env.REACT_APP_GQL_URI || "http://localhost/query");

function App() {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
            }}
            Header={Header}
            dataProvider={dataProvider(client)}
            Layout={Layout}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent/>}
            resources={Resources}
        />
    );
}

export default App;