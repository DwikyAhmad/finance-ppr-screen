"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

interface GPQData {
    sequenceNo: string;
    period: string;
    companyCode: string;
    plant: string;
    groupCountry: string;
    costCenter: string;
    material: string;
    materialRef: string;
    gpq: number;
    baseQuantity: number;
    billhPerBaseQty: number;
    gpqRatio: number;
    earnedHourPerPlan: number;
    exterior: string;
    colourType: string;
    deletionFlag: string;
    source: string;
    createdBy: string;
    createdOn: string;
}

export default function GPQMasterPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [periodFilter, setPeriodFilter] = useState("all");

    // Sample data from the spreadsheet
    const data: GPQData[] = [
        {
            sequenceNo: "F025",
            period: "Q4 2025",
            companyCode: "4009",
            plant: "4331",
            groupCountry: "10",
            costCenter: "AKS200",
            material: "GGN155L-SDTHK AA",
            materialRef: "GGN155L-SDTHK AA",
            gpq: 16,
            baseQuantity: 1.000,
            billhPerBaseQty: 114.296120,
            gpqRatio: 100.00,
            earnedHourPerPlan: 1828.738,
            exterior: "",
            colourType: "",
            deletionFlag: "",
            source: "PRODUCTION CONFIRMATION (FF BTC_PP_TMMI",
            createdBy: "",
            createdOn: "5/5/2025",
        },
        {
            sequenceNo: "F040",
            period: "Q4 2025",
            companyCode: "4009",
            plant: "4331",
            groupCountry: "10",
            costCenter: "AKS200",
            material: "GGN155L-SDTHKV AA",
            materialRef: "GGN155L-SDTHKV AA",
            gpq: 14,
            baseQuantity: 1.000,
            billhPerBaseQty: 114.917120,
            gpqRatio: 100.00,
            earnedHourPerPlan: 1608.840,
            exterior: "",
            colourType: "",
            deletionFlag: "",
            source: "PRODUCTION CONFIRMATION (FF BTC_PP_TMMI",
            createdBy: "",
            createdOn: "5/5/2025",
        },
        {
            sequenceNo: "F055",
            period: "Q4 2025",
            companyCode: "4009",
            plant: "4331",
            groupCountry: "10",
            costCenter: "AKS200",
            material: "GGN155L-SDTHKV AD",
            materialRef: "GGN155L-SDTHKV AD",
            gpq: 5,
            baseQuantity: 1.000,
            billhPerBaseQty: 114.917120,
            gpqRatio: 100.00,
            earnedHourPerPlan: 574.586,
            exterior: "",
            colourType: "",
            deletionFlag: "",
            source: "PRODUCTION CONFIRMATION (FF BTC_PP_TMMI",
            createdBy: "",
            createdOn: "5/5/2025",
        },
        {
            sequenceNo: "F070",
            period: "Q4 2025",
            companyCode: "4009",
            plant: "4331",
            groupCountry: "10",
            costCenter: "AKS200",
            material: "GGN155L-SDTHKV AF",
            materialRef: "GGN155L-SDTHKV AF",
            gpq: 6,
            baseQuantity: 1.000,
            billhPerBaseQty: 114.917120,
            gpqRatio: 100.00,
            earnedHourPerPlan: 574.586,
            exterior: "",
            colourType: "",
            deletionFlag: "",
            source: "PRODUCTION CONFIRMATION (FF BTC_PP_TMMI",
            createdBy: "",
            createdOn: "5/5/2025",
        },
        {
            sequenceNo: "F085",
            period: "Q4 2025",
            companyCode: "4009",
            plant: "4331",
            groupCountry: "10",
            costCenter: "AKS200",
            material: "GGN155L-SDTHKV AQ",
            materialRef: "GGN155L-SDTHKV AQ",
            gpq: 35,
            baseQuantity: 1.000,
            billhPerBaseQty: 114.917120,
            gpqRatio: 100.00,
            earnedHourPerPlan: 4022.099,
            exterior: "",
            colourType: "",
            deletionFlag: "",
            source: "PRODUCTION CONFIRMATION (FF BTC_PP_TMMI",
            createdBy: "",
            createdOn: "5/5/2025",
        },
    ];

    const filteredData = data.filter((item) => {
        const matchesSearch =
            item.sequenceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.materialRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.costCenter.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPeriod =
            periodFilter === "all" || item.period === periodFilter;

        return matchesSearch && matchesPeriod;
    });

    const handleRefresh = () => {
        // Simulate data refresh
        alert("Data refreshed from system");
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 py-10 px-6">
            <div className="max-w-[1800px] mx-auto">
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
                            GPQ Master
                        </h1>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Search by sequence, material, or cost center
                            </label>
                            <div className="relative">
                                <Input
                                    placeholder="Search GPQ data..."
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
                                Filter by period
                            </label>
                            <Select
                                value={periodFilter}
                                onValueChange={setPeriodFilter}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="All Periods" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Periods
                                    </SelectItem>
                                    <SelectItem value="Q4 2025">
                                        Q4 2025
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-blue-600 hover:bg-blue-600">
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Sequence No
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Period
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Company Code
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Plant
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Group Country
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Cost Center
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Material
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Material Ref
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    GPQ
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Base Quantity
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    BillH Per Base Qty
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    GPQ Ratio
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Earned hour per plan
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Exterior
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Colour type
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Deletion Flag
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Source
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Created By
                                </TableHead>
                                <TableHead className="text-white font-semibold whitespace-nowrap">
                                    Created On
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium whitespace-nowrap">
                                        {item.sequenceNo}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {item.period}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {item.companyCode}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {item.plant}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {item.groupCountry}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {item.costCenter}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {item.material}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {item.materialRef}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {item.gpq}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {item.baseQuantity.toFixed(3)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {item.billhPerBaseQty.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {item.gpqRatio.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {item.earnedHourPerPlan.toFixed(3)}
                                    </TableCell>
                                    <TableCell>{item.exterior || "-"}</TableCell>
                                    <TableCell>{item.colourType || "-"}</TableCell>
                                    <TableCell>{item.deletionFlag || "-"}</TableCell>
                                    <TableCell className="whitespace-nowrap max-w-[300px] truncate">
                                        {item.source}
                                    </TableCell>
                                    <TableCell>{item.createdBy || "-"}</TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {item.createdOn}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    Showing {filteredData.length} of {data.length} records
                </div>
            </div>
        </div>
    );
}

