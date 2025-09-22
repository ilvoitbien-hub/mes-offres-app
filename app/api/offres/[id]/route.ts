import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_BASE = process.env.BACKEND_BASE || "http://localhost:8080";

export async function GET(_: Request, context: { params: { id: string } }) {
    const { params } = await context; // Attendre `params` avant de l'utiliser
    try {
        const backendRes = await axios.get(`${BACKEND_BASE}/api/offres/${params.id}`);
        return NextResponse.json(backendRes.data);
    } catch (err: any) {
        console.error("Erreur API détail offre:", err?.message || err);
        return NextResponse.json({ message: "Offre introuvable" }, { status: 404 });
    }
}
