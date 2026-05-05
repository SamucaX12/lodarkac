import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import AdminKey from '@/models/AdminKey';

const getAuthRole = () => {
  const auth = cookies().get('admin_auth')?.value || '';
  const parts = auth.split('|');
  return {
    isSuperAdmin: auth.startsWith('superadmin'),
    isReseller: auth.startsWith('reseller'),
    plan: parts.length > 1 ? parts[1] : null,
    ownerKey: parts.length > 3 ? parts[3] : null
  };
};

export async function GET() {
  const auth = getAuthRole();
  if (!auth.isSuperAdmin && !auth.isReseller) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  try {
    let query = {};
    if (!auth.isSuperAdmin) {
      // Reseller só vê as keys que ele gerou (subkeys) e a própria key dele
      query = { $or: [{ ownerId: auth.ownerKey }, { key: auth.ownerKey }] };
    }
    
    const keys = await AdminKey.find(query).sort({ createdAt: -1 });
    
    // Se for reseller, precisa retornar a quantidade de keys que ele ainda pode gerar
    let maxSubKeys = 0;
    let generatedSubKeys = 0;
    if (auth.isReseller) {
        const myKey = await AdminKey.findOne({ key: auth.ownerKey });
        if (myKey) {
            maxSubKeys = myKey.maxSubKeys;
            generatedSubKeys = myKey.generatedSubKeys;
        }
    }

    return NextResponse.json({ keys, maxSubKeys, generatedSubKeys, isSuperAdmin: auth.isSuperAdmin });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = getAuthRole();
  if (!auth.isSuperAdmin && !auth.isReseller) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { plan, game, maxSubKeys } = data;

    await dbConnect();

    // Se for Reseller (Team Owner) tentando gerar subkey
    if (auth.isReseller) {
        const myKey = await AdminKey.findOne({ key: auth.ownerKey });
        if (!myKey || myKey.isSubKey) {
            return NextResponse.json({ error: 'Você não tem permissão para gerar sub-keys.' }, { status: 403 });
        }
        if (myKey.generatedSubKeys >= myKey.maxSubKeys) {
            return NextResponse.json({ error: 'Limite de chaves de equipe atingido.' }, { status: 403 });
        }

        const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
        const keyString = `TEAM-${myKey.key.substring(myKey.key.length - 4)}-${randomChars}`;

        const keyRecord = await AdminKey.create({
            key: keyString,
            plan: myKey.plan,
            game: myKey.game,
            isSubKey: true,
            ownerId: myKey.key
        });

        myKey.generatedSubKeys += 1;
        await myKey.save();

        return NextResponse.json({ success: true, keyRecord, generatedSubKeys: myKey.generatedSubKeys });
    }

    // Se for SuperAdmin
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
    const keyString = `KEY-${plan.toUpperCase()}-${game.toUpperCase()}-${randomChars}`;

    const keyRecord = await AdminKey.create({
      key: keyString,
      plan,
      game,
      maxSubKeys: maxSubKeys || 0
    });

    return NextResponse.json({ success: true, keyRecord });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create Admin Key' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = getAuthRole();
  if (!auth.isSuperAdmin && !auth.isReseller) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await dbConnect();
    const keyToDelete = await AdminKey.findById(id);
    
    if (!keyToDelete) return NextResponse.json({ error: 'Key not found' }, { status: 404 });

    // Reseller só pode deletar as próprias subkeys
    if (!auth.isSuperAdmin && keyToDelete.ownerId !== auth.ownerKey) {
        return NextResponse.json({ error: 'Você só pode deletar keys da sua equipe.' }, { status: 403 });
    }

    await AdminKey.findByIdAndDelete(id);

    // Se deletou uma subkey, decrementa o contador do dono
    if (keyToDelete.isSubKey && keyToDelete.ownerId) {
        const ownerKey = await AdminKey.findOne({ key: keyToDelete.ownerId });
        if (ownerKey) {
            ownerKey.generatedSubKeys = Math.max(0, ownerKey.generatedSubKeys - 1);
            await ownerKey.save();
        }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete Admin Key' }, { status: 500 });
  }
}
