/* eslint-disable @typescript-eslint/no-unused-vars */
import Stripe from "stripe";
import { getDbConnection } from "./db";

export async function handleCheckoutSessionCompleted({session,stripe}:{session:Stripe.Checkout.Session,stripe:Stripe}){
    console.log('checkout session completed',session);
    const customer_id=session.customer as string;
    const customer=await stripe.customers.retrieve(customer_id);
    const price_id=session.line_items?.data[0]?.price?.id;
    if('email' in customer && price_id){
          const {email,name}=customer;
    await createOrUpdateUser({
        email:email as string,
        full_name:name as string,
        customer_id,
        price_id:price_id as string,
        status:'active'

    })

    }
  
    
}
async function createOrUpdateUser({
    email,full_name,customer_id,price_id,status

}:{
    email:string,
    full_name:string,
    customer_id:string,
    price_id:string,
    status:string,
}){
    try{
        const sql=await getDbConnection();
        const user=await sql`SELECT * FROM users where email=${email}`;
        if(user.length===0){
            await sql`INSERT INTO users(email,full_name,customer_id,price_id,status) 
            values(${email},${full_name},${customer_id},${price_id},${status})`
        }


    }
    catch(error){
        console.error('error creating or updating user',error);
    }
}