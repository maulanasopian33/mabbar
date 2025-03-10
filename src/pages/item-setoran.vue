<template>
    <div class="bg-[#c7e1ff] w-screen h-screen overflow-y-scroll pb-10">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col items-center">
            <div class="w-full md:bg-white/10 md:w-[80%] lg:w-[60%] md:border-2 border-primary-500 rounded-lg md:p-5">
                <div @click="kembali()"
                    class="flex cursor-pointer mb-5 items-center text-xl py-2 px-4 hover:text-white hover:bg-primary-300 w-fit rounded-full">
                    <i class="pi pi-chevron-left"></i>
                    <p>Kembali</p>
                </div>
                <div class="mt-5">
                    <div class="mb-6">
                        <h1 class="text-2xl font-semibold uppercase">{{ params.tema }}</h1>
                        <h2 class="mt-2">{{ params.deskripsi }}</h2>
                    </div>
                    <DataTable showGridlines :value="data" class="w-full mb-10">
                        <Column bodyClass="bg-primary-500/10 rounded-tl-md" headerClass="bg-primary-500 text-white !w-[100px]" field="arab" header="Arab"></Column>
                        <Column bodyClass="bg-primary-500/10" headerClass="bg-primary-500 text-white w-[30%]" field="latin" header="Latin"></Column>
                        <Column bodyClass="bg-primary-500/10 rounded-tr-md" headerClass="bg-primary-500 text-white" field="status" header="Status">
                            <template #body="{ data }">
                                <div class="text-center">
                                    <i :class="data.status ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500'"></i>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../libs/axiosInstance.js'
import { getSession } from '../libs/sessionManager';
export default {
    name: 'item-setoran',
    data() {
        return {
            data : [],
            params : '',
            idSiswa : getSession('idSiswa')
        }
    },
    mounted() {
        this.params = JSON.parse(atob(this.$route.params.id))
        this.getSetoran()
    },
    methods: {
        kembali() {
            this.$router.push({
                name: 'Home'
            })
        },
        async getSetoran(){
            try {
                const Setoran = await api.get(`api/penilaian-setoran/${this.idSiswa}/${this.params.id_setoran}`)
                if(!Setoran.data.status) throw new Error(Setoran.message)
                this.data = Setoran.data.data.map((item)=>{
                    return {
                        ...item,
                    }
                })
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
    },
}
</script>