<template>
    <baseLayout>
        <Dialog v-model:visible="dialAdd" modal header="Lihat Soal" :style="{ width: '25rem' }">
            <p class="p-5 text-xl bg-primary-500/20 border border-primary-500 rounded-md mb-5">{{ datashow.soal }}</p>
            <div class="grid grid-cols-4 mb-3">
                <Image preview v-for="(item, index) in datashow.lampiran" :key="index" :src="url+item.path"/>
            </div>
            <div class="grid grid-cols-2">
                <p class="bg-primary-500/60 py-2 px-4 break-all text-white">A. {{ datashow.pilihan_a }} <i :class="datashow.kunci_jawaban === 'A' ? 'pi pi-check' : ''"></i></p>
                <p class="bg-primary-500/60 py-2 px-4 break-all text-white">B. {{ datashow.pilihan_b }} <i :class="datashow.kunci_jawaban === 'B' ? 'pi pi-check' : ''"></i></p>
                <p class="bg-primary-500/30 py-2 px-4 break-all">C. {{ datashow.pilihan_c }} <i :class="datashow.kunci_jawaban === 'C' ? 'pi pi-check' : ''"></i></p>
                <p class="bg-primary-500/30 py-2 px-4 break-all">D. {{ datashow.pilihan_d }} <i :class="datashow.kunci_jawaban === 'D' ? 'pi pi-check' : ''"></i></p>
            </div>
        </Dialog>
        <div class="mt-5 flex justify-between items-center">
            <div>
                <h1 class="text-2xl uppercase">List Soal PG</h1>
                <h2 class="mt-2">Silahkan kelola siswa</h2>
            </div>
            <div class="h-fit">
                <Button label="Tambah" icon="pi pi-plus" @click="AddSoal()"/>
            </div>
        </div>
        <div class="mt-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                <Card v-for="(item, index) in paginatedData" :key="index" class="hover:bg-primary-100/60">
                    <template #content>
                        <div class="flex gap-4 mt-2 justify-between">
                            <p class="font-semibold text-lg break-all">{{ item.soal.substring(0,50) }}</p>
                            <div class="flex gap-2">
                                <Button @click="showSoal(item)" icon="pi pi-eye" iconPos="left" severity="secondary" outlined class="w-10 h-fit" />
                                <Button @click="deleteSoal(item.id_soal)" icon="pi pi-trash" iconPos="left" class="w-10 h-fit" />
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
            <Paginator class="mt-4" v-model:first="first" :rows="rows" :totalRecords="data.length" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" />

        </div>
    </baseLayout>
</template>

<script>
import { Password } from 'primevue';
import baseLayout from '../../components/baseLayout.vue';
import api from '../../libs/axiosInstance.js'
export default {
    name : "soalPgList",
    components : {
        baseLayout
    },
    data() {
        return {
            dataSiswa : {},
            id : this.$route.params.id,
            url : import.meta.env.VITE_URL_API,
            datashow : {},
            data : [],
            dialAdd : false,
            dialEdit : false,
            first : 0,
            rows : 14,
        }
    },
    computed: {
        // Data yang ditampilkan berdasarkan halaman saat ini
        paginatedData() {
            return this.data.slice(this.first, this.first + this.rows);
        }
    },
    mounted() {
        this.getSoal()
    },
    methods : {
        showSoal(item){
            this.dialAdd = true
            this.datashow = {
                ...item
            }
            console.log(item)
        },
        AddSoal() {
            this.$router.push('/guru/latihan/pilihan-ganda/add/'+ this.id)
        },
        editSiswa(value) {
            console.log(value)
            this.dataSiswa = {
                nama : value.nama,
                id : value.id
            }
            this.dialEdit = true
        },
        async getSoal(){
            try {
                const soal = await api.get(`api/latihan/soal-pg/${this.id}`)
                if(!soal.data.status) throw new Error(siswa.message)
                this.data = soal.data.data.map((item) => {
                    return {
                        ...item,
                        lampiran : JSON.parse(item.lampiran),
                    }
                })
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async deleteSoal(id){
            try {
                const Soal = await api.delete(`api/latihan/soal-pg/${id}`)
                if(!Soal.data.status) throw new Error(Soal.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: Soal.data.message, life: 3000});
                this.getSoal()
            } catch (error) {
                console.log(error)
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        }
    }
}
</script>