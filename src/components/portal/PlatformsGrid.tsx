import PlatformCard from "./PlatformCard"
import { Platform } from "@/types"

export default function PlatformsGrid({platforms}:{platforms:Platform[]}){

return(

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

{platforms.map((platform)=>(
<PlatformCard key={platform.id} platform={platform}/>
))}

</div>

)

}