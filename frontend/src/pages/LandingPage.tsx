import { Zap, Camera, ShoppingCart, BarChart3, ChevronRight, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onTryNow: () => void;
}

const features = [
  {
    icon: Camera,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'AI Fridge Scanning',
    description:
      'Point your camera at your fridge and our YOLOv5 computer vision model instantly identifies every item — no barcodes, no manual entry.',
  },
  {
    icon: ShoppingCart,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Smart Grocery Lists',
    description:
      'FridgIQ automatically generates a restocking list based on what it detects is missing or running low, so you never forget a thing.',
  },
  {
    icon: BarChart3,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    title: 'Price Comparison',
    description:
      'Compare live prices across Coles, Woolworths, and Aldi side by side. Always know which store gives you the best deal for your cart.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Upload a photo',
    description: 'Take a picture of your fridge or pantry and upload it directly in the app.',
  },
  {
    number: '02',
    title: 'AI detects items',
    description: 'Our deep learning model scans the image and identifies every visible food item in seconds.',
  },
  {
    number: '03',
    title: 'Shop smarter',
    description: 'Get a ready-to-go grocery list with the cheapest prices across your local stores.',
  },
];

const stats = [
  { value: '50+', label: 'Food categories detected' },
  { value: '3', label: 'Stores compared' },
  { value: '< 2s', label: 'Detection time' },
];

export function LandingPage({ onTryNow }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-extrabold text-xl tracking-tight">
              FridgIQ<span className="text-blue-600">.ai</span>
            </span>
          </div>
          <Button
            onClick={onTryNow}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl text-sm shadow-sm"
          >
            Try Now
          </Button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
              <Star className="w-3.5 h-3.5 fill-current" />
              Powered by YOLOv5 Deep Learning
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 mb-6">
              Your fridge, scanned.<br />
              <span className="text-blue-600">Your grocery list, sorted.</span>
            </h1>

            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              FridgIQ.ai uses computer vision to detect what's in your fridge, automatically build your shopping list, and find the cheapest prices across major Australian supermarkets.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                onClick={onTryNow}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-2xl text-base shadow-lg flex items-center gap-2 w-full sm:w-auto"
              >
                Try FridgIQ for free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <span className="text-sm text-slate-400 font-medium self-center">No sign-up required · Demo ready</span>
            </div>
          </div>

          {/* Right — hero image */}
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-3 bg-blue-100 rounded-[2rem] blur-xl opacity-60 -z-10" />

            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/landing_page_image.jpg"
                alt="FridgIQ fridge scan preview"
                className="w-full h-auto block"
              />
            </div>

            {/* Floating stat badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-xl">
                <Camera className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">14 items detected</div>
                <div className="text-xs text-slate-400 font-medium">98% confidence</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-extrabold text-blue-600">{s.value}</div>
              <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-snug">
              Built for people who hate wasting food — and money.
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5">
              The average Australian household throws away <span className="font-semibold text-slate-700">$2,500 worth of food</span> every year. FridgIQ.ai was built to fix that. By giving you a real-time picture of exactly what you have, you stop buying duplicates and stop letting things expire unnoticed.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              On top of that, our price engine scans Coles, Woolworths, and Aldi so you always add the right items to the right cart — and always pay the lowest price.
            </p>
            <button
              onClick={onTryNow}
              className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
            >
              Start your first scan <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Visual placeholder card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="bg-blue-50 rounded-2xl h-40 flex items-center justify-center border border-blue-100">
              <Camera className="w-16 h-16 text-blue-300" />
            </div>
            <div className="space-y-2.5">
              {['Milk × 2', 'Cheddar cheese', 'Greek yoghurt', 'Broccoli', 'Eggs × 6'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-xs font-bold text-emerald-600">Detected</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Everything you need in one place</h2>
            <p className="text-slate-500 max-w-xl mx-auto">From scan to checkout — FridgIQ handles the full grocery intelligence loop.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-3xl border border-slate-100 p-7 shadow-sm bg-slate-50 hover:shadow-md transition-shadow">
                <div className={`${f.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center mb-5`}>
                  <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">How it works</h2>
          <p className="text-slate-500">Three steps from photo to shopping list.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+2.5rem)] right-[-calc(50%-2.5rem)] h-px bg-slate-200 z-0" />
              )}
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto mb-5 shadow-md">
                  {step.number}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-blue-600 rounded-3xl p-10 md:p-14 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to scan your fridge?</h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">
            Jump straight into the demo — no account setup needed. Just sign in and start scanning.
          </p>
          <Button
            onClick={onTryNow}
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-6 rounded-2xl text-base shadow-md flex items-center gap-2 mx-auto"
          >
            Try Now — it's free
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1 rounded-md">
              <Zap className="text-white w-4 h-4 fill-current" />
            </div>
            <span className="font-extrabold text-sm">
              FridgIQ<span className="text-blue-600">.ai</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Built with YOLOv5 · React · FastAPI · SQLite
          </p>
          <button
            onClick={onTryNow}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Sign in →
          </button>
        </div>
      </footer>

    </div>
  );
}
