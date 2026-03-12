import { Platform } from "@/types"

export default function PlatformCard({platform}:{platform:Platform}){

return(

<a
href={platform.url}
target="_blank"
className="border rounded-lg p-6 bg-white hover:shadow transition"
>

<div className="flex flex-col items-center text-center gap-3">

<img src={platform.icon} className="w-12 h-12"/>

<h3 className="font-bold text-lg">

{platform.name}

</h3>

<p className="text-gray-500 text-sm">

{platform.description}

</p>

</div>

</a>

)

}