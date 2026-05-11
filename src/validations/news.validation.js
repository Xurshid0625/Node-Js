import {z} from 'zod'


export const createNewsSchema = z.object({
    title: z.string().min(3), text: z.string().min(5)
});

export const updateNewsSchema = z.object({
    title: z.string().min(3).optional(), text: z.string().min(5).optional()
})