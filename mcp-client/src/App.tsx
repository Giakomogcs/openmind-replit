import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Home, Database, Folder, Menu, X, Share2 } from "lucide-react";
// @ts-ignore
import "./App.css";
import Canvas from "./components/Canvas";
import Connections from "./components/Connections";
import Collections from "./components/Collections";
import SchemaViewer from "./components/SchemaViewer/SchemaViewer";
import FooterChat from "./components/FooterChat";
import ProjectHub from "./components/ProjectHub";
import LoginPage from "./components/LoginPage";
import { useAppStore } from "./store";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { uiState, toggleSidebar, activeProjectId, setActiveProject } =
    useAppStore();

  useEffect(() => {
    const savedProjectId = localStorage.getItem("activeProjectId");
    if (savedProjectId) {
      setActiveProject(parseInt(savedProjectId, 10));
    } else if (location.pathname !== "/projects") {
      navigate("/projects");
    }
  }, [setActiveProject, navigate, location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  if (!activeProjectId && location.pathname !== "/projects") {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="app-container">
      {activeProjectId && (
        <aside
          className={`sidebar ${uiState.sidebarCollapsed ? "collapsed" : ""}`}
        >
          <div className="sidebar-header">
            <h1>MCP Platform</h1>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              {uiState.sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>
          <nav className="sidebar-nav">
            <Link
              to="/"
              className={`nav-item ${isActive("/") ? "active" : ""}`}
              title="Canvas"
            >
              <Home size={20} />
              {!uiState.sidebarCollapsed && <span>Canvas</span>}
            </Link>
            <Link
              to="/connections"
              className={`nav-item ${isActive("/connections") ? "active" : ""}`}
              title="Connections"
            >
              <Database size={20} />
              {!uiState.sidebarCollapsed && <span>Connections</span>}
            </Link>
            <Link
              to="/collections"
              className={`nav-item ${isActive("/collections") ? "active" : ""}`}
              title="Collections"
            >
              <Folder size={20} />
              {!uiState.sidebarCollapsed && <span>Collections</span>}
            </Link>
            <Link
              to={`/projects/${activeProjectId}/schema`}
              className={`nav-item ${isActive(`/projects/${activeProjectId}/schema`) ? "active" : ""}`}
              title="Schema Viewer"
            >
              <Share2 size={20} />
              {!uiState.sidebarCollapsed && <span>Schema Viewer</span>}
            </Link>
          </nav>
        </aside>
      )}

      <main className="main-content">
        <div className="content-area">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<ProjectHub />} />
            {activeProjectId && (
              <>
                <Route path="/" element={<Canvas />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/collections" element={<Collections />} />
                <Route
                  path="/projects/:projectId/schema"
                  element={<SchemaViewer />}
                />
              </>
            )}
          </Routes>
        </div>
      </main>

      {activeProjectId && <FooterChat />}
    </div>
  );
}

export default App;
