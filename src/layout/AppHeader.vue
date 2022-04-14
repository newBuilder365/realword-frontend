<template>
  <nav class='navbar navbar-light'>
    <div class='container'>
      <a class='navbar-brand' href='index.html'>conduit</a>
      <ul class='nav navbar-nav pull-xs-right'>
        <li class='nav-item'>
          <!-- Add 'active' class when you're on that page' -->
          <router-link to='/' class='nav-link' :class='currentPath==="/"?"active":null'>Home</router-link>
        </li>
        <template v-if='$store.state.user'>
          <li class='nav-item'>
            <router-link class='nav-link' to='/editArticle' :class='currentPath==="/editArticle"?"active":null'>
              <i class='ion-compose'></i>&nbsp;New Article
            </router-link>
          </li>
          <li class='nav-item'>
            <router-link class='nav-link' to='/setting' :class='currentPath==="/setting"?"active":null'>
              <i class='ion-gear-a'></i>&nbsp;Settings
            </router-link>
          </li>
          <li class='nav-item'>
            <router-link class='nav-link' to='/profile' :class='currentPath==="/profile"?"active":null'>
              <el-dropdown>
                <img class="user-pic" :src='$store.state.user.image || "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"'>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              {{ $store.state.user.username }}
            </router-link>
          </li>
        </template>
        <template v-else>
          <li class='nav-item'>
          <router-link class='nav-link' to='/login' :class='currentPath==="/login"?"active":null'> Sign in </router-link>
        </li>
        <li class='nav-item'>
          <router-link class='nav-link' to='/register' :class='currentPath==="/register"?"active":null'>Sign up</router-link>
        </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
export default defineComponent({
  name: 'AppHeader',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const currentPath = computed(() => {
      return route.path
    })

    const loginOut = () => {
      store.commit('removeUser')
      router.push('/login')
    }
    return {
      currentPath,
      loginOut
    }
  }
})
</script>

<style lang='scss' scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
