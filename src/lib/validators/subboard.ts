import { z } from 'zod'

export const SubboardValidator = z.object({
  name: z.string().min(3).max(21),
})

export const SubboardSubscriptionValidator = z.object({
  subboardId: z.string(),
})

export type CreateSubboardPayload = z.infer<typeof SubboardValidator>
export type SubscribeToSubboardPayload = z.infer<
  typeof SubboardSubscriptionValidator
>
