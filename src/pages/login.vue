<template>
    <div class="bg-[#c7e1ff] h-screen w-screen justify-center flex">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full flex justify-center">
            <div class="flex flex-col gap-5 md:flex-row items-center justify-center p-6 md:w-[60%]">
                <div class="flex justify-center w-[60%]">
                    <img src="/assets/logomabbar.svg" alt="logo mabbar" class="w-full md:w-[80%]">
                </div>
                <div class="w-full md:w-[80%]">
                    <div class="bg-primary-500 w-full text-white p-5 md:py-10 rounded-lg">
                        <h1 class="text-2xl font-semibold text-center pb-4">Login</h1>
                        <FloatLabel variant="in">
                            <InputText id="username" v-model="value2" variant="outlined" class="w-full" />
                            <label for="username">Username</label>
                        </FloatLabel>
                        <FloatLabel variant="in" class="mt-4">
                            <InputText id="password" v-model="value2" variant="outlined" class="w-full" />
                            <label for="password">Password</label>
                        </FloatLabel>
                    </div>
                    <Button @click="goToHome()" label="Login" class="mt-5 w-full text-xl"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    methods: {
        goToHome() {
            this.$router.push('/home')
        }
    },
}
</script>