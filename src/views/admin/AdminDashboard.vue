<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 z-20">
      <div class="h-16 flex items-center px-6 border-b border-gray-800">
        <div class="h-8 w-8 rounded-md bg-white text-gray-900 flex items-center justify-center font-bold text-xl mr-3">A</div>
        <span class="font-bold text-xl">ARAH CMS</span>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <a href="#" class="flex items-center px-4 py-3 bg-gray-800 rounded-xl text-white group">
          <svg class="w-5 h-5 mr-3 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Dashboard
        </a>
        <a href="#" class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-colors group">
          <svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Daftar Klien
        </a>
        <a href="#" class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-colors group">
          <svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          Statistik
        </a>
      </nav>
      <div class="p-4 border-t border-gray-800">
        <button @click="logout" class="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
      <!-- Topbar -->
      <header class="h-16 bg-white shadow-sm flex items-center justify-between px-8 z-10 flex-shrink-0">
        <h1 class="text-xl font-bold text-gray-800">Dashboard</h1>
        <div class="flex items-center">
          <span class="mr-4 text-sm font-medium text-gray-600">Halo, {{ adminInfo?.nama || 'Admin' }}</span>
          <div class="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
            <svg class="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto p-8 bg-gray-50">
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div class="p-4 rounded-full bg-blue-50 text-blue-600 mr-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase">Total Klien</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalClients }}</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div class="p-4 rounded-full bg-green-50 text-green-600 mr-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase">Asesmen Selesai</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.completedAssessments }}</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div class="p-4 rounded-full bg-purple-50 text-purple-600 mr-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase">Asesmen Aktif (Hari Ini)</p>
              <p class="text-3xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <!-- Client Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h3 class="text-lg font-bold text-gray-900">Data Klien Terbaru</h3>
            <div class="relative">
              <input type="text" placeholder="Cari nama klien..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64">
              <div class="absolute left-3 top-2.5 text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Klien</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top 3 Profil</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Validasi</th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="client in clients" :key="client.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {{ client.nama.charAt(0) }}
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ client.nama }}</div>
                        <div class="text-sm text-gray-500">{{ client.usia }} tahun, {{ client.jenisKelamin }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ client.date }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex space-x-1">
                      <span v-for="dim in client.top3" :key="dim" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {{ dim }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span v-if="client.isValid" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Valid</span>
                    <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Invalid Check</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900 font-medium">Lihat Detail</button>
                  </td>
                </tr>
                <tr v-if="clients.length === 0">
                  <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                    Belum ada data klien
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination Placeholder -->
          <div class="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Menampilkan <span class="font-medium">1</span> sampai <span class="font-medium">10</span> dari <span class="font-medium">{{ stats.totalClients }}</span> hasil
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                  </a>
                  <a href="#" aria-current="page" class="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</a>
                  <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">2</a>
                  <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">3</a>
                  <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const adminInfo = ref(null);
const stats = ref({ totalClients: 0, completedAssessments: 0 });
const clients = ref([]);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

onMounted(async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    router.push('/admin');
    return;
  }
  
  try {
    adminInfo.value = JSON.parse(localStorage.getItem('adminInfo'));
    
    // In dev mode without backend, mock data
    if (token === 'mock_token') {
      stats.value = { totalClients: 24, completedAssessments: 20 };
      clients.value = [
        { id: 1, nama: 'Budi Santoso', usia: 24, jenisKelamin: 'Laki-laki', date: '10 Mei 2026', top3: ['R', 'I', 'E'], isValid: true },
        { id: 2, nama: 'Siti Aminah', usia: 19, jenisKelamin: 'Perempuan', date: '09 Mei 2026', top3: ['S', 'A', 'C'], isValid: true },
        { id: 3, nama: 'Agus Salim', usia: 28, jenisKelamin: 'Laki-laki', date: '08 Mei 2026', top3: ['E', 'C', 'R'], isValid: false }
      ];
      return;
    }
    
    // Fetch stats
    const statsRes = await axios.get(`${API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    stats.value = statsRes.data;
    
    // Fetch clients
    const clientsRes = await axios.get(`${API_URL}/admin/clients`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Map to table format
    clients.value = clientsRes.data.map(assessment => ({
      id: assessment._id,
      nama: assessment.clientId?.nama || 'Unknown',
      usia: assessment.clientId?.usia || '-',
      jenisKelamin: assessment.clientId?.jenisKelamin || '-',
      date: new Date(assessment.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      top3: assessment.top3 || [],
      isValid: assessment.isValid
    }));
    
  } catch (error) {
    console.error('Error fetching admin data:', error);
    if (error.response?.status === 401) {
      logout();
    }
  }
});

const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminInfo');
  router.push('/admin');
};
</script>
