import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: Request) {
  const jsonDirectory = path.join(process.cwd(), 'json');

  const file = await fs.readFile(jsonDirectory + '/product.json', 'utf8');

  const response = JSON.parse(file);

  return Response.json(response);

}

export async function POST(request:Request){
  const test = await request.json();
  return Response.json(test);
}