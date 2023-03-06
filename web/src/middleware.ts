import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const cookies = req.cookies.get('convenios.token')?.value
  if (req.nextUrl.pathname === '/login' && cookies !== undefined) {
    return NextResponse.redirect('http://localhost:3000/admin')
  }
  if (req.nextUrl.pathname.startsWith('/admin') && cookies === undefined) {
    return NextResponse.redirect('http://localhost:3000/login')
  }
}
