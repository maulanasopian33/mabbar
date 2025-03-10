<template>
    <baseLayout>
        <div class="mt-5 flex justify-between items-center">
            <div>
                <h1 class="text-2xl uppercase">Penilaian Setoran</h1>
                <h2 class="mt-2">Silahkan kelola Penilaian</h2>
            </div>
        </div>
        <div class="mt-10">
            <div class="flex gap-3 justify-center items-center">
                <Select v-model="siswaSelected" :options="siswa" optionLabel="nama" placeholder="Pilih Siswa" class="w-full md:w-56 my-4" />
                <Button label="Save" class="h-fit" @click="savePenilaian()"/>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card v-for="(item, index) in data" :key="index" class="hover:bg-primary-100/60">
                    <template #content>
                        <div class="flex justify-between">
                            <div>
                                <p class="font-semibold text-lg capitalize">{{ item.arab }}</p>
                                <p class="text-sm capitalize">{{ item.latin }}</p>
                            </div>
                            <Checkbox v-model="item.status" binary />
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
            idSetoran : this.$route.params.id,
            data : {},
            siswa : {},
            siswaSelected : ''
        }
    },
    watch : {
        '$route.params.id'(value) {
            this.idSetoran = value
        },
        siswaSelected(value) {
            this.getPenilaian(value.id)
        }
    },

    mounted() {
        this.getSiswa()
    },
    methods : {
        async getSiswa(){
            try {
                const siswa = await api.get(`api/siswa`)
                if(!siswa.data.status) throw new Error(siswa.message)
                this.siswa = siswa.data.data
            console.log(this.siswa)
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        goTo(item) {
            this.$router.push({name : 'nilaipenilaianSetoran', params : {id : item.id_setoran}})  
        },
        async getPenilaian(id){
            try {
                this.data = []
                const Penilaian = await api.get(`api/penilaian-setoran/${id}/${this.idSetoran}`)
                if(!Penilaian.data.status) throw new Error(Penilaian.message)
                this.data = Penilaian.data.data
            console.log("penilaian", this.data)
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        async savePenilaian(){
            let filterData = this.data.filter(item => item.status == true)
            try {
                const store = await this.data.map(async (item) =>{
                    let hasil = await this.storeData(item)
                    if(!hasil) throw new Error("Gagal Menyimpan data");
                })
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            } finally {
                this.$toast.add({severity:'success', summary: 'Berhasil', detail: "Data Berhasil Disimpan", life: 3000});
                this.getPenilaian(this.siswaSelected.id)
            }
        },
        async storeData(item){
            try {
                const {data} = await api.post('api/penilaian-setoran/', item)
                if(!data.status) throw new Error(data.message)
                return true
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
                return false
            }
        }
    }
}
</script>