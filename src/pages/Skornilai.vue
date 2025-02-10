<template>
    <div class="bg-[#c7e1ff] w-screen min-h-screen">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col justify-center">
            <div
                class="bg-primary-500 w-full text-white p-5 md:py-10 rounded-lg flex gap-5 items-center justify-between mt-10">
                <div>
                    <h2>Membaca</h2>
                    <p>Maharat Al Qira'ah</p>
                </div>
            </div>
            <div class="flex-shrink">
                <div class="mt-5">
                    <p class="py-3">Jawaban Benar</p>
                    <ProgressBar :value="50"></ProgressBar>
                </div>
                <div class="mt-5">
                    <p class="py-3">Jawaban Salah</p>
                    <ProgressBar :value="50"></ProgressBar>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-5 mt-10">
                <div class="col-span-2 bg-primary-500 rounded-md text-white p-4 h-20 flex justify-center items-center">
                    <p>Nilai Anda</p>
                </div>
                <div class="col-span-1 bg-primary-500 rounded-md text-white p-4 h-20 flex justify-center items-center">
                    <h3 class="text-4xl font-semibold">90</h3>
                </div>
            </div>
        </div>
        
    </div>
</template>