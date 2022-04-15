<template>
  <validation-provider
    v-slot="{ errors }"
    :rules="rules"
    :name="labelMessage"
  >
    <div class="container">
      <div class="input-outer">
        <label class="title" :for="formComponentName">
          <span>{{ labelMessage }}</span>
          <span v-if="rules.includes('required')" class="required">必須</span>
        </label>
        <input
          :id="formComponentName"
          v-model="inputValueModel"
          class="input"
          :type="inputType"
          :name="formComponentName"
          :maxlength="maxLength"
          :placeholder="placeHolderMessage"
        />
      </div>
      <p v-if="errors.length" class="attention">
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
      required: true
    },
    labelMessage: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      required: true
    },
    formComponentName: {
      type: String,
      required: true
    },
    maxLength: {
      type: String,
      required: true
    },
    placeHolderMessage: {
      type: String,
      required: true
    },
    inputValue: {
      type: String,
      required: true
    }
  },
  computed: {
    inputValueModel: {
      get() {
        return this.$props.inputValue
      },
      set(val) {
        this.$emit('update:inputValue', val)
      }
    }
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
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: var(--label-size);
  font-size: var(--font-size-md);
  font-weight: 400;
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
}

.attention {
  padding-left: var(--label-size);
  padding-top: 6px;
  color: var(--red);
  font-size: var(--font-size-xs);
  font-weight: 400;
}
</style>
