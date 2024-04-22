import './App.css';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
    <div className='min-h-[85.7vh]'>
    <Navbar/>
    
    <Home/>
    </div>
    <Footer/>
    </>
);
}
export default App;