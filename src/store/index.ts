import { User } from '@/api/user'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

export interface State{
  user: User | null
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol('realword')

export const store = createStore<State>({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null')
  },
  mutations: {
    setUser (state, user: User) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(state.user))
    },
    removeUser (state) {
      state.user = null
      window.localStorage.removeItem('user')
    }
  }
})

export function useStore () {
  return baseUseStore(key)
}

// export default createStore({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
