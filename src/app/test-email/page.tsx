"use client";

import { useState } from 'react';

export default function TestEmailPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const testConnection = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/test-resend');
      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Error desconocido');
        setResult(data);
      }
    } catch (err) {
      setError('Error de conexión al servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Prueba de Configuración - Resend
          </h1>

          <div className="mb-8">
            <button
              onClick={testConnection}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Probando conexión...' : 'Probar Conexión'}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-red-800 font-semibold mb-2">Error:</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Configuración:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>API Key configurada:</span>
                    <span className={result.config?.hasApiKey ? 'text-green-600' : 'text-red-600'}>
                      {result.config?.hasApiKey ? '✅ Sí' : '❌ No'}
                    </span>
                  </div>
                  {result.data?.id && (
                    <div className="flex justify-between">
                      <span>ID del email:</span>
                      <span className="text-gray-600 text-xs">{result.data.id}</span>
                    </div>
                  )}
                </div>
              </div>

              {result.success ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-green-800 font-semibold mb-2">✅ Éxito:</h3>
                  <p className="text-green-700">{result.message}</p>
                  <p className="text-green-600 text-sm mt-2">
                    Revisa tu bandeja de entrada para confirmar que recibiste el email de prueba.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-red-800 font-semibold mb-2">❌ Error:</h3>
                  <p className="text-red-700">{result.error}</p>
                  {result.details && (
                    <p className="text-red-600 text-sm mt-2">Detalles: {result.details}</p>
                  )}
                </div>
              )}

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-blue-800 font-semibold mb-2">Pasos para solucionar:</h3>
                <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                  <li>Ve a <a href="https://resend.com" target="_blank" className="underline">resend.com</a> y crea una cuenta gratuita</li>
                  <li>En el dashboard, ve a "API Keys" y crea una nueva key</li>
                  <li>Copia la API key y agrégalo a tu <code>.env.local</code></li>
                  <li>Reinicia el servidor después de modificar las variables de entorno</li>
                  <li>¡Listo! Resend es plug-and-play, no necesitas verificar dominios</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 