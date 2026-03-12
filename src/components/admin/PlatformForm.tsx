"use client"

import { useState } from "react"
import { Platform } from "@/types"

interface Props {

onSave:(platform:Platform)=>void

platform?:Platform

}

export default function PlatformForm({onSave,platform}:Props){

const [form,setForm]=useState<Platform>(

platform || {

id:Date.now().toString(),

name:"",

description:"",

url:"",

icon:""

}

)

const handleImage=(e:any)=>{

const file=e.target.files?.[0]

if(!file) return

const reader=new FileReader()

reader.onloadend=()=>{

setForm({...form,icon:reader.result as string})

}

reader.readAsDataURL(file)

}

return(

<div className="space-y-4">

<input

className="border p-2 w-full"

placeholder="اسم المنصة"

value={form.name}

onChange={(e)=>setForm({...form,name:e.target.value})}

/>

<input

className="border p-2 w-full"

placeholder="وصف المنصة"

value={form.description}

onChange={(e)=>setForm({...form,description:e.target.value})}

/>

<input

className="border p-2 w-full"

placeholder="رابط المنصة"

value={form.url}

onChange={(e)=>setForm({...form,url:e.target.value})}

/>

<select

className="border p-2 w-full"

value={form.icon}

onChange={(e)=>setForm({...form,icon:e.target.value})}

>

<option value="">اختر ايقونة</option>

<option value="/icons/training.svg">التدريب</option>
<option value="/icons/reports.svg">التقارير</option>
<option value="/icons/students.svg">المتدربين</option>
<option value="/icons/trainers.svg">المدربين</option>
<option value="/icons/certificate.svg">الشهادات</option>
<option value="/icons/attendance.svg">الحضور</option>
<option value="/icons/schedule.svg">الجدولة</option>
<option value="/icons/evaluation.svg">التقييم</option>

</select>

<input type="file" accept="image/*" onChange={handleImage}/>

<button

className="bg-teal-700 text-white px-4 py-2"

onClick={()=>onSave(form)}

>

حفظ المنصة

</button>

</div>

)

}