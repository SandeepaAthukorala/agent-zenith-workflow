
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
import { Edit, Trash2, CheckCircle, XCircle, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Claim {
  id: string;
  policyId: string;
  customer: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
}

const ClaimsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const [claims] = useState<Claim[]>([
    {
      id: 'CLM001',
      policyId: 'POL001',
      customer: 'John Silva',
      amount: 45000,
      date: '2024-05-15',
      status: 'pending'
    },
    {
      id: 'CLM002',
      policyId: 'POL002',
      customer: 'Priya Perera',
      amount: 25000,
      date: '2024-05-10',
      status: 'approved'
    },
    {
      id: 'CLM003',
      policyId: 'POL003',
      customer: 'Ravi Wickramasinghe',
      amount: 150000,
      date: '2024-05-08',
      status: 'in-review'
    },
    {
      id: 'CLM004',
      policyId: 'POL001',
      customer: 'Kamala Rajapaksa',
      amount: 12000,
      date: '2024-05-05',
      status: 'rejected'
    },
  ]);

  const filteredClaims = claims.filter(claim =>
    claim.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.policyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (claim: Claim) => {
    toast({
      title: "Edit Claim",
      description: `Opening edit form for claim ${claim.id}`,
    });
  };

  const handleDelete = (claim: Claim) => {
    toast({
      title: "Claim Deleted",
      description: `Claim ${claim.id} has been removed from the system`,
      variant: "destructive"
    });
  };

  const handleApprove = (claim: Claim) => {
    toast({
      title: "Claim Approved",
      description: `Claim ${claim.id} has been approved for LKR ${claim.amount.toLocaleString()}`,
    });
  };

  const handleReject = (claim: Claim) => {
    toast({
      title: "Claim Rejected",
      description: `Claim ${claim.id} has been rejected`,
      variant: "destructive"
    });
  };

  const handleAddNew = () => {
    toast({
      title: "Add New Claim",
      description: "Opening new claim creation form",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Claims</h2>
        <div className="flex space-x-2">
          <Input
            placeholder="Search claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            New Claim
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim ID</TableHead>
              <TableHead>Policy ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount (LKR)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell className="font-medium">{claim.id}</TableCell>
                <TableCell>{claim.policyId}</TableCell>
                <TableCell>{claim.customer}</TableCell>
                <TableCell>{claim.amount.toLocaleString()}</TableCell>
                <TableCell>{claim.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      claim.status === 'approved' ? 'default' : 
                      claim.status === 'rejected' ? 'destructive' : 
                      claim.status === 'in-review' ? 'secondary' : 'outline'
                    }
                  >
                    {claim.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(claim)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {claim.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(claim)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(claim)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(claim)}
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

export default ClaimsTable;
