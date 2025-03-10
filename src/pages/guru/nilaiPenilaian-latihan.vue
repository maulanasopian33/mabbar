<template>
    <baseLayout>
        <div class="mt-5 flex justify-between items-center">
            <div>
                <h1 class="text-2xl uppercase">List Nilai Latihan</h1>
                <h2 class="mt-2">Silahkan kelola Penilaian</h2>
            </div>
        </div>
        <div class="mt-10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <!-- <Card v-for="(item, index) in data" :key="index" class="hover:bg-primary-100/60">
                    <template #content>
                        <div @click="addSoal(item)">
                            <p class="font-semibold text-lg capitalize">{{ item.nama_siswa }}</p>
                            <p class="mt-4"><span class="bg-green-500 py-2 px-2 rounded-md text-xs text-white">{{ item.nilai }}</span></p>
                        </div>
                    </template>
                </Card> -->
                <DataTable showGridlines :value="data" class="w-full mb-10">
                    <Column bodyClass="bg-primary-500/10 rounded-tl-md" headerClass="bg-primary-500 text-white !w-[100px]" field="nama_siswa" header="Nama Siswa"></Column>
                    <Column bodyClass="bg-primary-500/10" headerClass="bg-primary-500 text-white w-[30%]" field="nilai" header="NIlai"></Column>
                </DataTable>
            </div>

        </div>
    </baseLayout>
</template>

<script>
import baseLayout from '../../components/baseLayout.vue';
import api from '../../libs/axiosInstance.js'
export default {
    name : "listPenilaian",
    components : {
        baseLayout
    },
    data() {
        return {
            idLatihan : this.$route.params.id,
            data : {},
        }
    },
    watch : {
        '$route.params.id'(value) {
            this.nmMateri = value
            this.getPenilaian()
        }
    },

    mounted() {
        this.getPenilaian()
    },
    methods : {
        async getPenilaian(){
            try {
                const Penilaian = await api.get(`api/penilaian/${this.idLatihan}`)
                if(!Penilaian.data.status) throw new Error(Penilaian.message)
                this.data = Penilaian.data.data
            console.log(this.data)
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
    }
}
</script>