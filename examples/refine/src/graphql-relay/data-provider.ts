import {
    CrudFilters,
    CrudSorting,
    DataProvider,
    LogicalFilter,
} from "@pankod/refine-core";
import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";
import pluralize from "pluralize";
import camelCase from "camelcase";
import {BaseKey, BaseRecord, MetaDataQuery} from "@pankod/refine-core/dist/interfaces";

export type Cursors = {
    before?: string
    after?: string
    first?: number
    last?: number
}

export const genereteSort = (sort?: CrudSorting) => {
    if (sort && sort.length > 0) {
        const sortQuery = sort.map((i) => {
            return `${i.field}:${i.order}`;
        });

        return sortQuery.join();
    }

    return [];
};

export const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: any } = {};

    if (filters) {
        filters.map((filter) => {
            if (
                filter.operator !== "or" &&
                filter.operator !== "and" &&
                "field" in filter
            ) {
                const { field, operator, value } = filter;

                if (operator === "eq") {
                    queryFilters[`${field}`] = value;
                } else {
                    queryFilters[camelCase(`${field}_${operator}`)] = value;
                }
            } else {
                const value = filter.value as LogicalFilter[];

                const orFilters: any[] = [];
                value.map((val) => {
                    orFilters.push({
                        [`${val.field}_${val.operator}`]: val.value,
                    });
                });

                queryFilters["_or"] = orFilters;
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
            const camelRes = camelCase(pluralRes, {preserveConsecutiveUppercase: true});
            const operation = metaData?.operation || camelRes;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    where: {
                        value: {
                            id: id
                        },
                        type: resource+"WhereInput",
                        required: true
                    },
                    first: 1,
                },
                fields: [
                    {
                        edges: [
                            {
                                node: metaData?.fields
                            }
                        ],
                    },
                ],
            });

            const response = await client.request(query, variables);

            const data = response[operation].edges[0].node
            for (const property in data) {
                if (data?.[property]?.["edges"]){
                    data[pluralize.singular(property)+"IDs"] = data[property]["edges"].map((e:any)=>e.node["id"])
                    delete data[property]
                } else if (data?.[property]?.["id"]){
                    data[property+"ID"] = data?.[property]?.["id"]
                    delete data[property]
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


            const sortBy = genereteSort(sort);
            const where = generateFilter(filters);



            const pluralRes = pluralize.plural(resource);
            const camelRes = camelCase(pluralRes, {preserveConsecutiveUppercase: true});

            const operation = metaData?.operation || camelRes;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    // ...metaData?.variables,
                    // sort: sortBy,
                    // where: { value: filterBy, type: "JSON" },
                    ...(hasPagination ? {
                        after: {
                            type: "Cursor",
                            value: metaData?.cursors?.after,
                            required: false
                        },
                        before: {
                            type: "Cursor",
                            value: metaData?.cursors?.before,
                            required: false
                        },
                        first: {
                            type: "Int",
                            value: metaData?.cursors?.first,
                            required: false
                        },
                        last: {
                            type: "Int",
                            value: metaData?.cursors?.last,
                            required: false
                        },
                        where: {
                            type: resource+"WhereInput",
                            value: where,
                        },
                    } : {})
                },
                fields: [
                    {
                        edges: [
                            {
                                node: metaData?.fields || ["id"]
                            }
                        ],
                    },
                    {
                        pageInfo: [
                            "endCursor",
                            "startCursor",
                            "hasPreviousPage",
                            "hasNextPage"
                        ]
                    },
                    "totalCount"
                ],
            });

            const response = await client.request(query, variables);
            return {
                data: response[operation].edges.map((e:any)=>e.node),
                pageInfo: response[operation].pageInfo,
                total: response[operation].totalCount,
            };
        },

        getMany: async ({ resource, ids, metaData }) => {
            const camelResource = camelCase(resource, {preserveConsecutiveUppercase: true});

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
            const camelCreateName = camelCase(`create-${singularResource}`, {preserveConsecutiveUppercase: true});

            const operation = metaData?.operation ?? camelCreateName;
            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    input: {
                        value: variables,
                        type: `Create${resource}Input`,
                        required: true
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
            const camelCreateName = camelCase(`create-${singularResource}`, {preserveConsecutiveUppercase: true});

            const operation = metaData?.operation ?? camelCreateName;

            const response = await Promise.all(
                variables.map(async (param) => {
                    const { query, variables: gqlVariables } = gql.mutation({
                        operation,
                        variables: {
                            input: {
                                value: { data: param },
                                type: `${camelCreateName}Input`,
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

        update: async({ resource, id, variables, metaData }) => {
            const singularResource = pluralize.singular(resource);
            const camelUpdateName = camelCase(`update-${singularResource}`, {preserveConsecutiveUppercase: true});

            const operation = metaData?.operation ?? camelUpdateName;

            const cleanVars: Record<string, any> = {}
            for (const key in variables){
                if(key.endsWith("IDs")){
                    cleanVars[camelCase("clear-"+pluralize.plural(key.replace("IDs", "")))] = true
                    cleanVars[camelCase("add-"+key)] = variables[key]
                } else if(key.endsWith("ID")){
                    cleanVars[camelCase("clear-"+key.replace("ID", ""))] = true
                    cleanVars[key] = variables[key]
                } else{
                    cleanVars[key] = variables[key]
                }
            }
            console.log("CV",cleanVars)
            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    input: {
                        value: cleanVars,
                        type: `Update${resource}Input`,
                        required: true
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
                data: response[operation][singularResource],
            };
        },

        updateMany: async ({ resource, ids, variables, metaData }) => {
            const singularResource = pluralize.singular(resource);
            const camelUpdateName = camelCase(`update-${singularResource}`, {preserveConsecutiveUppercase: true});

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
            const camelDeleteName = camelCase(`delete-${pluralRes}`, {preserveConsecutiveUppercase: true});

            const operation = metaData?.operation ?? camelDeleteName;

            const { query, variables } = gql.mutation({
                operation,
                variables: {
                    where: {
                        type: `${resource}WhereInput`,
                        value: {id: id},
                        required: true,
                    }
                },
            });

            const response = await client.request(query, variables);

            return {
                data: response[operation],
            };
        },

        deleteMany: async ({ resource, ids, metaData }) => {
            const pluralRes = pluralize.plural(resource);
            const camelDeleteName = camelCase(`delete-${pluralRes}`, {preserveConsecutiveUppercase: true});

            const operation = metaData?.operation ?? camelDeleteName;

            const { query, variables } = gql.mutation({
                operation,
                variables: {
                    where: {
                        type: `${resource}WhereInput`,
                        value: {idIn: ids},
                        required: true,
                    }
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