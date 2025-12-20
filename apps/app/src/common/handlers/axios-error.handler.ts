import { getAxiosErrorMessage } from '@/configs/app.config';

import { AxiosError } from 'axios';
import { EnqueueSnackbar } from 'notistack';
import { NavigateFunction } from 'react-router-dom';

type StatusHandlerMap = Partial<Record<number, () => void>>;

interface HandleAxiosErrorParams {
  error: unknown;
  enqueueSnackbar: EnqueueSnackbar;
  navigate?: NavigateFunction;
  statusHandlers?: StatusHandlerMap;
  context?: string;
}

/**
 * Function representing a handler for Axios errors
 */
export function handleAxiosError({
  error,
  enqueueSnackbar,
  statusHandlers = {},
  context = 'request',
}: HandleAxiosErrorParams) {
  if (!(error instanceof AxiosError)) {
    console.error(`[Error (not AxiosError)] Error occurred during ${context}:`, error);
    enqueueSnackbar(getAxiosErrorMessage('other'), { variant: 'error' });
    return;
  }

  const status = error.response?.status;

  if (status && statusHandlers[status]) {
    statusHandlers[status]!();
    return;
  }

  console.error(`[Error] Error occurred during ${context}:`, error);
  enqueueSnackbar(getAxiosErrorMessage('other'), { variant: 'error' });
}
