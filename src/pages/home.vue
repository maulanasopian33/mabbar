<template>
     <div class="bg-[#c7e1ff] w-screen h-screen md:h-full">
        <Dialog v-model:visible="loading" class="w-fit p-10">
            <template #container="{ closeCallback }">
                <i class="pi pi-spin pi-spinner text-bold text-5xl text-primary-500"></i>
            </template>
        </Dialog>
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col justify-center items-center">
            <div class="lg:w-[60%] md:w-[80%] h-full">
                <div class="mt-10">
                    <h1 class="text-2xl font-bold text-left p-0">Selamat Datang</h1>
                    <h2 class="text-xl text-left p-0 uppercase">{{ nama }}</h2>
                </div>
                <div class="grid grid-cols-2 gap-5 mt-10">
                    <div @click="goToBelajar()" class="bg-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex flex-col justify-center items-center">
                        <img src="/assets/icon/ic_belajar.svg" class="w-[60%] my-3"></img>
                        <p class="text-center text-xl">Belajar</p>
                    </div>
                    <div @click="goToLatihan()" class="bg-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex flex-col justify-center items-center">
                        <img src="/assets/icon/ic_latihan.svg" class="w-[40%] my-3"></img>
                        <p class="text-center text-xl">Latihan</p>
                    </div>
                    <div @click="goToSetoran()" class="bg-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex flex-col justify-center items-center">
                        <img src="/assets/icon/ic_setoran.svg" class="w-[40%] my-3"></img>
                        <p class="text-center text-xl">Setoran</p>
                    </div>
                    <div class="bg-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex flex-col justify-center items-center">
                        <img src="/assets/icon/ic_penilaian.svg" class="w-[40%] my-3"></img>
                        <p class="text-center text-xl">Penilaian</p>
                    </div>
                </div>
                <div class="text-center mt-10">
                    <h2 class="text-2xl font-bold p-0">MABBAR</h2>
                    <h2 class="text-xl p-0">Mari Belajar Bahasa Arab</h2>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getSession } from '../libs/sessionManager'
export default {
    name: "home",
    data() {
        return {
            nama : getSession('nama'),
            loading : false
        }
    },
    mounted() {
        this.loading = true
        setTimeout(() => {
            this.loading = false
        }, 100)  
    },
    methods: {
        goToBelajar(){
            this.$router.push('/belajar')
        },
        goToSetoran(){
            this.$router.push('/setoran')
        },
        goToLatihan(){
            this.$router.push('/latihan')
        },
    },
}
</script>