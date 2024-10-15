import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse): Promise<any> {
    try {
        const { token } = await req.json();
        
        cookies().set('token',token)
        return NextResponse.json({ msg: "cookiset" }, { status: 200 })
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({
            error: "Internal server error in setCOOKIe", e
        })

    }
}