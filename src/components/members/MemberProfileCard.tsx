
import { Upload } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface MemberProfileCardProps {
  member: any;
  handlePhotoChange: () => void;
  availableRoles: any[];
}

const MemberProfileCard = ({ member, handlePhotoChange, availableRoles }: MemberProfileCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="h-32 w-32 rounded-full overflow-hidden">
          <img 
            src={member.photo} 
            alt={member.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <button 
          className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white shadow-sm"
          onClick={handlePhotoChange}
        >
          <Upload size={16} />
        </button>
      </div>
      
      <h2 className="text-xl font-bold">{member.name}</h2>
      <p className="text-gray-500">{member.email}</p>
      
      <div className="mt-3 flex flex-wrap justify-center gap-1">
        {member.roles.map(role => {
          const roleInfo = availableRoles.find(r => r.id === role);
          return roleInfo ? (
            <Badge key={role} variant="outline" className="bg-blue-50 border-blue-200">
              {roleInfo.name}
            </Badge>
          ) : null;
        })}
      </div>

      <div className="w-full mt-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-t">
            <span className="text-gray-600">Member Since</span>
            <span>{new Date(member.memberSince).toLocaleDateString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-t">
            <span className="text-gray-600">Status</span>
            <Badge className={member.status === 'active' ? 
              "bg-green-100 text-green-800" : 
              "bg-gray-100 text-gray-800"
            }>
              {member.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center py-2 border-t">
            <span className="text-gray-600">Baptized</span>
            <span>{member.baptized ? 'Yes' : 'No'}</span>
          </div>
          
          {member.baptized && (
            <div className="flex justify-between items-center py-2 border-t">
              <span className="text-gray-600">Baptism Date</span>
              <span>{new Date(member.baptismDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberProfileCard;
