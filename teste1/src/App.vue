<template>
<div>
  <Pesquisa 
    :elementosFiltrados="elementosFiltrados"
    @pesquisou="pesquisaRealisada"
  />
  <Tabela titulo="Url e Nome" :dados="elementosFiltrados" :colunas="colunas1"/>
  <Tabela :dados="elementosFiltrados" :colunas="colunas2"/>
 </div>
</template>

<script>
import axios from 'axios'

import Pesquisa from './components/Pesquisa'
import Tabela from './components/Tabela'

export default {
  components: {
    Pesquisa,
    Tabela
  },
  data() {
    return {
      textoPesquisa: '',
      elementos: [],
      colunas1: [
        {campo: 'url', texto: 'url'},
        {campo: 'name', texto: 'Nome'},
      ],
      colunas2: [
        {campo: 'name', texto: 'Nome'},
        {campo: 'birth_year', texto: 'Idade'},
      ]      
    }
  },
  computed: {
    elementosFiltrados() {
      // if (this.textoPesquisa.trim().length <= 0) {
      //   return []
      // }
      return this.elementos
        .filter((elemento)=>elemento.name.toUpperCase().includes(this.textoPesquisa.toUpperCase()))
    }
  },
  methods: {
    pesquisaRealisada(textoPesquisa) {
      this.textoPesquisa = textoPesquisa
    }
  },
  async created() {
    // console.log('antes');
    // axios.get("https://swapi.dev/api/people/")
    //   .then((response)=>{
    //     console.log('dentro', response.data.results);
    //     return response.data.results.map((elemento)=>{
    //       return {
    //         url: elemento.url,
    //         name: elemento.name,
    //         birth_year: elemento.birth_year,
    //         skin_color: elemento.skin_color
    //       }
    //     })
    //   })
    //   .then((elementos)=>{
    //     this.elementos = elementos
    //   })
    //   .catch((error)=>{
    //     console.log('deu erro');
    //     console.error(error.message)
    //   })
    // console.log('depois');

    try {
      // console.log('antes')
      const response = await axios.get("https://swapi.dev/api/people/")
      // console.log('depois', response);
      this.elementos =response.data.results.map((elemento)=>{
            return {
              url: elemento.url,
              name: elemento.name,
              birth_year: elemento.birth_year,
              skin_color: elemento.skin_color
            }
          })
      
    } catch (error) {
      alert("erro ona api aguarde alguns instantes")
    }

  },
}
</script>

