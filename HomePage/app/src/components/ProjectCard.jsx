
import { useRef } from 'react'
import './ProjectCard.css'
export default function ProjectCard({ project }) {
    const ProjectCard = useRef(null);
    async function handleOver(e) {
        e.preventDefault();
        const NewClass = ProjectCard.current.className.replace('desativated','')
        ProjectCard.current.className = NewClass
    }
    async function handleLeave(e){
         e.preventDefault();
        ProjectCard.current.className = ProjectCard.current.className + ' desativated'
    }
    return(
        <div className="ProjectCard" onMouseOver={handleOver} onMouseLeave={handleLeave}>
            <section>
                <h3>{project.Nombre}{project.Apellido}</h3>       
            </section>
            <section>
                <small>{project.Título}</small>
            </section>
            <section>
                <small><strong>Director: </strong><a href={`mailto:${project.email_director}`}>{project.Director}</a></small>
                <br />
                <small>{project.Fecha_publicacion.split('T')[0]}</small>
            </section>
            <span className={`ProjectExtraInfo ${window.innerWidth > 800 ? 'desativated':'' }`} ref={ProjectCard}>
                <br />
                <small>
                    {project.Descripcion}
                </small>
                <small><a href={project.url} target='_blank'>{project.url}</a></small>
            </span>
        </div>
    )
}