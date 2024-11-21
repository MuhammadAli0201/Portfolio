import { Project } from "./project";
import { Technology } from "./technology";

export interface ProjectTechnology extends Technology {
    projectId: string,
    project?: Project
}