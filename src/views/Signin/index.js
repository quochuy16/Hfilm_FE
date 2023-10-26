import './Signin.css'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import Layout from '../../components/Layout';
import { ToastContainer, toast } from "react-toastify";
import { login } from '../../services/userService';
import 'react-toastify/dist/ReactToastify.css';
function Signin(){
    let navigate = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem("Name");
        if (name) {
          localStorage.clear();
        }
      }, []);

    const [email,setEmail] = useState()    
    const [password,setPass] = useState()
    
    const hanldeSingIn = async (e) => {
        e.preventDefault();
        try {
          const values ={ email,password }
          // const response = await axios.post('https://hfilm-be.onrender.com/user/sign-in',values)
          //   console.log(response)
          //     localStorage.setItem("ID",response.data.user._id);
          //     localStorage.setItem("Name",response.data.user.name);
          //     localStorage.setItem("Token", response.data.token);
          //     navigate('/')
          login(values)
          .then((res)=>{
            console.log(res)
            if(res.status===200){
              console.log('Đăng nhập thành công!')
              localStorage.setItem("ID",res.data.user._id);
              localStorage.setItem("Name",res.data.user.name);
              localStorage.setItem("Token", res.data.token);
              toast.success('Đăng nhập thành công!')
              setTimeout(() => {
                navigate('/'); 
              },3000);
            }else{
              console.log('Lỗi đăng nhập')
              toast.error('Email hoặc mật khẩu không chính xác!')
            }
          })
          .catch((err)=>{
            console.log(err.message);
          })
          ;
        } catch (err) {
          console.error('Login error:', err);
        }
      };
    return(
      <Layout>
        <div className="signin">
          <form className='form' onSubmit={hanldeSingIn}>
            <center>
            <h1>Đăng Nhập</h1>
            <h5>Đăng nhập để sử dụng HFilm</h5>
            </center>
            <input type='text' placeholder='Nhập email hoặc số điện thoại' onChange={e=>setEmail(e.target.value) } value={email}/>
            {email==='' && <div className='warning'>Nhập email hoặc số điện thoại</div>}
            <a href='/forgotPassword' className='forgotPass' >Quên mật khẩu?</a>
            <input type='password' value={password} placeholder='Nhập mật khẩu'  onChange={e=>setPass(e.target.value)}  />
            {password==='' && <div className='warning'>Nhập mật khẩu</div>}
            <center>
            <Button type='submit' variant="contained">
                Đăng Nhập
            </Button>
            </center>
          </form>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
      </Layout>
    )
}
export default Signin