
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2 } from 'lucide-react';

interface MemberFamilyTabProps {
  member: any;
  setMember: (member: any) => void;
}

const MemberFamilyTab = ({ member, setMember }: MemberFamilyTabProps) => {
  const [newFamilyMember, setNewFamilyMember] = useState({
    name: '',
    relation: 'spouse',
    age: 0,
  });

  const handleAddFamilyMember = () => {
    if (!newFamilyMember.name || !newFamilyMember.relation) return;
    
    const updatedMember = { 
      ...member,
      familyMembers: [
        ...member.familyMembers,
        {
          id: Date.now(), // Generate temporary ID
          ...newFamilyMember,
          age: Number(newFamilyMember.age), // Ensure age is a number
          photo: `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70)}`
        }
      ]
    };
    
    setMember(updatedMember);
    setNewFamilyMember({ name: '', relation: 'spouse', age: 0 }); // Reset with number
    
    toast("Family member added", {
      description: `${newFamilyMember.name} added to family.`,
    });
  };

  const handleRemoveFamilyMember = (id) => {
    const updatedMember = {
      ...member,
      familyMembers: member.familyMembers.filter(fm => fm.id !== id)
    };
    
    setMember(updatedMember);
    
    toast("Family member removed", {
      description: "Family member has been removed.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="familyName">Family Name</Label>
        <Input 
          id="familyName" 
          value={member.family} 
          onChange={(e) => setMember({...member, family: e.target.value})}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div>
        <h3 className="text-lg font-medium mb-2">Family Members</h3>
        
        {member.familyMembers.length > 0 ? (
          <div className="space-y-4 mb-6">
            {member.familyMembers.map((familyMember) => (
              <div key={familyMember.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={familyMember.photo || 'https://i.pravatar.cc/300'}
                      alt={familyMember.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{familyMember.name}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {familyMember.relation}
                      {familyMember.age ? ` • ${familyMember.age} years old` : ''}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveFamilyMember(familyMember.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">No family members added yet.</p>
        )}
        
        <div className="p-4 border rounded-md bg-gray-50">
          <h4 className="text-sm font-medium mb-3">Add Family Member</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <Label htmlFor="familyMemberName" className="text-xs">Name</Label>
              <Input 
                id="familyMemberName" 
                value={newFamilyMember.name}
                onChange={(e) => setNewFamilyMember({...newFamilyMember, name: e.target.value})}
                placeholder="Enter name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="familyMemberRelation" className="text-xs">Relation</Label>
              <Select 
                value={newFamilyMember.relation}
                onValueChange={(value) => setNewFamilyMember({...newFamilyMember, relation: value})}
              >
                <SelectTrigger id="familyMemberRelation" className="mt-1">
                  <SelectValue placeholder="Select relation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="familyMemberAge" className="text-xs">Age (optional)</Label>
            <Input 
              id="familyMemberAge" 
              type="number"
              value={newFamilyMember.age}
              onChange={(e) => setNewFamilyMember({...newFamilyMember, age: Number(e.target.value)})}
              placeholder="Enter age"
              className="mt-1"
            />
          </div>
          
          <Button 
            onClick={handleAddFamilyMember}
            disabled={!newFamilyMember.name || !newFamilyMember.relation}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-1" /> 
            Add Family Member
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemberFamilyTab;
