<template>
    <div class="w-full flex flex-col min-h-screen gap-4 mx-auto">
        <UHeader class="border-b-1 border-gray-200 dark:border-gray-50/20 w-full">
                <template #left>
                    <NuxtLink to="/" class="flex cursor-pointer transition duration-300 hover:opacity-85 gap-2 items-center">
                        <UIcon name="i-lucide-pen" />
                        <h1 class="text-2xl font-bold">NBlog</h1>
                    </NuxtLink>
                </template>
                <template #right>
                    <UColorModeSelect />
                </template>
        </UHeader>
        <main class="w-full mx-auto px-3 max-w-7xl">
            <slot></slot>
        </main>
    </div>
</template>

<script lang="ts" setup></script>

<style></style>
