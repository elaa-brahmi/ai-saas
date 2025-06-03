import {getDbConnection} from './db'
import {pricingPlans} from './constants'
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
export async function getEmailByUserId(userId:string){
    const sql=await getDbConnection();
    if (!sql) {
        throw new Error('Failed to get database connection');
    }
    // Update user status to cancelled
    const query=await sql`
        select email from users 
        WHERE id = ${userId} 
    `;
    return query?.[0]?.price_id || null;

}


export async function hasReachedUploadLimit(userId:string){
    const uploadCount=await getUserUploadCount(userId);
    //get the email of user having userId
    const email=await getEmailByUserId(userId)
    const priceId =await getPriceId(email);
    const isPro=pricingPlans.find((plan)=>plan.priceId===priceId)?.id==='pro'
    const uploadLimit:number=isPro?1000:5;
    return {hasReachedUploadLimit: uploadCount >= uploadLimit,uploadLimit};

}
export async function getUserUploadCount(userId:string){
    try{
    const sql=await getDbConnection();
    const res=await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id=${userId}`;
    return res[0].count;
    }
    catch(err){
        console.error('error fetching upload count',err);
    }

}
