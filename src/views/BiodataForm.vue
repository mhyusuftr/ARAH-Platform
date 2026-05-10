<template>
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto">
    <div class="bg-riasec-i px-6 py-8 md:px-10 flex items-center justify-between">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Identitas Klien</h2>
        <p class="text-green-100">Silakan isi data diri Anda dengan lengkap</p>
      </div>
      <div class="hidden sm:block">
        <span class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white text-riasec-i font-bold text-xl">
          1/4
        </span>
      </div>
    </div>
    
    <div class="p-6 md:p-10">
      <form @submit.prevent="submitForm" class="space-y-6">
        
        <!-- Row 1 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="nama" class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap <span class="text-red-500">*</span></label>
            <input 
              id="nama" 
              v-model="form.nama" 
              type="text" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-riasec-i focus:border-riasec-i transition-colors"
              placeholder="Masukkan nama lengkap"
            >
          </div>
          <div>
            <label for="usia" class="block text-sm font-medium text-gray-700 mb-1">Usia <span class="text-red-500">*</span></label>
            <input 
              id="usia" 
              v-model.number="form.usia" 
              type="number" 
              min="10" 
              max="100"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-riasec-i focus:border-riasec-i transition-colors"
              placeholder="Contoh: 16"
            >
          </div>
        </div>

        <!-- Row 2 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin <span class="text-red-500">*</span></label>
            <div class="flex space-x-4">
              <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 flex-1 transition-colors" :class="{'bg-green-50 border-green-200': form.jenisKelamin === 'Laki-laki'}">
                <input type="radio" v-model="form.jenisKelamin" value="Laki-laki" class="h-4 w-4 text-riasec-i focus:ring-riasec-i" required>
                <span class="ml-2 text-gray-700">Laki-laki</span>
              </label>
              <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 flex-1 transition-colors" :class="{'bg-green-50 border-green-200': form.jenisKelamin === 'Perempuan'}">
                <input type="radio" v-model="form.jenisKelamin" value="Perempuan" class="h-4 w-4 text-riasec-i focus:ring-riasec-i" required>
                <span class="ml-2 text-gray-700">Perempuan</span>
              </label>
            </div>
          </div>
          
          <div>
            <label for="statusPerkawinan" class="block text-sm font-medium text-gray-700 mb-1">Status Perkawinan <span class="text-red-500">*</span></label>
            <select 
              id="statusPerkawinan" 
              v-model="form.statusPerkawinan" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-riasec-i focus:border-riasec-i bg-white transition-colors h-[42px]"
            >
              <option value="" disabled>Pilih status...</option>
              <option value="Belum menikah">Belum menikah</option>
              <option value="Menikah">Menikah</option>
              <option value="Cerai">Cerai</option>
            </select>
          </div>
        </div>

        <!-- Row 3 -->
        <div>
          <label for="alamat" class="block text-sm font-medium text-gray-700 mb-1">Alamat Tempat Tinggal Saat Ini <span class="text-red-500">*</span></label>
          <textarea 
            id="alamat" 
            v-model="form.alamat" 
            rows="3" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-riasec-i focus:border-riasec-i transition-colors"
            placeholder="Masukkan alamat lengkap..."
          ></textarea>
        </div>

        <!-- Row 4 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Dukungan Keluarga untuk Bekerja <span class="text-red-500">*</span></label>
            <div class="flex space-x-4">
              <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 flex-1 transition-colors" :class="{'bg-green-50 border-green-200': form.dukunganKeluarga === true}">
                <input type="radio" v-model="form.dukunganKeluarga" :value="true" class="h-4 w-4 text-riasec-i focus:ring-riasec-i" required>
                <span class="ml-2 text-gray-700">Ya</span>
              </label>
              <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 flex-1 transition-colors" :class="{'bg-green-50 border-green-200': form.dukunganKeluarga === false}">
                <input type="radio" v-model="form.dukunganKeluarga" :value="false" class="h-4 w-4 text-riasec-i focus:ring-riasec-i" required>
                <span class="ml-2 text-gray-700">Tidak</span>
              </label>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Memiliki Tanggungan (Anak/Keluarga)? <span class="text-red-500">*</span></label>
            <div class="flex space-x-4">
              <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 flex-1 transition-colors" :class="{'bg-green-50 border-green-200': form.tanggungan === true}">
                <input type="radio" v-model="form.tanggungan" :value="true" class="h-4 w-4 text-riasec-i focus:ring-riasec-i" required>
                <span class="ml-2 text-gray-700">Ya</span>
              </label>
              <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 flex-1 transition-colors" :class="{'bg-green-50 border-green-200': form.tanggungan === false}">
                <input type="radio" v-model="form.tanggungan" :value="false" class="h-4 w-4 text-riasec-i focus:ring-riasec-i" required>
                <span class="ml-2 text-gray-700">Tidak</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Row 5 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Pendidikan Terakhir <span class="text-red-500">*</span></label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <label v-for="edu in educationOptions" :key="edu" class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" :class="{'bg-green-50 border-green-200 ring-1 ring-riasec-i': form.pendidikanTerakhir === edu}">
              <input type="radio" v-model="form.pendidikanTerakhir" :value="edu" class="h-4 w-4 text-riasec-i focus:ring-riasec-i" required>
              <span class="ml-2 text-sm text-gray-700">{{ edu }}</span>
            </label>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMsg" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {{ errorMsg }}
        </div>

        <!-- Actions -->
        <div class="mt-8 pt-6 border-t border-gray-100 flex justify-between">
          <button 
            type="button"
            @click="$router.push('/consent')"
            class="px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-riasec-i transition-colors"
          >
            Kembali
          </button>
          <button 
            type="submit"
            :disabled="isLoading"
            class="px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-riasec-i hover:bg-green-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-riasec-i transform transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Mulai Kuesioner
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAssessmentStore } from '../stores';
import axios from 'axios';

const router = useRouter();
const store = useAssessmentStore();

const educationOptions = [
  'Tidak sekolah', 'SD', 'SMP', 'SMA/SMK', 'Diploma/Sarjana', 'Magister'
];

const form = reactive({
  nama: '',
  usia: null,
  jenisKelamin: '',
  alamat: '',
  statusPerkawinan: '',
  dukunganKeluarga: null,
  tanggungan: null,
  pendidikanTerakhir: ''
});

const isLoading = ref(false);
const errorMsg = ref('');

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const submitForm = async () => {
  try {
    isLoading.value = true;
    errorMsg.value = '';
    
    // Save locally
    store.setClientData(form);
    
    // Send to backend
    const response = await axios.post(`${API_URL}/assessment/start`, form);
    
    // Store clientId for later
    store.$patch({ clientId: response.data.clientId });
    
    // Navigate to questionnaire
    router.push('/test');
  } catch (error) {
    console.error('Error submitting biodata:', error);
    errorMsg.value = error.response?.data?.error || 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
};
</script>
