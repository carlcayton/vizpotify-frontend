import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie || '')
    const jwtToken = cookies.JWT_TOKEN

    if (!jwtToken) {
      return res.status(401).json({ isAuthenticated: false })
    }

    const response = await fetch('http://your-backend-url/api/v1/auth/status', {
      headers: {
        Cookie: `JWT_TOKEN=${jwtToken}`
      }
    })

    const data = await response.json()
    return res.status(200).json(data)
  }

}