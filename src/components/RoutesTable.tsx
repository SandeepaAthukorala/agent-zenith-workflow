
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
import { Edit, Trash2, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Route {
  id: string;
  routeName: string;
  area: string;
  assignedAgent: string;
  activeStatus: 'active' | 'inactive';
  customerCount: number;
}

const RoutesTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const [routes] = useState<Route[]>([
    {
      id: '1',
      routeName: 'Colombo Central Route',
      area: 'Colombo 01-07',
      assignedAgent: 'Sarah Fernando',
      activeStatus: 'active',
      customerCount: 45
    },
    {
      id: '2',
      routeName: 'Kandy Hills Route',
      area: 'Kandy Central, Peradeniya',
      assignedAgent: 'Mike Jayasinghe',
      activeStatus: 'active',
      customerCount: 32
    },
    {
      id: '3',
      routeName: 'Southern Coast Route',
      area: 'Galle, Matara, Hambantota',
      assignedAgent: 'Anna De Silva',
      activeStatus: 'active',
      customerCount: 28
    },
    {
      id: '4',
      routeName: 'Western Suburbs Route',
      area: 'Negombo, Ja-Ela, Wattala',
      assignedAgent: 'Unassigned',
      activeStatus: 'inactive',
      customerCount: 0
    },
  ]);

  const filteredRoutes = routes.filter(route =>
    route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.assignedAgent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (route: Route) => {
    toast({
      title: "Edit Route",
      description: `Opening edit form for ${route.routeName}`,
    });
  };

  const handleDelete = (route: Route) => {
    toast({
      title: "Route Deleted",
      description: `${route.routeName} has been removed from the system`,
      variant: "destructive"
    });
  };

  const handleAssignAgent = (route: Route) => {
    toast({
      title: "Assign Agent",
      description: `Opening agent assignment for ${route.routeName}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Routes</h2>
        <Input
          placeholder="Search routes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route Name</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Assigned Agent</TableHead>
              <TableHead>Customers</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoutes.map((route) => (
              <TableRow key={route.id}>
                <TableCell className="font-medium">{route.routeName}</TableCell>
                <TableCell>{route.area}</TableCell>
                <TableCell>{route.assignedAgent}</TableCell>
                <TableCell>
                  <Badge variant={route.customerCount > 30 ? 'default' : route.customerCount > 0 ? 'secondary' : 'outline'}>
                    {route.customerCount} customers
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={route.activeStatus === 'active' ? 'default' : 'secondary'}>
                    {route.activeStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(route)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAssignAgent(route)}
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(route)}
                    >
                      <Trash2 className="h-4 w-4" />
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

export default RoutesTable;
