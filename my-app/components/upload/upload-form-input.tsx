"use client"
import {Button} from '@/components/ui/button'
import { Input } from '../ui/input';
interface UploadFormProps{
    onSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;

}
export default function UploadFormInput({onSubmit}:UploadFormProps)
    {
    return(
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <div className="flex justify-end gap-1.5">
        <Input type="file" id="file" name="file"
        accept="application/pdf"
        required
        className=""/>
        <Button>Upload your PDF</Button></div>

        </form>
        )
    }