<template>
    <div class="bg-[#c7e1ff] h-screen w-screen justify-center flex">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full flex justify-center">
            <div class="flex flex-col gap-5 md:flex-row items-center justify-center p-6 md:w-[60%]">
                <div class="flex justify-center w-[60%]">
                    <img src="/assets/logomabbar.svg" alt="logo mabbar" class="w-full md:w-[80%]">
                </div>
                <div class="w-full md:w-[80%]">
                    <div class="bg-primary-500 w-full text-white p-5 md:py-10 rounded-lg">
                        <h1 class="text-2xl font-semibold text-center pb-4">Register</h1>
                        <FloatLabel variant="in">
                            <InputText id="nama" v-model="data.nama" variant="outlined" class="w-full" />
                            <label for="nama">Nama</label>
                        </FloatLabel>
                        <FloatLabel variant="in" class="mt-4">
                            <InputText id="username" v-model="data.username" variant="outlined" class="w-full" />
                            <label for="username">Username</label>
                        </FloatLabel>
                        <FloatLabel variant="in" class="mt-4 flex">
                            <Password id="password" v-model="data.password" variant="outlined" class="!w-full flex-auto" :feedback="false" />
                            <label for="password">Password</label>
                        </FloatLabel>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <Button @click="register()" label="Register" class="mt-5 w-full text-xl"/>
                        <Button @click="login()" severity="secondary" label="Login" class="mt-5 w-full text-xl"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    input.p-inputtext.p-component.p-password-input {
        width: 100%;
    }
</style>
<script>
import api from '../../libs/axiosInstance.js'
export default {
    name: "register",
    data() {
        return {
            data : {},
        }
    },
    methods: {
        login() {
            this.$router.push('/guru/login')
        },
        async register(){
            try {
                const login = await api.post('api/auth/register', this.data)
                if(!login.data.status) throw new Error(login.data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: login.data.message, life: 3000});
                this.$router.push('/guru/login')
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        }
    },
}
</script>