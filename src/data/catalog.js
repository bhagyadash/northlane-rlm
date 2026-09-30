// Product Information Service (PIM) — the single system of record for product,
// pricing, and bundle data that quoting, fulfillment, metering, and invoicing all
// read from downstream. Synthetic data for the fictional global vendor "Northlane
// Systems," which sells four product lines with four different revenue treatments:
// a per-seat subscription, physical IoT hardware, a metered API, and an AI agent
// product billed by token consumption.

export const REGIONS = [
  { currency: 'USD', label: 'United States', flag: 'US', fxToUSD: 1.0 },
  { currency: 'GBP', label: 'United Kingdom', flag: 'UK', fxToUSD: 1.27 },
  { currency: 'EUR', label: 'Germany (Eurozone)', flag: 'EU', fxToUSD: 1.09 },
  { currency: 'AUD', label: 'Australia', flag: 'AU', fxToUSD: 0.66 },
  { currency: 'JPY', label: 'Japan', flag: 'JP', fxToUSD: 0.0067 },
  { currency: 'BRL', label: 'Brazil', flag: 'BR', fxToUSD: 0.19 },
  { currency: 'INR', label: 'India', flag: 'IN', fxToUSD: 0.012 },
]

export const PRODUCT_FAMILIES = [
  {
    key: 'core',
    name: 'Northlane Core',
    category: 'Subscription software',
    revenueTreatment: 'Ratable — recognized straight-line over the subscription term',
    uom: 'Seat / month',
    lifecycle: 'GA',
    skus: [
      { sku: 'CORE-STARTER', name: 'Core — Starter', tier: 'Starter', priceUSD: 39.0 },
      { sku: 'CORE-PRO', name: 'Core — Professional', tier: 'Professional', priceUSD: 79.0 },
      { sku: 'CORE-ENT', name: 'Core — Enterprise', tier: 'Enterprise', priceUSD: 129.0 },
    ],
  },
  {
    key: 'sensors',
    name: 'Northlane Sensors',
    category: 'IoT hardware',
    revenueTreatment: 'Point-in-time — recognized on confirmed delivery',
    uom: 'Unit',
    lifecycle: 'GA',
    skus: [
      { sku: 'SNSR-100', name: 'Sensor-100 (ambient)', tier: null, priceUSD: 175.0 },
      { sku: 'SNSR-300', name: 'Sensor-300 (cold-chain)', tier: null, priceUSD: 260.0 },
      { sku: 'GATEWAY-HUB', name: 'Gateway-Hub (site controller)', tier: null, priceUSD: 680.0 },
    ],
  },
  {
    key: 'api',
    name: 'Northlane Data API',
    category: 'Metered usage',
    revenueTreatment: 'Usage-based — recognized as consumed, rated at period close',
    uom: 'API call',
    lifecycle: 'GA',
    skus: [
      { sku: 'API-OVERAGE-SUB', name: 'Overage — subscriber rate', tier: null, priceUSD: 0.0021 },
      { sku: 'API-OVERAGE-PAYG', name: 'Overage — pay-as-you-go rate (no subscription)', tier: null, priceUSD: 0.0032 },
      { sku: 'API-OVERAGE-PARTNER', name: 'Overage — marketplace partner rate', tier: null, priceUSD: 0.0028 },
    ],
  },
  {
    key: 'copilot',
    name: 'Northlane Copilot',
    category: 'AI agent (consumption)',
    revenueTreatment: 'Consumption — recognized per token event, multi-dimensional rate card',
    uom: 'Token (per 1M, input/output)',
    lifecycle: 'GA',
    skus: [
      { sku: 'COPILOT-PLATFORM', name: 'Copilot platform fee', tier: null, priceUSD: 249.0 },
      { sku: 'COPILOT-REASON-IN', name: 'Halyard Reason model — input tokens /1M', tier: null, priceUSD: 6.0 },
      { sku: 'COPILOT-REASON-OUT', name: 'Halyard Reason model — output tokens /1M', tier: null, priceUSD: 28.0 },
      { sku: 'COPILOT-SWIFT-IN', name: 'Northlane Swift model — input tokens /1M', tier: null, priceUSD: 1.8 },
      { sku: 'COPILOT-SWIFT-OUT', name: 'Northlane Swift model — output tokens /1M', tier: null, priceUSD: 8.0 },
    ],
  },
]

