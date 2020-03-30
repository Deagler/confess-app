## Getting started

1. Setup your `.env` with `REACT_APP_ENDPOINT_URL` to point to the graphql endpoint.
2. Run `npm start`

### Generating query type defintions

Run the following command from this folder, changing the graphql endpoint as necessary.

```
apollo client:codegen --target=typescript --endpoint=<graphql endpoint> --outputFlat src/types
```

### Local State Management

- We are using Apollo client for global state management as opposed to Redux.
- For more information on how to do this follow the existing examples in the application or see [here](https://www.apollographql.com/docs/react/data/local-state/)
