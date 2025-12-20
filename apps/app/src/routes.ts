import { Route } from './common/types/route.types';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ConversationPage from './pages/conversations/ConversationPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Array of the application's routes
 */
const routes: Route[] = [
  {
    path: '/',
    component: HomePage,
    protected: true,
  },
  {
    path: '/conversations/:id',
    component: ConversationPage,
    protected: true,
  },
  {
    path: '/auth/login',
    component: LoginPage,
  },
  {
    path: '/auth/register',
    component: RegisterPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routes;
