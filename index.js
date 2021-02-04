let obj = {}
obj.nome = "Fabricio"
obj.sobrenome = "Ferreira"
obj.idade = 42

let array = []
array.push(obj)

array.push({ nome: 'Julia', sobrenome: 'Ferreira', idade: 11 })
array.push({ nome: 'Felipe', sobrenome: 'Moreira', idade: 42 })
array.push({ nome: 'Wesley', sobrenome: 'Ribeiro', idade: 35 })


array = array
  .filter((elemento)=>elemento.idade > 18)
  .map((elemento)=>{
    return {
      ...elemento,
      nomeCompleto: `${elemento.nome} ${elemento.sobrenome}`
    }
  })

array
  .forEach((elemento, index)=>{
    console.log(`O elemento ${index} se chama ${elemento.nomeCompleto}`)
  })


const funcaoSomaIdades = (acumulador, elemento)=> acumulador += elemento.idade

const somaIdades = array.reduce( funcaoSomaIdades, 0)

const mediaIdades = somaIdades/array.length

console.log(`A soma das idades é ${somaIdades} e média das idades é ${mediaIdades}`);

if (mediaIdades < 35) {
  console.log('Sao jovens')
} else if (mediaIdades < 45) {
  console.log('Nao tao jovens')
} else {
  console.log('Melhor idade')
}