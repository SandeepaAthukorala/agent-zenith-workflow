
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Edit, UserX, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Agent {
  id: string;
  name: string;
  zone: string;
  activeTasks: number;
  phone: string;
  status: 'active' | 'inactive';
}

const AgentsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Sarah Fernando',
      zone: 'Colombo Central',
      activeTasks: 12,
      phone: '+94 71 111 2222',
      status: 'active'
    },
    {
      id: '2',
      name: 'Mike Jayasinghe',
      zone: 'Kandy',
      activeTasks: 8,
      phone: '+94 77 333 4444',
      status: 'active'
    },
    {
      id: '3',
      name: 'Anna De Silva',
      zone: 'Galle',
      activeTasks: 15,
      phone: '+94 76 555 6666',
      status: 'active'
    },
    {
      id: '4',
      name: 'Rohan Wickrama',
      zone: 'Negombo',
      activeTasks: 0,
      phone: '+94 70 777 8888',
      status: 'inactive'
    },
  ]);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (agent: Agent) => {
    toast({
      title: "Edit Agent",
      description: `Opening edit form for ${agent.name}`,
    });
  };

  const handleDeactivate = (agent: Agent) => {
    toast({
      title: "Agent Status Updated",
      description: `${agent.name} has been ${agent.status === 'active' ? 'deactivated' : 'activated'}`,
    });
  };

  const handleViewCustomers = (agent: Agent) => {
    toast({
      title: "View Customers",
      description: `Showing customers assigned to ${agent.name}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Field Agents</h2>
        <Input
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Active Tasks</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell>{agent.zone}</TableCell>
                <TableCell>
                  <Badge variant={agent.activeTasks > 10 ? 'destructive' : agent.activeTasks > 5 ? 'default' : 'secondary'}>
                    {agent.activeTasks} tasks
                  </Badge>
                </TableCell>
                <TableCell>{agent.phone}</TableCell>
                <TableCell>
                  <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                    {agent.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(agent)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewCustomers(agent)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeactivate(agent)}
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AgentsTable;
