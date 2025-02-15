<template>
    <div>
        <soalPg :idLatihan="params.id_latihan" v-show="params.jenis === 'Pilihan Ganda'"/>
    </div>
</template>

<script>
import api from '../libs/axiosInstance'
import soalPg from './soal-pg.vue';
export default {
    name : 'testLatihan',
    components : {soalPg},
    data() {
        return {
            params : ''
        }
    },
    mounted() {
        this.params = JSON.parse(atob(this.$route.params.id))
        console.log(this.params)
        this.getPenilaian()
    },
    methods: {
        async getPenilaian() {
            try {
                const latihan = await api.get(`api/latihan/nilai/${this.params.id_latihan}`)
                if (!latihan.data.status) throw new Error(latihan.message)
                if(!this.params.isnew) return
                if(latihan.data.data.length > 0) {
                    let params = [{
                        id_latihan :this.params.id_latihan
                    }]
                    this.$router.push(`/skornilai?id=${btoa(JSON.stringify(params))}`)
                }
            } catch (error) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.message,
                    life: 3000
                });
            }
        },
    },
}
</script>