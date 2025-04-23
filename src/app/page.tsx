// 'use client';
// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { z } from 'zod';
// import { Switch } from '@/components/ui/switch';
// import { FiPlus } from 'react-icons/fi'; // Assuming you have imported the required ico
// import { FaUser, FaChair, FaGlobe } from 'react-icons/fa';
// import { Card } from '@/components/ui/card';
// import { TableIcon } from 'lucide-react';

// type ImageName = 'Mid' | 'Table'; // Define type for image names

// const FormSchema = z.object({
//   username: z.string().min(2, {
//     message: 'Username must be at least 2 characters.',
//   }),
// });

// const Home: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<ImageName | null>(null); // State to track selected image

//   const handleImageClick = (imageName: ImageName) => {
//     setSelectedImage(imageName);
//   };

//   return (
//     <div className="grid grid-cols-4">
//       <div
//         className={`col-span-1 pl-10 border-r-2 border-b-2 border-gray-300 font-bold `}
//       >
//         Tables
//       </div>
//       <div
//         className={`col-span-3 pl-10 border-b-2 border-gray-300 font-bold flex justify-between items-center`}
//       >
//         Main Room
//         <div className="flex space-x-4">
//           <Button>
//             <FiPlus className="animate-pulse" />
//             Add room
//           </Button>
//           <Button>Save Room</Button>
//         </div>
//       </div>

//       <div className="col-span-1  border-r-2 border-b-2 border-gray-300">
//         <div className="p-5 border-b-2">
//           <div className="font-bold flex justify-center items-center">
//             Table Option
//           </div>
//           <div className="text-xs flex justify-center items-center">
//             Drag and Drop Your Table
//           </div>
//           <div className="flex pt-8 flex justify-center items-center">
//             <img
//               src="./assets/Mid.svg"
//               alt="Image 1"
//               className={`m-5 cursor-pointer ${
//                 selectedImage === 'Mid'
//                   ? ' p-3 rounded-lg outline-dashed outline-2 outline-offset-2'
//                   : 'p-3'
//               }`}
//               onClick={() => handleImageClick('Mid')}
//             />
//             <img
//               src="./assets/Table.svg"
//               alt="Image 2"
//               className={`m-5 cursor-pointer ${
//                 selectedImage === 'Table'
//                   ? ' p-3 rounded-lg outline-dashed outline-2 outline-offset-2'
//                   : 'p-3'
//               }`}
//               onClick={() => handleImageClick('Table')}
//             />
//           </div>
//         </div>

//         {/* Table Details */}
//         <div className="p-5 ">
//           <div className="font-bold flex justify-center items-center">
//             Table Details
//           </div>

//           {/* table Name */}
//           <div className="flex pt-10 items-center">
//             <Label htmlFor="email" className="w-full">
//               Table Name
//             </Label>
//             <Input placeholder="shadcn" />
//           </div>

//           {/* Min */}
//           <div className="flex pt-5 items-center">
//             <Label htmlFor="email" className="w-full">
//               Min Covers
//             </Label>
//             <Button className="rounded-full ">+</Button>
//             <div className="font-bold pl-3 pr-3">1</div>
//             <Button className="rounded-full">-</Button>
//           </div>

//           {/* Max */}
//           <div className="flex pt-5 items-center">
//             <Label htmlFor="email" className="w-full">
//               Max Covers
//             </Label>
//             <Button className="rounded-full ">+</Button>
//             <div className="font-bold pl-3 pr-3">1</div>
//             <Button className="rounded-full">-</Button>
//           </div>

//           {/* Online */}
//           <div className="flex pt-5 items-center">
//             <Label htmlFor="email" className="w-full">
//               Online
//             </Label>
//             <span className="text-red-500">Active</span>
//             <Switch />
//           </div>
//         </div>
//       </div>

//       <div className="col-span-3 w-full">
//         <div className="border border-solid border-gray-300 rounded-xl bg-gray-200 p-4 col-span-3 m-1 w-full h-full">
//           {/* Content goes here */}
//         </div>
//         <div className="flex justify-center">
//           <Card className="w-2/5">
//             <div className="flex justify-center gap-2 p-1 bg-black rounded-md text-white">
//               <div className="flex items-center">
//                 <TableIcon className=" mr-2 text-gray-600" />
//                 <div>Tables</div>
//               </div>
//               <div className="flex items-center">
//                 <FaUser className=" mr-2 text-gray-600" />
//                 <div>Main Covers</div>
//               </div>
//               <div className="flex items-center">
//                 <FaChair className=" mr-2 text-gray-600" />
//                 <div>Max Covers</div>
//               </div>
//               <div className="flex items-center">
//                 <FaGlobe className=" mr-2 text-gray-600" />
//                 <div>Online Capacity</div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// 'use client';
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { toast } from '@/components/ui/use-toast';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Switch } from '@/components/ui/switch';
// import { FiPlus } from 'react-icons/fi';
// import { FaUser, FaChair, FaGlobe } from 'react-icons/fa';
// import { Card } from '@/components/ui/card';
// import { TableIcon } from 'lucide-react';
// import { RootState } from './store';
// import { addTable, updateTable, removeTable } from './features/tableSlice';
// import { addRoom, removeRoom } from './features/roomSlice';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { Provider } from 'react-redux';
// import store from './store';

// type ImageName = 'Mid' | 'Table'; // Define type for image names

// const FormSchema = z.object({
//   username: z.string().min(2, {
//     message: 'Username must be at least 2 characters.',
//   }),
// });

