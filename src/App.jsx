import React, { useEffect, lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppContextProvider, AppContext } from './context/AppContext';

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ClientDashboard = lazy(() => import('./pages/ClientDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const CompliancePage = lazy(() => import('./pages/CompliancePage'));

// Premium Loading Indicator
const LoadingScreen = () => (
  <div className="min-h-screen bg-[#050505] flex items-center justify-center">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#FF5722] animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-[#00E5FF] animate-spin [animation-duration:1.5s] [animation-direction:reverse]"></div>
    </div>
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Protected Route Guard Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useContext(AppContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
};

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#050505] overflow-x-hidden">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/compliance" element={<CompliancePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <ClientDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
