# react-native-bixolon-printer
Modulo de impressão bixolon
## Installation

```sh
npm install react-native-bixolon-printer

```
ou 

```sh
yarn add react-native-bixolon-printer

```

## Usage

```js
import {findDevices} from 'react-native-bixolon-printer';

// ...

    let dispositivos = await findDevices();
    setResult(dispositivos);

```

```js
import {conectar,configure} from 'react-native-bixolon-printer';

// ...

await conectar(e.macAddress);

await configure(1850,840); // opcional

```


```js
import {printZpl} from 'react-native-bixolon-printer';

// ...

await printZpl(`^XA.......^XZ`)

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
