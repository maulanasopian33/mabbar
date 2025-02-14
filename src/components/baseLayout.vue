<template>
    <div class="flex w-full bg-slate-200">
        <aside class="md:hidden block">
            <Drawer v-model:visible="visible">
                <template #container="{ closeCallback }">
                    <div class="flex flex-col h-full">
                        <div class="flex items-center justify-between px-6 pt-4 shrink-0">
                            <span class="inline-flex items-center gap-2">
                                <img src="/assets/logomabbar.svg" class="w-[50px]"/>
                                <span class="font-bold text-2xl text-primary">Mabbar</span>
                            </span>
                            <span>
                                <Button type="button" @click="closeCallback" icon="pi pi-times" rounded
                                    outlined></Button>
                            </span>
                        </div>
                        <div class="overflow-y-auto">
                            <ul class="list-none p-4 m-0">
                                <li>
                                    <router-link :class="($route.path.includes('guru/dashboard')) ? 'bg-primary-500 text-white hover:text-white hover:bg-primary-500/50' : 'bg-white text-black hover:text-white hover:bg-primary-500'" to="/guru/dashboard" v-ripple
                                        class="flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple">
                                        <i class="pi pi-home mr-2"></i>
                                        <span class="font-medium">Dashboard</span>
                                    </router-link>
                                </li>
                                <li>
                                    <div v-ripple v-styleclass="{
                                        selector: '@next',
                                        enterFromClass: 'hidden',
                                        enterActiveClass: 'animate-slidedown',
                                        leaveToClass: 'hidden',
                                        leaveActiveClass: 'animate-slideup'
                                    }"
                                        class="p-4 flex items-center justify-between text-black dark:text-black cursor-pointer p-ripple">
                                        <span class="font-medium">MATERI</span>
                                        <i class="pi pi-chevron-down"></i>
                                    </div>
                                    <ul class="list-none p-0 m-0 overflow-hidden">
                                        <li>
                                            <router-link :class="($route.path.includes('materi/al-qiraah')) ? 'bg-primary-500 text-white hover:text-white hover:bg-primary-500/50' : 'bg-white text-black hover:text-white hover:bg-primary-500'" to="/guru/materi/al-qiraah" v-ripple
                                                class="flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple">
                                                <i class="pi pi-book mr-2"></i>
                                                <span class="font-medium">Maharat Al Qira'ah</span>
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link :class="($route.path.includes('materi/al-kitabah')) ? 'bg-primary-500 text-white hover:text-white hover:bg-primary-500/50' : 'bg-white text-black hover:text-white hover:bg-primary-500'" to="/guru/materi/al-kitabah" v-ripple
                                                class="flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple">
                                                <i class="pi pi-book mr-2"></i>
                                                <span class="font-medium">Maharat Al-Kitabah</span>
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link :class="($route.path.includes('materi/al-istima')) ? 'bg-primary-500 text-white hover:text-white hover:bg-primary-500/50' : 'bg-white text-black hover:text-white hover:bg-primary-500'" to="/guru/materi/al-istima" v-ripple
                                                class="flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple">
                                                <i class="pi pi-book mr-2"></i>
                                                <span class="font-medium">Maharat Al-Istima'</span>
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link :class="($route.path.includes('materi/al-kalam')) ? 'bg-primary-500 text-white hover:text-white hover:bg-primary-500/50' : 'bg-white text-black hover:text-white hover:bg-primary-500'" to="/guru/materi/al-kalam" v-ripple
                                                class="flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple">
                                                <i class="pi pi-book mr-2"></i>
                                                <span class="font-medium">Maharat Al-Kalam</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <router-link :class="($route.path.includes('/guru/latihan')) ? 'bg-primary-500 text-white hover:text-white hover:bg-primary-500/50' : 'bg-white text-black hover:text-white hover:bg-primary-500'" to="/guru/latihan" v-ripple
                                        class="flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple">
                                        <i class="pi pi-user mr-2"></i>
                                        <span class="font-medium">Latihan</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :class="($route.path.includes('/guru/siswa')) ? 'bg-primary-500 text-white hover:text-white hover:bg-primary-500/50' : 'bg-white text-black hover:text-white hover:bg-primary-500'" to="/guru/siswa" v-ripple
                                        class="flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple">
                                        <i class="pi pi-user mr-2"></i>
                                        <span class="font-medium">Siswa</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :class="($route.path.includes('/guru/setoran')) ? 'bg-primary-500 text-white hover:text-white hover:bg-primary-500/50' : 'bg-white text-black hover:text-white hover:bg-primary-500'" to="/guru/setoran" v-ripple
                                        class="flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple">
                                        <i class="pi pi-list-check mr-2"></i>
                                        <span class="font-medium">setoran</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-auto">
                            <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
                            <a  v-ripple
                                class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-black hover:bg-primary-500 dark:text-black  duration-150 transition-colors p-ripple">
                                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                                    shape="circle" />
                                <span class="font-bold">Amy Elsner</span>
                            </a>
                        </div>
                    </div>
                </template>
            </Drawer>
        </aside>
        <div class="overflow-y-auto my-5 rounded-md bg-primary w-[400px] py-10 h-full hidden md:block">
            <div class="flex items-center justify-between px-6 pt-4 shrink-0">
                <span class="inline-flex items-center gap-2">
                    <img src="/assets/logomabbar.svg" class="w-[70px] hover:contrast-100 hover:brightness-100 hover:grayscale-0 contrast-200 brightness-200 grayscale" />
                    <span class="font-bold text-2xl text-white">Mabbar</span>
                </span>
            </div>
            <ul class="list-none p-4 m-0 text-white">
                <li>
                    <router-link to="/guru/dashboard" v-ripple
                        class="flex items-center cursor-pointer p-4 rounded hover:text-black text-white hover:bg-primary-100 dark:text-white  duration-150 transition-colors p-ripple">
                        <i class="pi pi-home mr-2"></i>
                        <span class="font-medium">Dashboard</span>
                    </router-link>
                </li>
                <li>
                    <div v-ripple v-styleclass="{
                                        selector: '@next',
                                        enterFromClass: 'hidden',
                                        enterActiveClass: 'animate-slidedown',
                                        leaveToClass: 'hidden',
                                        leaveActiveClass: 'animate-slideup'
                                    }"
                        class="p-4 flex items-center justify-between text-white dark:text-white cursor-pointer p-ripple">
                        <span class="font-medium">MATERI</span>
                        <i class="pi pi-chevron-down"></i>
                    </div>
                    <ul class="list-none p-0 m-0 overflow-hidden">
                        <li>
                            <router-link to="/guru/materi/al-qiraah" v-ripple
                                class="flex items-center cursor-pointer p-4 rounded hover:text-black text-white hover:bg-primary-100 dark:text-white  duration-150 transition-colors p-ripple">
                                <i class="pi pi-book mr-2"></i>
                                <span class="font-medium">Maharat Al Qira'ah</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/guru/materi/al-kitabah" v-ripple
                                class="flex items-center cursor-pointer p-4 rounded hover:text-black text-white hover:bg-primary-100 dark:text-white  duration-150 transition-colors p-ripple">
                                <i class="pi pi-book mr-2"></i>
                                <span class="font-medium">Maharat Al-Kitabah</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/guru/materi/al-istima" v-ripple
                                class="flex items-center cursor-pointer p-4 rounded hover:text-black text-white hover:bg-primary-100 dark:text-white  duration-150 transition-colors p-ripple">
                                <i class="pi pi-book mr-2"></i>
                                <span class="font-medium">Maharat Al-Istima'</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/guru/materi/al-kalam" v-ripple
                                class="flex items-center cursor-pointer p-4 rounded hover:text-black text-white hover:bg-primary-100 dark:text-white  duration-150 transition-colors p-ripple">
                                <i class="pi pi-book mr-2"></i>
                                <span class="font-medium">Maharat Al-Kalam</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link to="/guru/latihan" v-ripple
                        class="flex items-center cursor-pointer p-4 rounded hover:text-black text-white hover:bg-primary-100 dark:text-white  duration-150 transition-colors p-ripple">
                        <i class="pi pi-user mr-2"></i>
                        <span class="font-medium">Latihan</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/guru/siswa" v-ripple
                        class="flex items-center cursor-pointer p-4 rounded hover:text-black text-white hover:bg-primary-100 dark:text-white  duration-150 transition-colors p-ripple">
                        <i class="pi pi-user mr-2"></i>
                        <span class="font-medium">Siswa</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/guru/setoran" v-ripple
                        class="flex items-center cursor-pointer p-4 rounded hover:text-black text-white hover:bg-primary-100 dark:text-white  duration-150 transition-colors p-ripple">
                        <i class="pi pi-list-check mr-2"></i>
                        <span class="font-medium">Setoran</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="w-full">
            <div class="bg-white flex justify-between md:justify-end px-5 py-3">
                <Button class="md:hidden" icon="pi pi-bars" size="Large" variant="link" @click="visible = true" />
                <div>
                    <Avatar label="U" class="mr-2" size="large" shape="circle" />
                    <Button icon="pi pi-sign-out" size="Large" variant="link" />
                </div>
            </div>
            <div class="bg-slate-200 min-h-screen p-5">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "baseLayout",
    data() {
        return {
            visible: false
        }
    },
}
</script>