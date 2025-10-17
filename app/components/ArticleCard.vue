<template>
    <NuxtLink :to="`${article.path}`" class="relative article-card rounded-lg border gap-4 lg:h-72 border-default shadow-lg  w-full overflow-clip flex flex-col p-4">
        <p class="font-bold md:text-base text-sm text-highlighted">{{ article?.title }}</p>
        <div class="flex-1 justify-end flex flex-col gap-2 ">
            <div class="flex w-full justify-between">
                <div class="flex flex-wrap gap-2 items-center">
                    <UBadge v-for="tag in article?.tags" :key="tag" color="primary" variant="soft">{{ tag }}</UBadge>
                </div>
                <p class="text-sm font-semibold flex-none opacity-75">{{ dayjs(article.date).format("DD MMM YYYY") }}</p>
            </div>
        </div>
        <NuxtImg preload class="z-[-1] transition-all duration-300 ease-out dark:opacity-40 opacity-70 object-cover h-full w-full left-[50%] top-[50%] absolute" :src="`${article.thumbnail}`" :alt="article.title" />
    </NuxtLink>
</template>

<script lang="ts" setup>
import type { ArticlesCollectionItem } from "@nuxt/content";
import dayjs from "dayjs";

const props = defineProps<{ article: ArticlesCollectionItem }>()
</script>

<style lang="css" scoped>
@reference "~/assets/css/main.css";
.article-card {
    img {
        transform: translate(-50%, -50%) scale(1);
        &:is(:where(.article-card):hover *) {
            transform: translate(-50%, -50%) scale(1.1);
        }
    }
}
</style>
