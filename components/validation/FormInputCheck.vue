<template>
  <div class="container">
    <div class="input-outer">
      <p class="title">
        <span>{{ labelMessage }}</span>
        <span v-if="rules.includes('required')" class="required">必須</span>
      </p>
      <p class="input">{{ inputValue }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rules: {
      type: String,
      required: true,
    },
    labelMessage: {
      type: String,
      required: true,
    },
    inputValue: {
      type: String,
      required: true,
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 10px;
  padding: 16px 20px;
  width: 100%;
  border: 1px var(--gray3) solid;
  border-radius: 10px;
  background-color: var(--white);
}

.input-outer {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.title {
  display: flex;
  display: flex;
  align-items: center;
  align-items: center;
  justify-content: flex-start;
  justify-content: flex-start;
  width: var(--label-size);
  height: 40px;
  font-weight: 400;
  font-size: var(--font-size-md);
}

.required {
  margin-top: 1px;
  margin-left: 5px;
  padding: 2px 4px 3px 4px;
  border-radius: 4px;
  background-color: var(--red);
  color: var(--white);
  font-size: var(--font-size-xxs);
}

.input {
  width: calc(100% - var(--label-size));
  font-size: var(--font-size-xl);
  line-height: 2.667em;

  @include responsive(md) {
    line-height: 2.5em;
  }
  @include responsive(xl) {
    line-height: 2.223em;
  }
}

</style>
