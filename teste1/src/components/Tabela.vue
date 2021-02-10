<template>
  <div v-if="dados">
    <h1>{{titulo}}</h1>
    <table v-if="dados.length >= 3">
      <th v-for="(coluna) in colunas" :key="coluna.campo">
        <td>{{coluna.texto}}</td>
      </th>
      <tr v-for="(elemento) in dados" :key="elemento.cpf" >
        <td v-for="(coluna,indexColuna) in colunas" :key="indexColuna">{{elemento[coluna.campo]}}</td>
      </tr>
    </table>    
  </div>
</template>

<script>
export default {
  props:{
    titulo: {
      type: String,
      required: false,
      default: ''
    },
    dados: {
      type: Array,
      required: true
    },
    colunas: {
      type: Array,
      required: true
    }    
  }
}
</script>