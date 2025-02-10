<template>
    <div class="bg-[#c7e1ff] w-screen min-h-screen">
       <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col justify-center items-center">
           <div class="md:w-[60%] h-full w-full">
               <div class="mt-10">
                   <h1 class="text-4xl font-bold text-left p-0">Belajar</h1>
                   <div class="bg-primary-500 hover:text-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-10">
                        <div>
                            <h2>Membaca</h2>
                            <p>Maharat Al Qira'ah</p>
                        </div>
                        <div>
                            <i class="pi pi-lock"></i>
                        </div>
                   </div>
                   <div class="bg-primary-500 hover:text-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-3">
                        <div>
                            <h2>Menulis</h2>
                            <p>Maharat Al-Kitabah</p>
                        </div>
                        <div>
                            <i class="pi pi-lock"></i>
                        </div>
                   </div>
                   <div class="bg-primary-500 hover:text-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-3">
                        <div>
                            <h2>Mendengar</h2>
                            <p>Maharat Al-Istima'</p>
                        </div>
                        <div>
                            <i class="pi pi-lock"></i>
                        </div>
                   </div>
                   <div class="bg-primary-500 hover:text-primary-500 hover:bg-primary-200 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-3">
                        <div>
                            <h2>Berbicara</h2>
                            <p>Maharat Al-Kalam</p>
                        </div>
                        <div>
                            <i class="pi pi-lock"></i>
                        </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
</template>
<script>
export default {
   name: "listBelajar"
}
</script>