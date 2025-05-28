
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

interface Customer {
  id: string;
  name: string;
  nic: string;
  phone: string;
  location: string;
  assignedAgent: string;
  status: 'active' | 'inactive';
}

const CustomersTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Silva',
      nic: '199012345678',
      phone: '+94 71 234 5678',
      location: 'Colombo 07',
      assignedAgent: 'Sarah Fernando',
      status: 'active'
    },
    {
      id: '2',
      name: 'Priya Perera',
      nic: '198523456789',
      phone: '+94 77 345 6789',
      location: 'Kandy',
      assignedAgent: 'Mike Jayasinghe',
      status: 'active'
    },
    {
      id: '3',
      name: 'Ravi Wickramasinghe',
      nic: '197734567890',
      phone: '+94 76 456 7890',
      location: 'Galle',
      assignedAgent: 'Anna De Silva',
      status: 'inactive'
    },
    {
      id: '4',
      name: 'Kamala Rajapaksa',
      nic: '199445678901',
      phone: '+94 70 567 8901',
      location: 'Negombo',
      assignedAgent: 'Sarah Fernando',
      status: 'active'
    },
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.assignedAgent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (customer: Customer) => {
    toast({
      title: "Edit Customer",
      description: `Opening edit form for ${customer.name}`,
    });
  };

  const handleDelete = (customer: Customer) => {
    toast({
      title: "Customer Deleted",
      description: `${customer.name} has been removed from the system`,
      variant: "destructive"
    });
  };

  const handleAssignAgent = (customer: Customer) => {
    toast({
      title: "Assign Agent",
      description: `Opening agent assignment for ${customer.name}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customers</h2>
        <Input
          placeholder="Search customers..."
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
              <TableHead>NIC</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Assigned Agent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.nic}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>{customer.assignedAgent}</TableCell>
                <TableCell>
                  <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(customer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAssignAgent(customer)}
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(customer)}
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

export default CustomersTable;
