"use client"
import {Button} from '@/components/ui/button'
import { Input } from '../ui/input';

interface UploadFormProps{
    onSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;
    isLoading?: boolean;
    formRef?: React.RefObject<HTMLFormElement>;
}

export default function UploadFormInput({onSubmit, isLoading, formRef}:UploadFormProps)
    {
    return(
        <form className="flex flex-col gap-6" onSubmit={onSubmit} ref={formRef}>
            <div className="flex justify-end gap-1.5">
        <Input type="file" id="file" name="file"
        accept="application/pdf"
        required
        className=""/>
        <Button disabled={isLoading}>{isLoading ? "Uploading..." : "Upload your PDF"}</Button></div>

        </form>
        )
    }