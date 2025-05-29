import { type NextRequest, NextResponse } from "next/server"

const translations = {
  en: {
    welcome: "Welcome to Sponza",
    dashboard: "Dashboard",
    campaigns: "Campaigns",
    profile: "Profile",
    wallet: "Wallet",
    messages: "Messages",
    settings: "Settings",
    logout: "Logout",
    create_campaign: "Create Campaign",
    apply_now: "Apply Now",
    view_details: "View Details",
    budget: "Budget",
    deadline: "Deadline",
    applications: "Applications",
    earnings: "Earnings",
    balance: "Balance",
    withdraw: "Withdraw",
    deposit: "Deposit",
  },
  hi: {
    welcome: "स्पॉन्ज़ा में आपका स्वागत है",
    dashboard: "डैशबोर्ड",
    campaigns: "अभियान",
    profile: "प्रोफ़ाइल",
    wallet: "वॉलेट",
    messages: "संदेश",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",
    create_campaign: "अभियान बनाएं",
    apply_now: "अभी आवेदन करें",
    view_details: "विवरण देखें",
    budget: "बजट",
    deadline: "समय सीमा",
    applications: "आवेदन",
    earnings: "कमाई",
    balance: "शेष राशि",
    withdraw: "निकालें",
    deposit: "जमा करें",
  },
  es: {
    welcome: "Bienvenido a Sponza",
    dashboard: "Panel de Control",
    campaigns: "Campañas",
    profile: "Perfil",
    wallet: "Billetera",
    messages: "Mensajes",
    settings: "Configuración",
    logout: "Cerrar Sesión",
    create_campaign: "Crear Campaña",
    apply_now: "Aplicar Ahora",
    view_details: "Ver Detalles",
    budget: "Presupuesto",
    deadline: "Fecha Límite",
    applications: "Aplicaciones",
    earnings: "Ganancias",
    balance: "Saldo",
    withdraw: "Retirar",
    deposit: "Depositar",
  },
}

const currencies = {
  INR: { symbol: "₹", rate: 1 },
  USD: { symbol: "$", rate: 0.012 },
  EUR: { symbol: "€", rate: 0.011 },
  GBP: { symbol: "£", rate: 0.0095 },
}

// GET /api/localization - Get translations and currency data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get("lang") || "en"
    const currency = searchParams.get("currency") || "INR"

    const translation = translations[lang as keyof typeof translations] || translations.en
    const currencyData = currencies[currency as keyof typeof currencies] || currencies.INR

    return NextResponse.json({
      translations: translation,
      currency: {
        code: currency,
        symbol: currencyData.symbol,
        rate: currencyData.rate,
      },
      supportedLanguages: Object.keys(translations),
      supportedCurrencies: Object.keys(currencies),
    })
  } catch (error) {
    console.error("Localization error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/localization/convert - Convert currency amounts
export async function POST(request: NextRequest) {
  try {
    const { amount, fromCurrency, toCurrency } = await request.json()

    if (!amount || !fromCurrency || !toCurrency) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const fromRate = currencies[fromCurrency as keyof typeof currencies]?.rate
    const toRate = currencies[toCurrency as keyof typeof currencies]?.rate

    if (!fromRate || !toRate) {
      return NextResponse.json({ error: "Unsupported currency" }, { status: 400 })
    }

    // Convert to INR first, then to target currency
    const inrAmount = amount / fromRate
    const convertedAmount = inrAmount * toRate

    return NextResponse.json({
      originalAmount: amount,
      convertedAmount: Math.round(convertedAmount * 100) / 100,
      fromCurrency,
      toCurrency,
      rate: toRate / fromRate,
    })
  } catch (error) {
    console.error("Currency conversion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
