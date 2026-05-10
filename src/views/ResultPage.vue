<template>
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
    <div class="bg-gradient-to-r from-riasec-r to-riasec-a px-6 py-10 md:px-12 text-center text-white">
      <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold mb-2">Asesmen Selesai!</h2>
      <p class="text-blue-100 text-lg">Terima kasih telah menyelesaikan tes minat bakat RIASEC.</p>
    </div>
    
    <div class="p-6 md:p-10">
      <div v-if="isLoading" class="flex justify-center py-12">
        <svg class="animate-spin h-10 w-10 text-riasec-r" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <div v-else-if="errorMsg" class="text-center py-8">
        <div class="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h3>
        <p class="text-gray-600 mb-6">{{ errorMsg }}</p>
        <button @click="$router.push('/')" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors">
          Kembali ke Beranda
        </button>
      </div>

      <div v-else-if="resultData" class="space-y-10">
        
        <!-- Warning for failed attention check -->
        <div v-if="!resultData.isValid" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Perhatian: Hasil Asesmen Mungkin Kurang Akurat</h3>
              <div class="mt-2 text-sm text-red-700">
                <p>Sistem mendeteksi inkonsistensi dalam pengisian kuesioner Anda. Pembimbing Kemasyarakatan akan melakukan verifikasi lebih lanjut.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Profile -->
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-500 uppercase tracking-wider mb-2">Profil Dominan Anda</h3>
          
          <div class="inline-flex items-center justify-center space-x-4 mb-6">
            <div v-for="(profile, index) in resultData.rankedProfile.slice(0, 3)" :key="profile.dimension" class="flex flex-col items-center">
              <div 
                class="flex items-center justify-center font-bold text-white shadow-lg relative"
                :class="[
                  index === 0 ? 'w-24 h-24 text-4xl rounded-2xl z-10' : 'w-16 h-16 text-2xl rounded-xl opacity-80',
                  getDimensionColor(profile.dimension)
                ]"
              >
                {{ profile.dimension }}
                <div v-if="index === 0" class="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white text-xs">
                  ★
                </div>
              </div>
              <span class="mt-2 text-sm font-medium text-gray-700">{{ dimensionNames[profile.dimension] }}</span>
              <span class="text-xs text-gray-500">{{ profile.score }}% ({{ profile.category }})</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Radar Chart Placeholder -->
          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center justify-center min-h-[300px]">
            <h4 class="font-bold text-gray-800 mb-4">Grafik Dimensi RIASEC</h4>
            <div class="relative w-full aspect-square max-w-[250px]">
              <!-- Mock Radar Chart for demonstration -->
              <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
                <!-- Grid -->
                <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="#e5e7eb" stroke-width="1" />
                <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="#e5e7eb" stroke-width="1" />
                <polygon points="50,35 65,42.5 65,57.5 50,65 35,57.5 35,42.5" fill="none" stroke="#e5e7eb" stroke-width="1" />
                
                <!-- Axes -->
                <line x1="50" y1="50" x2="50" y2="5" stroke="#e5e7eb" stroke-width="1" />
                <line x1="50" y1="50" x2="95" y2="27.5" stroke="#e5e7eb" stroke-width="1" />
                <line x1="50" y1="50" x2="95" y2="72.5" stroke="#e5e7eb" stroke-width="1" />
                <line x1="50" y1="50" x2="50" y2="95" stroke="#e5e7eb" stroke-width="1" />
                <line x1="50" y1="50" x2="5" y2="72.5" stroke="#e5e7eb" stroke-width="1" />
                <line x1="50" y1="50" x2="5" y2="27.5" stroke="#e5e7eb" stroke-width="1" />
                
                <!-- Labels -->
                <text x="50" y="4" font-size="4" text-anchor="middle" fill="#3B82F6" font-weight="bold">R</text>
                <text x="96" y="27" font-size="4" text-anchor="start" fill="#10B981" font-weight="bold">I</text>
                <text x="96" y="74" font-size="4" text-anchor="start" fill="#8B5CF6" font-weight="bold">A</text>
                <text x="50" y="98" font-size="4" text-anchor="middle" fill="#F59E0B" font-weight="bold">S</text>
                <text x="4" y="74" font-size="4" text-anchor="end" fill="#EF4444" font-weight="bold">E</text>
                <text x="4" y="27" font-size="4" text-anchor="end" fill="#374151" font-weight="bold">C</text>
                
                <!-- Data Polygon (Mock based on R-I-E) -->
                <polygon points="50,15 85,30 60,60 50,70 30,50 40,30" fill="rgba(59, 130, 246, 0.4)" stroke="#3B82F6" stroke-width="2" />
              </svg>
            </div>
          </div>

          <!-- Interpretations -->
          <div class="space-y-6">
            <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <div class="flex items-center mb-3">
                <span class="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <h4 class="font-bold text-gray-900">Interpretasi Singkat</h4>
              </div>
              <p class="text-sm text-gray-700 leading-relaxed">
                Kombinasi dominan Anda adalah <strong>{{ resultData.top3.join('') }}</strong>. Anda cenderung menyukai pekerjaan yang praktis dan nyata, namun juga memiliki ketertarikan untuk memecahkan masalah analitis, serta memiliki jiwa kepemimpinan atau kewirausahaan.
              </p>
            </div>
            
            <div class="bg-green-50 p-6 rounded-2xl border border-green-100">
              <div class="flex items-center mb-3">
                <span class="p-2 bg-green-100 text-green-600 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <h4 class="font-bold text-gray-900">Rekomendasi Pekerjaan</h4>
              </div>
              <ul class="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>Teknisi Komputer / IT Support</li>
                <li>Analis Data Logistik</li>
                <li>Manajer Proyek Konstruksi</li>
                <li>Wirausaha Bidang Teknologi</li>
              </ul>
            </div>
            
            <div class="bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <div class="flex items-center mb-3">
                <span class="p-2 bg-purple-100 text-purple-600 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </span>
                <h4 class="font-bold text-gray-900">Arah Pengembangan</h4>
              </div>
              <p class="text-sm text-gray-700 leading-relaxed mb-2">
                Fokuslah pada pengembangan keterampilan teknis yang spesifik, serta kemampuan problem-solving. Anda disarankan mengikuti:
              </p>
              <ul class="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>Pelatihan Teknisi atau Vokasi</li>
                <li>Workshop Kewirausahaan</li>
                <li>Kursus Analisis Data Dasar</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-100 text-center">
          <p class="text-gray-500 text-sm mb-6">Hasil asesmen yang lebih komprehensif akan didiskusikan bersama Pembimbing Kemasyarakatan Anda.</p>
          <button 
            @click="$router.push('/')"
            class="px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gray-800 hover:bg-gray-900 shadow-sm focus:outline-none transition-colors"
          >
            Selesai & Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAssessmentStore } from '../stores';
