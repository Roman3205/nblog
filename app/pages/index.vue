<template>
    <div class="flex mx-auto p-5">
        <div class="flex flex-col gap-6 items-start w-full">
            <UFieldGroup class="w-full">
                <UInput type="text" placeholder="Search by title" class="w-full" v-model.trim="query"></UInput>
                <UButton icon="material-symbols:close-rounded"  color="neutral" variant="subtle" @click="query = ''"></UButton>
                <UContentSearchButton variant="subtle" />
            </UFieldGroup>
            <section class="grid w-full gap-5 lg:gap-3 grid-cols-1 lg:grid-cols-3">
                <ArticleCard v-for="article in filteredArticles" :key="article.id" :article="article" class="aspect-[2/1]"> </ArticleCard>
            </section>
        </div>
        <ClientOnly>
              <LazyUContentSearch
                v-model:search-term="searchTerm"
                shortcut="meta_k"
                :files="files"
                :navigation="navigation"
                :fuse="{ resultLimit: 42 }"
              />
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import Fuse from "fuse.js";

const { data: articles } = await useAsyncData("articles", () => queryCollection("articles").all());

const searchTerm = ref("")
const query = ref("");

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('articles'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('articles'), {
  server: false
})
const fuse = new Fuse(articles.value!, {
    keys: ["title"],
});

const filteredArticles = computed(() => {
    if (!(query.value)) return articles.value;
    const match = fuse.search(query.value);
    return match.map(article => article.item)
})

</script>

<style lang="css" scoped>

</style>