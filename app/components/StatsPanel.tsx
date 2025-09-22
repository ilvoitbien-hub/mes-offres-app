"use client";
import React from "react";

export default function StatsPanel({ stats }: { stats?: any }) {
    if (!stats) return null;
    return (
        <div className="p-4 bg-white rounded-md shadow-sm">
            <h4 className="font-semibold mb-2">Statistiques</h4>
            <ul className="text-sm space-y-1">
                {Object.entries(stats).map(([k, v]) => (
                    <li key={k} className="flex justify-between">
                        <span className="capitalize">{k}</span>
                        <span>{String(v)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
