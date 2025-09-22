import { NextResponse } from "next/server";
import axios from "axios";
import { BackendResponse } from "@/lib/api";

const BACKEND_BASE = process.env.BACKEND_BASE || "http://localhost:8080";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const queryParams: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            queryParams[key] = value;
        });

        const backendRes = await axios.get<BackendResponse>(`${BACKEND_BASE}/api/offres`, {
            params: queryParams,
        });

        return NextResponse.json(backendRes.data);
    } catch (err: any) {
        console.error("Erreur proxy API:", err?.message || err);
        return NextResponse.json(
            { message: "Erreur proxy", detail: err?.message || err },
            { status: 500 }
        );
    }
}
