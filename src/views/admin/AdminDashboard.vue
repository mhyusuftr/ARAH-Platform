<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Mobile Overlay -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 bg-black/50 z-30 lg:hidden"></div>

    <!-- Sidebar -->
    <aside :class="[sidebarOpen ? 'translate-x-0' : '-translate-x-full', 'lg:translate-x-0']"
      class="w-64 bg-blue-700 text-white flex flex-col fixed inset-y-0 z-40 transition-transform duration-300">
      <div class="h-16 flex items-center px-6 border-b border-blue-600">
        <div class="h-8 w-8 rounded-md bg-white text-blue-700 flex items-center justify-center font-bold text-xl mr-3">A</div>
        <span class="font-bold text-xl">ARAH CMS</span>
        <button @click="sidebarOpen = false" class="ml-auto lg:hidden text-white/80 hover:text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <a href="#" @click.prevent="activeTab='dashboard'" class="flex items-center px-4 py-3 rounded-xl transition-colors"
          :class="activeTab==='dashboard' ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-600'">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Dashboard
        </a>
        <a href="#" @click.prevent="activeTab='clients'" class="flex items-center px-4 py-3 rounded-xl transition-colors"
          :class="activeTab==='clients' ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-600'">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          Daftar Klien
        </a>
      </nav>
      <div class="p-4 border-t border-blue-600">
        <button @click="logout" class="flex items-center w-full px-4 py-2 text-sm text-blue-100 hover:text-white transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
      <!-- Topbar -->
      <header class="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 z-10 flex-shrink-0">
        <div class="flex items-center">
          <button @click="sidebarOpen = !sidebarOpen" class="mr-4 lg:hidden text-gray-600 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <h1 class="text-xl font-bold text-gray-800">{{ activeTab === 'dashboard' ? 'Dashboard' : 'Daftar Klien' }}</h1>
        </div>
        <div class="flex items-center">
          <span class="mr-4 text-sm font-medium text-gray-600 hidden sm:block">Halo, {{ adminInfo?.nama || 'Admin' }}</span>
          <div class="h-8 w-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
            {{ (adminInfo?.nama || 'A').charAt(0) }}
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto p-4 md:p-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center">
            <div class="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase">Total Klien</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalClients }}</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center">
            <div class="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase">Asesmen Selesai</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.completedAssessments }}</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center">
            <div class="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase">Belum Selesai</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalClients - stats.completedAssessments }}</p>
            </div>
          </div>
        </div>

        <!-- Client Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-50">
            <h3 class="text-lg font-bold text-gray-900">Data Klien</h3>
            <div class="relative w-full sm:w-64">
              <input type="text" v-model="searchQuery" placeholder="Cari nama klien..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full">
              <div class="absolute left-3 top-2.5 text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
            </div>
          </div>
          
          <!-- Mobile Cards -->
          <div class="block sm:hidden divide-y divide-gray-200">
            <div v-for="client in filteredClients" :key="client.id" class="p-4">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center">
                  <div class="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm mr-3">{{ client.nama.charAt(0) }}</div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ client.nama }}</div>
                    <div class="text-xs text-gray-500">{{ client.usia }} thn, {{ client.jenisKelamin }}</div>
                  </div>
                </div>
                <span v-if="client.hasAssessment" :class="client.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 py-0.5 text-xs font-semibold rounded-full">{{ client.isValid ? 'Valid' : 'Invalid' }}</span>
                <span v-else class="bg-gray-100 text-gray-800 px-2 py-0.5 text-xs font-semibold rounded-full">Biodata Saja</span>
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="flex space-x-1">
                  <span v-for="dim in client.top3" :key="dim" class="px-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{{ dim }}</span>
                </div>
                <div class="flex space-x-3">
                  <button @click="showDetail(client)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Detail</button>
                  <button @click="deleteClient(client)" class="text-red-600 hover:text-red-800 text-sm font-medium">Hapus</button>
                </div>
              </div>
            </div>
            <div v-if="filteredClients.length === 0" class="p-8 text-center text-gray-500">Belum ada data klien</div>
          </div>

          <!-- Desktop Table -->
          <div class="hidden sm:block overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Klien</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Top 3 Profil</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Validasi</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="client in filteredClients" :key="client.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">{{ client.nama.charAt(0) }}</div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ client.nama }}</div>
                        <div class="text-sm text-gray-500">{{ client.usia }} tahun, {{ client.jenisKelamin }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ client.date }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex space-x-1">
                      <span v-for="dim in client.top3" :key="dim" class="px-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{{ dim }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span v-if="client.hasAssessment" :class="client.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 text-xs font-semibold rounded-full leading-5">{{ client.isValid ? 'Valid' : 'Invalid' }}</span>
                    <span v-else class="px-2 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 leading-5">-</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="client.hasAssessment ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'" class="px-2 text-xs font-semibold rounded-full leading-5">{{ client.hasAssessment ? 'Selesai' : 'Biodata Saja' }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button @click="showDetail(client)" class="text-blue-600 hover:text-blue-900 font-medium mr-4">Lihat Detail</button>
                    <button @click="deleteClient(client)" class="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                  </td>
                </tr>
                <tr v-if="filteredClients.length === 0">
                  <td colspan="5" class="px-6 py-12 text-center text-gray-500">Belum ada data klien</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Detail Modal -->
    <div v-if="selectedClient" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="selectedClient = null">
      <div class="fixed inset-0 bg-black/50" @click="selectedClient = null"></div>
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10 relative">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-blue-600 text-white px-6 py-5 rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 class="text-xl font-bold">Detail Klien</h2>
            <p class="text-blue-100 text-sm">{{ selectedClient.nama }}</p>
          </div>
          <button @click="selectedClient = null" class="text-white/80 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="p-6 space-y-6">
          <!-- Biodata -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              Biodata
            </h3>
            <div class="grid grid-cols-2 gap-3 text-sm bg-gray-50 rounded-xl p-4">
              <div><span class="text-gray-500">Nama:</span> <span class="font-medium text-gray-900">{{ detailData?.clientInfo?.nama || selectedClient.nama }}</span></div>
              <div><span class="text-gray-500">Usia:</span> <span class="font-medium text-gray-900">{{ detailData?.clientInfo?.usia || selectedClient.usia }} tahun</span></div>
              <div><span class="text-gray-500">Jenis Kelamin:</span> <span class="font-medium text-gray-900">{{ detailData?.clientInfo?.jenis_kelamin || selectedClient.jenisKelamin }}</span></div>
              <div><span class="text-gray-500">Pendidikan:</span> <span class="font-medium text-gray-900">{{ detailData?.clientInfo?.pendidikan_terakhir || '-' }}</span></div>
              <div><span class="text-gray-500">Status:</span> <span class="font-medium text-gray-900">{{ detailData?.clientInfo?.status_perkawinan || '-' }}</span></div>
              <div><span class="text-gray-500">Alamat:</span> <span class="font-medium text-gray-900">{{ detailData?.clientInfo?.alamat || '-' }}</span></div>
              <div><span class="text-gray-500">Dukungan Keluarga:</span> <span class="font-medium text-gray-900">{{ detailData?.clientInfo?.dukungan_keluarga ? 'Ya' : 'Tidak' }}</span></div>
              <div><span class="text-gray-500">Tanggungan:</span> <span class="font-medium text-gray-900">{{ detailData?.clientInfo?.tanggungan ? 'Ya' : 'Tidak' }}</span></div>
            </div>
          </div>

          <!-- Attention Check -->
          <div class="flex items-center gap-2 p-3 rounded-lg" :class="detailData?.attention_check_passed ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="text-sm font-medium">Attention Check: {{ detailData?.attention_check_passed ? 'Lulus' : 'Tidak Lulus' }}</span>
          </div>

          <!-- Skor RIASEC -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              Skor RIASEC
            </h3>
            <div class="space-y-3">
              <div v-for="dim in ['R','I','A','S','E','C']" :key="dim" class="flex items-center gap-3">
                <span class="w-6 text-sm font-bold text-blue-700">{{ dim }}</span>
                <div class="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div class="bg-blue-500 h-full rounded-full transition-all" :style="{width: (detailData?.normalized_scores?.[dim] || 0) + '%'}"></div>
                </div>
                <span class="text-sm font-medium text-gray-700 w-10 text-right">{{ detailData?.normalized_scores?.[dim] || 0 }}%</span>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium w-16 text-center" :class="getCategoryClass(detailData?.categories?.[dim])">{{ detailData?.categories?.[dim] || '-' }}</span>
              </div>
            </div>
          </div>

          <!-- Top/Bottom Profile -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-blue-50 rounded-xl p-4">
              <h4 class="font-bold text-blue-900 mb-2">Top 3 Profil</h4>
              <div class="flex gap-2">
                <span v-for="d in (detailData?.top3 || [])" :key="d" class="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-lg">{{ d }}</span>
              </div>
            </div>
            <div class="bg-gray-100 rounded-xl p-4">
              <h4 class="font-bold text-gray-700 mb-2">Bottom 3 Profil</h4>
              <div class="flex gap-2">
                <span v-for="d in (detailData?.bottom3 || [])" :key="d" class="px-3 py-1 bg-gray-400 text-white text-sm font-bold rounded-lg">{{ d }}</span>
              </div>
            </div>
          </div>

          <!-- Jawaban Detail -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              Jawaban Kuesioner (Q1–Q24)
            </h3>
            <div class="bg-gray-50 rounded-xl overflow-hidden">
              <table class="w-full text-sm">
                <thead><tr class="bg-gray-100"><th class="px-3 py-2 text-left text-xs font-medium text-gray-500">No</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500">Pertanyaan</th><th class="px-3 py-2 text-center text-xs font-medium text-gray-500">Skor</th></tr></thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="(q, i) in allQuestions" :key="q.id" class="hover:bg-white">
                    <td class="px-3 py-2 text-gray-500">{{ i+1 }}</td>
                    <td class="px-3 py-2 text-gray-700">{{ q.text }}</td>
                    <td class="px-3 py-2 text-center">
                      <span class="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold" :class="getScoreClass(detailData?.answers?.['Q'+(i+1)])">{{ detailData?.answers?.['Q'+(i+1)] ?? '-' }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Validasi -->
          <div v-if="detailData?.persepsi_sesuai">
            <h3 class="text-lg font-bold text-gray-900 mb-3">Hasil Validasi</h3>
            <div class="grid grid-cols-2 gap-3 text-sm bg-gray-50 rounded-xl p-4">
              <div><span class="text-gray-500">Persepsi Sesuai:</span> <span class="font-bold text-blue-700">{{ detailData.persepsi_sesuai }}</span></div>
              <div><span class="text-gray-500">Persepsi Tidak Sesuai:</span> <span class="font-bold text-red-600">{{ detailData.persepsi_tidak_sesuai }}</span></div>
              <div><span class="text-gray-500">Pekerjaan Disenangi:</span> <span class="font-medium">{{ (detailData.pekerjaan_disenangi || []).join(', ') || '-' }}</span></div>
              <div><span class="text-gray-500">Pekerjaan Dikuasai:</span> <span class="font-medium">{{ (detailData.pekerjaan_dikuasai || []).join(', ') || '-' }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const adminInfo = ref(null);
const stats = ref({ totalClients: 0, completedAssessments: 0 });
const clients = ref([]);
const searchQuery = ref('');
const sidebarOpen = ref(false);
const activeTab = ref('dashboard');
const selectedClient = ref(null);
const detailData = ref(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const allQuestions = [
  { id: 'Q1', text: 'Saya suka bekerja menggunakan alat atau peralatan.' },
  { id: 'Q2', text: 'Saya tertarik memperbaiki barang yang rusak.' },
  { id: 'Q3', text: 'Saya nyaman melakukan pekerjaan yang melibatkan aktivitas fisik.' },
  { id: 'Q4', text: 'Saya lebih suka belajar dengan praktik langsung.' },
  { id: 'Q5', text: 'Saya memiliki rasa ingin tahu yang tinggi.' },
  { id: 'Q6', text: 'Saya tertarik memecahkan masalah yang rumit.' },
  { id: 'Q7', text: 'Saya senang belajar hal baru secara mendalam.' },
  { id: 'Q8', text: 'Saya biasanya berpikir terlebih dahulu sebelum bertindak.' },
  { id: 'Q9', text: 'Saya suka kegiatan yang melibatkan kreativitas.' },
  { id: 'Q10', text: 'Saya senang memainkan alat musik.' },
  { id: 'Q11', text: 'Saya senang ketika bisa mengubah sesuatu menjadi lebih menarik.' },
  { id: 'Q12', text: 'Saya kurang menyukai pekerjaan yang berulang.' },
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

const filteredClients = computed(() => {
  if (!searchQuery.value) return clients.value;
  const q = searchQuery.value.toLowerCase();
  return clients.value.filter(c => c.nama.toLowerCase().includes(q));
});

const getScoreClass = (score) => {
  if (score === 4) return 'bg-blue-600 text-white';
  if (score === 3) return 'bg-blue-400 text-white';
  if (score === 2) return 'bg-blue-200 text-blue-800';
  if (score === 1) return 'bg-blue-100 text-blue-700';
  return 'bg-gray-100 text-gray-500';
};

const getCategoryClass = (cat) => {
  if (cat === 'Tinggi') return 'bg-blue-100 text-blue-800';
  if (cat === 'Sedang') return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-600';
};

const showDetail = async (client) => {
  selectedClient.value = client;
  detailData.value = null;
  const token = localStorage.getItem('adminToken');
  

  try {
    const res = await axios.get(`${API_URL}/admin/clients/${client.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const d = res.data;
    detailData.value = {
      clientInfo: d.clients || {},
      answers: d.answers || {},
      attention_check_passed: d.attention_check_passed,
      raw_scores: d.raw_scores || {},
      normalized_scores: d.normalized_scores || {},
      categories: d.categories || {},
      top3: d.top3 || [],
      bottom3: d.bottom3 || [],
      persepsi_sesuai: d.persepsi_sesuai,
      persepsi_tidak_sesuai: d.persepsi_tidak_sesuai,
      pekerjaan_disenangi: d.pekerjaan_disenangi || [],
      pekerjaan_dikuasai: d.pekerjaan_dikuasai || []
    };
  } catch (error) {
    console.error('Error fetching detail:', error);
  }
};

const deleteClient = async (client) => {
  if (!confirm(`Apakah Anda yakin ingin menghapus data klien "${client.nama}"?`)) {
    return;
  }
  
  const token = localStorage.getItem('adminToken');
  try {
    await axios.delete(`${API_URL}/admin/clients/${client.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Remove from the list
    clients.value = clients.value.filter(c => c.id !== client.id);
    
    // Update stats
    stats.value.totalClients--;
    if (client.hasAssessment) {
      stats.value.completedAssessments--;
    }
    
    alert('Data klien berhasil dihapus.');
  } catch (error) {
    console.error('Error deleting client:', error);
    alert('Gagal menghapus data klien.');
  }
};

onMounted(async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) { router.push('/admin'); return; }
  
  try {
    adminInfo.value = JSON.parse(localStorage.getItem('adminInfo'));
    
    
    const statsRes = await axios.get(`${API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    stats.value = statsRes.data;
    
    const clientsRes = await axios.get(`${API_URL}/admin/clients`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    clients.value = clientsRes.data.map(c => {
      const a = c.assessments && c.assessments.length > 0 ? c.assessments[0] : null;
      return {
        id: c.id,
        nama: c.nama || 'Unknown',
        usia: c.usia || '-',
        jenisKelamin: c.jenis_kelamin || '-',
        date: new Date(c.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        top3: a ? (a.top3 || []) : [],
        isValid: a ? a.is_valid : false,
        hasAssessment: !!a
      };
    });
    
  } catch (error) {
    console.error('Error fetching admin data:', error);
    if (error.response?.status === 401) { logout(); }
  }
});

const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminInfo');
  router.push('/admin');
};
</script>
