<template>
    <baseLayout>
        <div class="mt-5 flex justify-between items-center">
            <div>
                <h1 class="text-2xl uppercase">List Penilaian Setoran</h1>
                <h2 class="mt-2">Silahkan kelola Penilaian</h2>
            </div>
        </div>
        <div class="mt-10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card v-for="(item, index) in data" :key="index" class="hover:bg-primary-100/60">
                    <template #content>
                        <div @click="goTo(item)">
                            <p class="font-semibold text-lg capitalize">{{ item.tema }}</p>
                            <p class="text-sm capitalize">{{ item.deskripsi }}</p>
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
    name : "listPenilaian-Setoran",
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
            this.getSetoran()
        }
    },

    mounted() {
        this.getSetoran()
    },
    methods : {
        goTo(item) {
            this.$router.push({name : 'nilaipenilaianSetoran', params : {id : item.id_setoran}})  
        },
        async getSetoran(){
            try {
                const Setoran = await api.get(`api/setoran`)
                if(!Setoran.data.status) throw new Error(Setoran.message)
                this.data = Setoran.data.data
            console.log(this.data)
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
    }
}
</script>