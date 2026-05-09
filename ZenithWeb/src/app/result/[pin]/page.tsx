import dbConnect from '@/lib/mongodb';
import Result from '@/models/Result';
import { notFound } from 'next/navigation';
import ResultClientView from '@/components/ResultClientView';

export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ResultPage({ params }: { params: { pin: string } }) {
  const cookieStore = cookies();
  const adminAuth = cookieStore.get('admin_auth')?.value;

  if (!adminAuth) {
    redirect('/login');
  }

  await dbConnect();
  const result = await Result.findOne({ pin: params.pin });

  if (!result) {
    notFound();
  }

  const detectionsCount = result.detections?.length || 0;
  const warningsCount = result.warnings?.length || 0;
  const riskScore = result.isClean ? 0 : Math.min(100, (detectionsCount * 25) + (warningsCount * 10));

  return (
    <ResultClientView 
      result={JSON.parse(JSON.stringify(result))} 
      riskScore={riskScore}
    />
  );
}
