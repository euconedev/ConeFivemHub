// app/api/discord/members/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const guildId = searchParams.get('guildId')
  const roleId = searchParams.get('roleId')  // ← AGORA É ID
  const botToken = searchParams.get('token')

  if (!guildId || !roleId || !botToken) {
    return NextResponse.json({ error: 'guildId, roleId e token são obrigatórios' }, { status: 400 })
  }

  try {
    // === BUSCA MEMBROS COM PAGINAÇÃO ===
    let allMembers: any[] = []
    let lastUserId: string | undefined
    const limit = 1000

    while (true) {
      let url = `https://discord.com/api/v10/guilds/${guildId}/members?limit=${limit}`
      if (lastUserId) url += `&after=${lastUserId}`

      const res = await fetch(url, {
        headers: { Authorization: `Bot ${botToken}` },
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Membros: ${res.status} - ${err}` }, { status: res.status })
      }

      const members: any[] = await res.json()
      if (members.length === 0) break

      allMembers = allMembers.concat(members)
      lastUserId = members[members.length - 1].user.id

      if (members.length < limit) break
    }

    // === FILTRA POR ROLE ID ===
    const clientMembers = allMembers.filter(m => m.roles.includes(roleId))

    return NextResponse.json(clientMembers)
  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
