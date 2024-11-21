import { AppUser } from "./app-user"
import { Image } from "./image"
import { ProjectTechnology } from "./project-technology"

export interface Project {
    id:string,
    title: string,
    description: string,
    technologies: ProjectTechnology[],
    images: Image[],
    link?: string,
    userId : string,
    user?: AppUser
}