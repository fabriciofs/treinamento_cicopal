<template>
  <div>
    <br>
    <span>Filtro</span>
    <input 
      type="text" 
      v-model="textoPesquisa" 
      v-on:keyup="onInput"
      >
    <div v-if="elementosFiltrados.length === 0">
      <span>Nao ha elementos</span>
    </div>
    <div v-else-if="elementosFiltrados.length === 1">
      <span>So tem 1 nao vou nem mostrar</span>
    </div>  
      <div v-else-if="elementosFiltrados.length === 2">
      <span>So tem 2 nao vou nem mostrar</span>
    </div>     
  </div>
</template>
<script>
export default {
  props: ["elementosFiltrados"],
  data() {
    return {
      textoPesquisa: null
    }
  },
  methods: {
    onInput() {
      this.$emit('pesquisou',this.textoPesquisa)
    }
  }
}
</script>