import z from 'zod';

export const messageSchema = z.object({
  content: z.string('required').min(1, 'Message cannot be empty').max(1000, 'Message is too long'),
});

export const messageReactionSchema = z.object({
  emoji: z.string().min(1, 'Emoji cannot be empty').max(10, 'Emoji is too long'),
});
