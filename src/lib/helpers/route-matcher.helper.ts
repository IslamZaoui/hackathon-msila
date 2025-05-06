import { NextRequest } from "next/server";

export default function createRouteMatcher(paths: string[]) {
  return (request: NextRequest): boolean => {
    const pathname = new URL(request.url).pathname;
    
    for (const path of paths) {
      const escapedPath = path
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace("\\*", ".*");
      const regex = new RegExp(`^${escapedPath}`);
      if (regex.test(pathname)) {
        return true;
      }
    }
    return false;
  };
}
