<template>
  <div class="wrapper">
    <SimpleHeader />
    <main class="main">
      <div class="contact-form">
        <h2 class="title">お問い合わせ</h2>
        <div class="status-outer">
          <div class="status input" :class="{selected: $route.query.status === undefined}">入力</div>
          <div class="status check" :class="{selected: $route.query.status === 'check'}">確認</div>
          <div class="status thanks" :class="{selected: $route.query.status === 'thanks' || $route.query.status === 'failed'}">完了</div>
        </div>
        <div v-if="$route.query.status === undefined" class="form-outer">
          <validation-observer
            v-slot="{ invalid }"
            ref="observer"
            class="form"
            tag="form"
            @submit.prevent="check"
          >
            <FormValidationInput
              rules="required|max:30"
              label-message="お名前"
              input-type="text"
              form-component-name="name"
              max-length="50"
              place-holder-message="山田太郎"
              :input-value.sync="inputName"
            >
            </FormValidationInput>
            <FormValidationInput
              rules="required|email|max:256"
              label-message="メールアドレス"
              input-type="email"
              form-component-name="email"
              max-length="256"
              place-holder-message="contact@example.com"
              :input-value.sync="inputEmail"
            />
            <FormValidationTextarea
              rules="required|max:1000"
              label-message="お問い合わせ内容"
              textarea-cols="20"
              textarea-rows="10"
              form-component-name="message"
              max-length="1000"
              place-holder-message="お問い合わせ内容をご入力ください"
              :input-value.sync="inputMessage"
            >
            </FormValidationTextarea>
            <div class="buttons">
              <button class="button" type=”submit” :disabled="invalid" :class="{disabled: invalid}">確認</button>
            </div>
          </validation-observer>
        </div>
        <div v-else-if="$route.query.status == 'check'" class="form-outer">
          <div class="form">
            <FormInputCheck
            rules="required|max:30"
            label-message="お名前"
            :input-value="inputName"
            />
            <FormInputCheck
            rules="required|email|max:256"
            label-message="メールアドレス"
            :input-value="inputEmail"
            />
            <FormInputCheck
            rules="required|max:1000"
            label-message="お問い合わせ内容"
            :input-value="inputMessage"
            />
            <div class="buttons">
              <button class="button" @click="back">戻る</button>
              <button class="button" :disabled="inputName === ''" :class="{disabled: inputName === ''}" @click="submit">送信</button>
            </div>
          </div>
        </div>
        <div v-else class="form-outer">
          <div v-if="$route.query.status === 'thanks'" class="comment">
            <p>送信が完了しました。</p>
            <p>お問い合わせありがとうございます。</p>
          </div>
          <div v-else-if="$route.query.status === 'failed'" class="comment">
            <p>送信に失敗しました。</p>
            <p>時間をおいて再度お問合せください。</p>
          </div>
          <div class="buttons">
            <nuxt-link class="button home" to="/">ホーム</nuxt-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputName: '',
      inputEmail: '',
      inputMessage: '',
      success: undefined,
    };
  },
  computed: {},
  mounted() {
    if (this.$route.query.status === 'check') {
      // セッションストレージから情報を取得
      if (this.$storageAvailable('sessionStorage')) {
        const contactJson = sessionStorage.getItem('contact');
        const contact = JSON.parse(contactJson);
        if (contact !== null) {
          this.$store.dispatch('contact/pushLocalStorage', contact);
        }
        this.inputName = this.$store.getters['contact/getName'];
        this.inputEmail = this.$store.getters['contact/getEmail'];
        this.inputMessage = this.$store.getters['contact/getMessage'];
      }
    }
  },
  updated() {},
  methods: {
    async check() {
      // バリデーションエラーの有無を取得
      const isValid = await this.$refs.observer.validate();
      // バリデーションのエラーがないとき
      if (isValid) {
        // 確認ページに遷移
        this.$router.push({ path: '', query: { status: 'check' } });
        // ローカルストレージに保存
        const postData = {
          name: this.inputName,
          email: this.inputEmail,
          message: this.inputMessage,
        };
        this.$store.dispatch('contact/pushInputData', postData);
      }
    },
    back() {
      this.$store.dispatch('contact/pushClear');
      this.$router.go(-1);
    },
    async submit() {
      // 送信データを作成
      const postData = {
        name: this.inputName,
        email: this.inputEmail,
        message: this.inputMessage,
      };

      // microCMSへの送信処理
      if (process.env.NODE_ENV === 'production') {
        await this.$axios
          .post('https://inquiry.microcms.io/api/v1/contact', postData, {
            headers: {
              'Content-Type': 'application/json',
              'X-MICROCMS-API-KEY': 'a266212255964abb9b0c7285d67907a390f7',
            },
          })
          .then((res) => {
            console.log('成功', res);
            this.success = true;
          })
          .catch((error) => {
            console.log('エラー', error);
            this.success = false;
          });
      } else {
        await this.$axios
          .post('/api/v1/contact', postData, {
            headers: {
              'Content-Type': 'application/json',
              'X-MICROCMS-API-KEY': 'a266212255964abb9b0c7285d67907a390f7',
            },
          })
          .then((res) => {
            console.log('成功', res);
            this.success = true;
          })
          .catch((error) => {
            console.log('エラー', error);
            this.success = false;
          });
      }

      // 入力情報をクリア
      this.inputName = '';
      this.inputEmail = '';
      this.inputMessage = '';

      // 完了ページに遷移
      if (this.success) {
        this.$store.dispatch('contact/pushClear');
        this.$router.push({ path: '', query: { status: 'thanks' } });
      } else {
        this.$store.dispatch('contact/pushClear');
        this.$router.push({ path: '', query: { status: 'failed' } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  background-color: var(--gray1);
}

.contact-form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 30px;

  --form-size: 800px;
  --label-size: 180px;
}

.title {
  margin-bottom: 40px;
  font-weight: 400;
  font-size: 40px;
}

.status-outer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 60px;
  border-radius: 10px;
  background-color: var(--white);
  font-weight: 400;
  font-size: var(--font-size-md);
  &.input {
    &.selected {
      background-color: var(--colormode2);
      color: var(--white);
    }
  }
  &.check {
    &.selected {
      background-color: var(--colormode2);
      color: var(--white);
    }
  }
  &.thanks {
    &.selected {
      background-color: var(--colormode2);
      color: var(--white);
    }
  }
}

.input,.check {
  position: relative;
  margin-right: 60px;
  &::before {
    position: absolute;
    top: 50%;
    left: 120px;
    display: block;
    width: 20px;
    height: 2px;
    background-image: url('/images/line.svg');
    content: '';
  }
}

.form-outer {
  max-width: var(--form-size);
  width: 100%;
}

.form {
  width: 100%;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.button {
  /* margin: 20px auto 0; */
  display: block;
  width: 130px;
  height: 60px;
  border-radius: 10px;
  background-color: var(--black);
  color: var(--white);
  font-size: var(--font-size-xl);
  transition: background-color .2s;

  @include hover() {
    background-color: var(--gray10);
  }
  &.disabled {
    background-color: var(--gray6);
    pointer-events: none;
  }
  &:not(:first-child) {
    margin-left: 50px;
  }
  &.home {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
}

.comment {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 150px;
  font-size: var(--font-size-4xl);
  line-height: 2em;
}

</style>
