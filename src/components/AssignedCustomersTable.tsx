
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
import { Eye, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface AssignedCustomer {
  id: string;
  customerName: string;
  location: string;
  policyType: string;
  contact: string;
  status: 'active' | 'pending' | 'expired';
  address: string;
}

const AssignedCustomersTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [customers] = useState<AssignedCustomer[]>([
    {
      id: '1',
      customerName: 'John Silva',
      location: 'Colombo 07',
      policyType: 'Auto Insurance',
      contact: '+94 71 234 5678',
      status: 'active',
      address: '123 Galle Road, Colombo 07'
    },
    {
      id: '2',
      customerName: 'Kamala Rajapaksa',
      location: 'Negombo',
      policyType: 'Health Insurance',
      contact: '+94 70 567 8901',
      status: 'pending',
      address: '45 Beach Road, Negombo'
    },
    {
      id: '3',
      customerName: 'Pradeep Wickrama',
      location: 'Colombo 05',
      policyType: 'Life Insurance',
      contact: '+94 77 123 4567',
      status: 'active',
      address: '78 High Level Road, Colombo 05'
    },
    {
      id: '4',
      customerName: 'Nimal Fernando',
      location: 'Mount Lavinia',
      policyType: 'Property Insurance',
      contact: '+94 76 987 6543',
      status: 'expired',
      address: '22 Hotel Road, Mount Lavinia'
    },
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.policyType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (customer: AssignedCustomer) => {
    toast({
      title: "Customer Profile",
      description: `Opening profile for ${customer.customerName}`,
    });
  };

  const handleNavigate = (customer: AssignedCustomer) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customer.address)}`;
    window.open(mapsUrl, '_blank');
    
    toast({
      title: "Navigation Started",
      description: `Opening Google Maps to ${customer.customerName}'s location`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Assigned Customers</h2>
          <p className="text-muted-foreground">Customers assigned to {user?.name}</p>
        </div>
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
              <TableHead>Customer Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Policy Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.customerName}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>{customer.policyType}</TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>
                  <Badge variant={
                    customer.status === 'active' ? 'default' :
                    customer.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProfile(customer)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleNavigate(customer)}
                    >
                      <Navigation className="h-4 w-4" />
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

export default AssignedCustomersTable;
