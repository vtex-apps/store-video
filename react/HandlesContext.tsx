import { createCssHandlesContext } from 'vtex.css-handles'

import { CSS_HANDLES } from './players/HTML5Player'

const { CssHandlesProvider, useContextCssHandles } = createCssHandlesContext(
  CSS_HANDLES
)

export {
  CssHandlesProvider as VideoHandlesProvider,
  useContextCssHandles as useVideoHandles,
}
