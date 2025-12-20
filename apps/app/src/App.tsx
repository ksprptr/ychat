import AppProvider from './components/layouts/AppProvider';
import ConversationLayout from './components/layouts/conversation/ConversationLayout';
import ProtectedRoute from './components/layouts/ProtectedRoute';
import routes from './routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/**
 * Component representing the main application
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<ConversationLayout />}>
              {routes
                .filter((route) => route.protected)
                .map((route) => (
                  <Route key={route.path} path={route.path} Component={route.component} />
                ))}
            </Route>
          </Route>

          {routes
            .filter((route) => !route.protected)
            .map((route) => (
              <Route key={route.path} path={route.path} Component={route.component} />
            ))}
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
