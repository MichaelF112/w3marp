import React, { useState, useEffect } from "react";
import {
  getItemDetails,
  buyItem,
} from "../utils/contractInteractions";
import { Wallet2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { useItemDetailContext } from "@/context/ItemDetailContext";
import {useNavigate} from "react-router-dom";

export function ItemDetailPage({ itemId, onClose }) {
  // const [isLoading, setIsLoading] = useState(true);
  const [deliveryLocation, setDeliveryLocation] =
    useState("");
  const [contactMethod, setContactMethod] =
    useState("discord");
  const [contactInfo, setContactInfo] = useState("");

  const { state } = useItemDetailContext();

  const navigate = useNavigate();

  const handleBuy = async () => {
    if (!state) return;

    try {
      await buyItem(
        () => Promise.resolve(),
        state.id,
        state.price,
        deliveryLocation,
        contactMethod,
        contactInfo
      );
      alert("Item purchased successfully!");
      onClose();
    } catch (error) {
      console.error("Error buying item:", error);
      alert("Failed to purchase item. Please try again.");
    }
  };

  // if (isLoading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  if (!state.name) {
    return (
      <div className="text-center">Item not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-indigo-600 hover:text-indigo-800"
      >
        &larr; Back to Marketplace
      </button>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {state.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {state.category}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Description
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {state.description}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Price
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {state.price} STX
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Seller
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {state.seller}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Location
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {state.location}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Contact
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {state.contact}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Delivery Information
        </h4>
        <form className="space-y-4">
          <div>
            <Label htmlFor="deliveryLocation">
              Delivery Location
            </Label>
            <Input
              id="deliveryLocation"
              value={deliveryLocation}
              onChange={(e) =>
                setDeliveryLocation(e.target.value)
              }
              required
              placeholder="Enter your delivery address"
            />
          </div>
          <div>
            <Label>Preferred Contact Method</Label>
            <RadioGroup
              value={contactMethod}
              onValueChange={setContactMethod}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="discord"
                  id="discord"
                />
                <Label htmlFor="discord">Discord</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone">Phone</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="contactInfo">
              {contactMethod === "discord"
                ? "Discord Username"
                : "Phone Number"}
            </Label>
            <Input
              id="contactInfo"
              value={contactInfo}
              onChange={(e) =>
                setContactInfo(e.target.value)
              }
              required
              placeholder={
                contactMethod === "discord"
                  ? "Enter your Discord username"
                  : "Enter your phone number"
              }
            />
          </div>
        </form>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Purchase Invoice
        </h4>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Item
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {state.name}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Price
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {state.price} STX
                </dd>
              </div>
              <div className="sm:col-span-2">
                <button
                  onClick={handleBuy}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Wallet2 className="mr-2 h-5 w-5" />
                  Purchase Now
                </button>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
