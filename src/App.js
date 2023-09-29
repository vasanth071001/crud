
import './App.css';
import Nav from './Nav';
import Home from './Home';
import Post from './Post';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import About from './About';


function App() {
// const [data,setdata] = useState([

// ]
// )

const handledatasubmit=(formdata)=>{

  // setdata([...data,formdata])
  const existingdata = JSON.parse(localStorage.getItem('formdata')) || []
  
  const updateddata=[...existingdata,formdata]
  localStorage.setItem('formdata',JSON.stringify(updateddata))
  console.log(updateddata)
}
  return (
    <div className="App">
      <Nav />
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/About">About</Link></li>
        </ul>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home 
        handledatasubmit={handledatasubmit}
        />}></Route>
        <Route path='/post' element={<Post 
        
        />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      {/* <Nav />
     <Home />
     <Post />
     <Footer /> */}
     <Footer />

    </div>
  );
}

export default App;
