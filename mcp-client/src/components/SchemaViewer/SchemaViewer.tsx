import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const SchemaViewer = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const response = await fetch(`/api/projects/${projectId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch project data');
          }
          const data = await response.json();
          setProject(data);
        } catch (error) {
          console.error(error);
          setProject(null);
        }
      };

      fetchProject();
    }
  }, [projectId]);

  const renderSchema = (schema: any) => {
    if (!schema) {
      return null;
    }

    const treeData = Object.entries(schema).map(([key, value]) => {
      return {
        title: key,
        key: key,
        children: Object.entries(value as any).map(([childKey, childValue]) => {
          return {
            title: `${childKey}: ${JSON.stringify(childValue)}`,
            key: `${key}-${childKey}`,
          };
        }),
      };
    });

    return (
      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandAll
        treeData={treeData}
      />
    );
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <Tabs defaultActiveKey="0">
      {project.connections &&
        project.connections.map((connection: any, index: number) => (
          <TabPane tab={connection.nomeAmigavel} key={index.toString()}>
            {renderSchema(connection.draftSpecification)}
          </TabPane>
        ))}
    </Tabs>
  );
};

export default SchemaViewer;
