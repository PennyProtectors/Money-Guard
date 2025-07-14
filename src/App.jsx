import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense, useEffect } from "react";
import { refreshUser } from "./redux/auth/operations";
// import Currency from "./components/Currency/Currency";

const PrivateRoute = lazy(() =>
  import("./components/PrivateRoute/PrivateRoute")
);
const RestrictedRoute = lazy(() =>
  import("./components/RestrictedRoute/RestrictedRoute")
);
const DashboadPage = lazy(() => import("./pages/DashboadPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const StatisticsTab = lazy(() => import("./pages/StatisticsTab"));

function App() {
  const loading = useSelector((state) => state?.transactions?.loading);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch]);

  if (isRefreshing) return <Loader />;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {loading && <Loader />}
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute redirectTo="/login">
                <DashboadPage />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/">
                <LoginPage />
              </RestrictedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/">
                <RegistrationPage />
              </RestrictedRoute>
            }
          />
          <Route path="/statics" element={<StatisticsTab />} />
          <Route path="/currency" element={<DashboadPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "./components/Loader/Loader";
// import { Toaster } from "react-hot-toast";
// import { lazy, Suspense, useEffect } from "react";
// import { refreshUser } from "./redux/auth/operations";

// const PrivateRoute = lazy(() =>
//   import("./components/PrivateRoute/PrivateRoute")
// );
// const RestrictedRoute = lazy(() =>
//   import("./components/RestrictedRoute/RestrictedRoute")
// );
// const DashboadPage = lazy(() => import("./pages/DashboadPage"));
// const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
// const LoginPage = lazy(() => import("./pages/LoginPage"));
// const StatisticsTab = lazy(() => import("./pages/StatisticsTab"));
// const MainLayout = lazy(() => import("./components/MainLayOut/MainLayout"));

// function App() {
//   const loading = useSelector((state) => state?.transactions?.loading);
//   const isRefreshing = useSelector((state) => state.auth.isRefreshing);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       dispatch(refreshUser());
//     }
//   }, [dispatch]);

//   if (isRefreshing) return <Loader />;

//   return (
//     <>
//       <Toaster position="top-right" reverseOrder={false} />
//       {loading && <Loader />}
//       <Suspense fallback={<Loader />}>
//         <Routes>
//           {/* Ortak layout: sidebar hep görünsün */}
//           <Route path="/" element={<MainLayout />}>
//             <Route
//               index
//               element={
//                 <PrivateRoute redirectTo="/login">
//                   <DashboadPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="statics"
//               element={
//                 <PrivateRoute redirectTo="/login">
//                   <StatisticsTab />
//                 </PrivateRoute>
//               }
//             />
//             {/* İstersen diğer private sayfalar burada */}
//           </Route>

//           {/* Public routes */}
//           <Route
//             path="/login"
//             element={
//               <RestrictedRoute redirectTo="/">
//                 <LoginPage />
//               </RestrictedRoute>
//             }
//           />
//           <Route
//             path="/register"
//             element={
//               <RestrictedRoute redirectTo="/">
//                 <RegistrationPage />
//               </RestrictedRoute>
//             }
//           />
//         </Routes>
//       </Suspense>
//     </>
//   );
// }

// export default App;
