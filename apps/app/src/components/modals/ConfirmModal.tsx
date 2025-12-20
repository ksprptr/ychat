'use client';

import Button from '../common/Button';
import Modal from '../common/Modal';

// Props interface
interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  dangerText?: string;
  disabled?: boolean;
}

/**
 * Component representing a confirm modal
 */
export default function ConfirmModal({
  visible,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description = 'This action cannot be undone. Please be certain.',
  confirmText = 'Yes, delete',
  cancelText = 'No, cancel',
}: Props) {
  return (
    <Modal visible={visible} onClose={onClose} className='max-w-lg! sm:w-lg!'>
      {/* Title */}
      <h4 className='text-xl font-medium text-lime-500'>{title}</h4>

      {/* Divider */}
      <hr className='my-4 opacity-10' />

      {/* Text */}
      <p className='text-zinc-400'>{description}</p>

      {/* Buttons */}
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button variant='danger' onClick={onConfirm} fullWidth>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
