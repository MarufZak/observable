# Observable

A lightweight reactive programming library for JavaScript and TypeScript.

## Features

Basically everything you can do with builtin Proxy.

- Create observable objects and functions
- Track property access, modification, and deletion
- Monitor function calls and method invocations
- Build reactive systems with minimal overhead
- TypeScript support with full type definitions

## Installation

```bash
npm install @marufzak/observable
```

## Usage

```typescript
import { createObservable } from "@marufzak/observable";

const user = {
    name: "John",
    age: 30,
};

function observer(event) {
    console.log(`[${event.type}]`, event);
}

const observableUser = createObservable(user, observer);

observableUser.name = "Jane"; // Triggers set trap
console.log(observableUser.age); // Triggers get trap
```

## Examples

Check out the [examples directory](./examples) for more usage examples.

## License

MIT © [Ma'ruf Zakirov](LICENSE)
