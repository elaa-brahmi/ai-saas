// app/actions.ts
"use server";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";

export async function getDbConnection(): Promise<NeonQueryFunction<false, false>> {
    if(!process.env.DATABASE_URL){
        throw new Error('neon database url is not defined');
    }
    return neon(process.env.DATABASE_URL);
}