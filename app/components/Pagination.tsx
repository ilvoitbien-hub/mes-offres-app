"use client";
import React from "react";

type Props = {
    page: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
};

export default function Pagination({ page, pageSize, total, onChange }: Props) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const prev = () => onChange(Math.max(1, page - 1));
    const next = () => onChange(Math.min(totalPages, page + 1));

    return (
        <div className="flex items-center justify-between mt-4">
            <div>
                Page {page} / {totalPages} — {total} résultats
            </div>
            <div className="flex gap-2">
                <button onClick={prev} disabled={page <= 1} className="btn">Préc</button>
                <button onClick={next} disabled={page >= totalPages} className="btn">Suiv</button>
            </div>
        </div>
    );
}
