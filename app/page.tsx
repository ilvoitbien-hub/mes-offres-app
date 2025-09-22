"use client";
import React from "react";
import OfferCard from "./components/OfferCard";
import Filters from "./components/Filters";
import StatsPanel from "./components/StatsPanel";
import Pagination from "./components/Pagination";
import { Offre } from "@/lib/api";
import axios from "axios";

export default function HomePage() {
  const [offres, setOffres] = React.useState<Offre[]>([]);
  const [villes, setVilles] = React.useState<string[]>([]);
  const [contrats, setContrats] = React.useState<string[]>([]);
  const [stats, setStats] = React.useState<any>(null);

  const [page, setPage] = React.useState(0);
  const size = 10;
  const [totalPages, setTotalPages] = React.useState(1);

  const [filters, setFilters] = React.useState<{ ville?: string; contrat?: string; search?: string }>({});

  const fetchData = React.useCallback(async () => {
    try {
      const params = { page, size, ...filters };
      const res = await axios.get("/api/offres", { params });
      setOffres(res.data.offres ?? []);
      setVilles(res.data.villesDisponibles ?? []);
      setContrats(res.data.contratsDisponibles ?? []);
      setStats(res.data.stats ?? {});
      setTotalPages(res.data.totalPages ?? 1);
    } catch (err) {
      console.error("Erreur lors du chargement des offres", err);
    }
  }, [page, filters]);

  React.useEffect(() => { fetchData(); }, [fetchData]);

  return (
      <main className="p-6 max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Offres d'emploi</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Filters villes={villes} contrats={contrats} onFilter={(f) => { setFilters(f); setPage(0); }} />
            <div className="grid gap-4">
              {offres.length > 0 ? (
                  offres.map((o) => <OfferCard key={o.id} offre={o} />)
              ) : (
                  <p className="text-gray-500">Aucune offre trouvée.</p>
              )}
            </div>
            <Pagination page={page + 1} pageSize={size} total={totalPages * size} onChange={(p) => setPage(p - 1)} />
          </div>
          <aside><StatsPanel stats={stats} /></aside>
        </div>
      </main>
  );
}
