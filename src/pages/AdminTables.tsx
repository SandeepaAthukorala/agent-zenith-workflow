
import React from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomersTable from '@/components/CustomersTable';
import AgentsTable from '@/components/AgentsTable';
import RoutesTable from '@/components/RoutesTable';
import PoliciesTable from '@/components/PoliciesTable';
import ClaimsTable from '@/components/ClaimsTable';

const AdminTables: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-insurance-blue-900 dark:text-white">
            Data Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage customers, agents, routes, policies, and claims across your organization
          </p>
        </div>

        <Tabs defaultValue="customers" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customers" className="space-y-4">
            <CustomersTable />
          </TabsContent>
          
          <TabsContent value="agents" className="space-y-4">
            <AgentsTable />
          </TabsContent>
          
          <TabsContent value="routes" className="space-y-4">
            <RoutesTable />
          </TabsContent>
          
          <TabsContent value="policies" className="space-y-4">
            <PoliciesTable />
          </TabsContent>
          
          <TabsContent value="claims" className="space-y-4">
            <ClaimsTable />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminTables;
