import { fetchData } from './utils/Request.js'
import { useEffect, useState } from 'react'
import './App.css'
import { SERVER_IP } from './utils/variables.js'
import Image from './components/Image.jsx'
import ProjectCard from './components/ProjectCard.jsx'

function App() {
  const [projects, setProjects] = useState([])
  const [images, setImages] = useState([])

  useEffect(()=>{
    let url = `http://${SERVER_IP}:4002/home/projects`
    fetchData({url}).then(response =>{
      if(response.ok){
        response.json().then(data =>{
          setProjects(data)
        })
      }else{
        console.error("Error fetching projects:", response.statusText)
      }
    })
    const WindowsWith = window.innerWidth
    if(WindowsWith > 730){
      
      url = `http://${SERVER_IP}:4002/home/imagenLength`
    
      fetchData({url}).then(response =>{
        if(response.ok){
          response.json().then(data =>{
            const times = length => Array.from({ length }, (_,i)=>i)
            const length = data.length
            times(length).forEach(i =>{
              getImage(i+1).then(buffer => {
                const blod = new Blob([buffer], { type: 'image/jpeg' })
                const urlImage = URL.createObjectURL(blod)
                setImages(prevImages => [...prevImages, urlImage])
              })
            })
          })
        }
      })

    }
    

  },[])

  async function getImage (index) {
      const url = `http://${SERVER_IP}:4002/home/image/${index}`
      const result = await fetchData({url})
      const data = await result.arrayBuffer()
      return data
    }
  
  function handleDevices(e){
    e.preventDefault()
    window.open(`http://${SERVER_IP}:5000/devices`,'_blank')
  }
  function handleCalendar(e){
    e.preventDefault()
    window.open(`http://${SERVER_IP}:5000/calendar`,'_blank')
  }
  function handleRepo(e){
    e.preventDefault()
    window.open(`https://github.com/Masebav19/Programas-Base`,'_blank')
  }
  return (
    <>
      <header>
        <span className="headerspan" onClick={handleDevices}>Préstamos de equipos</span>
        <span className="headerspan" onClick={handleCalendar}>Calendario</span>
        <span className="headerspan" onClick={handleRepo}>Repositorio</span>
      </header>
      <main>
        <div id='ProjectsInfoContainer'>
          <h2>Trabajos de titulación</h2>
          {
            projects.map((project, index) => {
              return(
                <ProjectCard 
                  key={index}
                  project={project}
                />
              )
            })
          }
        </div>

        <div id='ImageGallery'>
          { images.length > 0 &&
            images.map((src, index) => {
              return(
                <Image 
                key={index}
                url={src}
                index={index}
                />   
              )
            })
          }
        </div>        
      </main>
      <footer>
        <div id='ContactContainer'>
          <div className='LineFooter'></div>
          <small>
            Contacto
          </small>
          <div className='LineFooter'></div>
        </div>
        <div id='ContactInfo'>
          <div>
            <h5>Coordinadora del Laboratorio de Instrumentación</h5>
            <small>
              Dra. Silvana Gamboa
            </small>
            <small>
              <a href="mailto:silvana.gamboa@epn.edu.ec">silvana.gamboa@epn.edu.ec</a>
            </small>
          </div>
          <div>
            <small>
              <strong>Ubicación:</strong> Edificio 17 Piso 7 Oficina E006
            </small>                  
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
