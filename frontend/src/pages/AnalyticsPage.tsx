import { useState } from 'react';
import { CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

type TrendEntry = { month: string; price: number };

const STAPLE_TRENDS: Record<string, { label: string; data: TrendEntry[] }> = {
  egg:     { label: 'Eggs (Free Range, 12pk)',       data: [{month:'Jan',price:4.80},{month:'Feb',price:4.90},{month:'Mar',price:4.90},{month:'Apr',price:5.20},{month:'May',price:5.50}] },
  chicken: { label: 'Chicken Breast (RSPCA, 1kg)',   data: [{month:'Jan',price:12.50},{month:'Feb',price:12.80},{month:'Mar',price:13.00},{month:'Apr',price:13.20},{month:'May',price:13.50}] },
  cheese:  { label: 'Cheese (Cheddar Block, 500g)',  data: [{month:'Jan',price:6.80},{month:'Feb',price:7.00},{month:'Mar',price:7.20},{month:'Apr',price:7.40},{month:'May',price:7.50}] },
  bread:   { label: 'Bread (White Toast, 700g)',     data: [{month:'Jan',price:2.20},{month:'Feb',price:2.20},{month:'Mar',price:2.30},{month:'Apr',price:2.40},{month:'May',price:2.40}] },
  yogurt:  { label: 'Yogurt (Greek Style, 1kg)',     data: [{month:'Jan',price:5.00},{month:'Feb',price:5.20},{month:'Mar',price:5.20},{month:'Apr',price:5.40},{month:'May',price:5.50}] },
  fish:    { label: 'Fish (Frozen Basa, 1kg)',       data: [{month:'Jan',price:9.00},{month:'Feb',price:9.20},{month:'Mar',price:9.50},{month:'Apr',price:9.80},{month:'May',price:10.00}] },
  apple:   { label: 'Apple (Royal Gala, each)',      data: [{month:'Jan',price:1.10},{month:'Feb',price:1.15},{month:'Mar',price:1.20},{month:'Apr',price:1.22},{month:'May',price:1.26}] },
  banana:  { label: 'Banana (Cavendish, each)',      data: [{month:'Jan',price:0.75},{month:'Feb',price:0.78},{month:'Mar',price:0.80},{month:'Apr',price:0.82},{month:'May',price:0.85}] },
  avocado: { label: 'Avocado (Hass, each)',          data: [{month:'Jan',price:1.80},{month:'Feb',price:1.90},{month:'Mar',price:2.00},{month:'Apr',price:2.10},{month:'May',price:2.20}] },
  carrot:  { label: 'Carrot (Loose, each)',          data: [{month:'Jan',price:0.28},{month:'Feb',price:0.29},{month:'Mar',price:0.30},{month:'Apr',price:0.32},{month:'May',price:0.35}] },
  tomato:  { label: 'Tomato (Roma, each)',           data: [{month:'Jan',price:0.70},{month:'Feb',price:0.75},{month:'Mar',price:0.80},{month:'Apr',price:0.85},{month:'May',price:0.90}] },
  peach:   { label: 'Peach (Loose, each)',           data: [{month:'Jan',price:1.20},{month:'Feb',price:1.25},{month:'Mar',price:1.30},{month:'Apr',price:1.40},{month:'May',price:1.50}] },
};

function computeAxis(data: TrendEntry[]) {
  const prices = data.map((d) => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const pad = (max - min) * 0.35 || max * 0.1;
  const lo = Math.floor((min - pad) * 20) / 20;
  const hi = Math.ceil((max + pad) * 20) / 20;
  const step = (hi - lo) / 4;
  const ticks = [0, 1, 2, 3, 4].map((i) => Math.round((lo + i * step) * 100) / 100);
  return { domain: [lo, hi] as [number, number], ticks };
}

const barChartData = [
  { week: 'Week 1', spend: 138 },
  { week: 'Week 2', spend: 102 },
  { week: 'Week 3', spend: 145 },
  { week: 'Week 4', spend: 85 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 z-50">
      <p className="font-semibold text-slate-500 mb-1">{label}</p>
      <p className="font-bold text-lg text-amber-500">${payload[0].value.toFixed(2)}</p>
    </div>
  );
}

function BarTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 z-50">
      <p className="font-semibold text-slate-500 mb-1">{label}</p>
      <p className="font-bold text-lg text-slate-900">${payload[0].value}</p>
    </div>
  );
}

