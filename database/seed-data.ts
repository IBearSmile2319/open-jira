
interface SeedData {
    entries: ISeedEntry[];
}


export interface ISeedEntry {
    description: string;
    status: string;
    createdAt: number;
}




export const seedData: SeedData = {
    entries: [
        {
            description: "pendiente Description 1",
            status: "pending",
            createdAt: Date.now(),
        },
        {
            description: "in progress Description 2",
            status: "in-progress",
            createdAt: Date.now(),
        },
        {
            description: "finished Description 3",
            status: "finished",
            createdAt: Date.now() - 1000000,
        },
        {
            description: "Description 4",
            status: "pending",
            createdAt: Date.now(),
        },
        {
            description: "Description 5",
            status: "finished",
            createdAt: Date.now() - 10000000,
        },
    ]
}