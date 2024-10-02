import { env } from "@/env";

export function GetBaseURL(){
    return env.API_URL + env.API_VER
}
