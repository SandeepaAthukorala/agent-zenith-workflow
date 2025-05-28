
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
import { Edit, Trash2, UserPlus, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Policy {
  id: string;
  type: string;
  customer: string;
  agent: string;
  premium: number;
  validity: string;
  status: 'active' | 'expired' | 'pending';
}

const PoliciesTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const [policies] = useState<Policy[]>([
    {
      id: 'POL001',
      type: 'Auto Insurance',
      customer: 'John Silva',
      agent: 'Sarah Fernando',
      premium: 75000,
      validity: '2025-06-15',
      status: 'active'
    },
    {
      id: 'POL002',
      type: 'Health Insurance',
      customer: 'Priya Perera',
      agent: 'Mike Jayasinghe',
      premium: 120000,
      validity: '2025-03-20',
      status: 'active'
    },
    {
      id: 'POL003',
      type: 'Life Insurance',
      customer: 'Ravi Wickramasinghe',
      agent: 'Anna De Silva',
      premium: 200000,
      validity: '2024-12-01',
      status: 'expired'
    },
    {
      id: 'POL004',
      type: 'Property Insurance',
      customer: 'Kamala Rajapaksa',
      agent: 'Sarah Fernando',
      premium: 95000,
      validity: '2025-08-10',
      status: 'pending'
    },
  ]);

  const filteredPolicies = policies.filter(policy =>
    policy.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (policy: Policy) => {
    toast({
      title: "Edit Policy",
      description: `Opening edit form for policy ${policy.id}`,
    });
  };

  const handleDelete = (policy: Policy) => {
    toast({
      title: "Policy Deleted",
      description: `Policy ${policy.id} has been removed from the system`,
      variant: "destructive"
    });
  };

  const handleAssignAgent = (policy: Policy) => {
    toast({
      title: "Assign Agent",
      description: `Opening agent assignment for policy ${policy.id}`,
    });
  };

  const handleAddNew = () => {
    toast({
      title: "Add New Policy",
      description: "Opening new policy creation form",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Policies</h2>
        <div className="flex space-x-2">
          <Input
            placeholder="Search policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Policy
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Policy ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Premium (LKR)</TableHead>
              <TableHead>Validity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPolicies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell className="font-medium">{policy.id}</TableCell>
                <TableCell>{policy.type}</TableCell>
                <TableCell>{policy.customer}</TableCell>
                <TableCell>{policy.agent}</TableCell>
                <TableCell>{policy.premium.toLocaleString()}</TableCell>
                <TableCell>{policy.validity}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      policy.status === 'active' ? 'default' : 
                      policy.status === 'expired' ? 'destructive' : 'secondary'
                    }
                  >
                    {policy.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(policy)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAssignAgent(policy)}
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(policy)}
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

export default PoliciesTable;
