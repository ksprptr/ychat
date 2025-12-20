import { AuthProvider } from '@/contexts/auth/AuthProvider';
import { ConversationProvider } from '@/contexts/conversation/ConversationProvider';

import { styled } from '@mui/material';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';
import { PropsWithChildren } from 'react';

/**
 * Component representing an app provider
 */
export default function AppProvider({ children }: PropsWithChildren) {
  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: '#22c55e',
      border: '1px solid #22c55e',
      color: '#fafafa',
      borderRadius: '8px',
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: '#fb2c36',
      border: '1px solid #fb2c36',
      color: '#fafafa',
      borderRadius: '8px',
    },
    '&.notistack-MuiContent-info': {
      backgroundColor: '#0ea5e9',
      border: '1px solid #0ea5e9',
      color: '#fafafa',
      borderRadius: '8px',
    },
  }));

  return (
    <SnackbarProvider
      maxSnack={5}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
      }}>
      <AuthProvider>
        <ConversationProvider>
          <div id='modal-root' />

          {children}
        </ConversationProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}
