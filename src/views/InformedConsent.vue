<template>
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto">
    <div class="bg-riasec-r px-6 py-8 md:px-10">
      <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Persetujuan Klien</h2>
      <p class="text-blue-100">Informed Consent</p>
    </div>
    
    <div class="p-6 md:p-10">
      <div class="prose prose-blue max-w-none text-gray-600 mb-8 space-y-4">
        <p>
          Selamat datang di Platform ARAH. Sebelum memulai asesmen, mohon membaca dan menyetujui pernyataan berikut:
        </p>
        <div class="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <ul class="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-700">
            <li>Asesmen ini bertujuan untuk mengetahui profil minat dan bakat Anda berdasarkan metode RIASEC.</li>
            <li>Hasil asesmen akan digunakan oleh Pembimbing Kemasyarakatan (PK) untuk memberikan rekomendasi pekerjaan dan arah pengembangan diri yang tepat.</li>
            <li>Data pribadi dan hasil tes Anda akan <strong>dijaga kerahasiaannya</strong> dan hanya digunakan untuk kepentingan pembinaan.</li>
            <li>Tidak ada jawaban benar atau salah. Mohon jawab setiap pernyataan dengan jujur sesuai dengan kondisi dan perasaan Anda yang sebenarnya.</li>
          </ul>
        </div>
      </div>

      <div class="mt-8">
        <label class="flex items-start cursor-pointer group">
          <div class="flex items-center h-5 mt-1">
            <input 
              v-model="isAgreed" 
              type="checkbox" 
              class="w-5 h-5 text-riasec-r bg-gray-100 border-gray-300 rounded focus:ring-riasec-r focus:ring-2"
            >
          </div>
          <div class="ml-3 text-sm md:text-base">
            <span class="font-medium text-gray-900 group-hover:text-riasec-r transition-colors">
              Saya telah membaca dan memahami tujuan formulir ini, serta bersedia mengisi data dengan jujur. Saya menyetujui bahwa data yang diberikan akan digunakan sesuai kebutuhan dan dijaga kerahasiaannya.
            </span>
          </div>
        </label>
      </div>

      <div class="mt-10 flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-4">
        <button 
          @click="$router.push('/')"
          class="mt-4 sm:mt-0 w-full sm:w-auto px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-riasec-r transition-colors"
        >
          Kembali
        </button>
        <button 
          @click="proceed"
          :disabled="!isAgreed"
          :class="[
            'w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all',
            isAgreed ? 'bg-riasec-r hover:bg-blue-600 focus:ring-riasec-r transform hover:-translate-y-0.5' : 'bg-gray-300 cursor-not-allowed'
          ]"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAgreed = ref(false);

const proceed = () => {
  if (isAgreed.value) {
    router.push('/biodata');
  }
};
</script>
