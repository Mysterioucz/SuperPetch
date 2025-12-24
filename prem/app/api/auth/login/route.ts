import { NextRequest, NextResponse } from "next/server";

const AUTH_SERVICE_URL =
    process.env.AUTH_SERVICE_URL || "http://auth-service:3001";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(`${AUTH_SERVICE_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || "Login failed" },
                { status: response.status },
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error("Login API error:", error);
        return NextResponse.json(
            { message: error.message || "Internal server error" },
            { status: 500 },
        );
    }
}
