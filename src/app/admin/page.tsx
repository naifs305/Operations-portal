"use client"

import { useEffect, useState } from "react"
import PlatformForm from "@/components/admin/PlatformForm"
import PlatformList from "@/components/admin/PlatformList"
import { getPlatforms, savePlatforms, deletePlatform } from "@/lib/storage"
import { Platform } from "@/types"

const ADMIN_PASSWORD = "Nn@123123"

export default function AdminPage() {

const [authorized,setAuthorized]=useState(false)
const [password,setPassword]=useState("")
const [platforms,setPlatforms]=useState<Platform[]>([])

useEffect(()=>{

const stored=getPlatforms()
setPlatforms(stored)

},[])

function login(){

if(password===ADMIN_PASSWORD){

setAuthorized(true)

}

}

function addPlatform(platform:Platform){

const updated=[...platforms,platform]

setPlatforms(updated)

savePlatforms(updated)

}

function removePlatform(id:string){

const updated=platforms.filter(p=>p.id!==id)

setPlatforms(updated)

savePlatforms(updated)

}

if(!authorized){

return(

<div className="flex items-center justify-center h-screen">

<div className="bg-white p-6 rounded shadow">

<h2 className="mb-4 font-bold">تسجيل دخول الإدارة</h2>

<input
type="password"
className="border p-2 w-full"
placeholder="كلمة المرور"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="mt-4 bg-teal-700 text-white px-4 py-2 w-full"
onClick={login}
>

دخول

</button>

</div>

</div>

)

}

return(

<div className="p-8 space-y-8">

<h1 className="text-2xl font-bold">إدارة المنصات</h1>

<PlatformForm onSave={addPlatform}/>

<PlatformList
platforms={platforms}
onDelete={removePlatform}
onEdit={()=>{}}
/>

</div>

)

}