export function AnalyticsPage() {
  const [selectedKey, setSelectedKey] = useState('egg');

  const staple   = STAPLE_TRENDS[selectedKey];
  const { domain, ticks } = computeAxis(staple.data);
  const firstPrice = staple.data[0].price;
  const lastPrice  = staple.data[staple.data.length - 1].price;
  const pctChange  = ((lastPrice - firstPrice) / firstPrice) * 100;
  const increased  = pctChange > 0.5;
  const decreased  = pctChange < -0.5;

  return (
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Price Trends & Insights</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">Track inflation and budget history based on your scans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-8">

        {/* Staple price trend */}
        <Card className="rounded-2xl md:rounded-3xl border-slate-100 shadow-sm p-1 md:p-2 flex flex-col justify-between h-[380px] md:h-[440px] w-full">
          <CardHeader className="pt-4 md:pt-6 px-4 md:px-6 pb-2">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
                Staple Price Trend
              </CardTitle>
              {/* Dropdown */}
              <div className="relative w-full">
                <select
                  value={selectedKey}
                  onChange={(e) => setSelectedKey(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-8"
                >
                  {Object.entries(STAPLE_TRENDS).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end px-2 md:px-6 pb-4 md:pb-6 w-full">
            <div className="h-40 md:h-52 w-full mb-3 md:mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={staple.data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} tickFormatter={(v) => `$${v.toFixed(2)}`} domain={domain} ticks={ticks} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#fff', stroke: '#f59e0b', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#f59e0b', stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={`flex items-center gap-2 md:gap-3 text-xs md:text-sm font-medium p-3 md:p-4 rounded-xl border mx-2 md:mx-0 ${
              increased ? 'bg-amber-50 border-amber-100 text-slate-600' :
              decreased ? 'bg-emerald-50 border-emerald-100 text-slate-600' :
                          'bg-slate-50 border-slate-100 text-slate-600'
            }`}>
              {increased ? (
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-amber-500" />
              ) : decreased ? (
                <TrendingDown className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-emerald-500" />
              ) : (
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-slate-400" />
              )}
              {increased
                ? `Prices for this staple have risen ${Math.abs(pctChange).toFixed(0)}% over 5 months.`
                : decreased
                ? `Prices for this staple have fallen ${Math.abs(pctChange).toFixed(0)}% over 5 months.`
                : 'Prices for this staple have stayed stable over 5 months.'}
            </div>
          </CardContent>
        </Card>

        {/* Weekly spend */}
        <Card className="rounded-2xl md:rounded-3xl border-slate-100 shadow-sm p-1 md:p-2 flex flex-col justify-between h-[380px] md:h-[440px] w-full">
          <CardHeader className="pt-4 md:pt-6 px-4 md:px-6 pb-2">
            <CardTitle className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">Weekly Grocery Spend</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end px-2 md:px-6 pb-4 md:pb-6 w-full">
            <div className="h-40 md:h-56 w-full mb-4 md:mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} tickFormatter={(v) => `$${v}`} domain={[0, 160]} ticks={[0, 40, 80, 120, 160]} />
                  <Tooltip content={<BarTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="spend" radius={[4, 4, 0, 0]} maxBarSize={40}>
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.week === 'Week 4' ? '#6ee7b7' : '#7ba9f8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-slate-600 text-xs md:text-sm font-medium bg-emerald-50 p-3 md:p-4 rounded-xl border border-emerald-100 mx-2 md:mx-0">
              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-emerald-500" />
              You saved $35 this week by optimizing your cart!
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
