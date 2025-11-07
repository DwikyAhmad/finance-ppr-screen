"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Calculator, 
  TrendingUp, 
  CheckCircle, 
  Download, 
  Upload, 
  Activity,
  Table,
  Calendar,
  ArrowRight
} from "lucide-react";

interface ProcessCardProps {
  icon: React.ReactNode;
  title: string;
  lastUpdated: string;
  buttons: {
    label: string;
    icon: React.ReactNode;
    variant?: "default" | "outline";
    onClick?: () => void;
  }[];
}

function ProcessCard({ icon, title, lastUpdated, buttons }: ProcessCardProps) {
  return (
    <Card className="w-[240px] h-[320px] hover:shadow-lg transition-all duration-200 border-gray-200/60 shadow-sm">
      <CardContent className="p-3 flex flex-col items-center h-full">
        <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-50 to-blue-100/50 flex items-center justify-center mb-4 shadow-sm">
          <div className="text-blue-600">
            {icon}
          </div>
        </div>
        
        <h3 className="text-[15px] font-semibold text-gray-800 mb-2.5 text-center leading-snug px-1 min-h-[40px] flex items-center">
          {title}
        </h3>
        
        <div className="text-[12px] text-gray-500 mb-5 flex flex-col items-center gap-0.5">
          <span className="font-normal">Last Updated:</span>
          <span className="font-medium flex items-center gap-1.5 text-gray-600">
            <Calendar size={12} className="text-gray-400" />
            {lastUpdated}
          </span>
        </div>
        
        <div className="flex flex-col gap-2 w-full mt-auto">
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant || "default"}
              className={`w-full h-9 text-[13px] font-medium transition-all duration-200 ${
                button.variant === "outline" 
                  ? "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400 shadow-sm" 
                  : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
              }`}
              onClick={button.onClick}
            >
              {button.icon}
              {button.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const processes = [
    {
      icon: <Database size={26} />,
      title: "Data Synchronization",
      lastUpdated: "12/15/2024 14:30",
      buttons: [
        {
          label: "Download",
          icon: <Download size={15} className="mr-1.5" />,
          variant: "outline" as const,
        },
        {
          label: "Upload",
          icon: <Upload size={15} className="mr-1.5" />,
          variant: "default" as const,
        },
      ],
    },
    {
      icon: <Calculator size={26} />,
      title: "Inhouse Monthly Average Calculation",
      lastUpdated: "12/15/2024 13:45",
      buttons: [
        {
          label: "Download",
          icon: <Download size={15} className="mr-1.5" />,
          variant: "outline" as const,
        },
        {
          label: "Upload",
          icon: <Upload size={15} className="mr-1.5" />,
          variant: "default" as const,
        },
      ],
    },
    {
      icon: <TrendingUp size={26} />,
      title: "Cost Movement",
      lastUpdated: "12/15/2024 15:00",
      buttons: [
        {
          label: "Analyze",
          icon: <Activity size={15} className="mr-1.5" />,
          variant: "default" as const,
        },
      ],
    },
    {
      icon: <CheckCircle size={26} />,
      title: "Approval to DH",
      lastUpdated: "12/15/2024 15:00",
      buttons: [
        {
          label: "Start",
          icon: <Activity size={15} className="mr-1.5" />,
          variant: "default" as const,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 py-10 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Tabs */}
        <div className="flex gap-3 mb-12">
          <Button 
            variant="outline" 
            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm h-10 px-4 text-[14px] font-medium transition-all"
          >
            <Table size={16} className="mr-2" />
            Maintain Master Data
          </Button>
        </div>

        {/* Process Cards with Arrows */}
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-4">
          {processes.map((process, index) => (
            <div key={index} className="flex items-center">
              <ProcessCard {...process} />
              {index < processes.length - 1 && (
                <div className="hidden lg:flex mx-2 xl:mx-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-200/60 flex items-center justify-center">
                    <ArrowRight size={20} className="text-gray-500" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
