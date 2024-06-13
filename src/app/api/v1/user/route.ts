export async function GET(request: Request) {
  return new Response(`Hello, ${request.url}!`);
}

export async function POST(request:Request){
  const test = await request.json();
  return Response.json(test);
}