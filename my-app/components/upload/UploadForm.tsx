"use client"
import UploadFormInput from '@/components/upload/upload-form-input';
import { z } from 'zod';

const schema=z.object({
    file:z.instanceof(File,{message:'invalid file'}).
    refine((file)=>file.size<=20*1024*1024,
        'file size must be less than 20MB' //we don't need a message
    )
    .refine((file)=>file.type.startsWith('application/pdf'),
    'file must b a pdf'
),
}); //file object
 
export default function UploadForm() {
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("submitted");
        const formData=new FormData(e.currentTarget);
        const file=formData.get('file') as File;
        //validation the fields
        const validatedFields=schema.safeParse({file});
        //schema validation with zod
        if(!validatedFields.success){
            console.log(validatedFields.error.flatten().fieldErrors.file?.
            [0] ?? 'invalid file'
        
        );

        }
        //upload file to the uploadThing
        //parse the pdf using lang chain
        //summarize the pdf using ai
        //save the summary to db
        //redirect to the [id] summary page

    }
    return(
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
          <UploadFormInput onSubmit={handleSubmit}/>
        </div>
    )
}