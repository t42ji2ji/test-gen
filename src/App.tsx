import { ThemeProvider } from "@/components/ThemeProvider"
import { Button } from "@/components/ui/button"
import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import EditInvoice from "./pages/EditInvoice"
import Invoice from "./pages/Invoice"
import Success from "./pages/Success"
import { KryptogoProvider } from "./providers/KryptogoProvider"

const LanguageToggle = () => {
    const { i18n } = useTranslation()

    const toggleLanguage = () => {
        const currentLang = i18n.language
        const newLang = currentLang === 'en' ? 'zh' : 'en'
        i18n.changeLanguage(newLang)
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            aria-label="Toggle language"
            tabIndex={0}
        >
            <Globe className="h-5 w-5" />
        </Button>
    )
}


function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vibe-ui-theme">
            <div className="absolute top-10 right-10">
                <LanguageToggle />
            </div>
            <KryptogoProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Invoice />} />
                        <Route path="/edit" element={<EditInvoice />} />
                        <Route path="/success" element={<Success />} />
                    </Routes>
                </BrowserRouter>
            </KryptogoProvider>
        </ThemeProvider>
    )
}

export default App 