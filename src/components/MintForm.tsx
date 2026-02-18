"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/config/contract";

export function MintForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    website: "",
  });
  const [error, setError] = useState<string | null>(null);

  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleMint = async () => {
    setError(null);
    try {
      if (!formData.name.trim()) throw new Error("Name is required");
      if (!formData.image.trim()) throw new Error("Image URL is required");

      const metadata = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        external_url: formData.website || undefined,
      };

      const minified = JSON.stringify(metadata);
      const encoded = btoa(minified);

      if (encoded.length > 90000) {
        throw new Error(
          `Metadata too large: ${encoded.length} bytes (max ~90k)`,
        );
      }

      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "mint",
        args: [encoded],
      });
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-6">Mint Soulbound</h2>

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Name *
          </label>
          <input
            name="name"
            className="input-field"
            placeholder="My Monad Identity"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            className="input-field min-h-[80px]"
            placeholder="A brief description..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Image URL *
          </label>
          <input
            name="image"
            className="input-field"
            placeholder="https://ipfs.io/ipfs/..."
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Website (Optional)
          </label>
          <input
            name="website"
            className="input-field"
            placeholder="https://monad.xyz"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-sm mb-4 bg-red-900/20 p-2 rounded border border-red-900/50">
          {error}
        </div>
      )}

      <button
        className="btn-primary w-full mt-6"
        onClick={handleMint}
        disabled={isPending || isConfirming}
      >
        {isPending ? "Confirming..." : isConfirming ? "Minting..." : "Mint SBT"}
      </button>

      {hash && (
        <div className="mt-4 text-xs break-all text-gray-400">Tx: {hash}</div>
      )}
      {isConfirmed && (
        <div className="mt-4 text-green-400 font-bold text-center">
          Minted successfully!
        </div>
      )}
    </div>
  );
}
