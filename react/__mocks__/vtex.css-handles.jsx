import React from 'react'

export const useCssHandles = (input) => {
  return {
    handles: Object.keys(input),
    withModifier: (id) => id,
  }
}

const Context = React.createContext(null)

function CssHandlesProvider({ withModifiers, handles, children }) {
  return (
    <Context.Provider value={{ withModifiers, handles }}>
      {children}
    </Context.Provider>
  )
}

export const createCssHandlesContext = (CSS_HANDLES) => {
  return {
    CssHandlesProvider,
    useContextCssHandles: () => React.useContext(Context),
  }
}
