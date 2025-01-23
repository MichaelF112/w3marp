import React, { useState, useEffect } from 'react';
import { getListedItems } from '../utils/contractInteractions';
import { Trash2 } from 'lucide-react';

export function ListedItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const listedItems = await getListedItems();
      setItems(listedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">
        My Listed Items
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-500">
          You haven't listed any items yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
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
                  {item.description}
                </p>
                <p className="text-gray-600 mb-2">
                  Location: {item.location}
                </p>
                <p className="text-gray-600 mb-2">
                  Contact: {item.contact}
                </p>
                <div className=' flex justify-between'>
                  <p className="text-xl font-bold">
                    {item.price} STX
                  </p>{" "}
                  <Trash2 className=' cursor-pointer hover:text-red-700' aria-label='delete listed item' />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}