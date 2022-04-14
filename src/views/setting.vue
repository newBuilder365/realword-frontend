<template>
  <div class="settings-page">
    <div class="container page">
        <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Your Settings</h1>

                <form @submit.prevent='handleSubmit' v-loading='loading'>
                    <fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea v-model="user.bio" class="form-control form-control-lg" rows="8"
                                      placeholder="Short bio about you"></textarea>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            Update Settings
                        </button>
                    </fieldset>
                </form>
            </div>

        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getUserInfo, updateUserInfo } from '@/api/user'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'ProfilePage',
  setup () {
    const user = reactive({
      username: '',
      email: '',
      password: '',
      bio: '',
      image: ''
    })
    const loading = ref(false)
    onMounted(async () => {
      loading.value = true
      try {
        const { data } = await getUserInfo()
        Object.assign(user, data.user)
      } catch (error: any) {
        console.log(error.response.data)
      }
      loading.value = false
    })

    const handleSubmit = async () => {
      loading.value = true
      try {
        await updateUserInfo(user)
        ElMessage({
          message: '更新成功',
          type: 'success'
        })
      } catch (error: any) {
        console.log(error.response.data)
      }
      loading.value = false
    }
    return {
      user,
      handleSubmit,
      loading
    }
  }
})
</script>
