# {{ library }}

![npm](https://img.shields.io/npm/v/{{ name }}.svg) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> {{ description }}

## Installation

```
npm install --save {{ name }}
```

## Usage

``` js
import Vue from 'vue'
import {{ library }} from '{{ name }}'

Vue.use({{ library }})
```

Import CSS
``` html
<link ref="stylesheet" src="{{ name }}/dist/{{ name }}.css"></link>
```
Or
``` js
import '{{ name }}/dist/{{ name }}.css'
```

## Development

### Launch visual tests

```
npm run dev
```

### Build

```
npm run build
```

## License

[MIT](http://opensource.org/licenses/MIT)
