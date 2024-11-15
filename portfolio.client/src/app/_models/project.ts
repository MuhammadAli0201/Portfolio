import { Image } from "./image"
export interface Project {
    title: string,
    description: string,
    technologies: string[],
    images: Image[]
}