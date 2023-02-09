FROM golang:1.19-alpine

WORKDIR /app
ADD . /app

ARG GRAPHQL_URI="http://lcoalhost/query"
ENV GRAPHQL_URI=$GRAPHQL_URI

# Deps
RUN apk add --no-cache alpine-sdk
RUN apk add --no-cache nodejs npm

# Build
RUN ls -la
RUN go mod tidy
RUN cd examples/ent-project; go generate
RUN go build ./examples/ent-project/server/server.go

# Run binary
CMD ["./server"]