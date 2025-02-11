<template>
    <baseLayout>
        <div class="mt-5">
            <h1 class="text-2xl font-semibold">Edit Materi</h1>
            <p class="mt-1">Silahkan Edit Materi</p>
        </div>
        <div class="py-10">
            <FloatLabel variant="in">
                <InputText class="w-full" id="in_label" v-model="data.judul" variant="filled" />
                <label for="in_label">Judul Materi</label>
            </FloatLabel>
            <div @click="openMedia('featured')" class="mt-5 w-full min-h-52 p-5 flex flex-col justify-center items-center border border-primary-500 border-dashed rounded-md">
                <div v-show="!data.featureimage" class="flex text-center flex-col justify-center">
                    <i class="pi pi-image"></i>
                    <p>Pilih Gambar</p>
                </div>
                <Image height="150" v-show="data.featureimage" :src="url+data.featureimage"/>
            </div>
                
            <Editor v-model="data.content" editorStyle="height: 320px" class="mt-5" />
            <div class="grid grid-cols-2 pt-5 gap-2">
                <div @click="openMedia('lampiran')" class="w-full h-36 border border-slate-500 border-dashed rounded-md flex justify-center items-center">
                    <i class="pi pi-image"></i>
                </div>
                <img :src="url+item.file" @click="deleteLampiran(index)" v-for="(item, index) in lampiran" :key="index"/>
            </div>
            <Button @click="save()" label="Simpan" class="mt-5 w-full text-xl" />
        </div>
        <Filemanager @selected="imgSelected" :show="showmedia" @close="(value)=> showmedia = value"/>
    </baseLayout>
</template>

<script>
import baseLayout from '../../components/baseLayout.vue';
import Filemanager from '../../components/filemanager.vue'
import api from '../../libs/axiosInstance.js'
export default {
    name : "edit",
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
    mounted() {
        this.getData()
    },
    methods: {
        deleteLampiran(index){
            this.lampiran.splice(index, 1)
        },
        async getData(){
            const {data} = await api.get(`api/materi/${this.$route.params.id}`)
            this.data = data.data
            this.lampiran = this.data.listlampirans
            console.log(this.lampiran)
        },
        async save(){
            try {
                this.data.lampiran = this.lampiran
                const {data} = await api.put('api/materi/'+this.data.idmateri, this.data)
                if(!data.status) throw new Error(data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: data.message, life: 3000});
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        },
        pushLampiran(value){
            this.lampiran.push({
                file : value
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