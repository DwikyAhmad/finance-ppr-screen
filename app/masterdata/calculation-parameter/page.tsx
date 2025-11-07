"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface MasterData {
    id: number;
    category: string;
    name: string;
    valueText: string;
    valueNumber: string | null;
    createdAt: string;
    updatedAt: string;
}

export default function CalculationParameterPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MasterData | null>(null);
    const [formData, setFormData] = useState({
        category: "Inflation",
        name: "",
        valueText: "",
        valueNumber: "",
    });

    // Sample data
    const [data, setData] = useState<MasterData[]>([
        {
            id: 1,
            category: "Inflation",
            name: "Labor",
            valueText: "3.00%",
            valueNumber: null,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
        },
        {
            id: 2,
            category: "Inflation",
            name: "FOH Fix",
            valueText: "1.75%",
            valueNumber: null,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
        },
        {
            id: 3,
            category: "Inflation",
            name: "FOH Var",
            valueText: "1.75%",
            valueNumber: null,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
        },
        {
            id: 4,
            category: "Inflation",
            name: "Depre",
            valueText: "Keep",
            valueNumber: null,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
        },
        {
            id: 5,
            category: "CR",
            name: "Labor",
            valueText: "-1.70%",
            valueNumber: null,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
        },
        {
            id: 6,
            category: "CR",
            name: "FOH Fix",
            valueText: "-1.30%",
            valueNumber: null,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
        },
        {
            id: 7,
            category: "CR",
            name: "FOH Var",
            valueText: "-1.30%",
            valueNumber: null,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
        },
        {
            id: 8,
            category: "CR",
            name: "Depre",
            valueText: "Keep",
            valueNumber: null,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
        },
        {
            id: 9,
            category: "Volume",
            name: "TR",
            valueText: "7%",
            valueNumber: null,
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
      },
      {
        id: 10,
        category: "Volume",
        name: "NR",
        valueText: "-11%",
        valueNumber: null,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
    ]);

    const filteredData = data.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.valueText.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.valueNumber && item.valueNumber.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
            categoryFilter === "all" || item.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    const handleOpenDialog = (item?: MasterData) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                category: item.category,
                name: item.name,
                valueText: item.valueText,
                valueNumber: item.valueNumber || "",
            });
        } else {
            setEditingItem(null);
            setFormData({
                category: "Inflation",
                name: "",
                valueText: "",
                valueNumber: "",
            });
        }
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        const dataToSave = {
            ...formData,
            valueNumber: formData.valueNumber.trim() === "" ? null : formData.valueNumber,
        };
        
        if (editingItem) {
            // Update existing item
            setData(
                data.map((item) =>
                    item.id === editingItem.id
                        ? {
                              ...item,
                              ...dataToSave,
                              updatedAt: new Date().toISOString().split("T")[0],
                          }
                        : item
                )
            );
        } else {
            // Create new item
            const newItem: MasterData = {
                id: Math.max(...data.map((d) => d.id)) + 1,
                ...dataToSave,
                createdAt: new Date().toISOString().split("T")[0],
                updatedAt: new Date().toISOString().split("T")[0],
            };
            setData([...data, newItem]);
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this item?")) {
            setData(data.filter((item) => item.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 py-10 px-6">
            <div className="max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 border-gray-300 hover:bg-gray-50"
                            onClick={() => router.push("/")}
                        >
                            <ArrowLeft size={20} />
                        </Button>
                         <h1 className="text-3xl font-bold text-gray-800">
                             Assumption Master
                         </h1>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="mb-6">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 h-10"
                            onClick={() => handleOpenDialog()}
                        >
                            <Plus size={18} className="mr-2" />
                            New
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Search by name or value
                            </label>
                            <div className="relative">
                                <Input
                                    placeholder="Search master data..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pr-10"
                                />
                                <Button
                                    size="icon"
                                    className="absolute right-0 top-0 h-full bg-blue-600 hover:bg-blue-700 rounded-l-none"
                                >
                                    <Search size={18} />
                                </Button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Filter by category
                            </label>
                            <Select
                                value={categoryFilter}
                                onValueChange={setCategoryFilter}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                 <SelectContent>
                                     <SelectItem value="all">
                                         All Categories
                                     </SelectItem>
                                     <SelectItem value="Inflation">
                                         Inflation
                                     </SelectItem>
                                     <SelectItem value="CR">CR</SelectItem>
                                     <SelectItem value="Volume">Volume</SelectItem>
                                 </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-blue-600 hover:bg-blue-600">
                                <TableHead className="text-white font-semibold">
                                    ID
                                </TableHead>
                                <TableHead className="text-white font-semibold">
                                    Category
                                </TableHead>
                                <TableHead className="text-white font-semibold">
                                    Name
                                </TableHead>
                                <TableHead className="text-white font-semibold">
                                    ValueText
                                </TableHead>
                                <TableHead className="text-white font-semibold">
                                    ValueNumber
                                </TableHead>
                                <TableHead className="text-white font-semibold">
                                    createdAt
                                </TableHead>
                                <TableHead className="text-white font-semibold">
                                    updatedAt
                                </TableHead>
                                <TableHead className="text-white font-semibold">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {item.id}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={
                                                "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                            }
                                        >
                                            {item.category}
                                        </Badge>
                                    </TableCell>
                                     <TableCell>{item.name}</TableCell>
                                     <TableCell>{item.valueText || "-"}</TableCell>
                                     <TableCell>{item.valueNumber || "-"}</TableCell>
                                     <TableCell>{item.createdAt}</TableCell>
                                     <TableCell>{item.updatedAt}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                                onClick={() =>
                                                    handleOpenDialog(item)
                                                }
                                            >
                                                <Pencil
                                                    size={14}
                                                    className="mr-1"
                                                />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-600 border-red-600 hover:bg-red-50"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >
                                                <Trash2
                                                    size={14}
                                                    className="mr-1"
                                                />
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Create/Edit Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                             <DialogTitle>
                                 {editingItem ? "Edit" : "Create"} Assumption
                             </DialogTitle>
                             <DialogDescription>
                                 {editingItem ? "Update" : "Add new"} assumption
                                 data. Click save when you&apos;re
                                 done.
                             </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    Category
                                </label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            category: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                     <SelectContent>
                                         <SelectItem value="Inflation">
                                             Inflation
                                         </SelectItem>
                                         <SelectItem value="CR">CR</SelectItem>
                                         <SelectItem value="Volume">Volume</SelectItem>
                                     </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    Name
                                </label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="Name"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">
                                    Value Text
                                </label>
                                <Input
                                    value={formData.valueText}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            valueText: e.target.value,
                                        })
                                    }
                                    placeholder="Value Text"
                                />
                            </div>
                             <div className="grid gap-2">
                                 <label className="text-sm font-medium">
                                     Value Number
                                 </label>
                                 <Input
                                     type="text"
                                     value={formData.valueNumber}
                                     onChange={(e) =>
                                         setFormData({
                                             ...formData,
                                             valueNumber: e.target.value,
                                         })
                                     }
                                     placeholder="Value Number"
                                 />
                             </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Save
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
