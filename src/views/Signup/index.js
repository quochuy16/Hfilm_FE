import './Signup.css'
import { Button, Checkbox } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '../../components/Layout';
import { ToastContainer, toast } from "react-toastify";
import { register } from '../../services/userService';
import 'react-toastify/dist/ReactToastify.css';
function Signup(){
    let navigate = useNavigate();

    useEffect(() => {
        const _name = localStorage.getItem("Name");
        if (_name) {
          localStorage.clear();
        }
      }, []);

    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPass] = useState()
    const [confirmPassword,setRepass] = useState()
    const [check,setCheck] = useState(true)
    const hanldeCheck = () =>{
        setCheck(!check)
        console.log(check)
    }
    const hanldeSignUp = async (e) => {
        e.preventDefault();
    
        try {
          const values ={ name,email,password,confirmPassword }
          register(values)
          .then((res)=>{
            // localStorage.setItem("ID",res.data.user._id);
            // localStorage.setItem("Token", res.data.token);
            // localStorage.setItem("Name", res.data.user.name);
            //   navigate('/')
            if(res.status===201){
              console.log('Đăng ký thành công!')
              localStorage.setItem("ID",res.data.user._id);
              localStorage.setItem("Name",res.data.user.name);
              localStorage.setItem("Token", res.data.token);
              toast.success('Đăng ký thành công!')
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
          console.error('Register error:', err);
        }
    };
    return(
        <Layout>
        <div className="signup">
            <form className='form'  onSubmit={hanldeSignUp}>
                <center>
                <h1>Đăng Ký</h1>
                <h5>Đăng ký tài khoản mới để trở thành một phần của HFilm</h5>
                </center>
                <input type='text' placeholder='Nhập tên' onChange={e=>setName(e.target.value)} value={name}/>
                {name==='' && <div className='warning'>Nhập tên</div>}
                <input type='text' placeholder='Nhập email hoặc số điện thoại' onChange={e=>setEmail(e.target.value)}value={email}/>
                {email==='' && <div className='warning'>Nhập email hoặc số điện thoại</div>}
                <input type='password' placeholder='Nhập mật khẩu'  onChange={e=>setPass(e.target.value)} value={password}/>
                {password==='' && <div className='warning'>Nhập mật khẩu</div>}
                <input type='password' placeholder='Nhập lại mật khẩu'  onChange={e=>setRepass(e.target.value)} value={confirmPassword}/>
                {confirmPassword==='' && <div className='warning'>Nhập lại mật khẩu</div>}
                <div className='checkbox'>
                    <Checkbox id='checkbox' onClick={hanldeCheck}/>
                    <label htmlFor='checkbox'>Bạn đồng ý với các "Điều Khoản Sử Dụng" của HFilm</label>
                </div>
                <center>
                <Button disabled={check} type='submit' variant="contained" color="success">
                    Đăng Ký
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
export default Signup