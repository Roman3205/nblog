<template>
    <article v-if="page" class="mx-auto flex flex-col mb-16 gap-6 md:gap-12 p-5">
        <header clas="flex flex-col">
            <UCard class="relative shadow-xl overflow-hidden min-h-[20rem] lg:min-h-[25rem] flex flex-col" variant="subtle" :ui="{ body: 'flex flex-col flex-1' }">
                <NuxtImg preload class="z-[0] absolute inset-0 object-cover opacity-50 w-full h-full" :src="page?.thumbnail" :alt="page?.title" />
                <div class="z-[1] flex-1 flex flex-col gap-2">
                    <h1 class="text-xl font-semibold">{{ page?.title }}</h1>
                    <p class="hidden md:block text-sm md:text-base">{{ page?.description }}</p>
                    <div class="flex-1 flex flex-wrap flex-row items-end justify-between gap-2">
                        <div class="gap-4 flex flex-col items-start">
                            <div class="flex flex-row gap-2 items-center flex-wrap">
                                <UBadge v-for="tag in page?.tags" :key="tag" color="primary" variant="soft">{{ tag }}</UBadge>
                            </div>
                        </div>
                        <div class="flex flex-row items-center gap-4">
                            <p class="flex items-center gap-1">
                                <UIcon name="material-symbols:calendar-today-rounded" class="text-primary"></UIcon> {{ dayjs(page?.date).format("DD MMM YYYY") }}
                            </p>
                            <p class="flex items-center gap-1"><icon name="material-symbols:alarm-rounded" class="text-primary"></icon> {{ page?.readingTime }}</p>
                        </div>
                    </div>
                </div>
            </UCard>
        </header>
        <div class="w-full flex flex-col-reverse lg:flex-row gap-6">
            <ContentRenderer id="content" :value="page" class="lg:w-3/4 lg:mr-2" />
            <UContentToc :links="page?.body?.toc?.links" :highlight="true" class="lg:w-1/4 px-0 sm:px-0 lg:px-2">
                <template #bottom>
                    <UFieldGroup class="hidden lg:block">
                        <UButton @click="scrollToTop()" class="w-1/2" block color="neutral" variant="subtle" icon="i-lucide-arrow-up">Scroll to top</UButton>
                        <UButton @click="shareArticle()" class="w-1/2" block color="neutral" variant="subtle" icon="i-lucide-share">Share</UButton>
                    </UFieldGroup>
                </template>
            </UContentToc>
        </div>
        <UFieldGroup class="block lg:hidden" size="lg">
            <UButton @click="scrollToTop()" color="neutral" class="w-1/2" block variant="subtle" icon="i-lucide-arrow-up">Scroll to top</UButton>
            <UButton @click="shareArticle()" color="neutral" class="w-1/2" block variant="subtle" icon="i-lucide-share">Share</UButton>
        </UFieldGroup>
        <UContentSurround :surround="(surround as any)" />
    </article>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('articles').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const {data: surround} = await useAsyncData(`surround-${route.path}`, () => queryCollectionItemSurroundings('articles', route.path, {fields: ['title', 'description']}))

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return navigateTo(route.path, {replace: true})
}

const shareArticle = async () => {
    if (navigator) {
        await navigator.share({title: page.value?.title, text: page.value?.description, url: route.path  }).catch((error) => console.log('Error sharing', error));
    }
}

</script>

<style lang="css">
@reference "~/assets/css/main.css";
</style>
