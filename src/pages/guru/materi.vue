<template>
    <baseLayout :loading="loading">
        <div class="mt-5 flex justify-between items-center">
            <div>
                <h1 class="text-2xl uppercase">Materi {{ nmMateri }}</h1>
                <h2 class="mt-2">Silahkan inputkan materi {{ nmMateri }}</h2>
            </div>
            <div class="h-fit">
                <Button label="Tambah" icon="pi pi-plus" @click="addmateri()"/>
            </div>
        </div>
        <div class="mt-10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card v-for="(item, index) in data" :key="index" class="hover:bg-primary-100/60">
                    <template #content>
                        <p class="font-semibold text-lg">{{ item.judul }}</p>
                        <p class="mt-2 uppercase">{{ item.materi }}</p>
                    </template>
                    <template #footer>
                        <div class="flex gap-4 mt-2">
                            <Button @click="editMateri(item.idmateri)" icon="pi pi-pencil" iconPos="left" label="Edit" severity="secondary" outlined class="w-full" />
                            <Button @click="deleteMateri(item.idmateri)" icon="pi pi-trash" iconPos="left" label="Hapus" class="w-full" />
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
    name : "materi",
    components : {
        baseLayout
    },
    data() {
        return {
            nmMateri : this.$route.params.id,
            data : {},
            loading : false
        }
    },
    watch : {
        '$route.params.id'(value) {
            this.nmMateri = value
            this.getmateri()
        }
    },
    mounted() {
        this.getmateri()
    },
    methods : {
        addmateri() {
            this.$router.push(`/guru/materi/${this.nmMateri}/tambah`)
        },
        editMateri(id) {
            this.$router.push(`/guru/materi/edit/${id}`)
        },
        async getmateri(){
            try {
                this.loading = true
                const materi = await api.get(`api/materi?id=${this.nmMateri}`)
                if(!materi.data.status) throw new Error(materi.message)
                this.data = materi.data.data
                this.loading = false
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async deleteMateri(id){
            try {
                const materi = await api.delete(`api/materi/${id}`)
                if(!materi.data.status) throw new Error(materi.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: materi.data.message, life: 3000});
                this.getmateri()
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        }
    }
}
</script>