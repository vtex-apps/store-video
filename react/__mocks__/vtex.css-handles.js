export const useCssHandles = (input) => {
  return {
    handles: Object.keys(input),
    withModifier: (id) => id,
  }
}
