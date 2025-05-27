"use server"
//any function that gets exported in this file are server actions
import {fetchAndExtractPdfText} from '@/lib/langchain'
import {generateSummaryFromGemini} from '@/lib/geminiAi'
export async function generatePdfSummary(uploadResponse: {
    serverData: {
        userId: string;
        file: string;
    };
}[]) {
    if (!uploadResponse || !uploadResponse[0]) {
        return {
            success: false,
            message: 'file upload failed',
            data: null,
        };
    }
    // const {
        //serverData:
      //  {
       //     userId,
         //   file:
           //     {url:pdfUrl,name:fileName}
       // },
  //  }=uploadResponse[0];
  console.log("Upload Response:", JSON.stringify(uploadResponse, null, 2));

    const {
        serverData: {
            file: ufsUrl
        }
    } = uploadResponse[0];

    console.log("Extracted PDF URL:", ufsUrl);

    if(!ufsUrl){
        console.log("failed file upload ")
        return {
            success: false,
            message: 'file upload failed',
            data: null,
        };
        
    }
    try{
        const pdfText= await fetchAndExtractPdfText(ufsUrl);
        console.log("extracted text from pdf",pdfText);
        let summary;
        try{
            summary=await generateSummaryFromGemini(pdfText);
            console.log({summary});
        }
        catch(error){
            console.log("failed to generate summary with gemini",error);
           /*  if (error instanceof Error && error.message==='RATE_LIMIT_EXCEEDED'){
                try{
                
                }
                catch(geminiError){
                    console.log('gemini api failed after openAi',geminiError);
                    throw new Error('failed to generate summary with available ai providers');
                }

            } */
        }

    }
    catch(error){
        console.log( "error extracting text",error);
        return {
            success: false,
            message: 'file upload failed',
            data: null,
        };
    }


}