import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";
function App() {
  const [projectsState, setProjectState]=useState({
   
    selectedProjectId : undefined,
    projects :[],
    tasks:[]
  });

  function handleAddTask(text){
    setProjectState(prevState=>{
      const taskId=Math.random();
      const newTask = {

       text:text,
       projectId: prevState.selectedProjectId,
        id:taskId,
        
      };
      return{
        ...prevState,
       
       tasks: [newTask,...prevState.tasks]
      }
    })

  }
  function handleDeleteTask(id){
    setProjectState(prevState =>{
      return {
        ...prevState,
      
        tasks: prevState.tasks.filter((task)=>task.id!==id),

      }
    })

  }

  function handleDeleteProject(){
    setProjectState(prevState =>{
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects: prevState.projects.filter((project)=>project.id!==prevState.selectedProjectId),

      }
    })
  }

  function handleSelectProject(id){
    setProjectState(prevState =>{
      return {
        ...prevState,
        selectedProjectId:id,

      }
    })
  }

  function handleStartAddProject(){
    setProjectState(prevState =>{
      return {
        ...prevState,
        selectedProjectId:null,

      }
    })
  }
  function handleCancelAddProject(){
    setProjectState(prevState =>{
      return {
        ...prevState,
        selectedProjectId:undefined,

      }
    })

  }
  function handleAddProject(projectData){
    setProjectState(prevState=>{
      const projectId=Math.random();
      const newProject = {

        ...projectData,
        id:projectId,
        
      };
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:[...prevState.projects,newProject]
      }
    })
  }

 const selectedProject = projectsState.projects.find( project => project.id === projectsState.selectedProjectId)
 
 

  let content=<SelectedProject project={selectedProject}onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onDelete={handleDeleteProject}
  tasks={projectsState.tasks}/>;;

  
  if(projectsState.selectedProjectId===null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }
  else if(projectsState.selectedProjectId===undefined)
  {
   
    content=<NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
 
  
  return (
    <main className="h-screen my-8 flex gap-8">
     <ProjectSideBar onStartAddProject={handleStartAddProject} projects={projectsState.projects} 
     onSelectProject={handleSelectProject}
    />
     {content}
    </main>
  );
}

export default App;
