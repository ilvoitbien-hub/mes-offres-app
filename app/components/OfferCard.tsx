"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Offre } from "@/lib/api";

export default function OfferCard({ offre }: { offre: Offre }) {
    const router = useRouter();

    return (
        <div
            className="p-4 border rounded-md shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => router.push(`/offres/${offre.id}`)}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">{offre.intitule}</h3>
                    <p className="text-sm text-muted-foreground">{offre.entreprise || "Entreprise inconnue"}</p>
                </div>
                <div className="text-right">
                    <span className="text-sm">{offre.ville}</span>
                    <div className="text-xs text-slate-500">{offre.typeContrat}</div>
                </div>
            </div>
            <p className="mt-3 text-sm line-clamp-3">{offre.description || "Pas de description."}</p>
        </div>
    );
}
