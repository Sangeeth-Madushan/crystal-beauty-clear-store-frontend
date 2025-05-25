import { createClient } from "@supabase/supabase-js"

const url = "https://nflylygldkzoxziyqaho.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mbHlseWdsZGt6b3h6aXlxYWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczOTUwMjUsImV4cCI6MjA2Mjk3MTAyNX0.FoCDMR8beWxo6fN7Y3A8p_M9oMIVTBCwg9fSKF4ksik"

const supabase = createClient(url,key)

export default function mediaUpload(file){

    const mediaUploadPromise = new Promise(
        (resolve, reject)=>{

            if(file == null){
                reject("No file selected")
                return
            }

            const timestamp = new Date().getTime()
            const newName = timestamp+file.name

            supabase.storage.from("images").upload(newName, file, {
                upsert:false,
                cacheControl:"3600"
            }).then(()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl)
            }).catch(
                ()=>{
                    reject("Error occured in supabase connection")
                }
            )
        }
    )

    return mediaUploadPromise

}