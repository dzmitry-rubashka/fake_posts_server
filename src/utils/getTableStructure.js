export const getTableStructure = (arr, name) => {
  const indexedArr = arr.map((_, index) => `$${index+1}`)
  return `INSERT INTO ${name} (${arr.join(', ')}) VALUES (${indexedArr.join(', ')})`
}