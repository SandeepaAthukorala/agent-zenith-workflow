import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Users, 
  MapPin, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  Plus,
  Calendar
} from 'lucide-react';
import PolicyModal from '@/components/PolicyModal';
import AssignedCustomersTable from '@/components/AssignedCustomersTable';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const stats = [
    { title: 'Active Policies', value: '1,247', icon: FileText, change: '+12%' },
    { title: 'Pending Claims', value: '38', icon: AlertCircle, change: '+5%' },
    { title: 'Field Agents', value: '23', icon: Users, change: '+2%' },
    { title: 'This Month Revenue', value: 'LKR 2.4M', icon: TrendingUp, change: '+18%' },
  ];

  const recentActivities = [
    { id: 1, action: 'New policy created', agent: 'John Silva', time: '2 minutes ago', type: 'policy' },
    { id: 2, action: 'Claim approved', agent: 'Sarah Fernando', time: '15 minutes ago', type: 'claim' },
    { id: 3, action: 'Agent check-in', agent: 'Mike Perera', time: '1 hour ago', type: 'location' },
    { id: 4, action: 'Policy expired', agent: 'System', time: '2 hours ago', type: 'alert' },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Visit client - Auto Policy Renewal', time: '10:00 AM', priority: 'high' },
    { id: 2, task: 'Process pending claims', time: '2:00 PM', priority: 'medium' },
    { id: 3, task: 'Team meeting - Weekly review', time: '4:00 PM', priority: 'low' },
  ];

  const handleNewClaim = () => {
    toast({
      title: "New Claim",
      description: "Opening claim creation form...",
    });
  };

  const handleCheckLocation = () => {
    toast({
      title: "Location Check",
      description: "Opening location tracking interface...",
    });
  };

  const handleTeamStatus = () => {
    toast({
      title: "Team Status",
      description: "Opening team management dashboard...",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-insurance-blue-900 dark:text-white mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {user?.role === 'admin' ? 'Monitor your team performance and manage operations' : 'Track your daily activities and manage your portfolio'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">{stat.change}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent-specific table */}
      {user?.role === 'agent' && (
        <AssignedCustomersTable />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'policy' ? 'bg-blue-500' :
                    activity.type === 'claim' ? 'bg-green-500' :
                    activity.type === 'location' ? 'bg-orange-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.agent}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Today's Tasks</span>
            </CardTitle>
            <CardDescription>Your scheduled activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="text-sm font-medium">{task.task}</p>
                    <p className="text-xs text-muted-foreground">{task.time}</p>
                  </div>
                  <Badge variant={
                    task.priority === 'high' ? 'destructive' :
                    task.priority === 'medium' ? 'default' : 'secondary'
                  }>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions with working buttons */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="h-20 flex-col space-y-2 gradient-primary hover:opacity-90"
              onClick={() => setIsPolicyModalOpen(true)}
            >
              <Plus className="h-6 w-6" />
              <span className="text-sm">New Policy</span>
            </Button>
            <Button 
              className="h-20 flex-col space-y-2 gradient-secondary hover:opacity-90"
              onClick={handleNewClaim}
            >
              <FileText className="h-6 w-6" />
              <span className="text-sm">New Claim</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={handleCheckLocation}
            >
              <MapPin className="h-6 w-6" />
              <span className="text-sm">Check Location</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={handleTeamStatus}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">Team Status</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <PolicyModal 
        open={isPolicyModalOpen} 
        onOpenChange={setIsPolicyModalOpen} 
      />
    </div>
  );
};

export default Dashboard;
