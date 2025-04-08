import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SuccessState {
    txHash?: string;
    amount?: number;
    merchantName?: string;
    merchantWebsite: string;
}

const Success = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const state = location.state as SuccessState;

    const handleBackToHome = () => {
        window.location.href = state.merchantWebsite;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('success.title')}
                </h1>

                <p className="text-gray-600 mb-6">
                    {t('success.message')}
                </p>

                {state?.amount && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-gray-600">{t('success.amount')}</p>
                        <p className="text-xl font-bold text-gray-900">
                            {t('invoice.currency', { amount: state.amount.toLocaleString() })}
                        </p>
                    </div>
                )}

                {state?.txHash && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-gray-600">{t('success.transactionHash')}</p>
                        <p className="text-sm text-gray-900 break-all">
                            {state.txHash}
                        </p>
                    </div>
                )}

                {state?.merchantName && (
                    <p className="text-gray-600 mb-6">
                        {t('success.thanksMessage', { merchant: state.merchantName })}
                    </p>
                )}

                <button
                    onClick={handleBackToHome}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    {t('success.backToHome')}
                </button>
            </div>
        </div>
    );
};

export default Success; 