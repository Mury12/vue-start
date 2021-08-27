<template>
  <b-row id="page-header" class="m-0 w-100">
    <page-title :title="$route.name" />
    <div class="user-info px-3">
      <b-row class="h-100 align-items-center">
        <b-col cols="12">
          Olá, {{ name }}!
          <br />
          <b>({{ role }})</b>
          <br />
          <b-dropdown
            variant="link"
            no-caret
            class="m-0 p-0 w-100"
            toggle-class="m-0 p-0 w-100"
            dropleft
          >
            <template v-slot:button-content>
              <fas icon="caret-down" class="text-white" />
            </template>
            <b-dropdown-item href="#" @click="alterSelfData"
              >Alterar seus dados</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
      </b-row>
    </div>
  </b-row>
</template>

<script>
export default {
  name: "PageHeader",
  data() {
    return {};
  },
  components: {},
  methods: {
    alterSelfData: function() {
      this.$bvModal.show("self-update_modal");
    }
  },
  computed: {
    name() {
      let name = "User";
      if (this.$root.profile && this.$root.profile.name)
        name = this.$root.profile.name.split(" ")[0];
      return name;
    },
    role() {
      return "Common";
    }
  }
};
</script>

<style scoped>
#page-header {
  position: relative;
  height: 85px;
  background-color: var(--def-brand-darkmid);
  color: white;
  box-shadow: 0 0.2em 0.1em rgba(0, 0, 0, 0.225);
}
.user-info {
  position: absolute;
  right: 40px;
  height: 100%;
  transition: ease-in-out 200ms;
  background-color: rgba(136, 207, 252, 0.4);
}
.user-info:hover {
  cursor: default;
}
</style>