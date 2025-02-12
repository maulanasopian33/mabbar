<template>
    <div class="bg-[#c7e1ff] w-screen min-h-screen">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col justify-center">
            <div @click="kembali()"
                class="flex cursor-default items-center text-xl py-2 px-4 hover:text-white hover:bg-primary-300 w-fit rounded-full">
                <i class="pi pi-chevron-left"></i>
                <p>Kembali</p>
            </div>
            <div class="md:flex md:justify-center md:items-center">
                <div class="bg-white p-5 mt-8 rounded-md md:w-[35%]">
                    <h2 class="text-2xl font-semibold capitalize">{{ data?.judul }}</h2>
                    <p class="capitalize font">{{ data?.materi }} | {{ data?.user?.nama }} | {{ convertDate(data?.createdAt) }}</p>
                    <img :src="url+data?.featureimage" class="mt-5" alt="" srcset="">
                    <div class="text-justify content-materi" v-html="data.content"></div>
                    <div class="grid grid-cols-1 gap-5 mt-5">
                        <Image preview v-for="(item, index) in data?.listlampirans" :key="index" :src="url+item.file"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment/moment';
moment.locale('id');
import api from '../libs/axiosInstance'
export default {
    name : 'materi',
    data() {
        return {
            idmateri : '',
            materi : '',
            data : {},
            url : import.meta.env.VITE_URL_API,
        }
    },
    mounted() {
        this.decodeparams()
    },
    methods: {
        convertDate(date){
            return moment(date).format('DD-MMM-YYYY')
        },
        decodeparams(){
            const decode = JSON.parse(atob(this.$route.params.id))
            this.idmateri = decode.idMateri
            this.materi = decode.materi
            this.getmateri()
        },
        kembali() {
            this.$router.push({
                name: 'ListMateri',
                params : {
                    id : this.materi
                }
            })
        },
        async getmateri() {
            try {
                const materi = await api.get(`api/materi/${this.idmateri}`)
                if (!materi.data.status) throw new Error(materi.message)
                this.data = materi.data.data
                console.log(this.data)
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