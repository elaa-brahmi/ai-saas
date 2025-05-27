export const  generateSummaryFromGemini=(pdfText:string)=>{

    try {
        const model = genAI.getGenerativeModel({ model:
        "gemini-pro" });
        
        const prompt = '${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}';
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
        } 
        catch (error: any){
        if (error ?. status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED");
        }
        console.error("Gemini API Error:", error); 
        throw error;
        
        }

}