// const Home: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<ImageName | null>(null); // State to track selected image
//   const dispatch = useDispatch();
//   const tables = useSelector((state: RootState) => state.tables.tables);
//   const rooms = useSelector((state: RootState) => state.rooms.rooms);

//   const form = useForm({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       username: '',
//     },
//   });

//   const handleImageClick = (imageName: ImageName) => {
//     setSelectedImage(imageName);
//   };

//   const onDragEnd = (result: any) => {
//     if (!result.destination) {
//       return;
//     }
//     const items = Array.from(tables);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     // Update your state or dispatch an action to update the Redux store with the new order
//   };

//   const onSubmit = (data: any) => {
//     toast({
//       title: 'You submitted the following values:',
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//   };

//   return (
//     <Provider store={store}>
//       <div className="grid grid-cols-4">
//         <div
//           className={`col-span-1 pl-10 border-r-2 border-b-2 border-gray-300 font-bold `}
//         >
//           Tables
//         </div>
//         <div
//           className={`col-span-3 pl-10 border-b-2 border-gray-300 font-bold flex justify-between items-center`}
//         >
//           Main Room
//           <div className="flex space-x-4">
//             <Button
//               onClick={() =>
//                 dispatch(addRoom({ id: 'room1', name: 'New Room' }))
//               }
//             >
//               <FiPlus className="animate-pulse" />
//               Add room
//             </Button>
//             <Button>Save Room</Button>
//           </div>
//         </div>

//         <div className="col-span-1 border-r-2 border-b-2 border-gray-300">
//           <div className="p-5 border-b-2">
//             <div className="font-bold flex justify-center items-center">
//               Table Option
//             </div>
//             <div className="text-xs flex justify-center items-center">
//               Drag and Drop Your Table
//             </div>
//             <div className="flex pt-8 flex justify-center items-center">
//               <img
//                 src="./assets/Mid.svg"
//                 alt="Image 1"
//                 className={`m-5 cursor-pointer ${
//                   selectedImage === 'Mid'
//                     ? ' p-3 rounded-lg outline-dashed outline-2 outline-offset-2'
//                     : 'p-3'
//                 }`}
//                 onClick={() => handleImageClick('Mid')}
//               />
//               <img
//                 src="./assets/Table.svg"
//                 alt="Image 2"
//                 className={`m-5 cursor-pointer ${
//                   selectedImage === 'Table'
//                     ? ' p-3 rounded-lg outline-dashed outline-2 outline-offset-2'
//                     : 'p-3'
//                 }`}
//                 onClick={() => handleImageClick('Table')}
//               />
//             </div>
//           </div>

//           <div className="p-5">
//             <div className="font-bold flex justify-center items-center">
//               Table Details
//             </div>

//             <div className="flex pt-10 items-center">
//               <Label htmlFor="email" className="w-full">
//                 Table Name
//               </Label>
//               <Input placeholder="shadcn" />
//             </div>

//             <div className="flex pt-5 items-center">
//               <Label htmlFor="email" className="w-full">
//                 Min Covers
//               </Label>
//               <Button className="rounded-full ">+</Button>
//               <div className="font-bold pl-3 pr-3">1</div>
//               <Button className="rounded-full">-</Button>
//             </div>

//             <div className="flex pt-5 items-center">
//               <Label htmlFor="email" className="w-full">
//                 Max Covers
//               </Label>
//               <Button className="rounded-full ">+</Button>
//               <div className="font-bold pl-3 pr-3">1</div>
//               <Button className="rounded-full">-</Button>
//             </div>

//             <div className="flex pt-5 items-center">
//               <Label htmlFor="email" className="w-full">
//                 Online
//               </Label>
//               <span className="text-red-500">Active</span>
//               <Switch />
//             </div>
//           </div>
//         </div>

//         <div className="col-span-3 w-full">
//           <div className="border border-solid border-gray-300 rounded-xl bg-gray-200 p-4 col-span-3 m-1 w-full h-full">
//             {/* Content goes here */}
//             <DragDropContext onDragEnd={onDragEnd}>
//               <Droppable droppableId="tables">
//                 {(provided) => (
//                   <div {...provided.droppableProps} ref={provided.innerRef}>
//                     {tables.map((table, index) => (
//                       <Draggable
//                         key={table.id}
//                         draggableId={table.id}
//                         index={index}
//                       >
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                           >
//                             <div className="p-2 m-2 bg-gray-200 rounded-md">
//                               {table.name}
//                             </div>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>
//           </div>
//           <div className="flex justify-center">
//             <Card className="w-2/5">
//               <div className="flex justify-center gap-2 p-1 bg-black rounded-md text-white">
//                 <div className="flex items-center">
//                   <TableIcon className="mr-2 text-gray-600" />
//                   <div>Tables</div>
//                 </div>
//                 <div className="flex items-center">
//                   <FaUser className="mr-2 text-gray-600" />
//                   <div>Main Covers</div>
//                 </div>
//                 <div className="flex items-center">
//                   <FaChair className="mr-2 text-gray-600" />
//                   <div>Max Covers</div>
//                 </div>
//                 <div className="flex items-center">
//                   <FaGlobe className="mr-2 text-gray-600" />
//                   <div>Online Capacity</div>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </Provider>
//   );
// };

// export default Home;

// pages/_app.tsx
'use client';

import Home from './Home/page';

export default function MainPage() {
  return <Home />;
}
