// import { ContractCallOptions } from "@stacks/connect";

const CONTRACT_ADDRESS =
  "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
const CONTRACT_NAME = "marketplace";

export const listItem = async (
  name,
  description,
  price,
  category,
  location,
  contact
) => {
  console.log("Listing item:", {
    name,
    description,
    price,
    category,
    location,
    contact,
  });
  // Simulating a successful listing
  return Promise.resolve();
};

export const getListedItems = async () => {
  // Mock data with more details
  return [
    {
      id: 1,
      seller: "ST1...",
      name: "Vintage Camera",
      description: "A classic film camera",
      price: 100,
      image: "https://picsum.photos/seed/camera/300/200",
      category: "Electronics",
      location: "New York, USA",
      contact: "seller1#1234",
    },
    {
      id: 2,
      seller: "ST2...",
      name: "Designer Handbag",
      description: "Luxury leather handbag",
      price: 200,
      image: "https://picsum.photos/seed/handbag/300/200",
      category: "Fashion",
      location: "Paris, France",
      contact: "seller2#5678",
    },
    {
      id: 3,
      seller: "ST3...",
      name: "Smart Home Hub",
      description: "Control your home with voice",
      price: 150,
      image: "https://picsum.photos/seed/smarthome/300/200",
      category: "Electronics",
      location: "San Francisco, USA",
      contact: "seller3#9012",
    },
    {
      id: 4,
      seller: "ST4...",
      name: "Fitness Tracker",
      description: "Monitor your health and activity",
      price: 80,
      image: "https://picsum.photos/seed/fitness/300/200",
      category: "Health",
      location: "London, UK",
      contact: "seller4#3456",
    },
    {
      id: 5,
      seller: "ST5...",
      name: "Antique Desk Lamp",
      description: "Vintage brass desk lamp",
      price: 120,
      image: "https://picsum.photos/seed/lamp/300/200",
      category: "Home",
      location: "Berlin, Germany",
      contact: "seller5#7890",
    },
  ];
};

export const buyItem = async (
  itemId,
  price,
  deliveryLocation,
  contactMethod,
  contactInfo
) => {
  console.log("Buying item:", {
    itemId,
    price,
    deliveryLocation,
    contactMethod,
    contactInfo,
  });
  // Simulating a successful purchase
  return Promise.resolve();
};

export const getTransactions = async () => {
  // Mock transaction data
  return [
    {
      id: 1,
      type: "sold",
      itemName: "Vintage Camera",
      price: 100,
      date: "2023-05-10T10:30:00Z",
      counterparty: "ST6...",
      state: "delivered",
    },
    {
      id: 2,
      type: "purchased",
      itemName: "Designer Handbag",
      price: 200,
      date: "2023-05-11T14:45:00Z",
      counterparty: "ST2...",
      state: "purchased",
    },
    {
      id: 3,
      type: "sold",
      itemName: "Smart Home Hub",
      price: 150,
      date: "2023-05-09T09:15:00Z",
      counterparty: "ST7...",
      state: "delivered",
    },
    {
      id: 4,
      type: "purchased",
      itemName: "Fitness Tracker",
      price: 80,
      date: "2023-05-12T11:20:00Z",
      counterparty: "ST4...",
      state: "purchased",
    },
    {
      id: 5,
      type: "sold",
      itemName: "Antique Desk Lamp",
      price: 120,
      date: "2023-05-08T16:55:00Z",
      counterparty: "ST8...",
      state: "delivered",
    },
  ];
};

export const getItemDetails = async (itemId) => {
  // Mock item details
  return {
    id: itemId,
    seller: "ST1...",
    name: "Vintage Camera",
    description:
      "A classic film camera in excellent condition",
    price: 100,
    image: "https://picsum.photos/seed/camera/300/200",
    category: "Electronics",
    location: "New York, USA",
    contact: "seller1#1234",
  };
};

export const updateItemState = async (
  transactionId,
  newState
) => {
  console.log("Updating item state:", {
    transactionId,
    newState,
  });
  // Simulating a successful state update
  return Promise.resolve();
};
