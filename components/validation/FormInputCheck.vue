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
      required: true
    },
    labelMessage: {
      type: String,
      required: true
    },
    inputValue: {
      type: String,
      required: true
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background-color: var(--white);
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 16px 20px;
  border: 1px var(--gray3) solid;
}

.input-outer {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: var(--label-size);
  height: 40px;
  font-size: var(--font-size-md);
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.required {
  font-size: var(--font-size-xxs);
  background-color: var(--colormode2);
  color: var(--white);
  border-radius: 4px;
  margin-left: 5px;
  margin-top: 1px;
  padding: 2px 4px 3px 4px;
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
