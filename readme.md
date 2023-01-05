## Generate admin dashboard with Refine.js by ent definitions.

> **Important:** using graphql as a data-provider interface **(GQL extension is mandatory)**

Add extension to `entc.go`

```go
package main

import (
	//...
	"entgo.io/contrib/entgql"
	"github.com/diazoxide/ent-refine"
)

func main() {
	//...
	opts := []entc.Option{
		entc.Extensions(
			// GQL extension is mandatory
			gqlEx,
			// EntRefine configuration
			EntRefine.New().AppPath(filepath.Join("..", "refine")),
		),
	}
	err = entc.Generate(schemaPath, config, opts...)
	//...
}

```

## Supporting annotations

* TitleField (field)
* CodeField (field)
* RichTextField (field)
* ImageField (field)
* MainImageField (field)
* HideOnList (field)
* HideOnShow (field)
* HideOnForm (field)
* FilterOperator (field) `EntRefine.FilterOperator("contains")`
* Icon (field/entity) `EntRefine.Icon("some-antdesign-icon")`

## Getting ready to use

1. After configuration regenerate Ent.
2. Your package.json file is changed so run `npm install` to get deps.
3. Check directory of refine application. On src directory you can find `ent-refine` folder with generated resources.
4. Update your `App.ts` file
    ```tsx
    import React from "react";
    import "@pankod/refine-antd/dist/reset.css";
    import {Refine} from "@pankod/refine-core";
    import {ErrorComponent, Layout, notificationProvider, ReadyPage,} from "@pankod/refine-antd";
    import routerProvider from "@pankod/refine-react-router-v6";
    import {GraphQLClient} from "graphql-request";
    import {Resources} from "./ent-refine/resources";
    import dataProvider from "./ent-refine/data-provider";
    
    // Provide your graphql query endpoint
    const client = new GraphQLClient("http://localhost:8081/query");
    
    function App() {
        return (
            <Refine
                routerProvider={routerProvider}
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
    ```
5. Run `npm run dev`
6. Ready

## Search Component `<SearchComponent/>`

### How it works?

Querying all fields with your defined operator (**FilterOperator Annotation**) included UUID

#### Root App
```tsx
function App() {
    return (
        <Refine
            //...
            Header={Header}
            //...
        />
    );
}
```

#### Your Header component
```tsx
import {SearchComponent} from "../../ent-refine/search-component";

export const Header: React.FC = () => {
    const screens = useBreakpoint();
    return (
        <AntdHeader style={{
            padding: "0 24px",
            background: "white",
        }}>
            <Row align="middle"
                 style={{
                     justifyContent: screens.sm ? "space-between" : "end",
                 }}>
                <Col xs={0} sm={12}>
                    <SearchComponent/>
                </Col>
            </Row>
        </AntdHeader>
    );
};
```
