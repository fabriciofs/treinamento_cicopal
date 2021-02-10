<template>
  <div>
    <button @click="alteraNome">Altera Nome $Store</button>
    <button @click="alteraNomeVuex('Wesley Vuex')">Altera Nome mapMutations</button>
    <button @click="chamaAction">Chama Action  $Store</button>
    <!-- <button @click="imprimeNome('Ferreira Santos')">Chama Action  mapActions</button> -->
      <br>
      Filtrando: {{filtros}}
      <div>
        <router-view />        
      </div>
  </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
export default {
  computed: {
    filtros() {
      return this.$route.query
    }
  },
  methods: {
    ...mapMutations('PC',['alteraNomeVuex']),
    ...mapActions('PC',['imprimeNome']),
    alteraNome() {
      console.log(this.$store)
      this.$store.commit('PC/alteraNomeVuex', 'Felipe Vuex')
    },
    chamaAction(){
      this.$store.dispatch('PC/imprimeNome', {sobrenome: 'Ferreira Santos', idade: 20, itens: [1,2,3,4,5]})
    }
  }
}
</script>
