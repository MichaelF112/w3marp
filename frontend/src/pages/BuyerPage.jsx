import React, { useState, useEffect } from "react";
import { getListedItems } from "../utils/contractInteractions";
import { useItemDetailContext } from "@/context/ItemDetailContext";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ShoppingCart,
  Clock,
  FlameIcon as Fire,
  Grid,
} from "lucide-react";

const categories = [
  "All",
  "Electronics",
  "Technologies",
  "Home",
  "Sports",
  "Books",
  "Clothing",
  "Others",
];

export function BuyerPage({ onItemClick }) {
  const { state, dispatch } = useItemDetailContext();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, selectedCategory]);

  const fetchItems = async () => {
    try {
      const listedItems = await getListedItems();
      setItems(listedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const filterItems = () => {
    let filtered = items;
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (item) => item.category === selectedCategory
      );
    }
    setFilteredItems(filtered);
  };

  const handleItemClick = (item) => {
    dispatch({ type: "SET_DETAIL", payload: item });
    navigate(`/item/${item.id}`);
  };

  const ItemCard = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={item.image || "/placeholder.svg"}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {item.name}
        </h3>
        <p className="text-gray-600 mb-2">
          Seller: {item.seller}
        </p>
        <p className="text-gray-600 mb-2">
          Location: {item.location}
        </p>
        <p className="text-gray-600 mb-2">
          Contact: {item.contact}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {item.price} STX
          </span>
          <button
            onClick={() => handleItemClick(item)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
          >
            <ShoppingCart size={16} className="mr-2" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        The Web3 Marketplace
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <div className="relative w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
            className="w-full md:w-auto pl-10 pr-8 py-2 border rounded-full appearance-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Filter
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      {/* Most Popular Items */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Fire className="mr-2 text-red-500" /> Most
          Popular Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 4)
            .map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
        </div>
      </section>

      {/* Recently Listed Items */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Clock className="mr-2 text-blue-500" /> Recently
          Listed Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems
            .sort(
              (a, b) =>
                new Date(b.listingDate).getTime() -
                new Date(a.listingDate).getTime()
            )
            .slice(0, 4)
            .map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
        </div>
      </section>

      {/* Browse All Items */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Grid className="mr-2 text-green-500" /> Browse
          All Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
