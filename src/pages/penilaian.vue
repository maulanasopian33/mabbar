<template>
    <div class="bg-[#c7e1ff] w-screen h-screen overflow-y-scroll pb-10">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col items-center">
            <div class="w-full md:bg-white/10 md:w-[80%] lg:w-[60%] md:border-2 border-primary-500 rounded-lg md:p-5">
                <div @click="kembali()"
                    class="flex cursor-pointer mb-5 items-center text-xl py-2 px-4 hover:text-white hover:bg-primary-300 w-fit rounded-full">
                    <i class="pi pi-chevron-left"></i>
                    <p>Kembali</p>
                </div>

                <!-- Nilai Akhir & Peringkat -->
  <div class="grid grid-cols-2 gap-4 mb-6">
    <div class="bg-white shadow rounded-lg p-6 text-center">
      <h3 class="text-gray-500 mb-2">Nilai Akhir</h3>
      <div class="text-4xl font-bold text-green-600">{{ nilaiAkhir }}</div>
    </div>
    <div class="bg-white shadow rounded-lg p-6 text-center">
      <h3 class="text-gray-500 mb-2">Peringkat</h3>
      <div class="text-4xl font-bold text-blue-600">#{{ peringkat }}</div>
    </div>
  </div>
  <!-- Nilai Latihan -->
  <div class="bg-white shadow rounded-lg mb-6">
    <div class="bg-blue-600 text-white px-4 py-2 rounded-t-lg font-semibold">Nilai Latihan</div>
    <ul>
      <li class="flex justify-between px-4 py-2 border-b">
        <span>Total Nilai</span>
        <span class="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded font-semibold">{{nilaiLatihan}}/100</span>
      </li>
    </ul>
  </div>

  <!-- Nilai Setoran -->
  <div class="bg-white shadow rounded-lg">
    <div class="bg-green-600 text-white px-4 py-2 rounded-t-lg font-semibold">Nilai Setoran</div>
    <ul>
      <li class="flex justify-between px-4 py-2 border-b">
        <span>Total Nilai</span>
        <span class="bg-green-100 text-green-800 text-sm px-2 py-1 rounded font-semibold">{{nilaiSetoran}}/100</span>
      </li>
    </ul>
  </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getSession } from '../libs/sessionManager'
import api from '../libs/axiosInstance.js'
export default {
    name : "penilaian",
    mounted() {
        this.getPenilaian()
    },
    data() {
        return {
            data : [],
            nama : getSession('nama'),
            nilaiAkhir : 0,
            nilaiLatihan : 0,
            nilaiSetoran : 0,
            peringkat : "-"
        }
    },
    methods: {
        kembali() {
            this.$router.push({
                name: 'Home'
            })
        },
        async getPenilaian(){
            try {
                const Penilaian = await api.get(`api/penilaian/siswa`)
                if(!Penilaian.data.status) throw new Error(Penilaian.message)
                console.log(Penilaian.data)
                this.nilaiAkhir = this.getNilaiAkhir(Penilaian.data.nilaiakhir)
                this.peringkat = this.hitungPeringkat(Penilaian.data.nilaiakhir)
                this.nilaiLatihan = this.getNilaiLatihan(Penilaian.data.nilailatihan)
                this.nilaiSetoran = this.getNilaiSetoran(Penilaian.data.hasilsetoran)
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        getNilaiAkhir(data) {
            const item = data.find(d => d.nama === this.nama);
            return item ? item.nilai_akhir : 0;
        },
        getNilaiLatihan(data) {
            const item = data.find(d => d.nama === this.nama);
            return item ? item.nilai : 0;
        },
        getNilaiSetoran(data) {
            const item = data.find(d => d.nama_siswa === this.nama);
            return item ? item.nilai_setoran : 0;
        },
        hitungPeringkat(data) {
            // Urutkan berdasarkan nilai_akhir tertinggi ke terendah
            const ranked = data
                .sort((a, b) => b.nilai_akhir - a.nilai_akhir)
                .map((item, index) => ({
                ...item,
                peringkat: index + 1
                }));

            const item = ranked.find(d => d.nama === this.nama);
            return item ? item.peringkat : "-";
        }
    }
}
</script>