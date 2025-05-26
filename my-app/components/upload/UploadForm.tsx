"use client"
import UploadFormInput from '@/components/upload/upload-form-input';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';
import { z } from 'zod';

const schema=z.object({
    file:z.instanceof(File,{message:'invalid file'}).
    refine((file)=>file.size<=20*1024*1024,
        'file size must be less than 20MB'
    )
    .refine((file)=>file.type.startsWith('application/pdf'),
    'file must be a pdf'
),
}); //file object
//create a file uploader 
 
export default function UploadForm() {
    const {startUpload}=useUploadThing('pdfUploader',{
        onClientUploadComplete:()=>{
          
            toast.success('File uploaded successfully!');
        },
        onUploadError:() => {
           
            toast.error('Failed to upload file. Please try again.');
        },
        onUploadBegin:({file})=>{
            console.log('upload has begun for',file);
        },
    });
    const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("submitted");
        const formData=new FormData(e.currentTarget);
        const file=formData.get('file') as File;
        //validation the fields
        const validatedFields=schema.safeParse({file});
        //schema validation with zod
        if(!validatedFields.success){
            toast.error(
                validatedFields.error.flatten().fieldErrors.file?.[0] ?? 
                'Invalid file'
            );
            return;
        }
        toast.info('Uploading PDF...');
            
        //upload file to the uploadThing
        const resp=await startUpload([file]);
       
        if(!resp){
            toast.error('Please try with another file');
            return;
        }
        toast.info('Processing PDF - Hang tight! Our AI is reading through your document!');
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