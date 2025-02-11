<template>
    <baseLayout>
        <div class="mt-5">
            <h1 class="text-2xl font-semibold">Tambahkan Materi</h1>
            <p class="mt-1">Silahkan Tambahkan Materi</p>
        </div>
        <div class="py-10 md:grid md:grid-cols-2 md:gap-5">
            <div>
                <FloatLabel variant="in">
                    <InputText class="w-full" id="in_label" v-model="data.judul" variant="filled" />
                    <label for="in_label">Judul Materi</label>
                </FloatLabel>
                <div @click="openMedia('featured')" class="mt-5 w-full md:h-72 h-52 p-5 flex flex-col justify-center items-center border border-primary-500 border-dashed rounded-md">
                    <div v-show="!data.featureimage" class="flex text-center flex-col justify-center">
                        <i class="pi pi-image"></i>
                        <p>Pilih Gambar</p>
                    </div>
                    <img class="w-full h-full object-contain" v-show="data.featureimage" :src="url+data.featureimage"/>
                </div>
            </div>
                
            <Editor v-model="data.content" editorStyle="height: 320px" class="mt-5 md:mt-0" />
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
import baseLayout from '../../components/baseLayout.vue';
import Filemanager from '../../components/filemanager.vue'
import api from '../../libs/axiosInstance.js'
export default {
    name : "tambah",
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
            ]
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
        deleteLampiran(index){
            this.lampiran.splice(index, 1)
        },
        async save(){
            try {
                this.data.materi = this.$route.params.id
                this.data.lampiran = this.lampiran
                const {data} = await api.post('api/materi', this.data)
                if(!data.status) throw new Error(data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
                this.$router.push('/guru/materi/'+ this.$route.params.id)
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