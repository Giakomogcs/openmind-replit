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

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProjectName.trim() && !isLoading) {
      setIsLoading(true);
      try {
        const newProject = await createProject(newProjectName);
        setActiveProject(newProject.id);
        navigate("/");
      } catch (error) {
        alert("Failed to create project. Please try again.");
      } finally {
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
      <div className="project-hub-header">
        <div className="project-hub-header-content">
          <h1>Project Hub</h1>
        </div>
      </div>
      <div className="project-hub-content">
        <div className="create-project">
          <h2>Create a new project</h2>
          <form
            onSubmit={handleCreateProject}
            className="create-project-form"
          >
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Enter project name"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </button>
          </form>
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
    </div>
  );
};

export default ProjectHub;
