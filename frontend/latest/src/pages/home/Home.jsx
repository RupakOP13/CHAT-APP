import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import MessageContainer from '../../components/Messages/MessageContainer.jsx';

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white/10 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'>
      <Sidebar/>
      <MessageContainer/>
     
    </div>
  );
};

export default Home;
