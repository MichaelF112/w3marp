import React, { useState } from "react";
import { X } from "lucide-react";
import { listItem } from "../utils/contractInteractions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Electronics",
  "Technologies",
  "Home",
  "Sports",
  "Books",
  "Clothing",
  "Others",
];

export function ListItemModal({ isOpen, onClose }) {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] =
    useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !itemName ||
      !itemDescription ||
      !price ||
      !category ||
      !location ||
      !contact
    )
      return;

    try {
      await listItem(
        () => Promise.resolve(),
        itemName,
        itemDescription,
        parseFloat(price),
        category,
        location,
        contact
      );
      onClose();
      alert("Item listed successfully!");
    } catch (error) {
      console.error("Error listing item:", error);
      alert("Failed to list item. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            List an Item
          </h3>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
          <form
            onSubmit={handleSubmit}
            className="mt-2 text-left"
          >
            <div className="mb-4">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                value={itemName}
                onChange={(e) =>
                  setItemName(e.target.value)
                }
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="itemDescription">
                Item Description
              </Label>
              <Textarea
                id="itemDescription"
                value={itemDescription}
                onChange={(e) =>
                  setItemDescription(e.target.value)
                }
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="price">Price (in STX)</Label>
              <Input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="location">
                Location (State/Country)
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="contact">
                Contact (Discord username or phone)
              </Label>
              <Input
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              List Item
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
