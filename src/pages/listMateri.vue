<template>
    <div class="bg-[#c7e1ff] w-screen h-screen">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col justify-center items-center">
            <div class="lg:w-[60%] md:w-[80%] h-full w-full">
                <div @click="kembali()" class="flex cursor-pointer items-center text-xl py-2 px-4 hover:text-white hover:bg-primary-300 w-fit rounded-full">
                    <i class="pi pi-chevron-left"></i>
                    <p>Kembali</p>
                </div>
                <div class="mt-10">
                    <h1 class="text-3xl pb-5 font-bold text-left p-0 capitalize">Materi {{ namaMateri }}</h1>
                    <div @click="showMateri(item.idmateri)" v-for="(item, index) in data" :key="index"
                        class="bg-primary-500 hover:text-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-5">
                        <div>
                            <h2 class="text-xl font-medium capitalize">{{ item.judul }}</h2>
                            <p class="capitalize">{{ item.materi }} - {{ item.user.nama }}</p>
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
        name: "listmateri",
        data() {
            return {
                namaMateri: this.$route.params.id,
                data: []
            }
        },
        mounted() {
            this.getmateri()
        },
        methods: {
            showMateri(id) {
                const idmateri = btoa(JSON.stringify({
                    idMateri: id,
                    materi: this.namaMateri
                }))
                this.$router.push({
                    name: 'Materi',
                    params: {
                        id: idmateri
                    }
                })
            },
            kembali() {
                this.$router.push({
                    name: 'ListBelajar'
                })
            },
            goToBelajar(nama) {
                this.$router.push({
                    name: 'belajar',
                    params: {
                        nama: nama
                    }
                })
            },
            async getmateri() {
                try {
                    const materi = await api.get(`api/materi?id=${this.namaMateri}`)
                    if (!materi.data.status) throw new Error(materi.message)
                    this.data = materi.data.data
                } catch (error) {
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