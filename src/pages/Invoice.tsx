import type { Merchant, Product } from '@/data/data';
import { merchant as defaultMerchant, product as defaultProduct } from '@/data/data';
import { KryptogoKitProvider, usePayment } from '@kryptogo/kryptogokit-sdk-react';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface InvoiceProps {
    previewData?: {
        merchant: Merchant;
        product: Product;
    };
}

// Inner component that uses usePayment
const InvoiceContent = ({ merchant, product, quantity, setQuantity }: {
    merchant: Merchant;
    product: Product;
    quantity: number;
    setQuantity: (quantity: number) => void;
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [hasPaymentSucceeded, setHasPaymentSucceeded] = useState(false);

    const {
        openPaymentModal,
        data: paymentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = usePayment();

    const totalAmount = product.price * quantity;
    const tax = Math.round(totalAmount * product.tax);
    const finalAmount = totalAmount + tax;

    useEffect(() => {
        if (isSuccess && paymentData?.payment_tx_hash) {
            setHasPaymentSucceeded(true);
            // Navigate to success page with transaction details
            navigate('/success', {
                state: {
                    txHash: paymentData.payment_tx_hash,
                    amount: finalAmount,
                    merchantName: merchant.name,
                    merchantWebsite: merchant.website
                }
            });
        }
    }, [isSuccess, paymentData, navigate, finalAmount, merchant.name, merchant.website]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePayment = () => {
        openPaymentModal({
            fiat_amount: finalAmount.toString(),
            fiat_currency: "TWD",
            order_data: {
                invoice_id: product.id,
                merchant: merchant.name,
                products: [{
                    id: product.id,
                    name: product.name,
                    quantity: quantity
                }]
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <div className="max-w-5xl">
                <div className="flex gap-8 max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:flex-row flex-col">
                    {/* 左側：商品資訊 */}
                    <div className="flex-1 border-r border-gray-100">
                        {/* 商家標誌和名稱 */}
                        <div className="group relative">
                            <div className="flex items-center gap-3 mb-6 pb-4">
                                <img
                                    src={merchant.logo}
                                    alt={merchant.name}
                                    className="w-8 h-8 object-contain"
                                />
                                <h2 className="font-bold text-gray-900">
                                    {merchant.name}
                                </h2>
                            </div>

                            {/* Tooltip */}
                            <div className="absolute left-0 top-full z-10 hidden group-hover:block bg-white border border-gray-100 rounded-lg shadow-lg p-4 min-w-[280px]">
                                <div className="space-y-2">
                                    {merchant.address && (
                                        <div className="flex gap-2">
                                            <span className="text-gray-500">{t('merchant.address')}:</span>
                                            <span className="text-gray-700">{merchant.address}</span>
                                        </div>
                                    )}
                                    {merchant.email && (
                                        <div className="flex gap-2">
                                            <span className="text-gray-500">{t('merchant.email')}:</span>
                                            <a
                                                href={`mailto:${merchant.email}`}
                                                className="text-gray-700 hover:text-blue-600"
                                            >
                                                {merchant.email}
                                            </a>
                                        </div>
                                    )}
                                    {merchant.phone && (
                                        <div className="flex gap-2">
                                            <span className="text-gray-500">{t('merchant.phone')}:</span>
                                            <a
                                                href={`tel:${merchant.phone}`}
                                                className="text-gray-700 hover:text-blue-600"
                                            >
                                                {merchant.phone}
                                            </a>
                                        </div>
                                    )}
                                    {merchant.website && (
                                        <div className="flex gap-2">
                                            <span className="text-gray-500">{t('merchant.website')}:</span>
                                            <a
                                                href={`https://${merchant.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-700 hover:text-blue-600"
                                            >
                                                {merchant.website}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 商品資訊 */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-1/3">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full aspect-square object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    {product.name}
                                </h1>
                                <p className="text-gray-600 mb-4">
                                    {product.description}
                                </p>
                                <p className="text-xl font-semibold mb-4" style={{ color: merchant.accentColor }}>
                                    {t('invoice.currency', { amount: product.price.toLocaleString() })}
                                </p>
                                {/* 數量選擇器 */}
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-600">{t('invoice.quantity')}:</span>
                                    <div className="flex items-center border rounded-lg">
                                        <button
                                            onClick={handleDecrement}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            className="w-16 text-center border-x px-2 py-1"
                                        />
                                        <button
                                            onClick={handleIncrement}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右側：付款資訊 */}
                    <div className="flex-1 flex flex-col">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex-grow">
                            {t('invoice.orderInfo')}
                        </h2>
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between py-1">
                                <span className="text-gray-600">{t('invoice.productAmount')}</span>
                                <span className="font-medium text-gray-900">
                                    {t('invoice.currency', { amount: totalAmount.toLocaleString() })}
                                </span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-100">
                                <span className="text-gray-600">{t('invoice.tax')}</span>
                                <span className="font-medium text-gray-900">
                                    {t('invoice.currency', { amount: tax.toLocaleString() })}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 text-lg font-bold text-gray-900">
                                <span>{t('invoice.total')}</span>
                                <span>{t('invoice.currency', { amount: finalAmount.toLocaleString() })}</span>
                            </div>
                        </div>

                        {/* 付款按鈕 */}
                        <button
                            onClick={handlePayment}
                            disabled={isLoading}
                            className="w-full px-6 py-4 text-white text-lg font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            style={{
                                backgroundColor: merchant.accentColor,
                                ['--tw-ring-color' as string]: merchant.accentColor
                            }}
                        >
                            {isLoading ? t('invoice.processing') : t('invoice.buyNow')}
                        </button>

                        {/* 付款狀態 */}
                        {hasPaymentSucceeded && (
                            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                                {t('invoice.paymentSuccess', { txHash: paymentData?.payment_tx_hash })}
                            </div>
                        )}
                        {isError && (
                            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                                {t('invoice.paymentError', { error: error?.message })}
                            </div>
                        )}
                    </div>
                </div>
                {/* 商家資訊 */}
                <div className="flex flex-col items-center justify-center gap-2 mt-6">
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                        <img src="./logo.svg" alt="Kryptogo" className="w-4 h-4" />
                        <span>{t('invoice.poweredBy')}</span>
                    </div>
                    <a
                        href="/edit"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mt-2 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
                        tabIndex={0}
                        aria-label={t('invoice.createYourOwn')}
                    >
                        <PlusCircle className="w-4 h-4" />
                        {t('invoice.createYourOwn', 'Create your own payment page')}
                    </a>
                </div>
            </div>
        </div>
    );
};

// Main Invoice component that provides the KryptogoKitProvider
const Invoice = ({ previewData }: InvoiceProps) => {
    const [quantity, setQuantity] = useState(1);
    const [urlData, setUrlData] = useState<{ merchant: Merchant; product: Product } | null>(null);

    useEffect(() => {
        // Try to get data from URL parameters
        const params = new URLSearchParams(window.location.search);
        const encodedData = params.get('data');

        if (encodedData) {
            try {
                const decodedData = JSON.parse(decodeURIComponent(encodedData));
                // Merge with default data to ensure all required fields are present
                setUrlData({
                    merchant: {
                        ...defaultMerchant,
                        ...decodedData.merchant
                    },
                    product: {
                        ...defaultProduct,
                        ...decodedData.product
                    }
                });
            } catch (error) {
                console.error('Failed to parse URL data:', error);
            }
        }
    }, []);

    // Use URL data first, then preview data, then default data
    const merchant = urlData?.merchant || previewData?.merchant || defaultMerchant;
    const product = urlData?.product || previewData?.product || defaultProduct;

    return (
        <KryptogoKitProvider
            clientId={merchant.clientId}
            appInfo={{ appName: "TechStore Invoice" }}
        >
            <InvoiceContent
                merchant={merchant}
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
            />
        </KryptogoKitProvider>
    );
};

export default Invoice; 