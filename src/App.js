

import {Routes,Route} from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Hero from './Hero';
import AdminLogin from './admin/adminLogin';
import CreateArticle from './admin/CreateArticle';
import SignIn from './SignIn';
import { ToastContainer } from 'react-toastify';
import PopUp from './PopUp';
import FullArticle from './FullArticle';
import EditArticle from './admin/EditArticle';
import UpdateImage from './UpdateImage';
import SearchResults from './SearchResults';
import Politics from './Politics';
import Sports from './Sports';
import Entertainment from './Entertainment';
import Business from './Business';
import WorldNews from './WorldNews';
import PageNotFound from './PageNotFound';
function App() {

  return (
    <div className='relative'>
      <ToastContainer/>
    
      <Routes>
        <Route path='/' element={
          <>
          <Header/>
          <Hero/>
          <Home/>
          <Footer/>
          </>


        }/>

        <Route path='/adminLogin' element={
          <>
          <Header/>
          <AdminLogin/>
          <Footer/>
          </>
        }/>
        <Route path="*" element={
            <>

              <PageNotFound />
              <Footer />

            </>} />

         <Route path='/article/:id' element={
          <div>
          <Header/>
          <FullArticle/>
          <Footer/>
          </div>
        }/>

        <Route path='/createArticle' element={
          <>
          <Header/>
          <CreateArticle/>
          <Footer/>
          </>
        }/>
   <Route path='/EditArticle/:id' element={
          <>
          <Header/>
          <EditArticle/>
          <Footer/>
          </>
        }/>
         <Route path='/signIn' element={
          <>
          <Header/>
          <SignIn/>
          <Footer/>
          </>
        }/>

<Route path='/politics' element={
          <>
          <Header/>
          <Politics/>
          <Footer/>
          </>
        }/>
<Route path='/sports' element={
          <>
          <Header/>
          <Sports/>
          <Footer/>
          </>
        }/>
<Route path='/entertainment' element={
          <>
          <Header/>
          <Entertainment/>
          <Footer/>
          </>
        }/>
 <Route path='/business' element={
          <>
          <Header/>
          <Business />
          <Footer/>
          </>
        }/>
   <Route path='/world-news' element={
          <>
          <Header/>
         <WorldNews/>
         <Footer/>
          </>
        }/>
                         

        <Route path='/delete/:id' element={<PopUp/>}/>
        <Route path='/update-image/:id' element={<UpdateImage/>}/>

        <Route path='/search-results' element={
          <>
          <Header/>
          <SearchResults />
          <Footer/>
          </>
        }/>
      </Routes>
      

      
 

    </div>
  )
}

export default App;
