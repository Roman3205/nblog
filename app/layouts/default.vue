<template>
    <div class="w-full flex flex-col min-h-screen gap-4 mx-auto">
        <header class="border-b-1 border-gray-200 dark:border-gray-50/20 w-full">
            <div class="flex justify-between mx-auto w-full p-4 max-w-7xl">
                <NuxtLink to="/" class="flex cursor-pointer transition duration-300 hover:opacity-85 gap-2 items-center">
                    <UIcon name="i-lucide-pen" />
                    <h1 class="text-2xl font-bold">NBlog</h1>
                </NuxtLink>
                <UColorModeSelect />
            </div>
        </header>
        <main class="w-full mx-auto p-4 max-w-7xl">
            <slot></slot>
        </main>
    </div>
</template>

<script lang="ts" setup></script>

<style></style>
