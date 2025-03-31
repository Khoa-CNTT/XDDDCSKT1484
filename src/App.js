import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from '~/routes';
import routesConfig from '~/config/routes'
import { ChatContext } from './context/ChatContext';
import ChatPopup from '~/components/ChatPopup';
import { UserContext } from '~/context/UserContext'

const isAuthenticated = () => !!localStorage.getItem('authToken');

const PrivateRoute = ({ children, requiredRole }) => {
    const { user } = useContext(UserContext);

    if (!isAuthenticated()) {
        return <Navigate to={routesConfig.login} />;
    }

    if (!user || !user.roles) {
        return <Navigate to={routesConfig.home} />;
    }

    const userRole = user.roles.substring(1, user.roles.length - 1);

    if (userRole === 'ADMIN' || userRole === requiredRole) {
        return children;
    }

    return <Navigate to={routesConfig.home} />;
};

const renderRoutes = (routes, requiredRole = null) => {
    return routes.map(({ path, component: Page, layout: Layout }, index) => (
        <Route
            key={index}
            path={path}
            element={
                requiredRole ? (
                    <PrivateRoute requiredRole={requiredRole}>
                        <Layout>
                            <Page />
                        </Layout>
                    </PrivateRoute>
                ) : (
                    <Layout>
                        <Page />
                    </Layout>
                )
            }
        />
    ));
};

function App() {
    const { isOpenChat } = useContext(ChatContext);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    {renderRoutes(publicRoutes)}

                    {/* Private Routes (User) */}
                    {renderRoutes(privateRoutes, 'USER')}

                    {/* Admin Routes */}
                    {renderRoutes(adminRoutes, 'ADMIN')}
                </Routes>
                {isOpenChat && <ChatPopup />}
            </div>
        </Router>
    );
}

export default App;
