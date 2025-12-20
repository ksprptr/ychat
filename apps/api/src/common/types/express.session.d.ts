import 'express-session';

import { RequestUser } from './express.user.types';

declare module 'express' {
  interface Request {
    sessionID?: string;
    session?: Session & Partial<SessionData>;
    user?: RequestUser;
  }
}
