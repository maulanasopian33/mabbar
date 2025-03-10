<template>
    <baseLayout :loading="loading">
        <div class="flex flex-col justify-center items-center">
            <img src="/assets/logomabbar.svg" alt="" srcset="" class="opacity-50">
            <h1 class="text-4xl font-thin">Mabbar Apps</h1>
        </div>
    </baseLayout>
</template>

<script>
import baseLayout from '../../components/baseLayout.vue';
export default {
    name : "dashboard",
    components : {
        baseLayout
    },
    data() {
        return {
            loading : false
        }
    },
    mounted() {
        this.loading = true
        setTimeout(() => {
            this.loading = false
        }, 2000);
    }
}
</script>