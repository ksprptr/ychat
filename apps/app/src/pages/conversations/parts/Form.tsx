import { MessageFormData } from '@/common/types/message.types';
import { User } from '@/common/types/user.types';
import { messageSchema } from '@/common/validations/message.validations';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { useConversation } from '@/contexts/conversation/ConversationContext';

import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

// Props interface
interface Props {
  conversationId: string;
  targetUser: User;
}

/**
 * Component representing a message form
 */
export default function Form({ conversationId, targetUser }: Props) {
  const { createMessage } = useConversation();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Formik setup
  const formik = useFormik<MessageFormData>({
    initialValues: { content: '' },
    validationSchema: toFormikValidationSchema(messageSchema),
    onSubmit: (values) => {
      createMessage(conversationId, { content: values.content.trim() });

      formik.resetForm();

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }

      setTimeout(() => textareaRef.current?.focus(), 0);
    },
  });

  // Auto-resize textarea
  useEffect(() => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }, [formik.values.content]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='relative flex w-full items-center gap-x-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4'>
      {/* Input (textarea) */}
      <textarea
        ref={textareaRef}
        name='content'
        id='content'
        placeholder={`Message @${targetUser.username}`}
        className='w-full resize-none overflow-hidden placeholder:text-zinc-400 focus:outline-none'
        value={formik.values.content}
        onChange={formik.handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formik.handleSubmit();
          }
        }}
        disabled={formik.isSubmitting}
        rows={1}
        maxLength={1000}
      />

      {/* Errors display */}
      {formik.errors.content && formik.touched.content && formik.errors.content !== 'required' && (
        <div className='absolute -top-10 text-left text-xs text-red-500'>
          {formik.errors.content}.
        </div>
      )}

      {/* Submit button */}
      <Button
        type='submit'
        variant='transparent'
        ownPadding
        disabled={formik.isSubmitting || !formik.values.content.trim()}>
        <Icon icon='PaperAirplane' className='h-8 w-8' />
      </Button>
    </form>
  );
}
