<template>
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
    <!-- Header with Progress -->
    <div class="bg-blue-600 px-6 py-8 md:px-10">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-1">
            {{ currentSlide === 1 ? 'Kuesioner Bagian 1' : (currentSlide === 2 ? 'Kuesioner Bagian 2' : 'Validasi Hasil') }}
          </h2>
          <p class="text-blue-100">
            {{ currentSlide <= 2 ? 'Pilih jawaban yang paling sesuai dengan diri Anda' : 'Pilih profil yang paling menggambarkan Anda' }}
          </p>
        </div>
        <div class="hidden sm:block">
          <span class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white text-blue-600 font-bold text-xl shadow-sm">
            {{ currentSlide + 1 }}/4
          </span>
        </div>
      </div>
      
      <!-- Progress Bar -->
      <div class="w-full bg-blue-900 bg-opacity-30 rounded-full h-2.5">
        <div class="bg-white h-2.5 rounded-full transition-all duration-500 ease-in-out" :style="{ width: progressPercentage + '%' }"></div>
      </div>
    </div>
    
    <div class="p-6 md:p-10">
      <form @submit.prevent="nextSlide">
        
        <!-- Slide 1 (Q1 - Q12 + Attention Check) -->
        <div v-show="currentSlide === 1" class="space-y-10">
          <div v-for="(q, index) in slide1Questions" :key="q.id" class="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ index + 1 }}. {{ q.text }}</h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <label v-for="opt in likertOptions" :key="opt.value" 
                class="flex flex-col items-center justify-center p-3 sm:p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all text-center h-full"
                :class="{'bg-blue-50 border-blue-300 ring-2 ring-blue-500 shadow-sm': answers[q.id] === opt.value}">
                <input type="radio" v-model="answers[q.id]" :value="opt.value" class="sr-only" required>
                <span class="text-sm font-medium text-gray-700">{{ opt.label }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Slide 2 (Q13 - Q24) -->
        <div v-show="currentSlide === 2" class="space-y-10">
          <div v-for="(q, index) in slide2Questions" :key="q.id" class="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ index + 13 }}. {{ q.text }}</h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <label v-for="opt in likertOptions" :key="opt.value" 
                class="flex flex-col items-center justify-center p-3 sm:p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all text-center h-full"
                :class="{'bg-blue-50 border-blue-300 ring-2 ring-blue-500 shadow-sm': answers[q.id] === opt.value}">
                <input type="radio" v-model="answers[q.id]" :value="opt.value" class="sr-only" required>
                <span class="text-sm font-medium text-gray-700">{{ opt.label }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Slide 3 (Validation) -->
        <div v-show="currentSlide === 3" class="space-y-8">
          <div v-if="isCalculating" class="flex flex-col items-center justify-center py-12">
            <svg class="animate-spin h-12 w-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-lg text-gray-600">Sedang mengkalkulasi hasil asesmen Anda...</p>
          </div>
          
          <div v-else-if="scoringData">
            <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
              <p class="text-gray-700 mb-2">Berdasarkan jawaban Anda, berikut adalah 3 minat tertinggi dan terendah Anda.</p>
              <p class="font-medium text-gray-900">Mari kita validasi apakah ini sesuai dengan persepsi Anda.</p>
            </div>

            <div class="space-y-8">
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-4">Dari 3 profil <span class="text-green-600">tertinggi</span> ini, mana yang <span class="underline">Paling Sesuai</span> menggambarkan diri Anda? <span class="text-red-500">*</span></h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label v-for="dim in scoringData.top3" :key="'top-'+dim" class="flex flex-col p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors" :class="{'bg-green-50 border-green-300 ring-2 ring-green-500': validationForm.persepsiSesuai === dim}">
                    <input type="radio" v-model="validationForm.persepsiSesuai" :value="dim" class="sr-only" required>
                    <span class="font-bold text-lg mb-1">{{ dimensionNames[dim] }}</span>
                    <span class="text-sm text-gray-600">{{ dimensionDesc[dim] }}</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-4">Dari 3 profil <span class="text-red-500">terendah</span> ini, mana yang <span class="underline">Paling Tidak Sesuai</span> menggambarkan diri Anda? <span class="text-red-500">*</span></h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label v-for="dim in scoringData.bottom3" :key="'bot-'+dim" class="flex flex-col p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors" :class="{'bg-red-50 border-red-300 ring-2 ring-red-500': validationForm.persepsiTidakSesuai === dim}">
                    <input type="radio" v-model="validationForm.persepsiTidakSesuai" :value="dim" class="sr-only" required>
                    <span class="font-bold text-lg mb-1">{{ dimensionNames[dim] }}</span>
                    <span class="text-sm text-gray-600">{{ dimensionDesc[dim] }}</span>
                  </label>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <label class="block text-sm font-bold text-gray-900 mb-2">Pilih 3 Pekerjaan yang paling Anda senangi <span class="text-red-500">*</span></label>
                  <p class="text-xs text-gray-500 mb-2">Pilih maksimal 3 opsi</p>
                  <div class="relative">
                    <div @click="isOpenSenang = !isOpenSenang" class="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white flex justify-between items-center min-h-[42px] focus:ring-riasec-a focus:border-riasec-a">
                      <span v-if="validationForm.pekerjaanDisenangi.length === 0" class="text-gray-500">Pilih pekerjaan...</span>
                      <span v-else class="text-gray-900 truncate">{{ validationForm.pekerjaanDisenangi.join(', ') }}</span>
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <div v-if="isOpenSenang" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <div class="p-2 border-b sticky top-0 bg-white">
                        <input v-model="searchSenang" type="text" placeholder="Cari..." class="w-full px-3 py-1 text-sm border border-gray-300 rounded" @click.stop>
                      </div>
                      <label v-for="job in filteredJobsSenang" :key="job" class="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" :value="job" v-model="validationForm.pekerjaanDisenangi" :disabled="validationForm.pekerjaanDisenangi.length >= 3 && !validationForm.pekerjaanDisenangi.includes(job)" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                        <span class="text-sm text-gray-700">{{ job }}</span>
                      </label>
                      <div v-if="filteredJobsSenang.length === 0" class="p-4 text-center text-gray-500 text-sm">Tidak ditemukan</div>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-bold text-gray-900 mb-2">Pilih 3 Pekerjaan yang paling Anda kuasai <span class="text-red-500">*</span></label>
                  <p class="text-xs text-gray-500 mb-2">Pilih maksimal 3 opsi</p>
                  <div class="relative">
                    <div @click="isOpenDikuasai = !isOpenDikuasai" class="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white flex justify-between items-center min-h-[42px] focus:ring-riasec-a focus:border-riasec-a">
                      <span v-if="validationForm.pekerjaanDikuasai.length === 0" class="text-gray-500">Pilih pekerjaan...</span>
                      <span v-else class="text-gray-900 truncate">{{ validationForm.pekerjaanDikuasai.join(', ') }}</span>
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <div v-if="isOpenDikuasai" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <div class="p-2 border-b sticky top-0 bg-white">
                        <input v-model="searchDikuasai" type="text" placeholder="Cari..." class="w-full px-3 py-1 text-sm border border-gray-300 rounded" @click.stop>
                      </div>
                      <label v-for="job in filteredJobsDikuasai" :key="job" class="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" :value="job" v-model="validationForm.pekerjaanDikuasai" :disabled="validationForm.pekerjaanDikuasai.length >= 3 && !validationForm.pekerjaanDikuasai.includes(job)" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                        <span class="text-sm text-gray-700">{{ job }}</span>
                      </label>
                      <div v-if="filteredJobsDikuasai.length === 0" class="p-4 text-center text-gray-500 text-sm">Tidak ditemukan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMsg" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {{ errorMsg }}
        </div>

        <!-- Actions -->
        <div class="mt-10 pt-6 border-t border-gray-100 flex justify-between">
          <button 
            type="button"
            @click="prevSlide"
            class="px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            :class="{'invisible': currentSlide === 1}"
          >
            Kembali
          </button>
          
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all hover:-translate-y-0.5 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ currentSlide === 3 ? 'Lihat Hasil Akhir' : 'Selanjutnya' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAssessmentStore } from '../stores';
import axios from 'axios';

const router = useRouter();
const store = useAssessmentStore();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const currentSlide = ref(1);
const isCalculating = ref(false);
const isSubmitting = ref(false);
const errorMsg = ref('');
const scoringData = ref(null);

const answers = reactive({});
const validationForm = reactive({
  persepsiSesuai: '',
  persepsiTidakSesuai: '',
  pekerjaanDisenangi: [],
  pekerjaanDikuasai: []
});

const isOpenSenang = ref(false);
const isOpenDikuasai = ref(false);
const searchSenang = ref('');
const searchDikuasai = ref('');

const jobOptions = [
  'Agen perjalanan', 'Ahli biologi', 'Ahli kelautan', 'Ahli kimia', 'Akuntan', 'Aktor', 'Artis', 'Asisten medis', 'Dokter', 'Editor', 'Eksekutif manajer', 'Fotografer', 'Guru', 'Hortikultura', 'Ilmuwan', 'Ilustrator', 'Insinyur', 'Komposer', 'Mekanik', 'Musisi', 'Olahragawan', 'Operator komputer', 'Pekerja medis dan kesehatan', 'Pekerja kantor', 'Pekerja sosial', 'Pelayanan pelanggan', 'Pembangun', 'Pemilik bisnis', 'Penari', 'Penasihat', 'Penata rambut', 'Pengacara', 'Pengelola toko', 'Pengiklan', 'Penjaga taman', 'Penulis', 'Penyanyi', 'Perancang busana', 'Perawat', 'Personel angkatan bersenjata', 'Petani', 'Petugas bank', 'Petugas kepolisian', 'Petugas layanan informasi', 'Petugas pengiriman', 'Petugas penjualan', 'Pilot', 'Politisi', 'Promotor musik atau olahraga', 'Psikolog', 'Pustakawan', 'Reporter', 'Resepsionis', 'Sekretaris', 'Tenaga pengajar', 'Tenaga penjual', 'Teknisi pertanian', 'Teknisi kehutanan', 'Teknologi komputer', 'Tukang listrik', 'Tukang pelapis'
];

const filteredJobsSenang = computed(() => {
  if (!searchSenang.value) return jobOptions;
  return jobOptions.filter(j => j.toLowerCase().includes(searchSenang.value.toLowerCase()));
});

const filteredJobsDikuasai = computed(() => {
  if (!searchDikuasai.value) return jobOptions;
  return jobOptions.filter(j => j.toLowerCase().includes(searchDikuasai.value.toLowerCase()));
});

// Check if clientId exists, if not redirect to start
onMounted(() => {
  if (!store.clientId) {
    // In dev mode or test, we might bypass this, but for real usage:
    // router.push('/biodata');
  }
});

const progressPercentage = computed(() => {
  if (currentSlide.value === 1) return 25;
  if (currentSlide.value === 2) return 50;
  if (currentSlide.value === 3) return 75;
  return 100;
});

const likertOptions = [
  { label: 'Sangat Setuju', value: 4 },
  { label: 'Setuju', value: 3 },
  { label: 'Tidak Setuju', value: 2 },
  { label: 'Sangat Tidak Setuju', value: 1 }
];

const dimensionNames = {
  'R': 'Realistic (Praktis & Fisik)',
  'I': 'Investigative (Analitis)',
  'A': 'Artistic (Kreatif & Ekspresif)',
  'S': 'Social (Interaksi & Pelayanan)',
  'E': 'Enterprising (Pemimpin & Bisnis)',
  'C': 'Conventional (Kerapian & Aturan)'
};

const dimensionDesc = {
  'R': 'Menyukai pekerjaan praktis, menggunakan alat/mesin',
  'I': 'Senang mencari tahu, observasi, memecahkan masalah',
  'A': 'Suka menciptakan ide baru, berkreasi, tidak berulang',
  'S': 'Senang membantu, mengajar, menyembuhkan, melayani',
  'E': 'Suka memimpin, memengaruhi orang lain, berbisnis',
  'C': 'Nyaman dengan aturan, data, angka, keteraturan'
};

const slide1Questions = [
  { id: 'Q1', text: 'Saya suka bekerja menggunakan alat atau peralatan.' },
  { id: 'Q2', text: 'Saya tertarik memperbaiki barang yang rusak.' },
  { id: 'Q3', text: 'Saya nyaman melakukan pekerjaan yang melibatkan aktivitas fisik.' },
  { id: 'Q4', text: 'Saya lebih suka belajar dengan praktik langsung dari pada hanya mendengar penjelasan.' },
  { id: 'Q5', text: 'Saya memiliki rasa ingin tahu yang tinggi.' },
  { id: 'Q6', text: 'Saya tertarik memecahkan masalah yang rumit.' },
  { id: 'Q7', text: 'Saya senang belajar hal baru secara mendalam.' },
  { id: 'Q8', text: 'Saya biasanya berpikir terlebih dahulu sebelum bertindak.' },
  { id: 'Q9', text: 'Saya suka kegiatan yang melibatkan kreativitas.' },
  { id: 'Q10', text: 'Saya senang memainkan alat musik.' },
  { id: 'Q11', text: 'Saya senang ketika bisa mengubah sesuatu yang biasa menjadi lebih menarik.' },
  { id: 'Q12', text: 'Saya kurang menyukai pekerjaan yang berulang / kurang suka pekerjaan yang dilakukan dengan cara yang sama setiap hari.' }
];

const slide2Questions = [
  { id: 'Q13', text: 'Saya suka berinteraksi dengan orang lain.' },
  { id: 'Q14', text: 'Saya senang membantu orang lain.' },
  { id: 'Q15', text: 'Saya merasa nyaman bekerja bersama orang lain.' },
  { id: 'Q16', text: 'Saya senang memberikan pelayanan kepada orang lain.' },
  { id: 'Q17', text: 'Saya suka memimpin orang lain.' },
  { id: 'Q18', text: 'Saya percaya diri dalam mengambil keputusan.' },
  { id: 'Q19', text: 'Saya ingin memiliki usaha mandiri.' },
  { id: 'Q20', text: 'Saya suka mencari cara untuk mendapatkan uang.' },
  { id: 'Q21', text: 'Saya suka pekerjaan yang rapi.' },
  { id: 'Q22', text: 'Saya teliti saat bekerja.' },
  { id: 'Q23', text: 'Saya nyaman mengikuti aturan.' },
  { id: 'Q24', text: 'Saya memperhatikan hal kecil dalam pekerjaan.' }
];

const prevSlide = () => {
  if (currentSlide.value > 1) {
    currentSlide.value--;
    window.scrollTo(0, 0);
  }
};

const nextSlide = async () => {
  errorMsg.value = '';
  
  if (currentSlide.value === 1) {
    const unanswered = slide1Questions.find(q => !answers[q.id]);
    if (unanswered) {
      errorMsg.value = 'Mohon jawab semua pertanyaan pada halaman ini sebelum melanjutkan.';
      return;
    }
    currentSlide.value = 2;
    window.scrollTo(0, 0);
  } 
  else if (currentSlide.value === 2) {
    const unanswered = slide2Questions.find(q => !answers[q.id]);
    if (unanswered) {
      errorMsg.value = 'Mohon jawab semua pertanyaan pada halaman ini sebelum melanjutkan.';
      return;
    }
    // Submit answers to calculate scores
    await submitAnswers();
  }
  else if (currentSlide.value === 3) {
    if (!validationForm.persepsiSesuai || !validationForm.persepsiTidakSesuai) {
      errorMsg.value = 'Mohon lengkapi profil yang paling sesuai dan paling tidak sesuai.';
      return;
    }
    if (validationForm.pekerjaanDisenangi.length === 0 || validationForm.pekerjaanDikuasai.length === 0) {
      errorMsg.value = 'Mohon pilih minimal 1 pekerjaan yang disenangi dan dikuasai.';
      return;
    }
    // Submit validation
    await submitValidation();
  }
};

const submitAnswers = async () => {
  try {
    isSubmitting.value = true;
    
    // Convert object answers to pure numbers for Q1-Q24
    const cleanedAnswers = {};
    for (let i = 1; i <= 24; i++) {
      cleanedAnswers[`Q${i}`] = answers[`Q${i}`];
    }
    
    const payload = {
      clientId: store.clientId,
      answers: cleanedAnswers,
      attentionCheck: 'Tidak'
    };
    
    if (!payload.clientId) {
      throw new Error('Sesi Anda telah berakhir. Silakan kembali ke halaman biodata.');
    }

    const response = await axios.post(`${API_URL}/assessment/submit`, payload);
    
    scoringData.value = response.data;
    store.setResults(response.data);
    
    currentSlide.value = 3;
    window.scrollTo(0, 0);
  } catch (error) {
    console.error('Error submitting answers:', error);
    errorMsg.value = error.response?.data?.error || 'Terjadi kesalahan saat mengirim jawaban.';
  } finally {
    isSubmitting.value = false;
  }
};

const submitValidation = async () => {
  try {
    isSubmitting.value = true;
    
    const payload = {
      assessmentId: scoringData.value.assessmentId,
      persepsiSesuai: validationForm.persepsiSesuai,
      persepsiTidakSesuai: validationForm.persepsiTidakSesuai,
      pekerjaanDisenangi: validationForm.pekerjaanDisenangi,
      pekerjaanDikuasai: validationForm.pekerjaanDikuasai
    };

    if (!store.clientId) {
      throw new Error('Sesi Anda telah berakhir. Silakan kembali ke halaman biodata.');
    }
    
    await axios.post(`${API_URL}/assessment/validate`, payload);
    
    router.push('/result');
  } catch (error) {
    console.error('Error submitting validation:', error);
    errorMsg.value = error.response?.data?.error || 'Terjadi kesalahan saat mengirim validasi.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
