import {getDbConnection} from './db'
export async function getPriceId(email:string){
    const sql=await getDbConnection();
    if (!sql) {
        throw new Error('Failed to get database connection');
    }
    // Update user status to cancelled
    const query=await sql`
        select price_id from users 
        WHERE email = ${email} AND status='active'
    `;
    return query?.[0]?.price_id || null;
}