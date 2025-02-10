import { createApp } from 'vue'
import './style.css'

import 'primeicons/primeicons.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import router from './routes/index';
import ToastService from 'primevue/toastservice';
import { definePreset } from '@primevue/themes';

const app = createApp(App);
const MyPreset = definePreset(Aura, {
    ripple: true,
    semantic: {
        primary: {
            50: '#e3edf2',
            100: '#c6dbe4',
            200: '#99c3d1',
            300: '#6daaba',
            400: '#438fa1',
            500: '#035184', // Primary dari logo
            600: '#0b4164',
            700: '#062d45',
            800: '#041c2e',
            900: '#020e18'
        },
        accent: { // Tukar posisi dengan secondary
            50: '#fff7e0',
            100: '#ffefc2',
            200: '#ffe59c',
            300: '#ffdb66',
            400: '#fbda2e', // Accent dari logo (sebelumnya Secondary)
            500: '#fcd00d',
            600: '#d5ae00',
            700: '#a38400',
            800: '#705900',
            900: '#3d2f00'
        },
        secondary: { // Tukar posisi dengan accent
            50: '#ffebd6',
            100: '#ffd4ac',
            200: '#ffbb82',
            300: '#ffa457',
            400: '#fca203', // Secondary dari logo (sebelumnya Accent)
            500: '#e98b00',
            600: '#b66b00',
            700: '#8c5200',
            800: '#623900',
            900: '#391f00'
        },
        neutral: {
            50: '#f5f5f5',
            100: '#ebebeb',
            200: '#d6d6d6',
            300: '#c2c2c2',
            400: '#666767', // Abu-abu dari logo
            500: '#4d4d4d',
            600: '#333333',
            700: '#262626',
            800: '#191919',
            900: '#0d0d0d'
        },
        dark: {
            500: '#231f20' // Warna hitam abu dari logo
        },
        light: {
            500: '#ffffff' // Putih
        }
    }
});


app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: 'light',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
});
app.use(router)
app.use(ToastService);
app.mount('#app')
