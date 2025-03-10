<template>
    <baseLayout :loading="loading">
        <Dialog v-model:visible="dialAdd" modal header="Tambahkan Setoran" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Silahkan tambahkan data setoran</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="tema" class="font-semibold w-24">Tema</label>
                <InputText v-model="dataSetoran.tema" id="tema" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex gap-4 mb-8">
                <label for="deskripsi" class="font-semibold w-24">Deskripsi</label>
                <Textarea rows="5" id="deskripsi" v-model="dataSetoran.deskripsi" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="dialAdd = false"></Button>
                <Button type="button" label="Simpan" @click="save()"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="dialEdit" modal header="Edit Siswa" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Silahkan edit data siswa</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="tema" class="font-semibold w-24">Tema</label>
                <InputText v-model="dataSetoran.tema" id="tema" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex gap-4 mb-8">
                <label for="deskripsi" class="font-semibold w-24">Deskripsi</label>
                <Textarea rows="5" id="deskripsi" v-model="dataSetoran.deskripsi" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="dialAdd = false"></Button>
                <Button type="button" label="Simpan" @click="update()"></Button>
            </div>
        </Dialog>
        <div class="mt-5 flex justify-between items-center">
            <div>
                <h1 class="text-2xl uppercase">List Setoran</h1>
                <h2 class="mt-2">Silahkan kelola Setoran Siswa</h2>
            </div>
            <div class="h-fit">
                <Button label="Tambah" icon="pi pi-plus" @click="addSetoran()"/>
            </div>
        </div>
        <div class="mt-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                <Card v-for="(item, index) in paginatedData" :key="index" class="hover:bg-primary-100/60">
                    <template #content>
                        <div class="flex gap-4 mt-2 justify-between" @click="openSetoran(item)">
                            <div>
                                <p class="font-semibold text-xl capitalize">{{ item.tema }}</p>
                                <p class="text-sm capitalize">{{ item.deskripsi }}</p>
                            </div>
                            <div class="flex gap-2 h-fit">
                                <Button @click="editSetoran(item)" icon="pi pi-pencil" iconPos="left" severity="secondary" outlined class="w-10" />
                                <Button @click="deleteSetoran(item.id_setoran)" icon="pi pi-trash" iconPos="left" class="w-10" />
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
    name : "Setoran",
    components : {
        baseLayout
    },
    data() {
        return {
            dataSetoran : {},
            data : [],
            dialAdd : false,
            dialEdit : false,
            first : 0,
            rows : 14,
            loading : false
        }
    },
    computed: {
        // Data yang ditampilkan berdasarkan halaman saat ini
        paginatedData() {
            return this.data.slice(this.first, this.first + this.rows);
        }
    },
    mounted() {
        this.getSetoran()
    },
    methods : {
        openSetoran(item){
            let payload = {
                id_setoran : item.id_setoran,
                tema : item.tema
            }
            this.$router.push('/guru/setoran/'+btoa(JSON.stringify(payload)))
        },
        addSetoran() {
            this.dialAdd = true
        },

        editSetoran(value) {
            this.dataSetoran = {
                ...value
            }
            this.dialEdit = true
        },
        async save(){
            try {
                this.loading = true
                const params = {
                    tema : this.dataSetoran.tema,
                    deskripsi : this.dataSetoran.deskripsi
                }
                const {data} = await api.post('api/setoran', params)
                if(!data.status) throw new Error(data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
                this.getSetoran()
                this.dialAdd = false
                this.loading = false
            } catch (error) {
                this.loading = false
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async update(){
            try {
                this.loading = true
                const {data} = await api.put('api/setoran/'+this.dataSetoran.id_setoran, this.dataSetoran)
                if(!data.status) throw new Error(data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
                this.getSetoran()
                this.dialEdit = false
                this.loading = false
            } catch (error) {
                this.loading = false
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async getSetoran(){
            try {
                this.loading = true
                const Setoran = await api.get(`api/setoran`)
                if(!Setoran.data.status) throw new Error(Setoran.message)
                this.data = Setoran.data.data
                this.loading = false
            } catch (error) {
                this.loading = false
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async deleteSetoran(id){
            try {
                this.loading = true
                const Setoran = await api.delete(`api/setoran/${id}`)
                if(!Setoran.data.status) throw new Error(Setoran.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: Setoran.data.message, life: 3000});
                this.getSetoran()
                this.loading = false
            } catch (error) {
                this.loading = false
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        }
    }
}
</script>