<template>
    <div class="bg-[#c7e1ff] h-screen w-screen justify-center flex">
        <Dialog v-model:visible="loading" class="w-fit p-10">
            <template #container="{ closeCallback }">
                <i class="pi pi-spin pi-spinner text-bold text-5xl text-primary-500"></i>
            </template>
        </Dialog>
        <div class="bg-[url('/assets/bg.svg')] w-full h-full flex justify-center">
            <div class="flex flex-col gap-5 md:flex-row items-center justify-center p-6 md:w-[60%]">
                <div class="flex justify-center w-[60%]">
                    <img src="/assets/logomabbar.svg" alt="logo mabbar" class="w-full md:w-[80%]">
                </div>
                <div class="w-full md:w-[80%]">
                    <div class="bg-primary-500 w-full text-white p-5 pb-10 md:py-10 rounded-lg">
                        <h1 class="text-2xl font-semibold text-center pb-4">Login</h1>
                        <FloatLabel variant="in">
                            <InputText id="username" v-model="data.nama" variant="outlined" class="w-full" />
                            <label for="username">Username</label>
                        </FloatLabel>
                        <FloatLabel variant="in" class="mt-4">
                            <Password :feedback="false"  id="password" v-model="data.password" variant="outlined" class="w-full" />
                            <label for="password">Password</label>
                        </FloatLabel>
                    </div>
                    <Button @click="login()" label="Login" class="mt-5 w-full text-xl"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../libs/axiosInstance.js'
import { setSession } from '../libs/sessionManager.js'
export default {
    name: "login",
    data() {
        return {
            data : {},
            loading : false
        }
    },
    methods: {
        async login(){
            this.loading = true
            try {
                const login = await api.post('api/siswa/login', this.data)
                if(!login.data.status) throw new Error(login.data.message)
                this.$toast.add({severity:'success', summary: 'Success', detail: login.data.message, life: 3000});
                setSession('Token', login.data.data.token, 30);
                setSession('nama', login.data.data.nama, 30);
                setSession('idSiswa', login.data.data.idSiswa, 30);
                setTimeout(() => {
                    this.loading = false
                },2000)
                this.$router.push('/home')
            } catch (error) {
                this.loading = false
                // console.log(error)
                this.$toast.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
            }
        }
    },
}
</script>