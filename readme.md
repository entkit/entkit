# entkit
Powerful tool that combines the power of two frameworks, [Ent](https://entgo.io/)(ORM) and [Refine](https://refine.dev/)(UI).

![GitHub contributors](https://img.shields.io/github/contributors/diazoxide/entkit)
[![GitHub issues](https://img.shields.io/github/issues/diazoxide/entkit)](https://github.com/entkit/entkit/issues)
[![GitHub stars](https://img.shields.io/github/stars/diazoxide/entkit)](https://github.com/entkit/entkit/stargazers)
![GitHub closed issues](https://img.shields.io/github/issues-closed/diazoxide/entkit)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/diazoxide/entkit)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/diazoxide/entkit)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/diazoxide/entkit)
[![GitHub license](https://img.shields.io/github/license/diazoxide/entkit)](https://github.com/entkit/entkit)

![cover.png](docs%2Fimages%2Fcover.svg)

It simplifies the process of generating CRUDs from Ent definitions with customizable views, fields, actions and search features.

![main.png](docs%2Fimages%2Fmain.png)

## Live Demo and Package Info
Live demo: https://demo.entkit.dev/

Go.dev Package: https://pkg.go.dev/github.com/entkit/entkit

## Roadmap
- [x] Generates CRUD operations based on Ent definitions
- [x] Customizable views for each CRUD operation
- [x] Customizable fields for lists, forms, and show views using annotations
- [x] Custom actions for items
  - [x] Actions on a list, show, or edit view that trigger a GraphQL mutation.
  - [x] Bulk actions on lists
- [x] Relational view with nested lists and edges
- [x] Smart search component to find records by every attribute with a custom operator
- [x] Uses only a Graphql API with a custom Refine data-provider
- [x] Generates TypeScript types from Ent definitions
- [x] Column filters with customizable operators
- [x] [Edges diagram graph view](#edges-diagram-graph-view) (with [gojs](https://github.com/NorthwoodsSoftware/GoJS) or [react-force-graph](https://github.com/vasturiano/react-force-graph))
- [ ] Nested create/edit
  - [ ] Ability to create edges from form
  - [ ] Ability to edit edges from form
- [ ] I18n support
- [ ] Keycloak Authentication
- [ ] Keycloak Authorization
- [ ] Filter by edges
- [ ] Sort by edges
- [ ] Godoc: provide comprehensive documentation

### Smart search
entkit provides a smart search component to easily find records by any attribute with a custom operator.
![search.gif](docs%2Fimages%2Fsearch.gif)

## Requirements
The platform uses a Graphql API as the data-provider interface and therefore a GQL extension is mandatory.

## How to set up?

### Extension registration on entc.go
Add extension to your Ent framework `entc.go` file.

#### Example

```go
package main
import (
	//...
	"entgo.io/contrib/entgql"
	"github.com/entkit/entkit"
)

func main() {
	gqlEx, err := entgql.NewExtension(
		// Make sure that EntGql configs are wrapped
		entkit.EntgqlExtensionOptionsWrapper(
			entgql.WithConfigPath("./gqlgen.yml"),
			entgql.WithSchemaGenerator(),
			entgql.WithSchemaPath("./graphql/ent.graphql"),
			entgql.WithWhereInputs(true),
		)...,
	)
	//...
	opts := []entc.Option{
		entc.Extensions(
			// GQL extension is mandatory
			gqlEx,
			// entkit configuration
			entkit.NewExtension(
				entkit.WithAppPath(filepath.Join("..", "refine"),
			),
		),
	}
	err = entc.Generate(schemaPath, config, opts...)
	//...
}
```

### Then Apply search query to your query resolvers WhereInput

This is important for smart-search component

> `EntityWhereInput.ApplySearchQuery(q)`

#### Example
```go
package graphql

import (
	"ent"
	"context"
	"github.com/google/uuid"
)

func (r *queryResolver) Companies(
	ctx context.Context,
	after *ent.Cursor,
	first *int,
	before *ent.Cursor,
	last *int,
	orderBy *ent.CompanyOrder,
	where *ent.CompanyWhereInput,
	q *string, // Added by entkit
) (*ent.CompanyConnection, error) {
	return r.client.Company.Query().Paginate(ctx, after, first, before, last,
		ent.WithCompanyOrder(orderBy),
		ent.WithCompanyFilter(
			where.ApplySearchQuery(q).Filter, // Applying query filter
		),
	)
}
```

### Configure your ent schemas with annotations

e.g. `entkit.FilterOperator("contains")`

## Supporting annotations

### For Fields

- **ImageField** - mark field as image
- **MainImageField** - mark field as main image field (force marking field as a **ImageField** too)
- **TitleField** - mark field as title field
- **CodeField** - mark field as code field
- **URLField** - mark field as url field
- **RichTextField** - mark field as rich text field
- **HideOnList** - hide field on list
- **HideOnShow** - hide field on show page
- **HideOnForm** - hide field on create and edit forms
- **HideOnEdit** - hide field on edit form
- **HideOnCreate** - hide field on create form
- **FilterOperator** `entkit.FilterOperator("contains")`
- [**View**](#custom-views) - custom view of field on list and show pages
- [**ViewOnList**](#custom-views) - custom view of field on list page
- [**ViewOnShow**](#custom-views) - custom view of field on show page
- [**ViewOnForm**](#custom-views) - custom view of field on form

### For Entities
- **Icon** (field/entity) - set icon of entity to show on navigation, breadcrumbs, edges, etc.
  * `entkit.Icon("some-antdesign-icon")`
- [**Actions**](#custom-actions) - custom actions
- **NoList** - disable list and hide entity from navigation
- **NoShow** - disable entity show page
- **NoCreate** - disable entity creat form
- **NoEdit** - disable entity edit form
- [**Badge**](#badge-view) - custom badge view of entity

## Getting ready to use

1. After configuration regenerate Ent.
2. Your package.json file is changed so run `npm install` to get deps.
3. Check directory of refine application. On src directory you can find `entkit` folder with ent resources.
4. Update your `App.ts` file
    ```tsx
    import React from "react";
    import "@pankod/refine-antd/dist/reset.css";
    import {Refine} from "@pankod/refine-core";
    import {ErrorComponent, Layout, notificationProvider, ReadyPage,} from "@pankod/refine-antd";
    import routerProvider from "@pankod/refine-react-router-v6";
    import {GraphQLClient} from "graphql-request";
    import {Resources} from "./entkit/resources";
    import dataProvider from "./entkit/data-provider";
    
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

### Example

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

#### Header component

```tsx
import {SearchComponent} from "../../entkit/search-component";

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

# Customization

## File `custom.tsx`

To customize entkit components you can find `./entkit/custom.tsx` file on your refine root directory.


## Custom Actions

Add entity annotation to your schema

### Annotation Example
```
entkit.Actions(
   entkit.ShowAction,
   entkit.DeleteAction,
   entkit.EditAction,
   entkit.Action{
        Operation: "myCustomGqlOperation",
        Fields: []string{
            "id", "title"
        },
        Label:          "Do something",
        FailMessage:    "Something bad happened",
        SuccessMessage: "${ resp.data.length } Pages processed",
        OnList:         true,
        OnShow:         true,
        Bulk:           true,
        Icon:           "RA.Icons.RadarChartOutlined",
   },
),
```

### Implementation Example

1. First you need to add custom graphql mutation with `WhereInput`
    ```graphql
    # ./mutations.graphql
    myCustomGqlOperation(where: PageWhereInput!): [Page!]
    ```
2. Then let's write mutation resolver
    ```go
    func (r *mutationResolver) MyCustomGqlOperation(ctx context.Context, where generated.PageWhereInput) ([]*generated.Page, error) {
        w, err := where.P()
        p, err := r.client.Page.Query().Where(w).All(ctx)
    
        err = someCustomAction(p...)
        if err != nil {
            return nil, err
        }
        return p, nil
    }
    ```
   
## Edges diagram graph view
The Edge Graph Diagram is an effective tool for visualizing 
the relationships between your entities. It presents an 
interactive representation of the edges, displaying record 
IDs and their connections to the main record, making it 
easier to understand and analyze complex data.

![edges-diagram.png](docs%2Fimages%2Fedges-diagram.png)

### How to enable

> **Important!**
> By default, the Edge Graph Diagram utilizes GoJS technology. 
Both GoJS and react-force-graph-2d are available options, 
allowing you to select the best solution for your needs. 
However, it's important to note that GoJS is a proprietary 
library and requires a license key purchased from the GoJS 
official website for commercial use. On the other hand, 
react-force-graph-2d is an open-source option.

### How to switch GoJS to react-force-graph-2d

Customize entkit extension configs on **entc.go** file

e.g.
```go
entRefine, err := entkit.NewExtension(
    ...
    entkit.WithForceGraph2D(
        entkit.ForceGraph2DOptions{
            Enabled: true,
        },
    ),
    entkit.WithDefaultEdgesDiagram('Diagram.ForceGraph2D'),
    ...
)
```

### GoJS license and configuration

e.g.
```go
entRefine, err := entkit.NewExtension(
    ...
    entkit.WithGoJs(
        entkit.GoJSOptions{
            Enabled: true,
            LicenseKey: "xxxxx-xxxxxx-xxxxx-xxxxx",
        },
    ),
    entkit.WithDefaultEdgesDiagram('Diagram.GoJS'),
    ...
)
```

## Custom views

On entkit every view of field is customizable for every type of layout.

### Special annotations
1. View - *Forcing list and show views*
2. ViewOnList
3. ViewOnShow
4. ViewOnForm

### How to customize?

1. First create new React Component on [custom.tsx](#file-customtsx) (e.g. `MyCustomTitle`) with `ViewProps` type props.
   ```tsx
   import {ViewProps} from "./view";
   
   export const MyCustomTitle: React.FC<ViewProps<string>> = ({value}) => {
      return <RA.Typography.Text copyable={true} style={ {color: "red"} }>{ value }</RA.Typography.Text>
   }
   ```
2. Define type of field on schema by `entkit.View` annotation
   ```go
   field.String("title").
        Annotations(
            ...
            entkit.View("MyCustomTitle"),
            ...
        ),
   ```
   
3. Regenerate and check
    ![custom-list-field.png](docs%2Fimages%2Fcustom-list-field.png)
 
## Custom Badge view

### What is a badge?
Badge is a public view of entity on other items edge views.
e.g. 
![img.png](docs/images/badge-view.png)

### Badge customization
First you need to create new React component like [Custom Views](#custom-views). 
Then use `Badge` annotation to connect it with entity. 

## Example
Check out the documentation for more information and examples.

Both frameworks (Ent and Refine) are configured as described in documentation. 

## Contacts
![logo.svg](docs%2Fimages%2Flogo.svg)
**Linkedin**:  https://www.linkedin.com/in/aaron-yor/

**Discord**:   aaron․yordanyan#7556

**Phone**:     +374 98 471111