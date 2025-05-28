
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NotificationDropdownProps {
  children: React.ReactNode;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ children }) => {
  const notifications = [
    {
      id: 1,
      title: 'New claim submitted',
      message: 'Auto insurance claim from John Silva',
      time: '5 minutes ago',
      type: 'claim'
    },
    {
      id: 2,
      title: 'Policy expiring soon',
      message: 'Health policy for Sarah Fernando expires in 3 days',
      time: '1 hour ago',
      type: 'policy'
    },
    {
      id: 3,
      title: 'Agent check-in',
      message: 'Mike Perera checked in at Colombo zone',
      time: '2 hours ago',
      type: 'location'
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          <p className="text-sm text-muted-foreground">{notifications.length} new notifications</p>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'claim' ? 'bg-red-500' :
                  notification.type === 'policy' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" size="sm">
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;
