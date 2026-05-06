import StringExtractor from '@/components/StringExtractor';

export const metadata = {
  title: 'String Extractor | Lodark AC',
};

export default function ExtractorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">String Extractor</h1>
          <p className="text-gray-400 mt-1">Extraia strings de executáveis localmente pelo navegador (sem upload) para encontrar detecções de cheats.</p>
        </div>
      </div>
      
      <StringExtractor />
    </div>
  );
}
