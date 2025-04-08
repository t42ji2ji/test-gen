import { Merchant, Product, merchant as initialMerchant, product as initialProduct } from '@/data/data';
import { Copy, Save } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Invoice from './Invoice';

const EditInvoice = () => {
    const { t } = useTranslation();
    const [merchant, setMerchant] = useState<Merchant>(initialMerchant);
    const [product, setProduct] = useState<Product>(initialProduct);
    const [showCopyToast, setShowCopyToast] = useState(false);

    const handleMerchantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMerchant(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) : value
        }));
    };

    const handleCopyUrl = async () => {
        try {
            const data = {
                merchant: {
                    name: merchant.name,
                    logo: merchant.logo,
                    accentColor: merchant.accentColor,
                    clientId: merchant.clientId
                },
                product: {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    currency: product.currency,
                    image: product.image,
                    tax: product.tax
                }
            };

            const params = new URLSearchParams();
            // Use encodeURIComponent to handle Unicode characters
            params.set('data', encodeURIComponent(JSON.stringify(data)));

            const url = `${window.location.origin}/?${params.toString()}`;
            await navigator.clipboard.writeText(url);
            setShowCopyToast(true);
            setTimeout(() => setShowCopyToast(false), 2000);
        } catch (error) {
            console.error('Failed to copy URL:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the data to your backend
        console.log('Saving:', { merchant, product });
    };

    return (

        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8 mb-12">
                    {/* Merchant Information */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('edit.merchantInfo')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.merchantName')}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={merchant.name}
                                    onChange={handleMerchantChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.clientId')}
                                </label>
                                <input
                                    type="text"
                                    id="clientId"
                                    name="clientId"
                                    value={merchant.clientId}
                                    onChange={handleMerchantChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    {t('edit.clientIdHint', {
                                        defaultValue: '如果沒有 Client ID，請到 ',
                                    })}
                                    <a
                                        href="https://studio.kryptogo.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                        tabIndex={0}
                                    >
                                        studio.kryptogo.com
                                    </a>
                                    {t('edit.clientIdHintSuffix', {
                                        defaultValue: ' 申請',
                                    })}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.logo')}
                                </label>
                                <input
                                    type="url"
                                    id="logo"
                                    name="logo"
                                    value={merchant.logo}
                                    onChange={handleMerchantChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.email')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={merchant.email}
                                    onChange={handleMerchantChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.phone')}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={merchant.phone}
                                    onChange={handleMerchantChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.website')}
                                </label>
                                <input
                                    id="website"
                                    name="website"
                                    value={merchant.website}
                                    onChange={handleMerchantChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.accentColor')}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        id="accentColor"
                                        name="accentColor"
                                        value={merchant.accentColor}
                                        onChange={handleMerchantChange}
                                        className="h-10 w-20 rounded-lg border-gray-300 shadow-sm"
                                    />
                                    <input
                                        type="text"
                                        value={merchant.accentColor}
                                        onChange={handleMerchantChange}
                                        name="accentColor"
                                        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('edit.productInfo')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.productName')}
                                </label>
                                <input
                                    type="text"
                                    id="productName"
                                    name="name"
                                    value={product.name}
                                    onChange={handleProductChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.productImage')}
                                </label>
                                <input
                                    type="url"
                                    id="productImage"
                                    name="image"
                                    value={product.image}
                                    onChange={handleProductChange}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.productDescription')}
                                </label>
                                <textarea
                                    id="productDescription"
                                    name="description"
                                    value={product.description}
                                    onChange={handleProductChange}
                                    rows={3}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.productPrice')}
                                </label>
                                <input
                                    type="number"
                                    id="productPrice"
                                    name="price"
                                    value={product.price}
                                    onChange={handleProductChange}
                                    step="0.01"
                                    min="0"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="productTax" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('edit.productTax')}
                                </label>
                                <input
                                    type="number"
                                    id="productTax"
                                    name="tax"
                                    value={product.tax}
                                    onChange={handleProductChange}
                                    step="0.01"
                                    min="0"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save and Copy URL Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={handleCopyUrl}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                        >
                            <Copy className="w-5 h-5" />
                            {t('edit.copyUrl')}
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            <Save className="w-5 h-5" />
                            {t('edit.save')}
                        </button>
                    </div>
                </form>

                {/* Copy URL Toast */}
                {showCopyToast && (
                    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
                        {t('edit.urlCopied')}
                    </div>
                )}

                {/* Preview Section */}
                <div className="border-t border-gray-200 pt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">{t('edit.preview')}</h2>
                    <Invoice previewData={{ merchant, product }} />
                </div>
            </div>
        </div>

    );
};

export default EditInvoice; 