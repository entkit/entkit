import React from "react";

import {Refine} from "@pankod/refine-core";
import {ErrorComponent, Layout, notificationProvider, ReadyPage} from "@pankod/refine-antd";

import "@pankod/refine-antd/dist/reset.css";
import routerProvider from "@pankod/refine-react-router-v6";
import {GraphQLClient} from "graphql-request";
import {Resources} from "./entrefine/resources";
import dataProvider from "./entrefine/data-provider";
import {Header} from "./components/header";
import {meta} from "./entrefine/definition";
import {Title} from "./components/title";

const client = new GraphQLClient(meta.graphqlUri);

function App() {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
            }}
            Header={Header}
            Title={Title}
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
