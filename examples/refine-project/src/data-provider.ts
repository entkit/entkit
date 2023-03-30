import {
    CrudFilters,
    CrudSorting,
    DataProvider,
    LogicalFilter,
} from "@refinedev/core";
import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";
import pluralize from "pluralize";
import camelCase from "camelcase";
import * as SorterEnums from "./sorter-enums";

export type Cursors = {
    before?: string;
    after?: string;
    first?: number;
    last?: number;
};

export type OrderQuery = {
    field: string;
    direction: "ASC" | "DESC";
};

function camel(str: string): string {
    return camelCase(str, { preserveConsecutiveUppercase: true });
}
function pascal(str: string): string {
    return camelCase(str, {
        preserveConsecutiveUppercase: true,
        pascalCase: true,
    });
}

export const generateOrderQuery = (
    resource: string,
    sort?: CrudSorting,
): undefined | OrderQuery => {
    if (sort && sort.length > 0) {
        if (sort.length > 1) {
            console.log(
                "Multiple sorts not supporting because of EntGQL right not supporting multiple orders, only first order is working: https://github.com/ent/ent/issues/2198",
            );
        }

        const fieldGroupName: keyof typeof SorterEnums = (pascal(resource) +
            "SorterEnums") as any;
        const fieldGroup = SorterEnums[fieldGroupName] as any;
        return {
            field: fieldGroup[sort[0].field],
            direction: sort[0].order.toUpperCase() as "ASC" | "DESC",
        };
    }
    return undefined;
};

export const generateFilter = (filters?: CrudFilters): Record<string, any> => {
    const queryFilters: Record<string, any> = {};

    if (filters) {
        filters.map((filter) => {
            if (
                filter.operator !== "or" &&
                filter.operator !== "and" &&
                "field" in filter
            ) {
                const { field, operator, value } = filter;
                if (operator === "eq") {
                    queryFilters[camel(field)] = value;
                } else {
                    queryFilters[camel(`${field}_${operator}`)] = value;
                }
            } else {
                const value = filter.value as LogicalFilter[];
                const orFilters: any[] = [];
                value.map((val) => {
                    if (val.operator === "eq") {
                        orFilters.push({
                            [camel(`${val.field}`)]: val.value,
                        });
                    } else {
                        orFilters.push({
                            [camel(`${val.field}_${val.operator}`)]: val.value,
                        });
                    }
                });
                queryFilters["or"] = orFilters;
            }
        });
    }

    return queryFilters;
};

