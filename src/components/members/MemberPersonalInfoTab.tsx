
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface MemberPersonalInfoTabProps {
  member: any;
  setMember: (member: any) => void;
}

const MemberPersonalInfoTab = ({ member, setMember }: MemberPersonalInfoTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            value={member.name} 
            onChange={(e) => setMember({...member, name: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email"
            value={member.email} 
            onChange={(e) => setMember({...member, email: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            value={member.phone} 
            onChange={(e) => setMember({...member, phone: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth Date</Label>
          <Input 
            id="birthDate" 
            type="date"
            value={member.birthDate} 
            onChange={(e) => setMember({...member, birthDate: e.target.value})}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input 
          id="address" 
          value={member.address} 
          onChange={(e) => setMember({...member, address: e.target.value})}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea 
          id="notes" 
          rows={4}
          value={member.notes} 
          onChange={(e) => setMember({...member, notes: e.target.value})}
          placeholder="Add any additional notes about this member"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="status">Active Member</Label>
          <Switch 
            id="status" 
            checked={member.status === 'active'}
            onCheckedChange={(checked) => 
              setMember({...member, status: checked ? 'active' : 'inactive'})
            }
          />
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <Label htmlFor="baptized">Baptized</Label>
          <Switch 
            id="baptized" 
            checked={member.baptized}
            onCheckedChange={(checked) => 
              setMember({...member, baptized: checked})
            }
          />
        </div>
        
        {member.baptized && (
          <div className="mt-4">
            <Label htmlFor="baptismDate">Baptism Date</Label>
            <Input 
              id="baptismDate" 
              type="date"
              value={member.baptismDate} 
              onChange={(e) => setMember({...member, baptismDate: e.target.value})}
              className="mt-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberPersonalInfoTab;
