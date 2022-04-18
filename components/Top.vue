<template>
  <main class="main">
    <nuxt-link class="link" to="/contact">CONTACT</nuxt-link>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 40px);
}
.link {
  color: var(--gray3);
  text-decoration: none;
  font-weight: 500;
  font-size: 70px;
  transition: color .2s;

  @include hover() {
    color: var(--color2);
  }
}

</style>
