import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]); // Specify the type as string[]

  const amenities = [
    "School in vicinity",
    "Adjoining Metro Station",
    "Peaceful vicinity",
    "Near City Center",
    "Safe & Secure Locality",
    "Desperate Sale",
    "Breakthrough Price",
    "Quick Deal",
    "Investment Opportunity",
    "High Rental Yield",
    "Affordable",
    "Reputed Builder",
    "Well Ventilated",
    "Fully Renovated",
    "Vastu Compliant",
    "Spacious",
    "Ample Parking",
    "Free Hold",
    "Gated Society",
    "Tasteful Interior",
    "Prime Location",
    "Luxury Lifestyle",
    "Well Maintained",
    "Plenty of Sunlight",
    "Newly Built",
    "Family",
    "Bachelors",
    "Females Only",
  ];

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prev: string[]) => {
      if (prev.includes(amenity)) {
        return prev.filter((item) => item !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedAmenities.length === amenities.length) {
      setSelectedAmenities([]);
    } else {
      setSelectedAmenities(amenities);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Update Amenities</h1>
      <p className="mb-6">
        Fill out the amenities below about this new project
      </p>

      <Progress
        value={(selectedAmenities.length / amenities.length) * 100}
        className="mb-6"
      />
      <p className="mb-4 text-gray-600">
        {Math.round((selectedAmenities.length / amenities.length) * 100)}%
        Complete
      </p>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Amenities</h2>
        <Button variant="outline" onClick={handleSelectAll}>
          {selectedAmenities.length === amenities.length
            ? "Deselect All"
            : "Select All"}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <label
            key={amenity}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Checkbox
              checked={selectedAmenities.includes(amenity)}
              onCheckedChange={() => handleAmenityChange(amenity)}
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
