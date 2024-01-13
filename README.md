# Lucide-Omi

> Implementation of the [lucide](https://lucide.dev/) icon library for [Omi](https://omi.cdn-go.cn/home/latest/)

## Installation

```sh
npm install lucide-omi
```

## Usage

```js
import { render, define, Component } from 'omi'
import { Menu } from 'lucide-omi'

define('my-app', class extends Component {
  render() {
    return (
      <div>
        <Menu color="red" strokeWidth={3} size={36} />
      </div>
    )
  }
})

render(<my-app />, 'body')
```

## Props

| Prop        | Type   | Default | Description |
| ----------- | ------ | ------- | ----------- |
| `color`     | string | `currentColor`  | Color of the icon |
| `size`      | number | `24`    | Size of the icon |
| `strokeWidth`    | number | `2`     | Stroke width of the icon |
|`absoluteStrokeWidth`|boolean|`false`|If `true`, stroke width will be the same regardless of icon size.|