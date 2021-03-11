import Vue from "vue";

import "./styles/quasar.sass";
import "quasar/dist/quasar.ie.polyfills";
import lang from "quasar/lang/pt-br.js";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar, Notify, Loading } from "quasar";

Vue.use(Quasar, {
  config: {},
  plugins: { Notify, Loading },
  lang: lang,
});
