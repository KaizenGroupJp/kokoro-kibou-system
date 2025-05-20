
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MemberHealthTabProps {
  selectedAllergies: any[];
  toggleAllergy: (allergyId: string) => void;
  commonAllergies: any[];
}

const MemberHealthTab = ({ selectedAllergies, toggleAllergy, commonAllergies }: MemberHealthTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default MemberHealthTab;
