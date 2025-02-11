<template>
    <div>
        <Dialog v-model:visible="visible" modal header="Media" class="w-[90%] md:w-[60%]">
            <Tabs value="1">
                <TabList>
                    <Tab value="0">Add New</Tab>
                    <Tab value="1">List</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <FileUpload name="file" :url="url+'api/media/'+token" @upload="onAdvancedUpload($event)" :multiple="true"
                            accept="image/png, image/jpeg" :maxFileSize="90000000">
                            <template #empty>
                                <span>Drag and drop files to here to upload.</span>
                            </template>
                        </FileUpload>
                    </TabPanel>
                    <TabPanel value="1">
                        <div class="grid grid-cols-3 md:grid-cols-5 gap-2">
                            <img v-for="(item, index) in paginatedData" :key="index" @click="selectImg(item)" @contextmenu="onRightClick($event, item)" class="md:h-32 h-20 object-contain bg-slate-50 hover:bg-slate-200 cursor-pointer rounded-md" :src="url+ item.thumbnail" alt="" srcset="">
                            <ContextMenu ref="menu" :model="items" />
                        </div>
                        <Paginator v-model:first="first" :rows="rows" :totalRecords="datas.length" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Dialog>
    </div>
</template>

<script>
import { getSession } from '../libs/sessionManager.js';
import api from '../libs/axiosInstance.js'
export default {
    name: 'Filemanager',
    data() {
        return {
            visible: false,
            datas : [],
            url : import.meta.env.VITE_URL_API,
            token : '',
            selectedimg : null,
            profile : { id : 0},
            first : 0,
            rows : 15,
            items: [
                { 
                    label: 'View',
                    icon: 'pi pi-copy',
                    command: () => {
                        window.open(this.url+this.selectedimg.path, '_blank');
                    }},
                { label: 'Rename', icon: 'pi pi-file-edit' }
            ],
        }
    },
    props: {
        show : Boolean
    },
    watch: {
        show(value) {
            this.visible = value
            this.getdata()
        },
        visible(value) {
            if(value == false){
                this.$emit('close', value)
            }
        },
    },
    async mounted() {
        this.token = await getSession('Token');
    },
    computed: {
        // Data yang ditampilkan berdasarkan halaman saat ini
        paginatedData() {
            return this.datas.slice(this.first, this.first + this.rows);
        }
    },
    methods: {
        async getdata() {
            const {data} = await api.get('api/media/get/'+ this.token)
            if(data.status) {
                this.datas = data.data
                console.log(data)
            }
        },
        onRightClick(event, item) {
            this.selectedimg = item
            this.$refs.menu.show(event)
        },
        selectImg(item) {
            this.$emit('selected', item.path)
            this.visible = false
            // window.open('http://localhost:3000/'+item.path, '_blank');
        },
        onAdvancedUpload(event) {
            console.log(event)
            this.getdata()
        }
    }
}
</script>