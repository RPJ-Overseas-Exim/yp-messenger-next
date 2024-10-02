import { env } from "@/env";

export function GetBaseURL(){
    return env.API_URL + "/api/v" + env.API_VER
}
