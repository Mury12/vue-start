<template>
  <div class="w-100">
    <!-- <overlayer :show="onRequest" /> -->
    <socket-data />
  </div>
</template>

<script>
import SocketData from "./components/SocketData.vue";
export default {
  name: "Home",
  components: {
    SocketData
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
</style>