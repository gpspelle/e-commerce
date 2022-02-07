export const getRandomFromRangeArray = (arr) => {
  const res = []
  const indexes = {}
  const arrSize = arr.length
  for (let i = 0; i < arrSize; ) {
    const random = Math.floor(Math.random() * arrSize)
    if (indexes.hasOwnProperty(random)) {
      continue
    }
    res.push(arr[random])
    indexes[random] = true
    i++
  }

  return res
}

export const getRandomFromArray = (arr, indexes, NUM_ELEMENTS = 12) => {
  const res = []
  const arrSize = arr.length
  for (let i = 0, j = 0; i < Math.min(arrSize, NUM_ELEMENTS); j++) {
    const random = indexes[j]
    if (random >= arrSize) {
      continue
    }
    res.push(arr[random])
    i++
  }

  return res
}
