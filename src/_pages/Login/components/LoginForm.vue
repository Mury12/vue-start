<template>
  <b-form class @keyup.enter="auth">
    <label>
      Nome de usuário:
      <br />
      <b-input type="text" placeholder="Garry" v-model="username" />
    </label>
    <br />
    <label>
      Sua senha:
      <br />
      <b-input type="password" placeholder="•••••••••" v-model="password" />
    </label>
    <br />
    <transition mode="out-in" name="shrink-fade">
      <div v-if="!request.onRequest">
        <b-button
          :disabled="request.onRequest"
          type="button"
          @click="auth"
          variant="success"
          >Entrar</b-button
        >
      </div>
      <b-spinner type="grow" variant="success" v-if="request.onRequest" />
    </transition>
  </b-form>
</template>

<script>
import LoginService from "../controller/LoginService";
export default {
  data() {
    return {
      username: "Anyname",
      password: "Anypass",
      request: {
        success: false,
        msg: ""
      }
    };
  },
  methods: {
    auth: function() {
      if (this.request.onRequest) return;
      this.$root.onRequest = true;
      this.request.requested = false;
      LoginService.do(this.username, this.password)
        .then(res => {
          if (res) {
            this.request.success = res.success;
            this.request.msg = res.msg;
            this.$root.profile = res.user;
            this.$root.authenticated = true;
            if (res.success) {
              this.$router.push("/home");
            }
          }
        })
        .finally(() => {
          this.request.requested = true;
          this.$root.onRequest = false;
          this.$util.toast(this.request.msg, {
            title: "Mensagem",
            autoHideDelay: 5000,
            appendToast: false,
            variant: this.request.success ? "success" : "danger"
          });
        });
    }
  },
  beforeMount() {
    const auth = LoginService.check();
    if (auth) {
      this.$root.authenticated = auth.authenticated;
      this.$root.profile = auth.user;
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
</style>