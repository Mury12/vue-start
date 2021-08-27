<template>
  <div id="app" :class="{'hide': hide}">
    <navbar
      @logout="closePage"
      v-if="$root.authenticated || hide"
      :items="navbar"
      @toggle="toggler"
      class="d-none d-md-block"
    />
    <mobile-navbar
      @logout="closePage"
      v-if="$root.authenticated || hide"
      :items="navbar"
      class="d-block d-md-none"
    />
    <div
      class="page-body"
      :class="{'navbar-is-open': navbarIsOpen && $root.authenticated, 'navbar-is-closed': !navbarIsOpen && $root.authenticated}"
    >
      <page-header v-if="$root.authenticated" />
      <b-container id="main">
        <b-row>
          <b-col cols="12">
            <transition mode="out-in" name="shrink-fade">
              <router-view :key="$route.name"></router-view>
            </transition>
          </b-col>
        </b-row>
      </b-container>
      <b-container class="position-relative" style="height: 150px">
        <page-footer />
      </b-container>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar/Navbar";
import { NavItems } from "./nav-items.js";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import PageHeader from "./components/PageHeader/PageHeader";
import PageFooter from "./components/Footer/Footer";
export default {
  name: "App",
  data() {
    return {
      navbar: NavItems,
      navbarIsOpen: true,
      hide: false,
    };
  },
  components: {
    Navbar,
    MobileNavbar,
    PageHeader,
    PageFooter,
  },
  methods: {
    toggler: function (e) {
      this.navbarIsOpen = e;
    },
    closePage: function () {
      this.hide = true;
      window.location = "/";
      setTimeout(() => {}, 200);
      setTimeout(() => {
        this.hide = false;
      }, 1000);
    },
  },

  watch: {
    $route: {
      handler: function () {
        document.title = (this.$route.meta.title || "") + " | " + "Vue Start";
      },
    },
  },
  beforeCreate() {
    this.$session.start();
  
    document.title = (this.$route.meta.title || "") + " | " + "Vue Start";

    if (
      (!this.$root.authenticated && this.$route.meta.protected) ||
      (this.$route.name == "Other" && !this.$root.authenticated)
    )
      this.$router.push("/entrar");
    else if (this.$root.authenticated && !this.$route.name.match("Home")) {
      this.$router.push("/home");
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,700;1,200;1,400&display=swap");
#app {
  font-family: "Mulish";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: lighter;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  background-color: rgba(222, 231, 255, 0.2);
  overflow-x: hidden;
}
#app.hide {
  transition: ease-in-out 200ms;
  opacity: 0;
}
#main {
  min-height: 70vh;
  margin-top: 25px;
}
input::placeholder {
  color: rgba(189, 69, 202, 0.3) !important;
}
@media screen and (min-width: 761.99px) {
  .navbar-is-open {
    margin-left: 232px !important;
    transition: ease-in-out 200ms;
  }
  .navbar-is-closed {
    margin-left: 50px !important;
    transition: ease-in-out 200ms;
  }
}
.no-decoration {
  text-decoration: none !important;
}
.pointer {
  cursor: pointer !important;
}

.default-transition {
  transition: ease-in-out 150ms;
}

/**Vue Transitions */
.slide-fade-enter-active {
  transition: 0.3s ease-in-out;
}
.slide-fade-leave-active {
  transition: 0.3s ease-in-out;
}
.slide-fade-leave-to {
  transform: translateX(-5px);
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(5px);
  opacity: 0;
}
.shrink-fade-enter-active {
  transition: 0.3s ease-in-out;
}
.shrink-fade-leave-active {
  transition: 0.3s ease-in-out;
}
.shrink-fade-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
.shrink-fade-enter {
  transform: scale(0.95);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.inactive {
  opacity: 0.4;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.flip-list-move {
  transition: transform 1s;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
:root {
  --def-brand-light: #3589bd;
  --def-brand-lighter: #40a4e3;
  --def-brand: #3b9bd5;
  --def-brand-dark: #2a6d96;
  --def-brand-darkmid: #14435f;
  --def-brand-darker: #183f57;
  --def-darker-alpha: #183f5752;
  --def-lightblue: #6b579b;
  --def-lightblue-alpha: #d0e9ff61;
  --def-lightgray: #e7e7e7;
  --def-sidebar-size: 320px;
}
.spin {
  animation: spin 1s forwards;
}
.custom-control-label {
  cursor: pointer !important;
}
@keyframes circle-wave {
  0% {
  }
  100% {
    height: 300px;
    width: 300px;
  }
}

@keyframes circle-fade {
  0% {
    opacity: 1;
    height: 200%;
    width: 200%;
  }
  80% {
    opacity: 0;
    height: 200%;
    width: 200%;
  }
  81%,
  100% {
    height: 0;
    width: 0;
  }
}

.circle-wave {
  position: relative;
  overflow: hidden;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle-wave::before {
  content: "";
  background-color: rgba(176, 167, 177, 0.198);
  height: 0;
  width: 0;
  position: absolute;
  transition: ease-in-out 200ms;
  z-index: 0;
  border-radius: 50%;
  animation: circle-fade 500ms forwards;
}

.circle-wave:hover::before {
  animation: circle-wave 500ms forwards;
}
</style>
