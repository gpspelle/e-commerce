export const range = (v) => {
  const arr = []
  while (v--) {
    arr[v] = v
  }

  return arr
}
