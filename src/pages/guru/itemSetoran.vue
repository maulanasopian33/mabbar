<template>
    <baseLayout>
        <Dialog v-model:visible="dialAdd" modal header="Tambahkan Setoran" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Silahkan tambahkan data setoran</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="arab" class="font-semibold w-24">Arab</label>
                <Textarea rows="2" id="arab" v-model="dataSetoran.arab" class="flex-auto text-right" autocomplete="off" />
            </div>
            <div class="flex gap-4 mb-8">
                <label for="latin" class="font-semibold w-24">Latin</label>
                <Textarea rows="2" id="latin" v-model="dataSetoran.latin" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="dialAdd = false"></Button>
                <Button type="button" label="Simpan" @click="save()"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="dialEdit" modal header="Edit Siswa" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Silahkan edit data siswa</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="arab" class="font-semibold w-24">Arab</label>
                <Textarea rows="2" id="arab" v-model="dataSetoran.arab" class="flex-auto text-right" autocomplete="off" />
            </div>
            <div class="flex gap-4 mb-8">
                <label for="latin" class="font-semibold w-24">Latin</label>
                <Textarea rows="2" id="latin" v-model="dataSetoran.latin" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="dialAdd = false"></Button>
                <Button type="button" label="Simpan" @click="update()"></Button>
            </div>
        </Dialog>
        <div class="mt-5 flex justify-between items-center">
            <div>
                <h1 class="text-2xl uppercase">Item Hafalan</h1>
                <h2 class="mt-2">{{ paramsSetoran.tema }}</h2>
            </div>
            <div class="h-fit">
                <Button label="Tambah" icon="pi pi-plus" @click="addSetoran()"/>
            </div>
        </div>
        <div class="mt-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                <Card v-for="(item, index) in paginatedData" :key="index" class="hover:bg-primary-100/60">
                    <template #content>
                        <div class="flex gap-4 mt-2 justify-between">
                            <div>
                                <p class="font-semibold text-xl capitalize">{{ item.arab }}</p>
                                <p class="text-sm capitalize">{{ item.latin }}</p>
                            </div>
                            <div class="flex gap-2 h-fit">
                                <Button @click="editSetoran(item)" icon="pi pi-pencil" iconPos="left" severity="secondary" outlined class="w-10" />
                                <Button @click="deleteSetoran(item.id_item)" icon="pi pi-trash" iconPos="left" class="w-10" />
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
    name : "itemSetoran",
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
            paramsSetoran : {}
        }
    },
    computed: {
        // Data yang ditampilkan berdasarkan halaman saat ini
        paginatedData() {
            return this.data.slice(this.first, this.first + this.rows);
        }
    },
    mounted() {
        this.paramsSetoran = JSON.parse(atob(this.$route.params.id))
        this.getSetoran()
    },
    methods : {
        addSetoran() {
            this.dialAdd = true
        },
        editSetoran(value) {
            this.dataSetoran = {
                ...value
            }
            console.log(this.dataSetoran)
            this.dialEdit = true
        },
        async save(){
            try {
                const params = {
                    arab : this.dataSetoran.arab,
                    latin : this.dataSetoran.latin,
                    id_setoran : this.paramsSetoran.id_setoran
                }
                const {data} = await api.post('api/item-setoran', params)
                if(!data.status) throw new Error(data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
                this.getSetoran()
                this.dialAdd = false
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async update(){
            try {
                const {data} = await api.put('api/item-setoran/'+this.dataSetoran.id_item, this.dataSetoran)
                if(!data.status) throw new Error(data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
                this.getSetoran()
                this.dialEdit = false
            } catch (error) {
                console.log(error)
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async getSetoran(){
            try {
                const Setoran = await api.get(`api/item-setoran/${this.paramsSetoran.id_setoran}`)
                if(!Setoran.data.status) throw new Error(Setoran.message)
                this.data = Setoran.data.data
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async deleteSetoran(id){
            try {
                const Setoran = await api.delete(`api/item-setoran/${id}`)
                if(!Setoran.data.status) throw new Error(Setoran.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: Setoran.data.message, life: 3000});
                this.getSetoran()
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        }
    }
}
</script>