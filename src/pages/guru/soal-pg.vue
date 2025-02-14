<template>
    <baseLayout>
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
                                <!-- <Button @click="editSiswa(item)" icon="pi pi-pencil" iconPos="left" severity="secondary" outlined class="w-10" /> -->
                                <Button @click="deleteSoal(item.id_soal)" icon="pi pi-trash" iconPos="left" class="w-10" />
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
                this.data = soal.data.data
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