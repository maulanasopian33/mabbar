<template>
    <div class="bg-[#c7e1ff] w-screen h-screen">
        <Dialog v-model:visible="loading" class="w-fit p-10">
            <template #container="{ closeCallback }">
                <i class="pi pi-spin pi-spinner text-bold text-5xl text-primary-500"></i>
            </template>
        </Dialog>
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col justify-center items-center">
            <div class="lg:w-[60%] md:w-[80%] h-full w-full">
                <div @click="kembali()" class="flex cursor-pointer items-center text-xl py-2 px-4 hover:text-white hover:bg-primary-300 w-fit rounded-full">
                    <i class="pi pi-chevron-left"></i>
                    <p>Kembali</p>
                </div>
                <div class="mt-10">
                    <h1 class="text-4xl font-bold text-left p-0">Latihan</h1>
                    <div @click="goToLatihan(item)" v-for="(item, index) in data" :key="index"
                        class="bg-primary-500 hover:text-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-5">
                        <div>
                            <h2 class="text-xl font-medium capitalize mb-2">{{ item.nama_latihan }}</h2>
                            <p class="capitalize">{{ item.materi }} - {{ item.jenis }}</p>
                        </div>
                    </div>
                    <div v-show="data.length === 0"
                        class="p-5 mt-5 border-primary rounded-lg text-center border-4 border-dashed">
                        <p>Materi tidak tersedia</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../libs/axiosInstance'
export default {
    name: "listBelajar",
    mounted() {
        this.getLatihan()
    },
    data() {
        return {
            data : {},
            loading : false
        }
    },
    methods: {
        goToLatihan(item) {
            let params = {
                id_latihan : item.id_latihan,
                jenis : item.jenis,
                isnew : true
            }
            this.$router.push({
                name: 'LatihanTest',
                params: {
                    id: btoa(JSON.stringify(params))
                }
            })
        },
        kembali() {
            this.$router.push({
                name: 'Home'
            })
        },
        async getLatihan() {
            try {
                this.loading = true
                const latihan = await api.get(`api/latihan/`)
                if (!latihan.data.status) throw new Error(latihan.message)
                this.data = latihan.data.data
                this.loading = false
            } catch (error) {
                this.loading = false
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.message,
                    life: 3000
                });
            }
        },
    },
}
</script>