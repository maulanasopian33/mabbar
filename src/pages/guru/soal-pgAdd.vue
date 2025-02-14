<template>
    <baseLayout>
        <div class="mt-5">
            <h1 class="text-2xl font-semibold">Tambahkan Soal PG</h1>
            <p class="mt-1">Silahkan Tambahkan Materi</p>
        </div>
        <div class="py-10">
            <div class="">
                <p>Deskripsi Soal</p>          
                <Textarea v-model="data.soal" rows="5" class="mt-2 w-full" />
            </div>
            <div class="mt-5">
                <span>Kunci Jawaban</span>
                <div class="grid grid-cols-1 md:grid-cols-2 pt-5 gap-2">
                    <InputGroup>
                        <InputGroupAddon>A.</InputGroupAddon>
                        <InputText v-model="data.pilihan_a" placeholder="Pilihan A" />
                        <InputGroupAddon>
                            <Button @click="setJawaban('A')" icon="pi pi-check" :severity="data.kunci_jawaban == 'A' ? 'primary' : 'secondary'" />
                        </InputGroupAddon>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon>B.</InputGroupAddon>
                        <InputText v-model="data.pilihan_b" placeholder="Pilihan B" />
                        <InputGroupAddon>
                            <Button @click="setJawaban('B')" icon="pi pi-check" :severity="data.kunci_jawaban == 'B' ? 'primary' : 'secondary'" />
                        </InputGroupAddon>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon>C.</InputGroupAddon>
                        <InputText v-model="data.pilihan_c" placeholder="Pilihan C" />
                        <InputGroupAddon>
                            <Button @click="setJawaban('C')" icon="pi pi-check" :severity="data.kunci_jawaban == 'C' ? 'primary' : 'secondary'" />
                        </InputGroupAddon>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon>D.</InputGroupAddon>
                        <InputText v-model="data.pilihan_d" placeholder="Pilihan D" />
                        <InputGroupAddon>
                            <Button @click="setJawaban('D')" icon="pi pi-check" :severity="data.kunci_jawaban == 'D' ? 'primary' : 'secondary'" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-6 pt-5 gap-2 md:col-span-2">
                <div @click="openMedia('lampiran')" class="w-full h-36 md:h-48 border border-slate-500 border-dashed rounded-md flex justify-center items-center">
                    <i class="pi pi-image"></i>
                </div>
                <img class="w-full h-36 md:h-48 object-cover" :src="url+item.path" @click="deleteLampiran(index)" v-for="(item, index) in lampiran" :key="index"/>
            </div>
            <Button @click="save()" label="Simpan" class="mt-5 w-full text-xl md:col-span-2" />
        </div>
        <Filemanager @selected="imgSelected" :show="showmedia" @close="(value)=> showmedia = value"/>
    </baseLayout>
</template>

<script>
import { Textarea } from 'primevue';
import baseLayout from '../../components/baseLayout.vue';
import Filemanager from '../../components/filemanager.vue'
import api from '../../libs/axiosInstance.js'
import { data } from 'autoprefixer';
export default {
    name : "tambahsoalPG",
    components : {
        baseLayout
    },
    components: {
        Filemanager
    },
    data() {
        return {
            showmedia : false,
            selectedImg : null,
            url : import.meta.env.VITE_URL_API,
            tujuanMedia : '',
            lampiran : [],
            data : {},
            items: [
                {
                    label: 'Refresh',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Export',
                    icon: 'pi pi-upload'
                }
            ],

        }
    },
    watch : {
        selectedImg(value){
            if(value !== ''){
                if(this.tujuanMedia == 'lampiran'){
                    this.pushLampiran(value)
                }
                if(this.tujuanMedia == 'featured'){
                    this.data.featureimage = value
                }
                this.selectedImg = ''
            }
        }
    },
    methods: {
        setJawaban(value){
          this.data.kunci_jawaban = value  
        },
        deleteLampiran(index){
            this.lampiran.splice(index, 1)
        },
        async save(){
            try {
                this.data.lampiran = JSON.stringify(this.lampiran)
                this.data.id_latihan = this.$route.params.id
                const {data} = await api.post('api/latihan/soal-pg', this.data)
                if(!data.status) throw new Error(data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
                this.$router.push('/guru/latihan/pilihan-ganda/'+ this.$route.params.id)
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },

        pushLampiran(value){
            this.lampiran.push({
                path : value
            })
            console.log(this.lampiran)
        },
        imgSelected(value) {
            this.selectedImg = value
        },
        openMedia(tujuan){
            this.tujuanMedia = tujuan
            this.showmedia = true
        }
    },
}
</script>