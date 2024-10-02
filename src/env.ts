import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        API_URL: z.string().url(),
        API_VER: z.number()
    },
    client: {
        NEXT_PUBLIC_API_URL: z.string().url()
    },
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        NEXT_PUBLIC_API_URL: process.env.API_URL,
        API_URL: process.env.API_URL,
        API_VER: process.env.API_VER
    },
    // For Next.js >= 13.4.4, you only need to destructure client variables:
    // experimental__runtimeEnv: {
    //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    // }
});
