<template>
    <baseLayout>
        <Dialog v-model:visible="dialAdd" modal header="Tambahkan Latihan" :style="{ width: '25rem' }">
            <div class="flex items-center gap-4 mb-4">
                <label for="nama_latihan" class="font-semibold w-24">Nama Latihan</label>
                <InputText v-model="newdata.nama_latihan" id="nama_latihan" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="email" class="font-semibold w-24">Jenis</label>
                <Select v-model="newdata.jenis" :options="jenis_latihan" placeholder="Pilih Jenis Latihan" class="flex-auto" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="email" class="font-semibold w-24">Materi</label>
                <Select v-model="newdata.materi" :options="materi" placeholder="Pilih Materi" class="flex-auto" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="storeLatihan()"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="dialEdit" modal header="Edit Latihan" :style="{ width: '25rem' }">
            <div class="flex items-center gap-4 mb-4">
                <label for="nama_latihan" class="font-semibold w-24">Nama Latihan</label>
                <InputText v-model="updatedata.nama_latihan" id="nama_latihan" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="email" class="font-semibold w-24">Jenis</label>
                <Select v-model="updatedata.jenis" :options="jenis_latihan" placeholder="Pilih Jenis Latihan" class="flex-auto" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="email" class="font-semibold w-24">Materi</label>
                <Select v-model="updatedata.materi" :options="materi" placeholder="Pilih Materi" class="flex-auto" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="updateLatihan()"></Button>
            </div>
        </Dialog>
        <div class="mt-5 flex justify-between items-center">
            <div>
                <h1 class="text-2xl uppercase">Latihan</h1>
                <h2 class="mt-2">Silahkan inputkan Soal Latihan</h2>
            </div>
            <div class="h-fit">
                <Button label="Tambah" icon="pi pi-plus" @click="addLatihan()"/>
            </div>
        </div>
        <div class="mt-10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card @click="addSoal(item)" v-for="(item, index) in data" :key="index" class="hover:bg-primary-100/60">
                    <template #content>
                        <p class="font-semibold text-lg capitalize">{{ item.nama_latihan }}</p>
                        <p class="mt-4"><span class="bg-green-500 py-2 px-2 rounded-md text-xs text-white">{{ item.materi }}</span><span class="ml-2 bg-primary-500 py-2 px-2 rounded-md text-xs text-white">{{ item.jenis }}</span></p>
                    </template>
                    <template #footer>
                        <div class="flex gap-4 mt-2">
                            <Button @click="editLatihan(item)" icon="pi pi-pencil" iconPos="left" label="Edit" severity="secondary" outlined class="w-full" />
                            <Button @click="deleteLatihan(item.id_latihan)" icon="pi pi-trash" iconPos="left" label="Hapus" class="w-full" />
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
            newdata : {},
            updatedata : {},
            dialAdd : false,
            dialEdit : false,
            materi : ["Al-Qira'ah","Al-Kitabah","Al-Istima'","Al-Kalam"],
            jenis_latihan : ["Pilihan Ganda","Uraian"],
        }
    },
    watch : {
        '$route.params.id'(value) {
            this.nmMateri = value
            this.getLatihan()
            console.log(value)
        }
    },

    mounted() {
        this.getLatihan()
    },
    methods : {
        addLatihan() {
            this.dialAdd = true
        },
        editLatihan(item) {
            this.updatedata = {
                ...item
            }
            this.dialEdit = true
        },
        addSoal(item) {
            item.jenis.replace(" ", "-").toLowerCase()
            this.$router.push(`/guru/latihan/${item.jenis.replace(" ", "-").toLowerCase()}/${item.id_latihan}`)
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
        async storeLatihan(){
            try {
                const Latihan = await api.post(`api/latihan`, this.newdata)
                if(!Latihan.data.status) throw new Error(Latihan.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: Latihan.data.message, life: 3000});
                this.getLatihan()
                this.dialAdd = false
                this.newdata = {}
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async updateLatihan(){
            try {
                const Latihan = await api.put(`api/latihan/${this.updatedata.id_latihan}`, this.updatedata)
                if(!Latihan.data.status) throw new Error(Latihan.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: Latihan.data.message, life: 3000});
                this.getLatihan()
                this.dialEdit = false
                this.updatedata = {}
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },

        async deleteLatihan(id){
            try {
                const materi = await api.delete(`api/latihan/${id}`)
                if(!materi.data.status) throw new Error(materi.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: materi.data.message, life: 3000});
                this.getLatihan()
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        }
    }
}
</script>