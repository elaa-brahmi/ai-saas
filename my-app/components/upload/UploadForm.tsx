"use client"
import UploadFormInput from '@/components/upload/upload-form-input';
import { z } from 'zod';

const schema=z.object({});

export default function UploadForm() {
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("submitted");
        const formData=new FormData(e.currentTarget);
        const file=formData.get('file') as File;
        //validation the fields
        //schema validation with zod
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