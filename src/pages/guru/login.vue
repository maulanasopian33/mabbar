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
                            <InputText id="username" v-model="data.username" variant="outlined" class="w-full" />
                            <label for="username">Username</label>
                        </FloatLabel>
                        <FloatLabel variant="in" class="mt-4">
                            <Password :feedback="false" id="password" v-model="data.password" variant="outlined" class="w-full" />
                            <label for="password">Password</label>
                        </FloatLabel>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <Button @click="login()" label="Login" class="mt-5 w-full text-xl"/>
                        <Button @click="register()" severity="secondary" label="Register" class="mt-5 w-full text-xl"/>
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
import { setSession } from '../../libs/sessionManager.js'
export default {
    name: "login",
    data() {
        return {
            data : {},
        }
    },
    methods: {
        register() {
            this.$router.push('/guru/register')
        },
        async login(){
            try {
                const login = await api.post('api/auth/login', this.data)
                if(!login.data.status) throw new Error(login.data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: login.data.message, life: 3000});
                setSession('Token', login.data.token, 30);
                this.$router.push('/guru/dashboard')
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        }
    },
}
</script>