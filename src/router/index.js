import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Landing', component: () => import('../views/LandingPage.vue') },
  { path: '/consent', name: 'Consent', component: () => import('../views/InformedConsent.vue') },
  { path: '/biodata', name: 'Biodata', component: () => import('../views/BiodataForm.vue') },
  { path: '/test', name: 'Questionnaire', component: () => import('../views/QuestionnaireView.vue') },
  { path: '/result', name: 'Result', component: () => import('../views/ResultPage.vue') },
  { path: '/admin', name: 'AdminLogin', component: () => import('../views/admin/AdminLogin.vue') },
  { path: '/admin/dashboard', name: 'AdminDashboard', component: () => import('../views/admin/AdminDashboard.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
