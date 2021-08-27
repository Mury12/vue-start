<template>
  <b-row class="mt-5 w-100 nothing-wrap align-items-center">
    <b-col cols="12" class="mt-5">
      <h4 class="nothing-text">{{title}}</h4>
      <div class="nothing-logo" v-if="!logo">
        <p
          class="nothing-thoughs default-transition"
          :class="{'switching' : switching}"
        >{{starting ? randomThought : 'Também estou ansiosa pelas novidades!'}}</p>
        <img src="../../assets/logobot.png" class="fa-4x" width=100 />
      </div>
      <fas :icon="icon" class="fa-4x nothing-icon" v-else />
    </b-col>
  </b-row>
</template>
<script>
export default {
  data() {
    return {
      thoughts: [
        "Volte mais tarde, talvez eu tenha encontrado alguma coisa..",
        "Não encontrei nada dessa vez.. Quem sabe na próxima?",
        "Sempre que houver alguma oportunidade, eu trarei novidades.",
        "Estou aguardando novidades, em alguns instantes tudo pode mudar.",
        "Quando você menos esperar, esta lista estará cheia!",
        "Olá, eu sou a Yoobi. Como posso lhe ajudar?",
        "Também estou ansiosa pelas novidades!",
      ],
      randomThought: "Também estou ansiosa pelas novidades!",
      shuffle: null,
      switching: false,
    };
  },
  props: {
    title: {
      type: String,
      default: "Nada para exibir.",
    },
    icon: {
      type: String,
      default: "robot",
    },
    logo: {
      type: Boolean,
      default: false,
    },
    starting: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    switch: function () {
      this.switching = true;
      setTimeout(() => {
        let index = (
          (Math.random() * this.thoughts.length) %
          this.thoughts.length
        ).toFixed(0);
        this.randomThought = this.thoughts[index] || this.thoughts[0];
        this.switching = false
      }, 1000);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.shuffle = setInterval(() => {
        this.switch();
      }, 60000);
    });
  },
  beforeDestroy() {
    clearInterval(this.shuffle);
  },
};
</script>

<style scoped>
.switching {
  opacity: 0;
}
.nothing-wrap {
  height: 60vh;
}
.nothing-text {
  font-size: 3em;
  color: rgba(0, 0, 0, 0.125);
}
.nothing-icon {
  color: rgba(0, 0, 0, 0.125);
}
.nothing-logo {
  opacity: 0.4;
  position: relative;
}
.nothing-logo img {
  position: relative;
  z-index: 1;
}
.nothing-logo::before {
  content: " ";
  position: absolute;
  background-image: radial-gradient(
    rgba(138, 44, 226, 0.4),
    rgba(138, 43, 226, 0.1)
  );
  border-radius: 50%;
  height: 1px;
  width: 1px;
  transform: scale(100);
  top: 50%;
  left: 50%;
  opacity: 1;
  z-index: 0;
  animation: pulse 5s infinite;
}

@media screen and (max-width: 576px){
  .nothing-logo::before{
    top: 69.8%;
    left: 50%
  }  
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    transform: scale(750);
    opacity: 0;
  }
}
</style>