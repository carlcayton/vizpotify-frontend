When creating custom hooks with React Query, follow these best practices:

1. Use the object syntax for `useQuery`:

```typescript
const useCustomQuery = (param: ParamType | undefined) => {
  return useQuery({
    queryKey: ['queryName', param],
    queryFn: () => fetchFunction(param as ParamType),
    enabled: !!param,
    // Add other options as needed
  })
}
```

2. Structure the custom hook:
   - Name the hook using the `use` prefix followed by a descriptive name.
   - Accept parameters that will be used in the query.
   - Return the result of `useQuery`.

3. Define the query key:
   - Use an array for the query key.
   - Include a string identifier as the first element.
   - Add any dynamic parameters as subsequent elements.

4. Define the query function:
   - Use an arrow function that calls your API function.
   - Pass necessary parameters to the API function.
   - Use type assertion if needed to handle undefined parameters.

5. Set the `enabled` option:
   - Use a boolean condition to determine if the query should run.
   - Typically, check if required parameters are defined.

6. Add other options as needed:
   - Include `staleTime`, `cacheTime`, `refetchInterval`, etc., as appropriate for your use case.

7. Utilize type inference where possible, but add type annotations if needed for clarity:

```typescript
const useCustomQuery = (param: ParamType | undefined) => {
  return useQuery<ReturnType, ErrorType>({
    // ... query configuration
  })
}
```

8. For reusability, consider extracting common options into a separate object:

```typescript
const defaultOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
}

const useCustomQuery = (param: ParamType | undefined) => {
  return useQuery({
    ...defaultOptions,
    queryKey: ['queryName', param],
    queryFn: () => fetchFunction(param as ParamType),
    enabled: !!param,
  })
}
```

By following these guidelines, you'll create consistent, readable, and maintainable custom hooks with React Query.