import {NextRequest, NextResponse } from "next/server";
import books from "../../resources/books"

export async function GET(request: NextRequest, {params}: any) {
  const {searchParams} = request.nextUrl;
  let BOOKS = [...books]
  if(searchParams.has("type")) {
    const type = searchParams.get("type");
    if(type && type !== "fiction" && type !== "non-fiction") {
      return NextResponse.json({"error":"Invalid value for query parameter 'type'. Must be one of: fiction, non-fiction."})
    }
    BOOKS = BOOKS.filter((b) => b.type === type);
  }
  if(searchParams.has("limit")) {
    const limit = Number(searchParams.get("limit"));
    
    if(isNaN(limit) || limit > 20){
      return NextResponse.json({"error":"Invalid value for query parameter 'limit'. Cannot be greater than 20."})
    }

    if(limit){
      BOOKS = BOOKS.slice(0, limit);
    }
  }

  return NextResponse.json(BOOKS)
}
