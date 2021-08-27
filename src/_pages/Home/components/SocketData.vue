<template>
  <b-row>
    <transition mode="out-in" name="shrink-fade">
      <b-col
        cols="12"
        v-if="(!$root.onRequest && !socketData.length) || $root.onRequest"
        key="nothing"
      >
        <nothing-to-show
          :title="$root.onRequest ? 'Quase lá' : 'Nada para exibir'"
          :starting="$root.onRequest"
        />
      </b-col>
      <b-col cols="12" v-else key="fullfilledbody">
        <h3>Hello Vue!</h3>
        <b-row>
          <b-col
            cols="12"
            lg="4"
            v-for="(item, index) in socketData"
            :key="index"
            class="px-5 my-2 tech-wrapper"
          >
            <div class="shadow rounded bg-white py-3">
              <h5 class="mb-3">{{ item.name }}</h5>
              <img :src="item.img" height="100" />
              <p class="mt-3">{{ item.description }}</p>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </transition>
  </b-row>
</template>
<script>
import io from "socket.io-client";
import NothingToShow from "@/components/NothingToShow/NothingToShow";
import VueLogo from "@/assets/logobot.png";
export default {
  name: "SocketData",
  components: {
    NothingToShow
  },
  data() {
    return {
      socket: null,
      socketData: [],
      rowLimit: 10,
      onRequest: false
    };
  },
  methods: {
    connect: function() {
      if (!this.socketData.length) this.$root.onRequest = true;
      this.disconnect();

      this.socket = io(this.$ws("BASE"));
      //   this.socket.emit("Authorization", {
      //     token: this.$session.get("@app:token"),
      //     rowLimit: this.rowLimit
      //   });
      this.socket.on("your-event", data => {
        if (data) {
          // data processing
          if (this.onRequest) this.$root.onRequest = false;
        }
      });
    },
    disconnect: function() {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
    },
    loadWelcome: function() {
      const data = [
        {
          name: "Tech",
          description: "Vue 2",
          img: VueLogo
        },
        {
          name: "Tech",
          description: "BootstrapVue",
          img: VueLogo
        },
        {
          name: "Tech",
          description: "Vue Session",
          img: VueLogo
        },
        {
          name: "Tech",
          description: "Axios",
          img: VueLogo
        },
        {
          name: "Tech",
          description: "MVC",
          img: VueLogo
        },
        {
          name: "Tech",
          description: "Love ♥",
          img: VueLogo
        },
      ];
      data.forEach((item, index) => {
        setTimeout(() => {
          this.socketData.push(item);
        }, (750 - index) * index );
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadWelcome();
      this.rowLimit =
        this.socketData.length >= 10 ? this.socketData.length : 10;
      //   this.connect();
    });
  },
  beforeDestroy() {
    this.disconnect();
  }
};
</script>
<style scoped>
.tech-wrapper {
  animation: slide 1s forwards;
}

@keyframes slide {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(-0);
  }
}
</style>