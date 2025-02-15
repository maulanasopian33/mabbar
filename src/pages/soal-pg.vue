<template>
    <div class="bg-[#c7e1ff] w-screen h-screen">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col justify-center items-center">
            <div class="lg:w-[60%] md:w-[80%] h-full w-full overflow-y-hidden">
                <div class="flex justify-between">
                    <div @click="kembali()" class="flex cursor-pointer items-center text-xl py-2 px-4 hover:text-white hover:bg-primary-300 w-fit rounded-full">
                        <i class="pi pi-chevron-left"></i>
                        <p>Kembali</p>
                    </div>
                    <p>{{ formattedTime }}</p>
                </div>
                <div class="mt-10 h-full">
                    <div class="min-h-[20%] h-fit flex flex-col justify-center">
                        <h1 class="text-2xl font-medium capitalize text-left p-0 break-all">{{data[pos]?.soal}}</h1>
                        <div v-for="(item, index) in data[pos]?.lampiran" :key="index" :class="item.lenght > 1 ? 'grid grid-cols-2 gap-5 mt-5' : 'mt-5'">
                            <Image preview :src="url+item.path"/>
                        </div>
                    </div>
                    <div class="mt-5" v-show="data.length > 0">
                        <div @click="setjawaban('A')" class="bg-primary text-white my-2 w-full py-3 px-5 rounded-lg shadow-md hover:bg-primary/40">
                            A. {{ data[pos]?.pilihan_a }}
                        </div>
                        <div @click="setjawaban('B')" class="bg-primary text-white my-2 w-full py-3 px-5 rounded-lg shadow-md hover:bg-primary/40">
                            B. {{ data[pos]?.pilihan_b }}
                        </div>
                        <div @click="setjawaban('C')" class="bg-primary text-white my-2 w-full py-3 px-5 rounded-lg shadow-md hover:bg-primary/40">
                            C. {{ data[pos]?.pilihan_c }}
                        </div>
                        <div @click="setjawaban('D')" class="bg-primary text-white my-2 w-full py-3 px-5 rounded-lg shadow-md hover:bg-primary/40">
                            D. {{ data[pos]?.pilihan_d }}
                        </div>
                    </div>
                </div>
                <div v-show="data.length == 0"
                    class="p-5 mt-5 border-primary rounded-lg text-center border-4 border-dashed">
                    <p>Soal tidak tersedia</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Image } from 'primevue';
import api from '../libs/axiosInstance'
export default {
    name: "soalPG",
    data() {
        return {
            data : {},
            id_latihan : "",
            pos : 0,
            url : import.meta.env.VITE_URL_API,
            totalSeconds: 40 * 60, // 40 menit dalam detik
            timer: null,
            isRunning: false,
        }
    },
    props: {
        idLatihan : String
    },
    watch : {
        idLatihan(value){
            if(value){
                this.id_latihan = value
                this.getSoal()
            }
        }
    },
    computed: {
        formattedTime() {
        const minutes = Math.floor(this.totalSeconds / 60);
        const seconds = this.totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        },
    },
    beforeUnmount() {
        clearInterval(this.timer);
    },
    mounted() {
        this.startTimer()
    },
    methods: {
        setjawaban(value){
            this.data[this.pos].jawaban = value
            if(this.pos >= this.data.length - 1){
                let params = this.data.map((item) => {
                    return {
                        id_latihan : item.id_latihan,
                        jawaban : item.jawaban,
                        kunci_jawaban : item.kunci_jawaban
                    }
                })
                return this.$router.push(`/skornilai?id=${btoa(JSON.stringify(params))}`)
            }
            this.pos++
        }, 
        startTimer() {
            if (this.isRunning) return;
            this.isRunning = true;

            this.timer = setInterval(() => {
                if (this.totalSeconds > 0) {
                    this.totalSeconds--;
                } else {
                    clearInterval(this.timer);
                    this.isRunning = false;
                }
            }, 1000);
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        resetTimer() {
            clearInterval(this.timer);
            this.totalSeconds = 40 * 60;
            this.isRunning = false;
        },
        goToBelajar(nama) {
            this.$router.push({
                name: 'ListMateri',
                params: {
                    id: nama
                }
            })
        },
        kembali() {
            this.$router.push({
                name: 'Home'
            })
        },

        async getSoal() {
            try {
                const latihan = await api.get(`api/latihan/soal-pg/${this.id_latihan}`)
                // if (!latihan.data.status) throw new Error(latihan.message)
                let temp = latihan.data.data.map((item) => {
                    return {
                        id_latihan : item.id_latihan,
                        soal : item.soal,
                        lampiran : JSON.parse(item.lampiran),
                        jawaban : "",
                        pilihan_a : item.pilihan_a,
                        pilihan_b : item.pilihan_b,
                        pilihan_c : item.pilihan_c,
                        pilihan_d : item.pilihan_d,
                        kunci_jawaban : item.kunci_jawaban
                    }
                })

                this.data = this.shuffleArray(temp)
                
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