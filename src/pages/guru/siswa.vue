<template>
    <baseLayout>
        <Dialog v-model:visible="dialAdd" modal header="Tambahkan Siswa" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Silahkan tambahkan data siswa</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="nama" class="font-semibold w-24">nama</label>
                <InputText v-model="dataSiswa.nama" id="nama" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="password" class="font-semibold w-24">password</label>
                <Password id="password" toggleMask v-model="dataSiswa.password" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="dialAdd = false"></Button>
                <Button type="button" label="Simpan" @click="save()"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="dialEdit" modal header="Edit Siswa" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Silahkan edit data siswa</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="nama" class="font-semibold w-24">nama</label>
                <InputText v-model="dataSiswa.nama" id="nama" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="password" class="font-semibold w-24">password</label>
                <Password toggleMask id="password" v-model="dataSiswa.password" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="dialAdd = false"></Button>
                <Button type="button" label="Simpan" @click="update()"></Button>
            </div>
        </Dialog>
        <div class="mt-5 flex justify-between items-center">
            <div>
                <h1 class="text-2xl uppercase">List Siswa</h1>
                <h2 class="mt-2">Silahkan kelola siswa</h2>
            </div>
            <div class="h-fit">
                <Button label="Tambah" icon="pi pi-plus" @click="addSiswa()"/>
            </div>
        </div>
        <div class="mt-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                <Card v-for="(item, index) in paginatedData" :key="index" class="hover:bg-primary-100/60">
                    <template #content>
                        <div class="flex gap-4 mt-2 justify-between">
                            <p class="font-semibold text-lg">{{ item.nama }}</p>
                            <div class="flex gap-2">
                                <Button @click="editSiswa(item)" icon="pi pi-pencil" iconPos="left" severity="secondary" outlined class="w-10" />
                                <Button @click="deleteSiswa(item.id)" icon="pi pi-trash" iconPos="left" class="w-10" />
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
    name : "siswa",
    components : {
        baseLayout
    },
    data() {
        return {
            dataSiswa : {},
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
        this.getSiswa()
    },
    methods : {
        addSiswa() {
            this.dialAdd = true
        },
        editSiswa(value) {
            console.log(value)
            this.dataSiswa = {
                nama : value.nama,
                id : value.id
            }
            this.dialEdit = true
        },
        async save(){
            try {
                const {data} = await api.post('api/siswa', this.dataSiswa)
                if(!data.status) throw new Error(data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
                this.getSiswa()
                this.dialAdd = false
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async update(){
            try {
                const {data} = await api.put('api/siswa/'+this.dataSiswa.id, this.dataSiswa)
                if(!data.status) throw new Error(data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
                this.getSiswa()
                this.dialEdit = false
            } catch (error) {
                console.log(error)
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async getSiswa(){
            try {
                const siswa = await api.get(`api/siswa`)
                if(!siswa.data.status) throw new Error(siswa.message)
                this.data = siswa.data.data
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async deleteSiswa(id){
            try {
                const siswa = await api.delete(`api/siswa/${id}`)
                if(!siswa.data.status) throw new Error(siswa.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: siswa.data.message, life: 3000});
                this.getSiswa()
            } catch (error) {
                console.log(error)
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        }
    }
}
</script>