const dataProvider = (client: GraphQLClient): Required<DataProvider> => {
    return {
        /** Done */
        getOne: async ({ resource, id, metaData }) => {
            const pluralRes = pluralize.plural(resource);
            const camelRes = camel(pluralRes);
            const operation = metaData?.operation || camelRes;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    where: {
                        value: {
                            id: id,
                        },
                        type: pascal(resource) + "WhereInput",
                        required: true,
                    },
                    first: 1,
                },
                fields: [
                    {
                        edges: [
                            {
                                node: metaData?.fields,
                            },
                        ],
                    },
                ],
            });

            const response = await client.request(query, variables);

            const data = response[operation].edges[0].node;
            for (const property in data) {
                if (data?.[property]?.["edges"]) {
                    data[pluralize.singular(property) + "IDs"] = data[property][
                        "edges"
                    ].map((e: any) => e.node["id"]);
                    data["_" + property] = data[property];
                    data[property] = data[property]["edges"].map(
                        (e: any) => e.node,
                    );
                    //delete data[property]
                } else if (data?.[property]?.["id"]) {
                    data[property + "ID"] = data?.[property]?.["id"];
                    //delete data[property]
                }
            }

            return {
                data,
            };
        },
        /** Done */
        getList: async ({
            resource,
            hasPagination = true,
            sort,
            filters,
            metaData,
        }) => {
            const orderBy = generateOrderQuery(resource, sort);
            const where = generateFilter(filters);

            const pluralRes = pluralize.plural(resource);
            const camelRes = camel(pluralRes);

            const operation = metaData?.operation || camelRes;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    // ...metaData?.variables,
                    // sort: sortBy,
                    // where: { value: filterBy, type: "JSON" },
                    q: metaData?.searchQuery,
                    where: {
                        type: pascal(resource) + "WhereInput",
                        value: where,
                    },
                    orderBy: {
                        type: pascal(resource) + "Order",
                        value: orderBy,
                    },
                    ...(hasPagination
                        ? {
                              after: {
                                  type: "Cursor",
                                  value: metaData?.cursors?.after,
                                  required: false,
                              },
                              before: {
                                  type: "Cursor",
                                  value: metaData?.cursors?.before,
                                  required: false,
                              },
                              first: {
                                  type: "Int",
                                  value: metaData?.cursors?.first,
                                  required: false,
                              },
                              last: {
                                  type: "Int",
                                  value: metaData?.cursors?.last,
                                  required: false,
                              },
                          }
                        : {}),
                },
                fields: [
                    {
                        edges: [
                            {
                                node: metaData?.fields || ["id"],
                            },
                        ],
                    },
                    {
                        pageInfo: [
                            "endCursor",
                            "startCursor",
                            "hasPreviousPage",
                            "hasNextPage",
                        ],
                    },
                    "totalCount",
                ],
            });

            const response = await client.request(query, variables);
            return {
                data: response[operation].edges.map((e: any) => e.node),
                pageInfo: response[operation].pageInfo,
                total: response[operation].totalCount,
            };
        },

        getMany: async ({ resource, ids, metaData }) => {
            const camelResource = camel(resource);

            const operation = metaData?.operation ?? camelResource;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    where: {
                        value: { id_in: ids },
                        type: "JSON",
                    },
                },
                fields: metaData?.fields,
            });

            const response = await client.request(query, variables);

            return {
                data: response[operation],
            };
        },

        create: async ({ resource, variables, metaData }) => {
            const singularResource = pluralize.singular(resource);
            const camelCreateName = camel(`create-${singularResource}`);

            const operation = metaData?.operation ?? camelCreateName;
            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    input: {
                        value: variables,
                        type: `Create${pascal(resource)}Input`,
                        required: true,
                    },
                },
                fields: metaData?.fields || ["id"],
            });
            const response = await client.request(query, gqlVariables);

            return {
                data: response[operation][singularResource],
            };
        },

        createMany: async ({ resource, variables, metaData }) => {
            const singularResource = pluralize.singular(resource);

            const operation =
                metaData?.operation ?? camel(`create-${singularResource}`);

            const response = await Promise.all(
                variables.map(async (param) => {
                    const { query, variables: gqlVariables } = gql.mutation({
                        operation: operation,
                        variables: {
                            input: {
                                value: { data: param },
                                type: `Create${pascal(singularResource)}Input`,
                            },
                        },
                        fields: metaData?.fields ?? [
                            {
                                operation: singularResource,
                                fields: ["id"],
                                variables: {},
                            },
                        ],
                    });
                    const result = await client.request(query, gqlVariables);

                    return result[operation][singularResource];
                }),
            );
            return {
                data: response,
            };
        },

        update: async ({ resource, id, variables, metaData }) => {
            const operation =
                metaData?.operation ?? `update${pascal(resource)}`;

            const cleanVars: Record<string, any> = {};
            for (const key in variables) {
                if (key.endsWith("IDs")) {
                    cleanVars[
                        camel(
                            "clear-" + pluralize.plural(key.replace("IDs", "")),
                        )
                    ] = true;
                    cleanVars[camel("add-" + key)] = variables[key];
                } else if (key.endsWith("ID")) {
                    cleanVars[camel("clear-" + key.replace("ID", ""))] = true;
                    cleanVars[key] = variables[key];
                } else if (variables[key] === null) {
                    cleanVars[camel("clear-" + key)] = true;
                } else {
                    cleanVars[key] = variables[key];
                }
            }
            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    input: {
                        value: cleanVars,
                        type: `Update${pascal(resource)}Input`,
                        required: true,
                    },
                    id: {
                        type: "ID",
                        value: id,
                        required: true,
                    },
                },
                fields: metaData?.fields ?? ["id"],
            });
            const response = await client.request(query, gqlVariables);
            return {
                data: response[operation],
            };
        },

        updateMany: async ({ resource, ids, variables, metaData }) => {
            const singularResource = pluralize.singular(resource);
            const camelUpdateName = camel(`update-${singularResource}`);

            const operation = metaData?.operation ?? camelUpdateName;

            const response = await Promise.all(
                ids.map(async (id) => {
                    const { query, variables: gqlVariables } = gql.mutation({
                        operation,
                        variables: {
                            input: {
                                value: { where: { id }, data: variables },
                                type: `${camelUpdateName}Input`,
                            },
                        },
                        fields: metaData?.fields ?? [
                            {
                                operation: singularResource,
                                fields: ["id"],
                                variables: {},
                            },
                        ],
                    });
                    const result = await client.request(query, gqlVariables);

                    return result[operation][singularResource];
                }),
            );
            return {
                data: response,
            };
        },

        deleteOne: async ({ resource, id, metaData }) => {
            const pluralRes = pluralize.plural(resource);
            const camelDeleteName = camel(`delete-${pluralRes}`);

            const operation = metaData?.operation ?? camelDeleteName;

            const { query, variables } = gql.mutation({
                operation,
                variables: {
                    where: {
                        type: pascal(resource) + "WhereInput",
                        value: { id: id },
                        required: true,
                    },
                },
            });

            const response = await client.request(query, variables);

            return {
                data: response[operation],
            };
        },

        deleteMany: async ({ resource, ids, metaData }) => {
            const pluralRes = pluralize.plural(resource);
            const camelDeleteName = camel(`delete-${pluralRes}`);

            const operation = metaData?.operation ?? camelDeleteName;

            const { query, variables } = gql.mutation({
                operation,
                variables: {
                    where: {
                        type: pascal(resource) + "WhereInput",
                        value: { idIn: ids },
                        required: true,
                    },
                },
            });

            const response = await client.request(query, variables);

            return {
                data: response[operation],
            };
        },

        getApiUrl: () => {
            throw Error("Not implemented on refine-graphql data provider.");
        },

        custom: async ({ url, method, headers, metaData }) => {
            let gqlClient = client;

            if (url) {
                gqlClient = new GraphQLClient(url, { headers });
            }

            if (metaData) {
                if (metaData.operation) {
                    if (method === "get") {
                        const { query, variables } = gql.query({
                            operation: metaData.operation,
                            fields: metaData.fields,
                            variables: metaData.variables,
                        });

                        const response = await gqlClient.request(
                            query,
                            variables,
                        );

                        return {
                            data: response[metaData.operation],
                        };
                    } else {
                        const { query, variables } = gql.mutation({
                            operation: metaData.operation,
                            fields: metaData.fields,
                            variables: metaData.variables,
                        });

                        const response = await gqlClient.request(
                            query,
                            variables,
                        );

                        return {
                            data: response[metaData.operation],
                        };
                    }
                } else {
                    throw Error("GraphQL operation name required.");
                }
            } else {
                throw Error(
                    "GraphQL need to operation, fields and variables values in metaData object.",
                );
            }
        },
    };
};

export default dataProvider;
