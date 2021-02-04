<template>
<div>
  <input type="text" v-model="textoPesquisa">
  <div v-if="elementosFiltrados.length === 0">
    <span>Nao ha elementos</span>
  </div>
  <div v-else-if="elementosFiltrados.length === 1">
    <span>So tem 1 nao vou nem mostrar</span>
  </div>  
    <div v-else-if="elementosFiltrados.length === 2">
    <span>So tem 2 nao vou nem mostrar</span>
  </div> 
  <table v-else>
    <th v-for="(coluna) in colunas" :key="coluna.campo">
      <td>{{coluna.texto}}</td>
    </th>
    <tr v-for="(elemento) in elementosFiltrados" :key="elemento.cpf" >
      <td v-for="(coluna,indexColuna) in colunas" :key="indexColuna">{{elemento[coluna.campo]}}</td>
    </tr>
  </table>
 </div>
</template>

<script>
export default {
  data() {
    return {
      textoPesquisa: '',
      elementos: [],
      colunas: [
        {campo: 'cpf', texto: 'CPF'},
        {campo: 'nome', texto: 'Nome'},
        {campo: 'idade', texto: 'Idade'},
        {campo: 'sexo', texto: 'Sexo'},
      ]
    }
  },
  computed: {
    elementosFiltrados() {
      // if (this.textoPesquisa.trim().length <= 0) {
      //   return []
      // }
      return this.elementos
        .filter((elemento)=>elemento.nome.toUpperCase().includes(this.textoPesquisa.toUpperCase()))
    }
  },
  created() {
    setTimeout(()=>{
    this.elementos = [
        {cpf:'1', nome: 'Fabricio Ferreira Santos', idade: 20, sexo: 'Masculino'},
        {cpf:'2', nome: 'Felipe Moreira', idade: 42, sexo: 'Masculino'},
        {cpf:'3', nome: 'Wexley Ribeiro', idade: 35, sexo: 'Masculino'},
        {cpf:'4', nome: 'Domingos Graccho', idade: 22, sexo: 'Masculino'},
        {cpf:'5', nome: 'Julia Ferreira', idade: 11, sexo: 'Feminino'},
        {cpf:'6', nome: 'Joao da Silva', idade: 55, sexo: 'Feminino'},
        {cpf:'7', nome: 'Maria da Silva', idade: 45, sexo: 'Feminino'},
        {cpf:'8', nome: 'Maria da Silva', idade: 45, sexo: 'Feminino'},
        {cpf:'9', nome: 'Maria da Silva', idade: 45, sexo: 'Feminino'},
      ]
  }, 3000)

  },
}
</script>

