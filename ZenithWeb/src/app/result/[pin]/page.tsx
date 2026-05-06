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

  // Estatísticas
  const detectionsCount = result.detections.length;
  const warningsCount = result.warnings.length;
  const cleanCount = result.isClean ? 1 : 0;
  const totalItems = detectionsCount + warningsCount + cleanCount;
  
  const riskScore = result.isClean ? 0 : Math.min(100, (detectionsCount * 25) + (warningsCount * 10));

  // CSS para o gráfico de rosca (Doughnut)
  const severePercent = totalItems > 0 ? (detectionsCount / totalItems) * 100 : 0;
  const warningPercent = totalItems > 0 ? (warningsCount / totalItems) * 100 : 0;

  const conicGradient = `conic-gradient(
    #ef4444 0% ${severePercent}%, 
    #f59e0b ${severePercent}% ${severePercent + warningPercent}%, 
    #10b981 ${severePercent + warningPercent}% 100%
  )`;

  return (
    <ResultClientView 
      result={JSON.parse(JSON.stringify(result))} 
      riskScore={riskScore}
      detectionsCount={detectionsCount}
      warningsCount={warningsCount}
      cleanCount={cleanCount}
      totalItems={totalItems}
      conicGradient={conicGradient}
    />
  );
}
