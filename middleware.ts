import { NextRequest, NextResponse, NextMiddleware } from "next/server"
import { cookies } from "next/headers";
import * as jose from "jose";
import useSWR from "swr";

export default async function middleware(req: NextRequest, res: NextResponse, next: NextMiddleware): Promise<any> {
    try{

        const token = cookies().get("token")?.value;
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        if (!token || token === "")
            return NextResponse.redirect(new URL("/sign-in", req.url));
        const isAuth = await jose.jwtVerify(token, secret);
        if (!isAuth) return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    catch(e){
        console.log(`Error in middleware`,e);
        
    }
}

export const config = {
    matcher: ["/",],
};