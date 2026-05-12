<template>
  <!-- Admin routes: no wrapper layout -->
  <div v-if="isAdminRoute">
    <router-view />
  </div>

  <!-- Public routes: with header & footer -->
  <div v-else class="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
    <!-- Header/Navigation -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center cursor-pointer" @click="$router.push('/')">
            <div class="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xl mr-2 shadow-md">A</div>
            <span class="font-bold text-xl tracking-tight text-gray-800">ARAH</span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500 hidden sm:block">Asesmen Rekomendasi dan Arah Pengembangan</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }} Platform ARAH. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
// Main layout component
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
