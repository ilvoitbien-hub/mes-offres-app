"use client";
import React from "react";

type Props = {
    villes: string[];
    contrats: string[];
    onFilter: (params: { ville?: string; contrat?: string; search?: string }) => void;
    initial?: { ville?: string; contrat?: string; search?: string };
};

export default function Filters({ villes, contrats, onFilter, initial }: Props) {
    const [ville, setVille] = React.useState(initial?.ville || "");
    const [contrat, setContrat] = React.useState(initial?.contrat || "");
    const [search, setSearch] = React.useState(initial?.search || "");

    function submitFilters() {
        onFilter({ ville: ville || undefined, contrat: contrat || undefined, search: search || undefined });
    }

    return (
        <div className="p-4 bg-white rounded-md shadow-sm">
            <div className="flex gap-2">
                <select value={ville} onChange={e => setVille(e.target.value)} className="input">
                    <option value="">Toutes les villes</option>
                    {villes.map(v => <option key={v} value={v}>{v}</option>)}
                </select>

                <select value={contrat} onChange={e => setContrat(e.target.value)} className="input">
                    <option value="">Tous les contrats</option>
                    {contrats.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Recherche..."
                    className="input flex-1"
                    onKeyDown={e => { if (e.key === "Enter") submitFilters(); }}
                />

                <button onClick={submitFilters} className="btn">Filtrer</button>
                <button onClick={() => { setVille(""); setContrat(""); setSearch(""); onFilter({}); }} className="btn-ghost">Reset</button>
            </div>
        </div>
    );
}
