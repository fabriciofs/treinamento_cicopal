export function imprimeNome({state}, payload) {
  const {sobrenome, idade, itens} = payload
  const [item1, item2] = itens
  // const item1 = itens[0]
  // const item2 = itens[1]
  console.log(`${state.nome} - ${sobrenome} - ${idade} - ${item1} - ${item2}`, payload)
}

export function imprimeIade({state}, payload) {
  console.log(`${state.nome} - `, payload)
}

// export default {
//   imprimeNome({state}, payload) {
//     console.log(`${state.nome} - `, payload)
//   },
//   imprimeIade({state}, payload) {
//     console.log(`${state.nome} - `, payload)
//   }
// }
