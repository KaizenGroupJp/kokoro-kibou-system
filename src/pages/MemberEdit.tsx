
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from 'lucide-react';

// Import refactored components
import MemberProfileCard from '@/components/members/MemberProfileCard';
import MemberPersonalInfoTab from '@/components/members/MemberPersonalInfoTab';
import MemberFamilyTab from '@/components/members/MemberFamilyTab';
import MemberRolesTab from '@/components/members/MemberRolesTab';
import MemberHealthTab from '@/components/members/MemberHealthTab';

// Import data
import { members, availableRoles, commonAllergies } from '@/components/members/MemberEditData';

const MemberEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the member by ID or use a default
  const memberToEdit = members.find(member => member.id === Number(id)) || members[0];
  
  const [member, setMember] = useState({ ...memberToEdit });
  const [activeTab, setActiveTab] = useState('personal');
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
                    <MemberProfileCard 
                      member={member}
                      handlePhotoChange={handlePhotoChange}
                      availableRoles={availableRoles}
                    />
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
                          Personal
                        </TabsTrigger>
                        <TabsTrigger value="family">
                          Family
                        </TabsTrigger>
                        <TabsTrigger value="roles">
                          Roles
                        </TabsTrigger>
                        <TabsTrigger value="health">
                          Health
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="personal">
                        <MemberPersonalInfoTab 
                          member={member} 
                          setMember={setMember}
                        />
                      </TabsContent>
                      
                      <TabsContent value="family">
                        <MemberFamilyTab
                          member={member}
                          setMember={setMember}
                        />
                      </TabsContent>
                      
                      <TabsContent value="roles">
                        <MemberRolesTab 
                          selectedRoles={selectedRoles}
                          toggleRole={toggleRole}
                          availableRoles={availableRoles}
                        />
                      </TabsContent>
                      
                      <TabsContent value="health">
                        <MemberHealthTab
                          selectedAllergies={selectedAllergies}
                          toggleAllergy={toggleAllergy}
                          commonAllergies={commonAllergies}
                        />
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
