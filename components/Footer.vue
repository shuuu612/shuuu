<template>
  <footer class="footer">
    <div class="copyright">
      <nuxt-link class="link" to="/">
        <p>
          <small class="text">© Shuuu</small>
        </p>
      </nuxt-link>
    </div>
  </footer>
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
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
}
.copyright {
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--gray4);
    font-size: var(--font-size-md);
  }
  .link {
    text-decoration: none;
  }
}

</style>
