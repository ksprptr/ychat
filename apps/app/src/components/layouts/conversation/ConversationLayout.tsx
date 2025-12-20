import { useOnClickOutside } from '@/common/hooks/useOnClickOutside';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Modal from '@/components/common/Modal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useConversation } from '@/contexts/conversation/ConversationContext';

import SettingsModal from './parts/SettingsModal';
import { useRef, useState } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { Link, Outlet } from 'react-router-dom';

/**
 * Component representing a conversation layout
 */
export default function ConversationLayout() {
  const { conversations } = useConversation();
  const { user, deleteUser } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([sidebarRef], () => setSidebarOpen(false));

  if (!user) return null;

  return (
    <>
      {/* Settings modal */}
      <Modal visible={settingsModalVisible} onClose={() => setSettingsModalVisible(false)}>
        <SettingsModal
          hideSettingsModal={() => setSettingsModalVisible(false)}
          setConfirmModalVisible={setConfirmModalVisible}
        />
      </Modal>

      {/* Delete confirm modal */}
      <ConfirmModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={deleteUser}
        title='Are you sure?'
        description='This action will permanently delete your account and all associated data. This action cannot be undone.'
      />

      {/* Content */}
      <div className='relative h-screen overflow-hidden lg:flex'>
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className='fixed top-1/2 left-0 z-20 -translate-y-1/2 rounded-r-lg bg-zinc-50 p-2 shadow-md lg:hidden'>
          <Icon icon={sidebarOpen ? 'ArrowLeft' : 'ArrowRight'} className='h-6 w-6' />
        </button>

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 z-10 w-auto transform bg-zinc-50 transition-transform duration-300 sm:w-96 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} `}>
          <div className='relative flex h-full flex-col justify-between gap-4 p-8'>
            <div>
              {/* Title */}
              <Link
                to='/'
                onClick={() => setSidebarOpen(false)}
                className='flex items-start gap-x-12'>
                <img src='/assets/logos/ui/logo.svg' alt='YChat Logo' className='h-auto w-16' />

                <h1 className='mt-2 text-2xl text-lime-500 italic'>
                  <RoughNotation
                    type='box'
                    show
                    color='#84cc16'
                    animationDuration={800}
                    padding={10}
                    strokeWidth={4}>
                    YChat App
                  </RoughNotation>
                </h1>
              </Link>

              {/* Divider */}
              <hr className='my-8 opacity-10' />

              {/* Conversations */}
              <ul className='flex h-full flex-col gap-4 overflow-y-auto'>
                {conversations.map((conversation) => {
                  const otherUser =
                    conversation.userA.id === user.id ? conversation.userB : conversation.userA;

                  return (
                    <li key={conversation.id}>
                      <Link
                        to={`/conversations/${conversation.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className='flex items-center gap-4 rounded-lg p-2 duration-150 hover:bg-zinc-100'>
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
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* User account */}
            <div>
              {/* Divider */}
              <hr className='my-8 opacity-10' />

              <div className='flex items-center justify-between gap-4'>
                {/* Info */}
                <div className='flex items-center gap-4'>
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={`${user.username} Avatar`}
                      className='h-12 w-12 rounded-full object-cover'
                    />
                  ) : (
                    <div className='flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 p-2'>
                      <Icon icon='User' className='h-8 w-8 text-zinc-400' />
                    </div>
                  )}

                  <span className='font-medium'>{user.username}</span>
                </div>

                {/* Settings */}
                <Button
                  onClick={() => setSettingsModalVisible(true)}
                  fullRounded
                  ownPadding
                  className='p-2'>
                  <Icon icon='Cog' className='h-6 w-6' />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pages content */}
        <div className='min-h-screen flex-1 overflow-hidden bg-zinc-100 lg:min-h-auto'>
          <Outlet />
        </div>
      </div>
    </>
  );
}
