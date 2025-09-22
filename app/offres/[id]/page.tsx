import { notFound } from "next/navigation";
import axios from "axios";
import { Offre } from "../../../lib/api";

async function fetchOffre(id: string): Promise<Offre | null> {
    try {
        const res = await axios.get(`/api/offres/${id}`);
        return res.data;
    } catch (err) {
        console.error("Erreur chargement offre:", err);
        return null;
    }
}

export default async function OffreDetailPage({ params }: { params: { id: string } }) {
    const offre = await fetchOffreSSR(params.id);
    if (!offre) return notFound();

    return (
        <main className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">{offre.intitule}</h1>
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>{offre.entreprise}</span>
                <span>{offre.ville} — {offre.typeContrat}</span>
            </div>

            <p className="text-base leading-6 whitespace-pre-line">{offre.description}</p>
            <div>
                <div className="flex justify-between text-sm text-muted-foreground">
                    <a href="/" className="text-blue-600 hover:underline text-sm">← Retour à la liste</a>

                </div>
                <div className="flex flex-row-reverse justify-between text-sm text-muted-foreground">
                    {offre.origineOffre && (
                        <a
                            href={offre.origineOffre}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            Postuler
                        </a>
                    )}
                </div>
            </div>



            </main>
    );
}

// ✅ Fonction spéciale pour SSR avec axios (besoin d'URL absolue)
async function fetchOffreSSR(id: string): Promise<Offre | null> {
    const baseUrl = process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000";
    try {
        const res = await axios.get(`${baseUrl}/api/offres/${id}`);
        return res.data;
    } catch (err) {
        console.error("Erreur chargement offre SSR:", err);
        return null;
    }
}
