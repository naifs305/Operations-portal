import { Platform } from "@/types"

const STORAGE_KEY = "training-platforms"

export function getPlatforms(): Platform[] {

if (typeof window === "undefined") return []

const stored = localStorage.getItem(STORAGE_KEY)

if (!stored) return []

return JSON.parse(stored)

}

export function savePlatforms(platforms: Platform[]) {

localStorage.setItem(STORAGE_KEY, JSON.stringify(platforms))

}

export function addPlatform(platform: Platform) {

const platforms = getPlatforms()

platforms.push(platform)

savePlatforms(platforms)

}

export function updatePlatform(updated: Platform) {

const platforms = getPlatforms().map((p) =>
p.id === updated.id ? updated : p
)

savePlatforms(platforms)

}

export function deletePlatform(id: string) {

const platforms = getPlatforms().filter((p) => p.id !== id)

savePlatforms(platforms)

}