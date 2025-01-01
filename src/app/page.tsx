"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { TbHomePlus } from "react-icons/tb";
import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FiMapPin } from "react-icons/fi";
import { HiOutlinePlusCircle } from "react-icons/hi";

// Define ImageType
type ImageType = string;

export default function Home() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
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
          // className="mb-2 bg-red-200"
          // progressClassName="bg-pink-500"
          className="mb-2 bg-pink-200 [&>div]:bg-pink-500"
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
          <HiOutlinePlusCircle />
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
              checked={selectedAmenities.includes(amenity)}
              style={{
                backgroundColor: selectedAmenities.includes(amenity)
                  ? "#eb479b"
                  : "transparent",
                color: selectedAmenities.includes(amenity)
                  ? "white"
                  : "initial",
              }}
              onCheckedChange={() => handleAmenityChange(amenity)}
              className={`rounded-full border-pink-500 border-[1.5px]`}
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>

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
                      <Input placeholder="Add Label" />
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

      <div>
        <div className=" my-4">
          <Button variant="outline" onClick={handleSelectAll}>
            <HiOutlinePlusCircle />
            <p>Add another URL</p>
          </Button>
        </div>
      </div>

      {/* RERA Registration Section */}
      <div className="mb-8 w-full p-4 border border-gray-300 rounded-md shadow-sm flex items-center justify-between">
        <label className=" text-sm font-semibold text-gray-700">
          Is the project RERA registered?
        </label>
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2">
            <Input
              type="radio"
              name="reraRegistration"
              value="yes"
              checked={isRegistered === "yes"}
              className="w-4 h-4"
              onChange={() => setIsRegistered("yes")}
            />
            <span className="text-gray-700">Yes</span>
          </label>

          <label className="flex items-center space-x-2 ">
            <input
              type="radio"
              name="reraRegistration"
              value="no"
              className="w-4 h-4"
              checked={isRegistered === "no"}
              onChange={() => setIsRegistered("no")}
            />
            <span className="text-gray-700">No</span>
          </label>
        </div>
      </div>

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
              // value="18.53235134767711"
              placeholder="Enter latitude"
              // readOnly
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2 ">
            <label
              htmlFor="longitude"
              className="text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <div className="flex flex-row justify-between gap-2">
              <Input
                type="text"
                id="longitude"
                // value="73.85593414306642"
                // readOnly
                className="bg-gray-100"
                placeholder="Enter longitude"
              />
              <button
                type="button"
                className=" text-gray-800 hover:text-black border border-gray-300 p-1 px-2 rounded-md"
              >
                <FiMapPin size={20} />
              </button>
            </div>
          </div>
        </div>
      </form>

      <div>
        <div className=" my-4">
          <Button variant="outline" onClick={handleSelectAll}>
            <HiOutlinePlusCircle />
            <p>Add Connectivity Item</p>
          </Button>
        </div>
      </div>

      <hr />
      <div className="flex justify-between items-center mt-4">
        <Button type="submit" className=" bg-pink-600 hover:bg-pink-700">
          Previous
        </Button>
        <Button type="submit" className=" bg-pink-600 hover:bg-pink-700">
          Submit
        </Button>
      </div>
    </div>
  );
}
