"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { TbHomePlus } from "react-icons/tb";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import ToggleSwitch from "@/components/ImageUploader/ImageUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [isRERARegistered, setIsRERARegistered] = useState<string>("yes");
  const [landmarks, setLandmarks] = useState([
    { landmark: "", distance: "", description: "" },
  ]);
  const [images, setImages] = useState<ImageType[]>([]);
  const [isRegistered, setIsRegistered] = useState<string | null>(null);

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

  const handleFileUpload = (event: any) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const handleLandmarkChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedLandmarks = [...landmarks];
    updatedLandmarks[index][field] = value;
    setLandmarks(updatedLandmarks);
  };

  const addLandmark = () => {
    setLandmarks((prev) => [
      ...prev,
      { landmark: "", distance: "", description: "" },
    ]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("clicked");
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    if (newImages.length + images.length > 5) {
      alert("You can only upload a maximum of 5 images");
      return;
    }

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className=" max-w-screen-md p-10">
      <h1 className="text-2xl font-semibold mb-0">Update Amenities</h1>
      <p className="mb-6 text-slate-600">
        Fill out the amenities below about this new project
      </p>
      <div className="px-6 mt-8">
        <Progress
          value={(selectedAmenities.length / amenities.length) * 100}
          className="mb-2 bg-red-200"
        />
        <p className="mb-4 text-gray-600">
          {Math.round((selectedAmenities.length / amenities.length) * 100)}%
          Complete
        </p>
      </div>
      <hr />
      <div className="flex justify-between items-center my-4">
        <h2 className="text-xl font-bold">Amenities</h2>
        <Button variant="outline" onClick={handleSelectAll}>
          {selectedAmenities.length === amenities.length
            ? "Deselect All"
            : "Select All"}
        </Button>
      </div>
      <hr />
      <div className="grid grid-cols-3 gap-4 mb-6 mt-10">
        {amenities.map((amenity) => (
          <label
            key={amenity}
            className="flex items-center space-x-2 cursor-pointer "
          >
            <Checkbox
              // checked={selectedAmenities.includes(amenity)}
              onCheckedChange={() => handleAmenityChange(amenity)}
              className={` rounded-full border-pink-500 border-[1.5px] ${
                selectedAmenities.includes(amenity) ? "bg-green-300" : ""
              }`}
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>
      {/* <div className="mb-80">
        <h2 className="text-md mb-4 font-semibold text-gray-600">Images</h2>
        <div className="border-2 border-dashed border-gray-300 p-4 py-6 rounded-lg text-center w-2/3">
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="text-center w-full"></div>
            <div className="text-gray-500 flex flex-col justify-center items-center">
              <TbHomePlus className="text-6xl text-gray-400" />
              <p className="mt-2"> Click or drag images here to upload</p>
            </div>
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              // onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div> */}

      {/* image start */}
      <div className="mb-8 w-full">
        <h2 className="text-md mb-4 font-semibold text-gray-600">Images</h2>
        <div className="border-2 border-dashed border-gray-300 p-4 py-6 rounded-lg text-center w-2/3">
          {images.length < 5 && (
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="text-gray-500 flex flex-col justify-center items-center">
                <TbHomePlus className="text-6xl text-gray-400" />
                <p className="mt-2">Click drag images here to upload</p>
              </div>
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {images.length > 0 && (
          <div className="mt-6 ">
            <div className=" rounded-md grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden border border-gray-300 bg-gray-100 py-2 px-2 "
                >
                  <Image
                    src={image}
                    alt={`Uploaded preview ${index}`}
                    width={800}
                    height={500}
                    className="w-full h-36 object-cover rounded-md"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    &times;
                  </button>

                  <div className="flex justify-between mt-4 py-2 px-2">
                    <div>
                      <p className="mb-2">Description</p>
                      <Input
                        placeholder="Add Label"
                        // value={landmark.landmark}
                        // onChange={(e) =>
                        //   handleLandmarkChange(index, "landmark", e.target.value)
                        // }
                      />
                    </div>
                    <div>
                      <p className="mb-3">Set Primary</p>
                      <ToggleSwitch />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* image end */}

      {/* RERA Registration Section */}
      <div className="mb-8 w-full p-4 border border-gray-300 rounded-md shadow-sm flex items-center justify-between">
        <label className=" text-sm font-semibold text-gray-700">
          Is the project RERA registered?
        </label>
        <div className="flex items-center space-x-6">
          {/* Yes Radio Button */}
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="reraRegistration"
              value="yes"
              className="w-4 h-4 border-pink-500 border"
              checked={isRegistered === "yes"}
              onChange={() => setIsRegistered("yes")}
            />
            <span className="text-gray-700">Yes</span>
          </label>

          {/* No Radio Button */}
          <label className="flex items-center space-x-2 ">
            <input
              type="radio"
              name="reraRegistration"
              value="no"
              className="w-4 h-4 border-pink-500 border"
              checked={isRegistered === "no"}
              onChange={() => setIsRegistered("no")}
            />
            <span className="text-gray-700">No</span>
          </label>
        </div>
      </div>

      {/* Landmark Section */}
      {/* <div className="mb-6 border border-gray-300 py-4 px-3 rounded-md">
        <h2 className="text-xl font-medium mb-4">Landmarks</h2>
        {landmarks.map((landmark, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-4">
            <Input
              placeholder="Landmark"
              value={landmark.landmark}
              onChange={(e) =>
                handleLandmarkChange(index, "landmark", e.target.value)
              }
            />
            <Input
              placeholder="Distance"
              value={landmark.distance}
              onChange={(e) =>
                handleLandmarkChange(index, "distance", e.target.value)
              }
            />
            <Input
              placeholder="Description"
              value={landmark.description}
              onChange={(e) =>
                handleLandmarkChange(index, "description", e.target.value)
              }
            />
          </div>
        ))}
        <Button variant="outline" onClick={addLandmark}>
          Add Landmark
        </Button>
      </div> */}

      {/* Landmark Section-2 */}
      {/* <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md space-y-4">
        <div>
          <label
            htmlFor="landmark"
            className="block text-sm font-medium text-gray-700"
          >
            Landmark
          </label>
          <select
            id="landmark"
            name="landmark"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option>Park</option>
            <option>Mall</option>
            <option>School</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="distance"
            className="block text-sm font-medium text-gray-700"
          >
            Distance
          </label>
          <input
            type="number"
            id="distance"
            name="distance"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter distance"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              readOnly
              value="18.53235134767711"
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              readOnly
              value="73.85593414306642"
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form> */}

      <form className="w-full mx-auto p-6 bg-white shadow rounded-lg space-y-6 border border-gray-300 mb-6">
        <div className="flex justify-between gap-2">
          {/* Landmark Dropdown */}
          <div className="space-y-1 w-full">
            <label
              htmlFor="landmark"
              className="text-sm font-medium text-gray-700 ml-1"
            >
              Landmark
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a landmark" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="park">Park</SelectItem>
                <SelectItem value="mall">Mall</SelectItem>
                <SelectItem value="school">School</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Distance Input */}
          <div className="space-y-1 w-full">
            <label
              htmlFor="distance"
              className="text-sm font-medium text-gray-700 ml-1"
            >
              Distance
            </label>
            <Input
              type="number"
              id="distance"
              placeholder="Enter distance"
              className="w-full"
            />
          </div>
        </div>

        {/* Description Textarea */}
        <div className="space-y-1">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 ml-1"
          >
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Enter description"
            rows={6}
            className="w-full"
          />
        </div>

        {/* Latitude and Longitude */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="latitude"
              className="text-sm font-medium text-gray-700"
            >
              Latitude
            </label>
            <Input
              type="text"
              id="latitude"
              value="18.53235134767711"
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="longitude"
              className="text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <Input
              type="text"
              id="longitude"
              value="73.85593414306642"
              readOnly
              className="bg-gray-100"
            />
          </div>
        </div>
      </form>

      <hr />
      <div className="flex justify-between items-center mt-4">
        <Button type="submit" className=" bg-indigo-600 hover:bg-indigo-700">
          Previous
        </Button>
        <Button type="submit" className=" bg-indigo-600 hover:bg-indigo-700">
          Submit
        </Button>
      </div>
    </div>
  );
}
