"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getMessages } from "./actions/generate";

export default function Home() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [generation, setGeneration] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const objPrompt = {
      productTitle: productName,
      productDescription,
    };
    console.log(JSON.stringify(objPrompt));
    const { notifications } = await getMessages(JSON.stringify(objPrompt));

    setGeneration(JSON.stringify(notifications, null, 2));
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <div className="flex-grow overflow-auto p-4 sm:p-10">
        <form
          onSubmit={handleCheck}
          className="flex flex-col gap-4 w-full mb-8"
        >
          <Label htmlFor="product-name">Product Name</Label>
          <Textarea
            id="product-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Label htmlFor="product-description">
            Product Description (optional)
          </Label>
          <Textarea
            id="product-description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Checking..." : "Check Leasability"}
          </Button>
        </form>
      </div>
      <div className="w-full p-4 bg-gray-300 border-t-2 border-gray-400">
        <pre className="text-sm whitespace-pre-wrap max-h-[30vh] overflow-auto">
          {isLoading
            ? "Loading..."
            : generation
            ? generation
            : "No result yet. Try entering a product."}
        </pre>
      </div>
    </main>
  );
}
