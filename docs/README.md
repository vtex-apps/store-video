📢 Use this project, [contribute](https://github.com/vtex-apps/store-video) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Video

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The Video app allows you to display video assets on your store pages. 

![Media Placeholder](https://storecomponents.vtexassets.com/arquivos/ids/155640)

## Configuration

1. Add the `store-video` app to your theme's dependencies in the `manifest.json` file:

```diff
 "dependencies ": {
+  "vtex.store-video": "1.x"
 }
```

2. In any desired theme template, add the `video` block with the desirable props. For example:

```json
  "video#background": {
    "props": {
      "width": "100%",
      "height": "600px",
      "loop": false,
      "autoPlay": true,
      "muted": false,
      "src": "https://www.youtube.com/watch?v=wygFqZXMIco",
      "blockClass": "videoEl"
    }
  }
```

### `video` props

| Prop name        | Type                 | Description                                                                                                                                                                       | Default value     |
| ---------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `name`           | `string`             | Video name for SEO and accessibility purposes.  | `undefined`       |
| `description`    | `string`             | Video description for SEO and accessibility purposes. | `undefined`       |
| `src`            | `string`             | Video URL. It can be a `youtube`, `vimeo`, or a self-hosted video urls. | `undefined`       |
| `type`           | `string`             | Video type. Caution: this prop only works if the video URL represents an HTML5 Player. | `undefined`       |
| `poster`         | `string`             | Image URL to be displayed as a cover before the video playback. | `undefined`       |
| `controlsType`   | `enum`               | Type of controls. Possible values are: `custom-vtex` (custom controls), `native` (native controls), or `none`. Caution: this prop only works if the video URL represents an HTML5 Player. | `undefined` |
| `autoPlay`       | `boolean`            | Whether the video will automatically start playing after it is loaded (`true`) or not (`false`). When set as `true`, the `muted` prop should also be declared as `true` so the autoplay set up can properly work.  | `false`           |
| `muted`          | `boolean`            | Whether the video will start with the audio turned off (`true`) or not (`false`). | `false` |
| `loop`           | `boolean`            | Whether the video will run in a loop (`true`) or not (`false`).   | `false` |
| `width`          | `number` or `string` | Width of the video exhibition area. This prop accepts its value in %(`string`) or pixels(`number`).  | `undefined` |
| `height`         | `number` or `string` | Height of the video exhibition area. This prop accepts its value in %(`string`) or pixels(`number`). | `undefined` |
| `PlayIcon`       | `string`             | Play icon.               | `icon-play`       |
| `PauseIcon`      | `string`             | Pause icon.              | `icon-pause`      |
| `VolumeOnIcon`   | `string`             | Volume-on icon.          | `icon-volume-on`  |
| `VolumeOffIcon`  | `string`             | Volume-off icon.         | `icon-volume-off` |
| `FullscreenIcon` | `string`             | Fullscreen icon.         | `icon-extend`     |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles         |
| ------------------- |
| `videoContainer`    |
| `videoElement`      |
| `fallbackContainer` |
| `fallbackImage`     |
| `controlsContainer` |
| `fullscreenButton`  |
| `playButton`        |
| `trackContainer`    |
| `trackTimer`        |
| `trackBar`          |
| `volumeContainer`   |
| `volumeSlider`      |
| `volumeButton`      |

:warning: *It's required that `controlsType` property has the `vtex` value in order to the following CSS Handles works: `controlsContainer`, `fullscreenButton`, `playButton`, `trackContainer`, `trackTimer`, `trackBar`, `volumeContainer`, `volumeSlider`, `volumeButton`.*

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
