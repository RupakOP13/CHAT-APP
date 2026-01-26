const Login = () => { 
  return (
    <div className=" flex items-center justify-center">
      <div className="w-full  p-6 rounded-xl shadow-lg
                      bg-white/10 backdrop-blur-lg border border-white/20">
        <h1 className="text-3xl font-semibold text-center text-white">
          Login <span className="text-blue-500">ChatApp</span>
        </h1>

        <form>
         <div>
            <label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
                        <input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							
						/>
         </div>
         <div>
            <label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							
						/>
         </div>

         <a href="#" className="text-sm  hover:text-blue-500 hover:underline mt-2 inline-block">Forgot Password?</a>
         <div>
						<button className='btn btn-block btn-sm mt-2' >Login
						</button>
					</div>


        </form>
      </div>
    </div>
  );
};

export default Login;


// STARTER CODE FOR THIS FILE
// const Login = () => { 
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-md p-6 rounded-xl shadow-lg
//                       bg-white/10 backdrop-blur-lg border border-white/20">
//         <h1 className="text-3xl font-semibold text-center text-white">
//           Login <span className="text-blue-500">ChatApp</span>
//         </h1>

//         <form>
//          <div>
//             <label className='label p-2'>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
//                         <input
// 							type='text'
// 							placeholder='Enter username'
// 							className='w-full input input-bordered h-10'
							
// 						/>
//          </div>
//          <div>
//             <label className='label'>
// 							<span className='text-base label-text'>Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Enter Password'
// 							className='w-full input input-bordered h-10'
							
// 						/>
//          </div>

//          <a href="#" className="text-sm  hover:text-blue-500 hover:underline mt-2 inline-block">Forgot Password?</a>
//          <div>
// 						<button className='btn btn-block btn-sm mt-2' >Login
// 						</button>
// 					</div>


//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;