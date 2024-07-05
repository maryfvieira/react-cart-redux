export async function POST(request:Request){
  const test = await request.json();

  return Response.json(test);
}