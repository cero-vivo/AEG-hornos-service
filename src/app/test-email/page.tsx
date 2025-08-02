"use client";

import { useState } from 'react';
import styles from './page.module.css';

interface TestResendResult {
	success?: boolean;
	message?: string;
	error?: string;
	details?: string;
	config: {
		hasApiKey: boolean;
		timestamp?: string;
	};
	data?: {
		id?: string;
		[key: string]: unknown;
	};
}

export default function TestEmailPage() {


	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<TestResendResult | null>(null);
	const [error, setError] = useState<string>('');
	
	// Solo permitir en modo desarrollo
	if (process.env.NODE_ENV !== 'development') {
		return (
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.card}>
						<h1 className={styles.title}>
							Acceso Restringido
						</h1>
						<p>Esta página solo está disponible en modo desarrollo.</p>
					</div>
				</div>
			</div>
		);
	}


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
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.card}>
					<h1 className={styles.title}>
						Prueba de Configuración - Resend
					</h1>

					<div className={styles.buttonContainer}>
						<button
							onClick={testConnection}
							disabled={loading}
							className={styles.testButton}
						>
							{loading ? 'Probando conexión...' : 'Probar Conexión'}
						</button>
					</div>

					{error && (
						<div className={styles.errorContainer}>
							<h3 className={styles.errorTitle}>Error:</h3>
							<p className={styles.errorMessage}>{error}</p>
						</div>
					)}

					{result && (
						<div className={styles.resultsContainer}>
							<div className={styles.configSection}>
								<h3 className={styles.configTitle}>Configuración:</h3>
								<div className={styles.configContent}>
									<div className={styles.configRow}>
										<span>API Key configurada:</span>
										<span className={result.config?.hasApiKey ? styles.successText : styles.errorText}>
											{result.config?.hasApiKey ? '✅ Sí' : '❌ No'}
										</span>
									</div>
									{result.data?.id && (
										<div className={styles.configRow}>
											<span>ID del email:</span>
											<span className={styles.emailId}>{result.data.id}</span>
										</div>
									)}
								</div>
							</div>

							{result.success ? (
								<div className={styles.successSection}>
									<h3 className={styles.successTitle}>✅ Éxito:</h3>
									<p className={styles.successMessage}>{result.message}</p>
									<p className={styles.successNote}>
										Revisa tu bandeja de entrada para confirmar que recibiste el email de prueba.
									</p>
								</div>
							) : (
								<div className={styles.errorSection}>
									<h3 className={styles.errorSectionTitle}>❌ Error:</h3>
									<p className={styles.errorSectionMessage}>{result.error}</p>
									{result.details && (
										<p className={styles.errorDetails}>Detalles: {result.details}</p>
									)}
								</div>
							)}

							<div className={styles.helpSection}>
								<h3 className={styles.helpTitle}>Pasos para solucionar:</h3>
								<ol className={styles.helpList}>
									<li>Ve a <a href="https://resend.com" target="_blank" className={styles.helpLink}>resend.com</a> y crea una cuenta gratuita</li>
									<li>En el dashboard, ve a &quot;API Keys&quot; y crea una nueva key</li>
									<li>Copia la API key y agrégalo a tu <code className={styles.code}>.env.local</code></li>
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