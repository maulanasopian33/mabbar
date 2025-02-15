<template>
    <div class="bg-[#c7e1ff] w-screen h-screen">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col">
            <div @click="kembali()" class="flex cursor-pointer items-center text-xl py-2 px-4 hover:text-white hover:bg-primary-300 w-fit rounded-full">
                <i class="pi pi-chevron-left"></i>
                <p>Kembali</p>
            </div>
            <div
                class="bg-primary-500 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-10">
                <div>
                    <h2 class="text-xl">{{ data[0]?.nama_latihan }}</h2>
                    <p class="xs">{{ data[0]?.materi }} - {{ data[0]?.jenis }}</p>
                </div>
            </div>
            <div class="flex-shrink h-full">
                <div class="mt-5">
                    <p class="py-3">Jawaban Benar</p>
                    <ProgressBar :value="hasil.persen_benar" ></ProgressBar>
                </div>
                <div class="mt-5">
                    <p class="py-3">Jawaban Salah</p>
                    <ProgressBar :value="hasil.persen_salah"></ProgressBar>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-5 mt-10">
                <div @click="ulangiLatihan()" class="col-span-2 bg-primary-500 hover:bg-primary-500/60 rounded-md text-white p-4 h-20 flex justify-center items-center">
                    <p>Ulangi Latihan</p>
                </div>
                <div class="col-span-1 bg-primary-500 rounded-md text-white p-4 h-20 flex flex-col justify-center items-center">
                    <p class="text-xs">Nilai Kamu</p>
                    <h3 class="text-4xl font-semibold">{{ hasil.nilai }}</h3>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import api from '../libs/axiosInstance'
export default {
    name: 'Skornilai',
    data() {
        return {
            params : '',
            data : {},
            hasil : {
                benar : 0,
                salah : 0,
                nilai : 0,
                persen_benar: 0, // Persentase jawaban benar
                persen_salah: 0, // Persentase jawaban salah
            },
            latihan : {},
            idlatihan : ''
        }
    },
    mounted() {
        this.checkparams()
    },
    methods: {
        kembali() {
            this.$router.push({
                name: 'Latihan'
            })
        },
        ulangiLatihan(){
            let params = {
                id_latihan : this.idlatihan,
                jenis : "Pilihan Ganda",
                isnew : false
            }
            this.$router.push({
                name: 'LatihanTest',
                params: {
                    id: btoa(JSON.stringify(params))
                }
            })
        },
        async getLatihan(id) {
            try {
                const latihan = await api.get(`api/latihan/get/${id}`)
                if (!latihan.data.status) throw new Error(latihan.message)
                this.data = latihan.data.data
            } catch (error) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.message,
                    life: 3000
                });
            }
        },
        async getnilai(id) {
            try {
                const Nilai = await api.get(`api/latihan/nilai/${id}`)
                if (!Nilai.data.status) throw new Error(Nilai.message)
                const nilai = Nilai.data.data
                this.hasil.nilai = nilai[0].nilai
                this.hasil.persen_benar = (this.hasil.nilai/100)*100
                this.hasil.persen_salah = 100 - this.hasil.persen_benar
            } catch (error) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.message,
                    life: 3000
                });
            }
        },
        async savenilai(){
            try {
                let payload = {
                    id_latihan : this.idlatihan,
                    nilai : this.hasil.nilai
                }
                const {data} = await api.post('api/latihan/nilai', payload)
                if(!data.status) throw new Error(data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        checkparams(){
            this.params = JSON.parse(atob(this.$route.query.id))
            this.idlatihan = this.params[0].id_latihan
            this.getLatihan(this.idlatihan)
            if(!this.params[0]?.jawaban) return this.getnilai(this.idlatihan)
            this.params.forEach(item => {
                if(item.jawaban == item.kunci_jawaban){
                    this.hasil.benar += 1
                } else {
                    this.hasil.salah += 1
                }
            });
            this.hasil.nilai = Math.round((this.hasil.benar / this.params.length) * 100)
            // Hitung persentase
            this.hasil.persen_benar = Math.round((this.hasil.benar / this.params.length) * 100);
            this.hasil.persen_salah = Math.round((this.hasil.salah / this.params.length) * 100);
            this.savenilai()
        }   
    }
}
</script>