"use client";

import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/config/contract";

export function Stats() {
  const { data: maxSupply } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "maxSupply",
  });

  const { data: nextTokenId } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "nextTokenId",
  });

  const { data: dropEndTime } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "dropEndTime",
  });

  // Format end time if exists
  const isEnded =
    dropEndTime &&
    Number(dropEndTime) > 0 &&
    Date.now() / 1000 > Number(dropEndTime);

  return (
    <div className="grid grid-cols-2 gap-4 mb-4 w-full max-w-lg">

      <div className="card card-compact text-center mb-4" style={{ paddingBottom: "2rem" }}>
        <div className="text-sm text-gray-400">Minted</div>
        <div className="text-2xl font-bold">
          {nextTokenId?.toString() || "0"} / {maxSupply?.toString() || "∞"}
        </div>
      </div>

      <div className="card card-compact text-center" style={{ paddingBottom: "2rem" }}>
        <div className="text-sm text-gray-400">Status</div>
        <div
          className={`text-2xl font-bold ${isEnded ? "text-red-400" : "text-green-400"}`}
        >
          {isEnded ? "Ended" : "Live"}
        </div>
      </div>
    </div>
  );
}
