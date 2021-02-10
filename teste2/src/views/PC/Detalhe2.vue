<template>
  <div>
    Detalhes de {{id}} - {{nomeParam}} - {{$store.state.PC.nome}} - {{nome}}
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState('PC',['nome', 'idade']),
    id() {
      return this.$route.params.id
    },
    nomeParam() {
      return this.$route.params.nome
    }
  }
}
</script>