// Localized price books. Real RLM platforms hold one localized, currency-specific
// unit price per SKU per region rather than converting the USD list price on the
// fly — conversion drifts with FX and creates a different invoice total than the
// customer agreed to. A handful of cells are deliberately left unlocalized below
// (`null`) to illustrate a real PIM data-completeness gap: a SKU with no approved
// local price can't be quoted in that currency until pricing ops fills it in.
export const PRICE_BOOKS = {
  USD: { 'CORE-STARTER': 39.0, 'CORE-PRO': 79.0, 'CORE-ENT': 129.0, 'SNSR-100': 175.0, 'SNSR-300': 260.0, 'GATEWAY-HUB': 680.0, 'API-OVERAGE-SUB': 0.0021, 'API-OVERAGE-PAYG': 0.0032, 'API-OVERAGE-PARTNER': 0.0028, 'COPILOT-PLATFORM': 249.0, 'COPILOT-REASON-IN': 6.0, 'COPILOT-REASON-OUT': 28.0, 'COPILOT-SWIFT-IN': 1.8, 'COPILOT-SWIFT-OUT': 8.0 },
  GBP: { 'CORE-STARTER': 31.0, 'CORE-PRO': 62.0, 'CORE-ENT': 99.0, 'SNSR-100': 138.0, 'SNSR-300': 185.0, 'GATEWAY-HUB': 520.0, 'API-OVERAGE-SUB': 0.0017, 'API-OVERAGE-PAYG': 0.0026, 'API-OVERAGE-PARTNER': 0.0022, 'COPILOT-PLATFORM': 196.0, 'COPILOT-REASON-IN': 4.7, 'COPILOT-REASON-OUT': 22.0, 'COPILOT-SWIFT-IN': 1.4, 'COPILOT-SWIFT-OUT': 6.3 },
  EUR: { 'CORE-STARTER': 36.0, 'CORE-PRO': 72.0, 'CORE-ENT': 118.0, 'SNSR-100': 159.0, 'SNSR-300': 239.0, 'GATEWAY-HUB': 625.0, 'API-OVERAGE-SUB': 0.0019, 'API-OVERAGE-PAYG': 0.0029, 'API-OVERAGE-PARTNER': 0.0026, 'COPILOT-PLATFORM': 229.0, 'COPILOT-REASON-IN': 5.5, 'COPILOT-REASON-OUT': 26.0, 'COPILOT-SWIFT-IN': 1.7, 'COPILOT-SWIFT-OUT': 7.4 },
  AUD: { 'CORE-STARTER': 59.0, 'CORE-PRO': 109.0, 'CORE-ENT': 195.0, 'SNSR-100': 265.0, 'SNSR-300': 395.0, 'GATEWAY-HUB': 1030.0, 'API-OVERAGE-SUB': 0.0032, 'API-OVERAGE-PAYG': 0.0048, 'API-OVERAGE-PARTNER': 0.0028, 'COPILOT-PLATFORM': 379.0, 'COPILOT-REASON-IN': 9.1, 'COPILOT-REASON-OUT': 42.0, 'COPILOT-SWIFT-IN': 2.7, 'COPILOT-SWIFT-OUT': 12.1 },
  JPY: { 'CORE-STARTER': 5800.0, 'CORE-PRO': 11700.0, 'CORE-ENT': 19200.0, 'SNSR-100': null, 'SNSR-300': null, 'GATEWAY-HUB': null, 'API-OVERAGE-SUB': 0.31, 'API-OVERAGE-PAYG': 0.48, 'API-OVERAGE-PARTNER': 0.42, 'COPILOT-PLATFORM': 37200.0, 'COPILOT-REASON-IN': 900.0, 'COPILOT-REASON-OUT': 4200.0, 'COPILOT-SWIFT-IN': 270.0, 'COPILOT-SWIFT-OUT': 1190.0 },
  BRL: { 'CORE-STARTER': 205.0, 'CORE-PRO': 415.0, 'CORE-ENT': 680.0, 'SNSR-100': null, 'SNSR-300': null, 'GATEWAY-HUB': null, 'API-OVERAGE-SUB': 0.011, 'API-OVERAGE-PAYG': 0.017, 'API-OVERAGE-PARTNER': 0.015, 'COPILOT-PLATFORM': 1310.0, 'COPILOT-REASON-IN': 31.6, 'COPILOT-REASON-OUT': 147.0, 'COPILOT-SWIFT-IN': 9.5, 'COPILOT-SWIFT-OUT': 42.1 },
  INR: { 'CORE-STARTER': 3250.0, 'CORE-PRO': 6580.0, 'CORE-ENT': 10750.0, 'SNSR-100': null, 'SNSR-300': null, 'GATEWAY-HUB': null, 'API-OVERAGE-SUB': 0.175, 'API-OVERAGE-PAYG': 0.266, 'API-OVERAGE-PARTNER': 0.233, 'COPILOT-PLATFORM': 20750.0, 'COPILOT-REASON-IN': 500.0, 'COPILOT-REASON-OUT': 2333.0, 'COPILOT-SWIFT-IN': 150.0, 'COPILOT-SWIFT-OUT': 667.0 },
}

export const BUNDLES = [
  {
    key: 'cold-chain',
    name: 'Cold-Chain Monitoring Bundle',
    skus: ['SNSR-300', 'GATEWAY-HUB', 'CORE-PRO'],
    description: 'Hardware + platform bundle for pharmaceutical/biotech cold-chain compliance monitoring. Hardware revenue is held until confirmed delivery per standard fulfillment terms.',
    usedIn: ['DEAL-3303'],
  },
  {
    key: 'facility-iot',
    name: 'Facility IoT Bundle',
    skus: ['SNSR-300', 'GATEWAY-HUB', 'CORE-ENT'],
    description: 'Enterprise workspace seats paired with site-monitoring hardware, sold as one bundle for regulated facilities (e.g. healthcare).',
    usedIn: ['DEAL-3301'],
  },
  {
    key: 'agentic-analytics',
    name: 'Agentic Analytics Bundle',
    skus: ['CORE-PRO', 'COPILOT-PLATFORM', 'COPILOT-SWIFT-IN', 'COPILOT-SWIFT-OUT'],
    description: 'Professional workspace seats plus the Copilot AI agent on the lightweight Swift model, for teams automating analysis workflows.',
    usedIn: ['DEAL-3305'],
  },
  {
    key: 'marketplace-standard',
    name: 'Marketplace Partner Standard Bundle',
    skus: ['CORE-PRO', 'API-OVERAGE-PARTNER'],
    description: 'The standard bundle marketplace distributors (e.g. CloudRelay) resell under their own price book at a pre-negotiated discount off direct list.',
    usedIn: ['DEAL-3302'],
  },
]
