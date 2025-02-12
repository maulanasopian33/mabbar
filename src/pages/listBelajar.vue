<template>
    <div class="bg-[#c7e1ff] w-screen h-screen">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col justify-center items-center">
            <div class="md:w-[60%] h-full w-full">
                <div @click="kembali()" class="flex cursor-pointer items-center text-xl py-2 px-4 hover:text-white hover:bg-primary-300 w-fit rounded-full">
                    <i class="pi pi-chevron-left"></i>
                    <p>Kembali</p>
                </div>
                <div class="mt-10">
                    <h1 class="text-4xl font-bold text-left p-0">Belajar</h1>
                    <div @click="goToBelajar('al-qiraah')"
                        class="bg-primary-500 cursor-pointer hover:text-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-10">
                        <div>
                            <h2 class="text-xl font-medium">Membaca</h2>
                            <p>Maharat Al Qira'ah</p>
                        </div>
                    </div>
                    <div @click="goToBelajar('al-kitabah')"
                        class="bg-primary-500 cursor-pointer hover:text-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-3">
                        <div>
                            <h2 class="text-xl font-medium">Menulis</h2>
                            <p>Maharat Al-Kitabah</p>
                        </div>
                    </div>
                    <div @click="goToBelajar('al-istima')"
                        class="bg-primary-500 cursor-pointer hover:text-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-3">
                        <div>
                            <h2 class="text-xl font-medium">Mendengar</h2>
                            <p>Maharat Al-Istima'</p>
                        </div>
                    </div>
                    <div @click="goToBelajar('al-kalam')"
                        class="bg-primary-500 cursor-pointer hover:text-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-3">
                        <div>
                            <h2 class="text-xl font-medium">Berbicara</h2>
                            <p>Maharat Al-Kalam</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
   name: "listBelajar",
   methods: {
    goToBelajar(nama){
        this.$router.push({
            name: 'ListMateri',
            params: {
                id: nama
            }
        })
    },
    kembali(){
        this.$router.push({ name : 'Home' })
    },
   },
}
</script>