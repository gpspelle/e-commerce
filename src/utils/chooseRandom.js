export const chooseRandom = (arr, num = 1) => {
  const res = []
  const indexes = {}
  for (let i = 0; i < Math.min(num, arr.length); ) {
    const random = Math.floor(Math.random() * arr.length)
    if (indexes.hasOwnProperty(random)) {
      continue
    }
    res.push(arr[random])
    indexes[random] = true
    i++
  }

  return res
}
