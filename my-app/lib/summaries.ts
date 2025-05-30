import {getDbConnection} from './db'
export async function getSummaries(userId:string){
    
    try{
        const sql=await getDbConnection();
        const summaries=await sql`SELECT *
        FROM pdf_summaries where user_id=${userId} 
        ORDER BY created_at DESC `;
        return summaries;

    
    }
    catch(error){
        console.log("error fetching summaries for user",error);
    }

    
}