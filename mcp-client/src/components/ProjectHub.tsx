import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";

const ProjectHub = () => {
  const navigate = useNavigate();
  const { projects, loadProjects, createProject, setActiveProject } =
    useAppStore();
  const [newProjectName, setNewProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleCreateProject = async () => {
    if (newProjectName.trim() && !isLoading) {
      setIsLoading(true);
      try {
        const newProject = await createProject(newProjectName);
        setActiveProject(newProject.id);
        navigate("/");
      } catch (error) {
        alert("Failed to create project. Please try again.");
        setIsLoading(false);
      }
    }
  };

  const handleSelectProject = (projectId: number) => {
    setActiveProject(projectId);
    navigate("/");
  };

  return (
    <div className="project-hub">
      <h1>Project Hub</h1>
      <div className="create-project">
        <h2>Create a new project</h2>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Enter project name"
        />
        <button onClick={handleCreateProject} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </div>
      <div className="project-list">
        <h2>Select an existing project</h2>
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              onClick={() => handleSelectProject(project.id)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectHub;
