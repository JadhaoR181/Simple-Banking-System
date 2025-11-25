import { Routes, Route, Navigate } from "react-router-dom";
import CustomerLogin from "./pages/CustomerLogin";
import BankerLogin from "./pages/BankerLogin";
import CustomerTransactions from "./pages/CustomerTransactions";
import BankerAccounts from "./pages/BankerAccounts";
import BankerUserTransactions from "./pages/BankerUserTransactions";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import CustomerRegister from "./pages/CustomerRegister";


function App() {
  return (
    <Layout>
      <Routes>
        {/* Home → redirect to customer login for simplicity */}
        <Route path="/" element={<Navigate to="/customer/login" />} />

        {/* Logins */}
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/banker/login" element={<BankerLogin />} />

        {/* Customer protected route */}
        <Route
          path="/customer/transactions"
          element={
            <ProtectedRoute allowedRole="CUSTOMER">
              <CustomerTransactions />
            </ProtectedRoute>
          }
        />

        {/* Banker protected routes */}
        <Route
          path="/banker/accounts"
          element={
            <ProtectedRoute allowedRole="BANKER">
              <BankerAccounts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/banker/accounts/:userId"
          element={
            <ProtectedRoute allowedRole="BANKER">
              <BankerUserTransactions />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
