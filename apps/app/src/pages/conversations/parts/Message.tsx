import { REACTIONS } from '@/common/data/reactions.data';
import { Message as MessageType } from '@/common/types/message.types';
import { User } from '@/common/types/user.types';
import Icon from '@/components/common/Icon';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { useConversation } from '@/contexts/conversation/ConversationContext';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

// Props interface
interface Props {
  conversationId: string;
  message: MessageType;
  targetUser: User;
  signedUser: User;
}

/**
 * Component representing a message
 */
export default function Message({ conversationId, message, targetUser, signedUser }: Props) {
  const { toggleReaction, deleteMessage } = useConversation();

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  // Group reactions by emoji
  const reactionsMap = (message.reactions || []).reduce<Record<string, typeof message.reactions>>(
    (acc, reaction) => {
      acc[reaction.emoji] = acc[reaction.emoji] || [];
      acc[reaction.emoji].push(reaction);
      return acc;
    },
    {},
  );

  // Format creation date
  const creationDate = new Date(message.createdAt);
  const isToday = creationDate.getDate() === new Date().getDate();
  const formattedDate = `${
    !isToday ? creationDate.toLocaleDateString() + ' at ' : ''
  }${creationDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  return (
    <>
      {/* Delete confirm modal */}
      <ConfirmModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={() => deleteMessage(conversationId, message.id)}
        title='Are you sure?'
        description='This action will permanently delete the message. This action cannot be undone.'
      />

      <div className='group relative rounded-lg p-2 hover:bg-lime-500/5'>
        {/* Message row */}
        <div className='flex items-center justify-between gap-x-4'>
          <div className='flex items-center gap-x-4'>
            {/* Avatar */}
            {message.sender.avatarUrl ? (
              <img
                src={message.sender.avatarUrl}
                alt={`${message.sender.username} Avatar`}
                className='h-12 w-12 rounded-full object-cover'
              />
            ) : (
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 p-2'>
                <Icon icon='User' className='h-8 w-8 text-zinc-400' />
              </div>
            )}

            {/* Message info */}
            <div className='flex flex-col'>
              {/* Username and timestamp */}
              <div className='flex items-center gap-x-2'>
                <span className='font-medium'>{message.sender.username}</span>
                <span className='text-xs text-zinc-400'>
                  {formattedDate}
                  {message.updatedAt !== message.createdAt && ', edited'}
                </span>
              </div>

              {/* Message content */}
              <p>{message.content}</p>
            </div>
          </div>

          {/* Hover actions */}
          {targetUser.isActive && (
            <div className='absolute top-1/2 right-2 flex translate-x-2 -translate-y-1/2 items-center gap-1 rounded-full bg-zinc-50 p-1 opacity-0 shadow transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100'>
              {REACTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => toggleReaction(conversationId, message.id, { emoji })}
                  className='h-8 w-8 rounded-full hover:bg-zinc-100'>
                  {emoji}
                </button>
              ))}

              {message.sender.id === signedUser.id && (
                <>
                  <span className='mx-1 h-5 w-px bg-zinc-200' />
                  <button
                    onClick={(event) => {
                      if (event.shiftKey) {
                        deleteMessage(conversationId, message.id);
                      } else {
                        setConfirmModalVisible(true);
                      }
                    }}
                    className='flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-red-100 hover:text-red-600'>
                    <TrashIcon className='h-4 w-4' />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Reactions under message */}
        {Object.keys(reactionsMap).length > 0 && (
          <div className='mt-1 ml-16 flex flex-wrap gap-1'>
            {Object.entries(reactionsMap).map(([emoji, reactions]) => {
              const isMine = reactions.some((r) => r.user.id === signedUser.id);

              return (
                <button
                  key={emoji}
                  onClick={() => toggleReaction(conversationId, message.id, { emoji })}
                  disabled={!targetUser.isActive}
                  className={`flex items-center gap-1 rounded-lg border px-2 py-0.5 text-sm transition disabled:hover:cursor-not-allowed ${isMine ? 'border-lime-500/40 bg-lime-500/20' : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100'} `}>
                  <span>{emoji}</span>
                  <span className='text-xs text-zinc-600'>{reactions.length}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
