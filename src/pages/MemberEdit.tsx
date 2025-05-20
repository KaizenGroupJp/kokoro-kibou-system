import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Users, User, Calendar, Heart, FileText, CreditCard, Mail, Upload, Plus, Trash2, ArrowLeft } from 'lucide-react';

// Sample member data to edit
const members = [
  {
    id: 1,
    name: 'Takashi Yamada',
    email: 'takashi@example.com',
    phone: '+81 90-1234-5678',
    status: 'active',
    memberSince: '2020-03-15',
    baptized: true,
    baptismDate: '2015-05-20',
    birthDate: '1982-07-12',
    address: 'Shibuya-ku, Tokyo, Japan',
    family: 'Yamada Family',
    photo: 'https://i.pravatar.cc/300?img=33',
    roles: ['financial', 'secretary'],
    familyMembers: [
      { id: 8, name: 'Yuki Yamada', relation: 'spouse', age: 38, photo: 'https://i.pravatar.cc/300?img=32' },
      { id: 9, name: 'Haruto Yamada', relation: 'child', age: 10, photo: 'https://i.pravatar.cc/300?img=11' },
    ],
    allergies: [],
    notes: 'Takashi is a dedicated member who has been helping with finance and administrative tasks.',
  },
  // other members would be here
];

const availableRoles = [
  { id: 'financial', name: 'Financeiro', description: 'Acesso ao módulo financeiro' },
  { id: 'secretary', name: 'Secretário', description: 'Funções administrativas e de secretaria' },
  { id: 'children_ministry_teacher', name: 'Professor Min. Infantil', description: 'Acesso ao módulo do ministério infantil' },
  { id: 'admin', name: 'Administrador', description: 'Acesso completo ao sistema' },
];

const commonAllergies = [
  { id: 'peanuts', label: 'Amendoim' },
  { id: 'gluten', label: 'Glúten' },
  { id: 'dairy', label: 'Laticínios' },
  { id: 'eggs', label: 'Ovos' },
  { id: 'seafood', label: 'Frutos do Mar' },
  { id: 'medicine_penicillin', label: 'Penicilina' },
];

const MemberEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the member by ID or use a default
  const memberToEdit = members.find(member => member.id === Number(id)) || members[0];
  
  const [member, setMember] = useState({ ...memberToEdit });
  const [activeTab, setActiveTab] = useState('personal');
  const [newFamilyMember, setNewFamilyMember] = useState({
    name: '',
    relation: 'spouse',
    age: 0, // Changed from string to number
  });
  
  const [selectedAllergies, setSelectedAllergies] = useState(
    commonAllergies.filter(allergy => member.allergies.includes(allergy.id))
  );
  
  const [selectedRoles, setSelectedRoles] = useState(
    member.roles || []
  );

  const handleSave = () => {
    toast("Member updated", {
      description: `${member.name}'s information has been updated successfully.`,
    });
    navigate(`/dashboard/members/${id}`);
  };

  const handlePhotoChange = () => {
    // In a real app, this would trigger a file upload
    toast("Photo upload", {
      description: "Photo upload would be handled here",
    });
  };

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

  const toggleAllergy = (allergyId) => {
    if (selectedAllergies.some(a => a.id === allergyId)) {
      setSelectedAllergies(selectedAllergies.filter(a => a.id !== allergyId));
    } else {
      const allergyToAdd = commonAllergies.find(a => a.id === allergyId);
      if (allergyToAdd) {
        setSelectedAllergies([...selectedAllergies, allergyToAdd]);
      }
    }
  };

  const toggleRole = (roleId) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter(r => r !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 ml-0 md:ml-[70px] lg:ml-[250px]">
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard/members')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Member</h1>
                <p className="text-gray-600">Update member information and permissions</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column - Photo and Main Info */}
              <div className="w-full md:w-1/3">
                <Card>
                  <CardContent className="pt-6">
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
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Column - Tabs with detailed information */}
              <div className="w-full md:w-2/3">
                <Card>
                  <CardContent className="pt-6">
                    <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="mb-4">
                        <TabsTrigger value="personal">
                          <User className="h-4 w-4 mr-1" />
                          Personal
                        </TabsTrigger>
                        <TabsTrigger value="family">
                          <Users className="h-4 w-4 mr-1" />
                          Family
                        </TabsTrigger>
                        <TabsTrigger value="roles">
                          <FileText className="h-4 w-4 mr-1" />
                          Roles
                        </TabsTrigger>
                        <TabsTrigger value="health">
                          <Heart className="h-4 w-4 mr-1" />
                          Health
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="personal" className="space-y-4">
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
                      </TabsContent>
                      
                      <TabsContent value="family" className="space-y-4">
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
                      </TabsContent>
                      
                      <TabsContent value="roles" className="space-y-4">
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
                      </TabsContent>
                      
                      <TabsContent value="health" className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Allergies</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Register any allergies this member has for health and safety purposes.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {commonAllergies.map((allergy) => (
                              <div key={allergy.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`allergy-${allergy.id}`} 
                                  checked={selectedAllergies.some(a => a.id === allergy.id)}
                                  onCheckedChange={() => toggleAllergy(allergy.id)}
                                />
                                <Label 
                                  htmlFor={`allergy-${allergy.id}`}
                                  className="text-sm font-medium cursor-pointer"
                                >
                                  {allergy.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4">
                            <Label htmlFor="customAllergy">Other Allergies</Label>
                            <Textarea 
                              id="customAllergy" 
                              placeholder="Enter any other allergies or medical conditions"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2 border-t pt-4">
                    <Button variant="outline" onClick={() => navigate(`/dashboard/members/${id}`)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberEdit;
