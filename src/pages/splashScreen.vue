<template>
    <div class="bg-[#c7e1ff] h-screen w-screen">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full flex flex-col items-center justify-center">
            <img src="/assets/logomabbar.svg" alt="logo mabbar" class="w-[70%] md:w-[30%]">
            <Button label="Mulai belajar" class="w-[80%] md:w-[30%] rounded-full text-lg" @click="goToLogin"  />
        </div>
    </div>
</template>

<script>
export default {
    name : "splashScreen",
    methods: {
        goToLogin() {
            this.$router.push('/login')
        }
    },
}
</script>