<template>
  <validation-provider v-slot="{ errors }" :rules="rules" :name="labelMessage">
    <div class="container">
      <div class="input-outer">
        <label class="title" :for="formComponentName">
          <span>{{ labelMessage }}</span>
          <span v-if="rules.includes('required')" class="required">必須</span>
        </label>
        <textarea
          :id="formComponentName"
          v-model="inputValueModel"
          class="textarea"
          :name="formComponentName"
          :maxlength="maxLength"
          :placeholder="placeHolderMessage"
        />
      </div>
      <p v-show="errors.length" class="attention">
        {{ errors[0] }}
      </p>
    </div>
  </validation-provider>
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
    textareaCols: {
      type: String,
      required: true,
    },
    textareaRows: {
      type: String,
      required: true,
    },
    formComponentName: {
      type: String,
      required: true,
    },
    maxLength: {
      type: String,
      required: true,
    },
    placeHolderMessage: {
      type: String,
      required: true,
    },
    inputValue: {
      type: String,
      required: true,
    },
  },
  computed: {
    inputValueModel: {
      get() {
        return this.$props.inputValue;
      },
      set(val) {
        this.$emit('update:inputValue', val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 10px;
  padding: 16px 0 16px 20px;
  width: 100%;
  border: 1px var(--gray3) solid;
  border-radius: 10px;
  background-color: var(--white);
}

.input-outer {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 300px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  width: var(--label-size);
  font-weight: 400;
  font-size: var(--font-size-md);
}

.required {
  margin-top: 2px;
  margin-left: 5px;
  padding: 2px 4px 3px 4px;
  border-radius: 4px;
  background-color: var(--red);
  color: var(--white);
  font-size: var(--font-size-xxs);
}

.textarea {
  overflow: auto;
  padding-right: 30px;
  width: calc(100% - var(--label-size));
  height: 100%;
  color: var(--black);
  font-size: var(--font-size-xl);
  line-height: 2.667em;
  resize: none;

  @include responsive(md) {
    line-height: 2.5em;
  }
  @include responsive(xl) {
    line-height: 2.223em;
  }
}

.attention {
  padding-top: 6px;
  padding-left: var(--label-size);
  color: var(--red);
  font-weight: 400;
  font-size: var(--font-size-xs);
}

</style>
