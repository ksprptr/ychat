import Icon from '@/components/common/Icon';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useConversation } from '@/contexts/conversation/ConversationContext';

import Form from './parts/Form';
import Message from './parts/Message';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Component representing a conversation page
 */
export default function ConversationPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { conversations, messages, getMessages } = useConversation();

  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find((c) => c.id === id);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (!conversation) return;
    getMessages(conversation.id);
  }, [conversation?.id, getMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!user || !conversation) return null;

  const otherUser = conversation.userA.id === user.id ? conversation.userB : conversation.userA;

  return (
    <div className='flex h-screen flex-col p-4'>
      {/* Conversation info */}
      <div className='flex items-center gap-4'>
        {otherUser.avatarUrl ? (
          <img
            src={otherUser.avatarUrl}
            alt={`${otherUser.username} Avatar`}
            className='h-12 w-12 rounded-full object-cover'
          />
        ) : (
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 p-2'>
            <Icon icon='User' className='h-8 w-8 text-zinc-400' />
          </div>
        )}

        <span className='font-medium'>{otherUser.username}</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className='my-4 min-h-0 flex-1 overflow-y-auto'>
        <div className='flex min-h-full w-full flex-col justify-end gap-y-2'>
          {messages[conversation.id]
            ?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map((message) => (
              <Message
                key={message.id}
                conversationId={conversation.id}
                message={message}
                targetUser={otherUser}
                signedUser={user}
              />
            ))}
        </div>
      </div>

      {/* User input */}
      {otherUser.isActive && <Form conversationId={conversation.id} targetUser={otherUser} />}
    </div>
  );
}
