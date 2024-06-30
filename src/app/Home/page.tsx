'use client';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Switch } from '@/components/ui/switch';
import { FiPlus } from 'react-icons/fi'; // Assuming you have imported the required ico
import { FaUser, FaChair, FaGlobe } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import { TableIcon } from 'lucide-react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import styled from 'styled-components';

type ImageName = 'Mid' | 'Table'; // Define type for image names

interface Item {
  id: string;
  itemName: string;
  type: ImageName;
  position: { x: number; y: number };
  minCovers: number;
  maxCovers: number;
  online: boolean;
}

interface ItemDetails {
  itemName: string;
  minCovers: number;
  maxCovers: number;
  online: boolean;
}

// const ItemsContainer = styled.div`
//   color: black;
//   position: relative;
//   background-color: white;
//   width: 100%;
//   height: 100%;
//   border: 4px solid orange;
// `;

const ExampleDiv = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0.3em;
  cursor: move;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageName | null>(null); // State to track selected image

  const [items, setItems] = useState<Item[]>([]);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [tableDetails, setTableDetails] = useState<ItemDetails>({
    itemName: '',
    maxCovers: 0,
    minCovers: 0,
    online: false,
  });

  useEffect(() => {
    // Load items from local storage on component mount
    const existingItems = JSON.parse(
      localStorage.getItem('items') || '[]'
    ) as Item[];
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    // Save items to local storage whenever `items` state changes
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleButtonClick = (
    type: 'Mid' | 'Table',
    name: string,
    min: number,
    max: number,
    online: boolean
  ) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: `${type}-${prevItems.length + 1}`,
        type,
        position: { x: 0, y: 0 },
        itemName: name,
        maxCovers: max,
        minCovers: min,
        online: online,
      },
    ]);
  };

  const handleStop = (id: string, newPosition: { x: number; y: number }) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, position: newPosition } : item
    );
    setItems(updatedItems);
  };
  const handleImageClick = (
    imageName: ImageName,
    name: string,
    min: number,
    max: number,
    online: boolean
  ) => {
    setSelectedImage(imageName);
    handleButtonClick(imageName, name, min, max, online);
    setTableDetails({
      itemName: '',
      maxCovers: 0,
      minCovers: 0,
      online: false,
    });
  };

  const handleNameChange = (id: string, newName: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, itemName: newName } : item
    );
    setItems(updatedItems);
  };

  const incrementMinCovers = () => {
    setTableDetails((prevDetails) => ({
      ...prevDetails,
      minCovers: prevDetails.minCovers + 1,
    }));
  };

  const decrementMinCovers = () => {
    setTableDetails((prevDetails) => ({
      ...prevDetails,
      minCovers: prevDetails.minCovers - 1,
    }));
  };

  const incrementMaxCovers = () => {
    setTableDetails((prevDetails) => ({
      ...prevDetails,
      maxCovers: prevDetails.maxCovers + 1,
    }));
  };

  const decrementMaxCovers = () => {
    setTableDetails((prevDetails) => ({
      ...prevDetails,
      maxCovers: prevDetails.maxCovers - 1,
    }));
  };

  const toggleOnline = () => {
    setTableDetails((prevDetails) => ({
      ...prevDetails,
      online: !prevDetails.online,
    }));
  };

  // Compute the counts and totals
  const tableCount = items.filter((item) => item.type === 'Table').length;
  const midCount = items.filter((item) => item.type === 'Mid').length;

  const totalMinCovers = items.reduce(
    (sum, item) => sum + (item.minCovers || 0),
    0
  );
  const totalMaxCovers = items.reduce(
    (sum, item) => sum + (item.maxCovers || 0),
    0
  );
  const onlineCount = items.filter((item) => item.online).length;

  return (
    <div className="grid grid-cols-4">
      <div
        className={`col-span-1 pl-10 border-r-2 border-b-2 border-gray-300 font-bold `}
      >
        Tables
      </div>
      <div
        className={`col-span-3 pl-10 border-b-2 border-gray-300 font-bold flex justify-between items-center`}
      >
        Main Room
        <div className="flex space-x-4">
          <Button>
            <FiPlus className="animate-pulse" />
            Add room
          </Button>
          <Button>Save Room</Button>
        </div>
      </div>

      <div className="col-span-1  border-r-2 border-b-2 border-gray-300">
        <div className="p-5 border-b-2">
          <div className="font-bold flex justify-center items-center">
            Table Option
          </div>
          <div className="text-xs flex justify-center items-center">
            Drag and Drop Your Table
          </div>
          <div className="flex pt-8 flex justify-center items-center">
            <img
              src="./assets/Mid.svg"
              alt="Image 1"
              className={`m-5 cursor-pointer ${
                selectedImage === 'Mid'
                  ? ' p-3 rounded-lg outline-dashed outline-2 outline-offset-2'
                  : 'p-3'
              }`}
              onClick={() =>
                handleImageClick(
                  'Mid',
                  tableDetails.itemName,
                  tableDetails.maxCovers,
                  tableDetails.minCovers,
                  tableDetails.online
                )
              }
            />
            <img
              src="./assets/Table.svg"
              alt="Image 2"
              className={`m-5 cursor-pointer ${
                selectedImage === 'Table'
                  ? ' p-3 rounded-lg outline-dashed outline-2 outline-offset-2'
                  : 'p-3'
              }`}
              onClick={() =>
                handleImageClick(
                  'Table',
                  tableDetails.itemName,
                  tableDetails.maxCovers,
                  tableDetails.minCovers,
                  tableDetails.online
                )
              }
            />
          </div>
        </div>

        {/* Table Details */}
        <div className="p-5 ">
          <div className="font-bold flex justify-center items-center">
            Table Details
          </div>

          {/* table Name */}
          <div className="flex pt-10 items-center">
            <Label htmlFor="email" className="w-full">
              Table Name
            </Label>
            <Input
              placeholder="Table Name"
              onChange={(e) =>
                setTableDetails((prev) => ({
                  ...prev,
                  itemName: e.target.value,
                }))
              }
              value={tableDetails.itemName}
            />
          </div>

          {/* Min */}
          <div className="flex pt-5 items-center">
            <Label htmlFor="email" className="w-full">
              Min Covers
            </Label>
            <Button className="rounded-full " onClick={incrementMinCovers}>
              +
            </Button>
            <div className="font-bold pl-3 pr-3">{tableDetails.minCovers}</div>
            <Button className="rounded-full" onClick={decrementMinCovers}>
              -
            </Button>
          </div>

          {/* Max */}
          <div className="flex pt-5 items-center">
            <Label htmlFor="email" className="w-full">
              Max Covers
            </Label>
            <Button className="rounded-full " onClick={incrementMaxCovers}>
              +
            </Button>
            <div className="font-bold pl-3 pr-3">{tableDetails.maxCovers}</div>
            <Button className="rounded-full" onClick={decrementMaxCovers}>
              -
            </Button>
          </div>

          {/* Online */}
          <div className="flex pt-5 items-center">
            <Label htmlFor="email" className="w-full">
              Online
            </Label>
            {tableDetails.online ? (
              <span className="text-red-500">Active</span>
            ) : (
              <span className="">Deactive</span>
            )}
            <Switch
              checked={tableDetails.online}
              onCheckedChange={toggleOnline}
            />
          </div>
        </div>
      </div>

      <div className="col-span-3 w-full">
        <div className="border border-solid border-gray-300 rounded-xl bg-gray-200 p-4 col-span-3 m-1 w-full h-full">
          {/* Content goes here */}
          {hasLoaded ? (
            <div>
              {items.map((item) => (
                <Draggable
                  key={item.id}
                  defaultPosition={item.position}
                  position={undefined}
                  nodeRef={nodeRef}
                  onStop={(e: DraggableEvent, data: DraggableData) =>
                    handleStop(item.id, { x: data.x, y: data.y })
                  }
                  bounds={{
                    left: 0,
                    top: 0,
                    right: 1000,
                    bottom: 500,
                  }}
                >
                  <div ref={nodeRef}>
                    <ExampleDiv id={item.id}>
                      <Image
                        src={
                          item.type === 'Table'
                            ? '/assets/Table.svg'
                            : '/assets/Mid.svg'
                        }
                        alt={item.type === 'Table' ? 'Table' : 'Mid'}
                      />
                      <Input
                        placeholder="Enter name"
                        value={item.itemName}
                        onChange={(e) =>
                          handleNameChange(item.id, e.target.value)
                        }
                      />
                    </ExampleDiv>
                  </div>
                </Draggable>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex justify-center">
          <Card className="w-2/5">
            <div className="flex justify-center gap-2 p-1 bg-black rounded-md text-white">
              <div className="flex items-center">
                <TableIcon className="mr-2 text-gray-600" />
                <div>Tables: {tableCount + midCount}</div>
              </div>
              {/* <div className="flex items-center">
                <TableIcon className="mr-2 text-gray-600" />
                <div>Mid: {midCount}</div>
              </div> */}
              <div className="flex items-center">
                <FaUser className="mr-2 text-gray-600" />
                <div>Min Covers: {totalMinCovers}</div>
              </div>
              <div className="flex items-center">
                <FaChair className="mr-2 text-gray-600" />
                <div>Max Covers: {totalMaxCovers}</div>
              </div>
              <div className="flex items-center">
                <FaGlobe className="mr-2 text-gray-600" />
                <div>Online Capacity: {onlineCount}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {JSON.stringify(items)}
    </div>
  );
};

export default Home;
