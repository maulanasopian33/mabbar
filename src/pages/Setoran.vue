<template>
    <div class="bg-[#c7e1ff] w-screen h-screen">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col items-center">
            <div class="w-full md:bg-white/10 md:w-[80%] lg:w-[60%] md:border-2 border-primary-500 rounded-lg md:p-5 md:h-screen">
                <div @click="kembali()"
                    class="flex cursor-pointer mb-5 items-center text-xl py-2 px-4 hover:text-white hover:bg-primary-300 w-fit rounded-full">
                    <i class="pi pi-chevron-left"></i>
                    <p>Kembali</p>
                </div>
                <div class="grid grid-cols-3 gap-3">
                    <div class="bg-primary-500/60 text-white rounded-md flex flex-col items-center p-4 h-36">
                        <h3 class="text-4xl text-black bg-white rounded-full p-3 font-semibold w-[70px] text-center">?</h3>
                        <p class="text-3xl mt-2">3</p>
                    </div>
                    <div class="bg-primary-500 text-white rounded-md flex flex-col items-center p-4 mt-5 h-36">
                        <h3 class="text-4xl text-black bg-white rounded-full p-3 font-semibold w-[70px] text-center">?</h3>
                        <p class="text-3xl mt-2">1</p>
                    </div>
                    <div class="bg-primary-500/60 text-white rounded-md flex flex-col items-center p-4 h-36">
                        <h3 class="text-4xl text-black bg-white rounded-full p-3 font-semibold w-[70px] text-center">?</h3>
                        <p class="text-3xl mt-2">2</p>
                    </div>
                    
                </div>
                <div class="mt-10">
                    <Card @click="goTo(item)" v-for="(item, index) in paginatedData" :key="index" class="hover:bg-primary-500/60 bg-primary text-white my-2">
                        <template #content>
                            <div class="flex gap-4 mt-2 justify-between">
                                <div>
                                    <p class="font-semibold text-xl capitalize">{{ item.tema }}</p>
                                    <p class="text-sm capitalize">{{ item.deskripsi }}</p>
                                </div>
                            </div>
                        </template>
                    </Card>
                    <Paginator class="mt-4" v-model:first="first" :rows="rows" :totalRecords="data.length" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../libs/axiosInstance.js'
export default {
    name: 'setoran',
    data() {
        return {
            data : [],
            first : 0,
            rows : 14,
        }
    },
    computed: {
        paginatedData() {
            return this.data.slice(this.first, this.first + this.rows);
        }
    },
    mounted() {
        this.getSetoran()
    },
    methods: {
        kembali() {
            this.$router.push({
                name: 'Home'
            })
        },
        goTo(item) {
            const idEncrypt = btoa(JSON.stringify({
                id_setoran : item.id_setoran,
                tema : item.tema,
                deskripsi : item.deskripsi
            }))
            this.$router.push({
                name: 'itemSetoran',
                params : { id : idEncrypt }
            })
        },
        async getSetoran(){
            try {
                const Setoran = await api.get(`api/setoran`)
                if(!Setoran.data.status) throw new Error(Setoran.message)
                this.data = Setoran.data.data
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
    },
}
</script>