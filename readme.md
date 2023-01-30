# Ent-Refine "Everything is generated"

### Links
- Live demo here https://demo.entrefine.dev/
- Package https://pkg.go.dev/github.com/diazoxide/ent-refine

Ent-Refine is a union of two powerful frameworks [Ent](https://entgo.io/)(ORM) and [Refine](https://refine.dev/)(UI)

## Main futures
1. Generating CRUDs by Ent definitions
2. Every view of CRUD is customizable
3. Every field of every kind of list/form/show is customizable by annotations
4. Custom actions for items
5. Relational view, nested lists with edges
6. Search component to find records by every attribute, with a custom operator
7. Bulk actions on lists
8. Using Graphql API only with custom Refine data-provider,
9. Typescript types generating identically from Ent definitions
10. Filters on columns with customizable operators

![main.png](docs%2Fimages%2Fmain.png)

### Smart search as a killer future
![search.gif](docs%2Fimages%2Fsearch.gif)

> **Important:** platform is using a graphql as a data-provider interface **(GQL extension is mandatory)**

## How to set up?

### Add extension to your Ent framework `entc.go` file.

#### Example

```go
package main
import (
	//...
	"entgo.io/contrib/entgql"
	"github.com/diazoxide/ent-refine"
)

func main() {
	gqlEx, err := entgql.NewExtension(
		// Make sure that EntGql configs are wrapped
		EntRefine.EntgqlExtensionOptionsWrapper(
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
			// EntRefine configuration
			EntRefine.NewExtension(
				EntRefine.WithAppPath(filepath.Join("..", "refine"),
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
	q *string, // Added by Ent-Refine
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

e.g. `EntRefine.FilterOperator("contains")`

## Supporting annotations

### For Fields
* ImageField
* MainImageField
* TitleField
* CodeField
* URLField
* RichTextField
* HideOnList
* HideOnShow
* HideOnForm
* FilterOperator `EntRefine.FilterOperator("contains")`
* [FieldView](#custom-field-views)
* [FieldViewOnList](#custom-field-views)
* [FieldViewOnShow](#custom-field-views)
* [FieldViewOnForm](#custom-field-views)

### For Entities
  * Icon (field/entity) `EntRefine.Icon("some-antdesign-icon")`
  * [ListActions](#custom-list-actions-annotation) (entity)
  * NoList
  * NoShow
  * NoCreate
  * NoEdit

## Getting ready to use

1. After configuration regenerate Ent.
2. Your package.json file is changed so run `npm install` to get deps.
3. Check directory of refine application. On src directory you can find `ent-refine` folder with ent resources.
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

# Customization

## File `custom.tsx`

To customize Ent-Refine components you can find `./ent-refine/custom.tsx` file on your refine root directory.


## Custom List Actions Annotation

Add entity annotation to your schema

### Annotation Example
```
EntRefine.ListActions(
   EntRefine.ShowAction,
   EntRefine.DeleteAction,
   EntRefine.EditAction,
   EntRefine.Action{
       Name:  "Custom.MyPrettyButton",
       Attrs: map[string]any{},
   },
),
```

### Implementation Example

```tsx
// ./ent-refine/custom.tsx
//...
export type MyPrettyButtonProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonResourceProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps

export const MyPrettyButton: React.FC<MyPrettyButtonProps> = (props) => {
    return <Button
        icon={<RA.Icons.RadarChartOutlined/>}
        onClick={
            () => {
                alert(props.recordItemId)
            }
        }></Button>
}
//...
```

## Custom field views

On Ent-Refine every view of field is customizable for every type of layout.

### Special annotations
1. FieldView - *Forcing list and show views*
2. FieldViewOnList
3. FieldViewOnShow
4. FieldViewOnForm

### How to customize?

1. First create new React Component on [custom.tsx](#file-customtsx) (e.g. `MyCustomTitle`) with `ViewProps` type props.
   ```tsx
   import {ViewProps} from "./field-view";
   
   export const MyCustomTitle: React.FC<ViewProps<string>> = ({value}) => {
      return <RA.Typography.Text copyable={true} style={ {color: "red"} }>{ value }</RA.Typography.Text>
   }
   ```
2. Define type of field on schema by `EntRefine.FieldView` annotation
   ```go
   field.String("title").
        Annotations(
            ...
            EntRefine.FieldView("MyCustomTitle"),
            ...
        ),
   ```
   
3. Regenerate and check
    ![custom-list-field.png](docs%2Fimages%2Fcustom-list-field.png)
 
## Example
For more information please check example folder.

Both frameworks (Ent and Refine) are configured as described in documentation. 

## Contacts

**Linkedin**:  https://www.linkedin.com/in/aaron-yor/

**Discord**:   aaron․yordanyan#7556

**Phone**:     +374 98 471111