<template>
  <div class="flex flex-col items-center justify-center text-center space-y-8 py-12">
    <!-- Hero Image/Icon -->
    <div class="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-xl flex items-center justify-center p-6 border-4 border-riasec-r">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-riasec-r" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
      <div class="absolute -bottom-4 bg-riasec-r text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
        RIASEC
      </div>
    </div>

    <!-- Title -->
    <div class="max-w-2xl">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
        Platform <span class="text-transparent bg-clip-text bg-gradient-to-r from-riasec-r to-riasec-a">ARAH</span>
      </h1>
      <p class="text-xl md:text-2xl font-medium text-gray-600 mb-2">
        Asesmen Rekomendasi dan Arah Pengembangan Klien
      </p>
      <p class="text-gray-500 mt-6 text-lg leading-relaxed max-w-xl mx-auto">
        Kenali minat dan potensi tersembunyimu. Platform ARAH menggunakan metode RIASEC untuk membantu menemukan arah karir dan pengembangan diri yang paling sesuai dengan kepribadianmu.
      </p>
    </div>

    <!-- Action Button -->
    <div class="pt-8 w-full max-w-xs">
      <button 
        @click="$router.push('/consent')"
        class="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-riasec-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-riasec-r transition-all transform hover:scale-105 shadow-lg"
      >
        Mulai Asesmen
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      <p class="text-sm text-gray-400 mt-4">Estimasi waktu: 10-15 menit</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAssessmentStore } from '../stores';

const store = useAssessmentStore();

onMounted(() => {
  // Reset store when visiting landing page
  store.$reset();
});
</script>
