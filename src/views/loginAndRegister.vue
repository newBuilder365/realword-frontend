<template>
  <div class='auth-page'>
    <div class='container page'>
      <div class='row'>
        <div class='col-md-6 offset-md-3 col-xs-12'>
          <h1 class='text-xs-center'>
            {{ isLogin? "Sign in": "Sign up" }}
          </h1>
          <p class='text-xs-center' v-show="!isLogin">
            <router-link to='/login'>Have an account?</router-link>
          </p>

          <ul class='error-messages'>
            <li v-for="(error, index) in errors" :key="index">
              {{ `${error.field} ${error.message}` }}
            </li>
          </ul>

          <form @submit.prevent='handleSubmit'>
            <fieldset class='form-group' v-show='!isLogin'>
              <input
                v-model='user.username'
                class='form-control form-control-lg'
                type='text'
                placeholder='Your Name'
              />
            </fieldset>
            <fieldset class='form-group'>
              <input
                v-model='user.email'
                class='form-control form-control-lg'
                type='email'
                placeholder='Email'
              />
            </fieldset>
            <fieldset class='form-group'>
              <input
                v-model='user.password'
                class='form-control form-control-lg'
                type='password'
                placeholder='Password'
              />
            </fieldset>
            <button class='btn btn-lg btn-primary pull-xs-right' :disabled='isLoading'>
              {{ isLogin? "Sign in": "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, computed } from 'vue'
import { login, register } from '@/api/user'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  name: 'LoginAndRegisterPage',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const errors = ref([])
    const isLoading = ref(false)
    const isLogin = computed(() => {
      return route.path === '/login'
    })
    const user = reactive({
      username: '',
      email: '',
      password: ''
    })

    const handleSubmit = async () => {
      errors.value = []
      isLoading.value = true
      try {
        const { data } = isLogin.value
          ? await login({
            email: user.email,
            password: user.password
          })
          : await register({
            username: user.username,
            email: user.email,
            password: user.password
          })
        store.commit('setUser', data.user)
        router.push('/')
      } catch (err: any) {
        if (err.response.status === 422) {
          errors.value = err.response.data.detail
        }
      }
      isLoading.value = false
    }

    return {
      user,
      handleSubmit,
      isLogin,
      isLoading,
      errors
    }
  }
})
</script>
