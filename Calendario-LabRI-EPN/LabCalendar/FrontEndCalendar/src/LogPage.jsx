import { useState } from 'react';
import bcrypt from 'bcryptjs'

function Login(){
    return(
        <>
            <fieldset>
                        <legend>Detalles de usuario</legend>
                        <div className="input-contaner">
                            <input type="email" name="User" required placeholder="example@epn.edu.ec" 
                                title="Colocar el correo institucional del usuario"/>
                            <label htmlFor="email">Correo del usuario</label>
                        </div>
                        <div className="input-contaner">
                            <input type="password" name="password" required placeholder="password" 
                                    title="Colocar la clave"/>
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="input-contaner">
                            <input list="ListType" required name="Type"/>
                            <datalist id= "ListType">
                                <option value="Docente">Docente</option>
                                <option value="Técnico">Docente de Laboratorio</option>
                                <option value="Estudiante-Docente">Estudiante del Docente</option>
                                <option value="Estudiante-Técnico">Estudiante de Laboratorio</option>
                            </datalist>
                            <label htmlFor="Type">Tipo de usuario</label>
                        </div>
                        
            </fieldset>
        </>
    )
}

function SignUp(){
    return(
        <>
            <fieldset>
                        <legend>Detalles del nuevo usuario</legend>
                        <div className="input-contaner">
                            <input type="text" name="Name" required placeholder="Nombre" 
                                title="Colocar el correo institucional del usuario"/>
                            <label htmlFor="Name">Nombre</label>
                        </div>
                        <div className="input-contaner">
                            <input type="text" name="LastName" required placeholder="Apellido" 
                                title="Colocar el correo institucional del usuario"/>
                            <label htmlFor="LastName">Apellido</label>
                        </div>
                        <div className="input-contaner">
                            <input type="email" name="User" required placeholder="example@epn.edu.ec" 
                                title="Colocar el correo institucional del usuario"/>
                            <label htmlFor="email">Correo del usuario</label>
                        </div>
                        <div className="input-contaner">
                            <input type="password" name="password" required placeholder="password" 
                                    title="Colocar la clave"/>
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="input-contaner">
                            <input list="ListType" required name="Type"/>
                            <datalist id= "ListType">
                                <option value="Docente">Docente</option>
                                <option value="Técnico">Docente de Laboratorio</option>
                                <option value="Estudiante-Docente">Estudiante del Docente</option>
                                <option value="Estudiante-Técnico">Estudiante de Laboratorio</option>
                            </datalist>
                            <label htmlFor="Type">Tipo de usuario</label>
                        </div>
                        <div className="input-contaner">
                            <input type="email" name="Responsable" required placeholder="Correo Responsable" 
                                title="Colocar el correo del responsable si es Técnico Docente o Docente debe colocar el mismo correo"/>
                            <label htmlFor="Responsable">Correo Responsable</label>
                        </div>
                        
            </fieldset>
        </>
    )
}

function LogPage({SetLogUser,SetLogStatus}){
    const [action,SetAction] = useState('Login')
    function handleLogin(e){
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        if(action === 'Login'){
            const {User,password,Type} = Object.fromEntries(formData.entries())
            const Password = bcrypt.hashSync(password,10)
            //console.log(Password)
            //const Password = password
            LoginRequest({User,Password,Type},'LogIn').then(user =>{
                if(user.error) {
                    alert(user.error[0].message)
                    SetLogStatus(false)
                }
                SetLogUser(user)
            })
        }else{
            const {Name,LastName,User,password,Type,Responsable} = Object.fromEntries(formData.entries())
            //const Password = bcrypt.hashSync(password,10)
            const Password = password
            LoginRequest({Name,LastName,User,Password,Type,Responsable},'SingUp').then(user =>{
                if(user.error) {
                    alert(user.error[0].message)
                    SetLogStatus(false)
                }
                alert(`Usuario: ${user.correo} Creado correctamente ingrese de nuevo!!`)
                SetLogStatus(false)
            })
        }
        
        
    }

    async function LoginRequest(object,action){
        const result = await fetch(`http://172.31.33.28:4001/time/${action}`,{
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({...object})
        })
        const User = await result.json()
        return User
    }

    function handleReturn(){
        SetLogStatus(false)
    }
    function handleChangeAction(){
        SetAction('Signup')
    }
    return(
        <>
            <div className="Major-container">
                <header>
                    <nav onClick={handleReturn}>
                        <img src="../public/close.svg" alt="Close" />
                    </nav>
                    <h3>
                        Ingrese credenciales
                    </h3>
                    
                </header>

                <div className="form-container">
                    <form onSubmit={handleLogin}>
                        {action === 'Login'&& <Login/>}
                        {action == 'Signup'&& <SignUp/>}
                        <fieldset>
                            <legend>Ingresar o Crear</legend>
                            <div className="button-container">
                            <button type="submit">
                                <img src={action === 'Login'? '../public/login.svg':'../public/create.svg'} alt="login" />
                                <small>
                                    {action === 'Login'? 'Login':'Create'}
                                </small>
                            </button>
                            <button  type="button" onClick={handleChangeAction}
                            hidden={!(action === 'Login')}>
                                <img src="../public/signup.svg" alt="SignUp" />
                                <small>
                                    SignUp
                                </small>
                            </button> 
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LogPage