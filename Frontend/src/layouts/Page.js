import React,{ Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
const PrivateRoute = lazy(()=>import("../auth/PrivateRoute") );
const ErrorPage = lazy(()=>import("../pages/ErrorPage")) ;
const AdminPage = lazy(()=>import("../pages/AdminPage")) ;
const AddPage = lazy(()=>import("../pages/AddPage")) ;
const EditPage = lazy(()=>import("../pages/EditPage")) ;
const Register = lazy(() => import("../auth/Register"));
const Login = lazy(()=>import("../auth/Login")) ;


const Page = () => {
  return (
    <>
    <Suspense fallback={<div>Wczytywanie...</div>}>
      <Switch>
        <PrivateRoute path="/" role={["admin","user"]} exact>
        <AdminPage />
        </PrivateRoute>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute role={["admin","user"]} path="/add">
          <AddPage />
        </PrivateRoute>
        <PrivateRoute role={["user","admin"]} path="/edit/:id">
          <EditPage/>
        </PrivateRoute>      
        <Route component={ErrorPage} />        
      </Switch>
      </Suspense>
    </>
  );
};

export default Page;