import axios from 'axios';

const store = useAssessmentStore();
const isLoading = ref(true);
const errorMsg = ref('');
const resultData = ref(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const dimensionNames = {
  'R': 'Realistic',
  'I': 'Investigative',
  'A': 'Artistic',
  'S': 'Social',
  'E': 'Enterprising',
  'C': 'Conventional'
};

const getDimensionColor = (dim) => {
  const colors = {
    'R': 'bg-blue-500',
    'I': 'bg-green-500',
    'A': 'bg-purple-500',
    'S': 'bg-yellow-500',
    'E': 'bg-red-500',
    'C': 'bg-gray-700'
  };
  return colors[dim] || 'bg-gray-500';
};

onMounted(async () => {
  try {
    // If we have data in store (e.g. from just completing the test)
    if (store.results) {
      // Fetch full result from backend if we have ID
      if (store.results.assessmentId && store.results.assessmentId !== 'mock_id') {
        const response = await axios.get(`${API_URL}/assessment/result/${store.results.assessmentId}`);
        resultData.value = response.data;
      } else {
        // Use mock data for frontend testing
        resultData.value = {
          isValid: store.results.isValid,
          rankedProfile: [
            { dimension: 'R', score: 85, category: 'Tinggi' },
            { dimension: 'I', score: 75, category: 'Tinggi' },
            { dimension: 'E', score: 65, category: 'Sedang' },
            { dimension: 'S', score: 45, category: 'Sedang' },
            { dimension: 'C', score: 35, category: 'Rendah' },
            { dimension: 'A', score: 25, category: 'Rendah' }
          ],
          top3: ['R', 'I', 'E']
        };
      }
    } else {
      errorMsg.value = 'Data hasil asesmen tidak ditemukan.';
    }
  } catch (error) {
    console.error('Error fetching results:', error);
    errorMsg.value = 'Gagal memuat hasil asesmen.';
  } finally {
    isLoading.value = false;
  }
});
</script>
