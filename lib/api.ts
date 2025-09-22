export type Offre = {
    id: string;
    intitule: string;
    description?: string;
    entreprise?: string;
    ville?: string;
    typeContrat?: string;
    urlPostuler?: string;
    origineOffre?: string;
};

export type BackendResponse = {
    offres: Offre[];
    stats?: any;
    villesDisponibles?: string[];
    contratsDisponibles?: string[];
};
