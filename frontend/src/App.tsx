import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Agents from './agents/pages/Agents';
import NewRealEstateItem from './realEstateItems/pages/NewRealEstateItem';
import RealEstateList from './realEstateItems/pages/RealEstateList';
import Home from './home/pages/Home';
import './App.css'
import Footer from './shared/Footer/Footer';
import Header from './shared/Header/Header';
import AgentDetails from './agents/components/AgentDetails';
import SignUp from './agents/pages/SignUp';
import Login from './agents/pages/Login';

const App = () => {
  return (
    <div className='flex justify-center min-h-screen bg-slate-800 text-white font-mono'>
      <BrowserRouter>
        <Header />
        <main className='mt-16 pb-32'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/agents" element={<Agents />}/>
            <Route path="/agents/:id" element={<AgentDetails />}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path='real-estate'>
              <Route index element={<RealEstateList />}/>
              <Route path='new' element={<NewRealEstateItem />}/>
            </Route>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
