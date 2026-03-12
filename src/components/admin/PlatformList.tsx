"use client"

import { Platform } from "@/types"

interface Props{

platforms:Platform[]

onDelete:(id:string)=>void

onEdit:(platform:Platform)=>void

}

export default function PlatformList({platforms,onDelete,onEdit}:Props){

return(

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

{platforms.map((p)=>(

<div key={p.id} className="border p-4 rounded">

<div className="flex items-center gap-3">

<img src={p.icon} className="w-8 h-8"/>

<h3 className="font-bold">{p.name}</h3>

</div>

<p className="text-sm text-gray-500 mt-2">

{p.description}

</p>

<div className="flex gap-3 mt-4">

<button
className="bg-blue-600 text-white px-3 py-1"
onClick={()=>onEdit(p)}
>

تعديل

</button>

<button
className="bg-red-600 text-white px-3 py-1"
onClick={()=>onDelete(p.id)}
>

حذف

</button>

</div>

</div>

))}

</div>

)

}