import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import createRouteMatcher from "./lib/helpers/route-matcher.helper";
import { UserRole } from "./lib/contants";

const isGuestRoute = createRouteMatcher(["/signup", "/signupP", "/signin"]);
const isPatientRoute = createRouteMatcher(["/patient/*"]);
const isDoctorRoute = createRouteMatcher(["/doctor/*"]);

export default async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    const { role } = session.user as { role: UserRole };
    console.log(role);

    // Redirect authenticated users from guest routes
    if (isGuestRoute(request)) {
      if (role === "doctor") {
        return NextResponse.redirect(new URL("/doctor", request.url));
      } else if (role === "patient") {
        return NextResponse.redirect(
          new URL("/patient/appointments", request.url)
        );
      }
    }

    // Protect patient routes
    if (isPatientRoute(request) && role !== "patient") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Protect doctor routes
    if (isDoctorRoute(request) && role !== "doctor") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  } else {
    if (isPatientRoute(request) || isDoctorRoute(request)) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
