<template>
  <div class="row justify-center">
    <q-card class="col-10 col-sm-5 col-lg-3 q-mt-xl bg-grey-6 text-white">
      <q-card-section>
        <div class="text-h6">Acesse o seu ToDo</div>
      </q-card-section>
      <q-card-section>
        <q-input
          type="email"
          label="E-mail"
          placeholder="Digite seu email"
          v-model="email"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <q-input
          :type="isPwd ? 'password' : 'text'"
          hint="Digite sua senha"
          v-model="password"
        >
          <template v-slot:prepend>
            <q-icon name="vpn_key" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section align="right">
        <q-btn color="primary" icon="check" label="Entrar" @click="onLogin" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      isPwd: true,
      email: null,
      password: null,
    };
  },
  computed: {
    ...mapState("Users", ["currentUser"]),
  },
  methods: {
    ...mapActions("Users", ["login"]),
    async onLogin() {
      const payload = { email: this.email, password: this.password };
      this.$q.loading.show({
        message:
          '</b> Acessando o sistema<br/><span class="text-primary">Aguarde...</span>',
      });
      try {
        await this.login(payload);
        this.$q.loading.hide();
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.error(error.message);
        this.$q.loading.hide();
        this.$q.notify({
          message: "Usuáruo e/ou senha inválidos",
          icon: "announcement",
          color: "red",
          position: "top",
        });
      }
    },
  },
};
</script>

<style></style>
