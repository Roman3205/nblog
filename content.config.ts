import { defineContentConfig, defineCollection, z } from '@nuxt/content';
import {asSeoCollection} from '@nuxtjs/seo/content';

export default defineContentConfig({
    collections: {
        articles: defineCollection(asSeoCollection({
            type: 'page',
            source: 'articles/**/*.md',
            schema: z.object({
                    title: z.string(),
                    date: z.date(),
                    description: z.string(),
                    tags: z.optional(z.array(z.string())),
                    author: z.string(),
                    author_avatar: z.string(),
                    author_description: z.string(),
                    thumbnail: z.string(),
                    readingTime: z.string(),
                    rawbody: z.string()
            })
        }))
    }
})