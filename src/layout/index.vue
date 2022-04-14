<template>
  <app-header />
    <router-view />
  <app-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/layout/AppHeader.vue'
import AppFooter from '@/layout/AppFooter.vue'
export default defineComponent({
  name: 'AppLayout',
  components: {
    AppHeader,
    AppFooter
  }
})
</script>
