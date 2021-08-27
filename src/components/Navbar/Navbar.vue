<template>
  <div
    id="main_navbar"
    class="p-3 bg-brand-dark overflow-hidden"
    :class="{ 'navbar-open': navbar.isOpen, 'navbar-closed': !navbar.isOpen }"
  >
    <b-row class="justify-content-center mt-0">
      <b-col cols="12" class="logo">
        <!-- <div class="user-image" :style="{backgroundImage: `url(${$getMedia(user_data.pic)})`}"></div> -->
        <transition mode="out-in" name="slide">
          <img class="nav-brand-logo" src="../../assets/logo.png" />
          <!-- <img src="../../assets/logobot.png" width=100% v-else /> -->
        </transition>
      </b-col>
    </b-row>
    <b-nav class="d-flex flex-column mt-5">
      <div class="nav-item px-0 py-2" v-for="(item, idx) in items" :key="idx">
        <router-link
          v-if="(item.protected && $root.profile) || !item.protected"
          class="nav-link pl-0 text-white default-transition no-decoration"
          :to="item.uri"
        >
          <div class="text-left my-2">
            <fas
              :icon="item.icon || 'project-diagram'"
              class="text-white link-icon"
            />
            <transition mode="out-in" name="fade">
              <span v-show="navbar.isOpen">{{ item.name }}</span>
            </transition>
          </div>
        </router-link>
      </div>
    </b-nav>
    <div
      class="shrink-icon d-flex align-items-center justify-content-center"
      @click="navbarShrink"
    >
      <fas
        icon="caret-left"
        class="fa-2x text-white"
        :class="{ rotate: !navbar.isOpen }"
      />
    </div>
    <div id="sidebar-logout" class="text-white default-transition">
      <b-row class="justify-content-left text-left pl-3 py-2" @click="logout">
        <b-col cols="1">
          <fas icon="power-off" />
        </b-col>
        <b-col cols="10" v-show="navbar.isOpen">Sair</b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import LoginService from "../../_pages/Login/controller/LoginService";
export default {
  data() {
    return {
      user_data: {
        name: "Helo",
        email: "helo@match.com",
        pic: "users/nopic.png"
      },
      navbar: {
        isOpen: true
      }
    };
  },
  props: ["items"],
  methods: {
    navbarShrink: function() {
      this.navbar.isOpen = !this.navbar.isOpen;
      this.$emit("toggle", this.navbar.isOpen);
    },
    logout: function() {
      if (LoginService.done()) {
        this.$emit("logout");
      }
    }
  }
};
</script>

<style scoped>
#main_navbar {
  /* width: 20%; */
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 9;
}
#main_navbar.navbar-closed {
  animation: navbar-shrink 1000ms forwards;
}
#main_navbar.navbar-open {
  animation: navbar-opening 250ms;
}
#sidebar-logout:hover {
  background-color: rgb(252, 186, 64);
  box-shadow: -1em 0.5em 0.3em rgba(0, 0, 0, 0.125);
}
.nav-brand-logo {
  border-radius: 0 0 30% 30%;
  transition: ease-in-out 200ms;
  transition-delay: 400ms;
  max-width: 100px;
}
.navbar-closed .nav-brand-logo {
  margin-top: -15px;
  margin-left: -5px;
  padding: 25px 0;
  border-radius: 0 0 30% 30%;
  box-shadow: none !important;
  max-width: 30px;
}
#sidebar-logout {
  position: absolute;
  bottom: 45px;
  width: 100%;
  cursor: pointer;
  left: 0px;
}
.nav-item .nav-link {
  position: relative;
  z-index: 1;
  width: 200px;
}
.bg-brand-dark {
  background-color: #11354b;
}
.nav-item .nav-link::before {
  content: " ";
  height: 80%;
  width: 0px;
  position: absolute;
  left: -10px;
  top: 10%;
  border-top: 1px solid var(--def-brand-darker);
  border-right: 5px solid var(--def-brand-dark);
  border-bottom: 1px solid var(--def-brand-darker);
  z-index: -1;
  transition: ease-in-out 200ms;
}

.nav-item .nav-link.router-link-active::before {
  border-right-color: orange !important;
  background-color: var(--def-brand-darker) !important;
}
.nav-item .nav-link:hover::before {
  background-color: var(--def-brand-darker);
  left: -12px;
  border-right: 10px solid var(--def-brand-dark);
  border-radius: 0 50% 50% 0;
}
.nav-link {
  transition: ease-in-out 200ms;
  left: 0;
}
.nav-item .nav-link:hover {
  left: 2px;
}

.link-icon {
  width: 10%;
  min-width: 30px;
}

.shrink-icon {
  position: absolute;
  top: 50%;
  right: 0;
  height: 50px;
  width: 20px;
  cursor: pointer;
  transition: 250ms;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.349);
}
.shrink-icon::after {
  /* content: "Esconder menu"; */
  color: white;
  vertical-align: super;
  transition: 500ms ease-out;
  opacity: 0;
  padding-left: 30px;
  margin-right: 0;
}

.shrink-icon:hover::after {
  opacity: 1;
  margin-right: 20px;
  padding-left: 10px;
}
.rotate {
  transform: rotateZ(180deg);
  transition: ease-in-out 200ms;
  transition-delay: 700ms;
}

.user-name {
  transition: ease-in-out 200ms;
  transition-delay: 390ms;
}
.navbar-closed .user-image {
  width: 40px !important;
  height: 40px !important;
}
.navbar-closed .user-name {
  font-size: 1em !important;
}

@keyframes in-right {
  0%,
  100% {
    background-color: var(--def-darker-alpha);
    left: -10px;
  }
  0% {
    width: 0;
  }
  1% {
    border-radius: 0;
  }
  100% {
    border-radius: 0 5px 5px 0;
    width: 100%;
  }
}

@keyframes out-right {
  0% {
    border-radius: 0 5px 5px 0;
    background-color: var(--def-darker-alpha);
    left: -10px;
    width: 100%;
  }
  50% {
    width: 100%;
    opacity: 1;
  }
  80% {
    left: 100%;
    width: 100%;
  }
  81% {
    left: 110%;
    opacity: 0;
  }
  82% {
    width: 0;
    opacity: 0;
  }
  83% {
    left: -50px;
    opacity: 1;
  }
  100% {
    width: 0;
    opacity: 1;
  }
}
@keyframes navbar-shrink {
  0% {
    width: 232px;
  }
  70% {
    left: -232px;
  }
  75% {
    width: 50px;
  }
  80%,
  100% {
    width: 50px;
  }
}

@keyframes navbar-closing {
  0% {
    width: 232px;
  }
  70% {
    left: -232px;
  }
  75% {
    width: 50px;
  }
  80%,
  100% {
    width: 50px;
  }
}
@keyframes navbar-opening {
  0% {
    width: 50px;
  }

  80%,
  100% {
    width: 232px;
  }
}
</style>