<template>
    <div class="bg-[#c7e1ff] w-screen min-h-screen">
        <div class="bg-[url('/assets/bg.svg')] w-full h-full p-6 flex flex-col justify-center">
            <div class="grid grid-cols-3 gap-3">
                <div class="bg-primary-500 text-white rounded-md flex flex-col items-center p-4 h-36">
                    <h3 class="text-4xl text-black w-fit bg-white rounded-full p-3">KT</h3>
                    <p class="text-3xl mt-2">3</p>
                </div>
                <div class="bg-primary-500 text-white rounded-md flex flex-col items-center p-4 mt-5 h-36">
                    <h3 class="text-4xl text-black w-fit bg-white rounded-full p-3">PP</h3>
                    <p class="text-3xl mt-2">1</p>
                </div>
                <div class="bg-primary-500 text-white rounded-md flex flex-col items-center p-4 h-36">
                    <h3 class="text-4xl text-black w-fit bg-white rounded-full p-3">PD</h3>
                    <p class="text-3xl mt-2">2</p>
                </div>
                
            </div>
            <div class="bg-primary-500 mt-10">
                <DataTable :value="products">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
</DataTable>
            </div>

        </div>
        
    </div>
</template>