<template>
    <baseLayout>
        <div class="mt-5 flex justify-between items-center">
            <div>
                <h1 class="text-2xl uppercase">List Penilaian Latihan</h1>
                <h2 class="mt-2">Silahkan kelola Penilaian</h2>
            </div>
        </div>
        <div class="mt-10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card v-for="(item, index) in data" :key="index" class="hover:bg-primary-100/60">
                    <template #content>
                        <div @click="goTo(item)">
                            <p class="font-semibold text-lg capitalize">{{ item.nama_latihan }}</p>
                            <p class="mt-4"><span class="bg-green-500 py-2 px-2 rounded-md text-xs text-white">{{ item.materi }}</span><span class="ml-2 bg-primary-500 py-2 px-2 rounded-md text-xs text-white">{{ item.jenis }}</span></p>
                        </div>
                    </template>
                </Card>
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
            nmMateri : this.$route.params.id,
            data : {},
        }
    },
    watch : {
        '$route.params.id'(value) {
            this.nmMateri = value
            this.getLatihan()
        }
    },

    mounted() {
        this.getLatihan()
    },
    methods : {
        goTo(item) {
            this.$router.push({name : 'nilaipenilaianLatihan', params : {id : item.id_latihan}})  
        },
        async getLatihan(){
            try {
                const materi = await api.get(`api/latihan`)
                if(!materi.data.status) throw new Error(materi.message)
                this.data = materi.data.data
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
    }
}
</script>