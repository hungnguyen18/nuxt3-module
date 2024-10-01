<template>
    <div class="flex min-h-screen flex-col">
        <!-- Navigation -->
        <Menubar class="flex-wrap">
            <template #start>
                <NuxtLink to="/" class="mr-auto">
                    <img src="/logo.svg" alt="Logo" class="mr-2 h-8" />
                </NuxtLink>
            </template>
            <template #end>
                <div class="flex items-center gap-2">
                    <Button
                        icon="pi pi-bars"
                        class="h-10 w-10 md:hidden"
                        text
                        @click="toggleDrawer" />
                    <div class="hidden items-center gap-2 md:flex">
                        <NuxtLink
                            v-for="(route, index) of routes"
                            :key="index"
                            :to="route.path"
                            class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                            {{ route.name }}
                        </NuxtLink>
                        <SwitchDarkMode text class="h-10 w-10" />
                        <Button
                            icon="pi pi-language"
                            class="h-10 w-10"
                            text
                            @click="toggleMenu" />

                        <template v-if="isLogged">
                            <Avatar
                                :image="user?.avatar?.url"
                                shape="circle"
                                class="h-10 w-10 cursor-pointer"
                                @click="toggleAvatarMenu" />
                        </template>
                        <template v-else>
                            <Button
                                :label="$t('sign in')"
                                class="h-10"
                                @click="signIn" />
                        </template>
                    </div>
                </div>
            </template>
        </Menubar>

        <!-- Drawer for mobile menu -->
        <Drawer
            v-model:visible="drawerVisible"
            :modal="true"
            :show-close-icon="true"
            position="left">
            <div class="flex flex-col gap-4">
                <NuxtLink
                    v-for="(route, index) of routes"
                    :key="index"
                    :to="route.path"
                    class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    @click="closeDrawer">
                    {{ route.name }}
                </NuxtLink>
                <SwitchDarkMode text class="h-10 w-10" />
                <Button
                    icon="pi pi-language"
                    class="h-10 w-10"
                    text
                    @click="toggleMenu" />
                <template v-if="isLogged">
                    <Button
                        :label="user?.name || 'User'"
                        icon="pi pi-user"
                        class="p-button-text"
                        @click="toggleAvatarMenu" />
                </template>
                <template v-else>
                    <Button
                        :label="$t('sign in')"
                        class="h-10"
                        @click="signIn" />
                </template>
            </div>
        </Drawer>

        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />

        <Menu
            id="avatar_menu"
            ref="avatarMenu"
            :model="avatarMenuItems"
            :popup="true" />

        <!-- Main content -->
        <div
            class="mx-auto w-full max-w-7xl flex-grow px-4 py-6 sm:px-6 lg:px-8">
            <div class="py-6">
                <NuxtPage />
            </div>
        </div>

        <!-- Footer -->
        <footer class="dark:bg-surface-900 mt-auto bg-white shadow-md">
            <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <p class="text-center text-gray-500 dark:text-gray-400">
                    © {{ new Date().getFullYear() }} Your Company Name. All
                    rights reserved.
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
const { setLocale, t } = useI18n()
const router = useRouter()
const { getUserManager, isAuthenticated } = useOidc()
const { get } = useUserInfo()

const menu = ref()
const avatarMenu = ref()
const drawerVisible = ref(false)

const items = ref([
    {
        label: 'Language',
        icon: 'pi pi-fw pi-language',
        items: [
            {
                label: 'English',
                command: () => setLocale('en'),
            },
            {
                label: 'Tiếng Việt',
                command: () => setLocale('vi'),
            },
        ],
    },
])

const routes = computed(() => router.options.routes)

const isLogged = computedAsync(async () => await isAuthenticated(), false)

const user = computedAsync(
    async () => await get({ scope: ['name', 'avatar.url'] }),
    null,
)

const avatarMenuItems = computed(() => [
    {
        label: user.value?.name || 'User',
        disabled: true,
    },
    {
        separator: true,
    },
    {
        label: t('sign out'),
        icon: 'pi pi-sign-out',
        command: signOut,
    },
])

const signIn = async () => {
    await getUserManager.signinRedirect()
}

const signOut = async () => {
    await getUserManager.signoutRedirect()
}

const toggleMenu = (event: Event) => {
    menu.value.toggle(event)
}

const toggleAvatarMenu = (event: Event) => {
    avatarMenu.value.toggle(event)
}

const toggleDrawer = () => {
    drawerVisible.value = !drawerVisible.value
}

const closeDrawer = () => {
    drawerVisible.value = false
}
</script>

<style scoped>
@media (max-width: 768px) {
    .flex-wrap {
        flex-wrap: wrap;
    }
}
</style>
