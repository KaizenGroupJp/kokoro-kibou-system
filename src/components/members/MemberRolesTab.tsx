
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CreditCard, Mail, Heart, User } from 'lucide-react';

interface MemberRolesTabProps {
  selectedRoles: string[];
  toggleRole: (roleId: string) => void;
  availableRoles: any[];
}

const MemberRolesTab = ({ selectedRoles, toggleRole, availableRoles }: MemberRolesTabProps) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Assign roles to determine what this member can access in the system.
      </p>
      
      <div className="space-y-4">
        {availableRoles.map((role) => (
          <div key={role.id} className="flex items-start space-x-2 p-3 border rounded-md">
            <Checkbox 
              id={`role-${role.id}`} 
              checked={selectedRoles.includes(role.id)}
              onCheckedChange={() => toggleRole(role.id)}
            />
            <div className="grid gap-1.5">
              <Label 
                htmlFor={`role-${role.id}`}
                className="text-sm font-medium cursor-pointer"
              >
                {role.name}
              </Label>
              <p className="text-sm text-muted-foreground">
                {role.description}
              </p>
            </div>
            {role.id === 'financial' && <CreditCard className="ml-auto h-4 w-4 text-muted-foreground" />}
            {role.id === 'secretary' && <Mail className="ml-auto h-4 w-4 text-muted-foreground" />}
            {role.id === 'children_ministry_teacher' && <Heart className="ml-auto h-4 w-4 text-muted-foreground" />}
            {role.id === 'admin' && <User className="ml-auto h-4 w-4 text-muted-foreground" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberRolesTab;
