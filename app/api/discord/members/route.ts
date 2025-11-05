// app/api/discord/members/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const guildId = searchParams.get('guildId');
  const roleName = searchParams.get('role') || 'cliente';  // Role padrão: "cliente"
  const botToken = searchParams.get('token');

  // Validação básica
  if (!guildId || !botToken) {
    return NextResponse.json({ error: 'Guild ID e token obrigatórios' }, { status: 400 });
  }

  try {
    // 1. Busca os ROLES do servidor (para encontrar o ID do role "cliente")
    const rolesRes = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
      headers: {
        'Authorization': `Bot ${botToken}`,
      },
    });

    if (!rolesRes.ok) {
      const errorText = await rolesRes.text();
      return NextResponse.json({ 
        error: `Falha ao buscar roles: ${rolesRes.status} - ${errorText}` 
      }, { status: rolesRes.status });
    }

    const roles = await rolesRes.json();
    const targetRole = roles.find((r: any) => r.name.toLowerCase() === roleName.toLowerCase());

    if (!targetRole) {
      return NextResponse.json({ error: `Role "${roleName}" não encontrado` }, { status: 404 });
    }

    // 2. Busca MEMBROS do servidor (limit 1000 para evitar rate limit)
    const membersRes = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, {
      headers: {
        'Authorization': `Bot ${botToken}`,
      },
    });

    if (!membersRes.ok) {
      const errorText = await membersRes.text();
      return NextResponse.json({ 
        error: `Falha ao buscar membros: ${membersRes.status} - ${errorText}` 
      }, { status: membersRes.status });
    }

    const members = await membersRes.json();
    const clientMembers = members.filter((m: any) => m.roles.includes(targetRole.id));

    return NextResponse.json(clientMembers);
  } catch (error) {
    console.error('Erro na API Discord:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}