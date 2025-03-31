import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';
import Footer from './shared/Footer/Footer';
import Header from './shared/Header/Header';

const Agents = React.lazy(() => import('./agents/pages/Agents'));
const NewRealEstateItem = React.lazy(() => import('./realEstateItems/pages/NewRealEstateItem'));
const RealEstateList = React.lazy(() => import('./realEstateItems/pages/RealEstateList'));
const Home = React.lazy(() => import('./home/pages/Home'));
const AgentDetails = React.lazy(() => import('./agents/components/AgentDetails'));
const SignUp = React.lazy(() => import('./agents/pages/SignUp'));
const Login = React.lazy(() => import('./agents/pages/Login'));

const App = () => {
  return (
    <div className='flex justify-center min-h-screen bg-slate-800 text-white font-mono'>
      <BrowserRouter>
        <Header />
        <main className='mt-16 pb-32'>
          <Suspense fallback={<div className="text-center mt-16">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/:id" element={<AgentDetails />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="real-estate">
                <Route index element={<RealEstateList />} />
                <Route path="new" element={<NewRealEstateItem />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;