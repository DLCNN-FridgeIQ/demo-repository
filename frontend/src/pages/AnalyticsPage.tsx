import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const lineChartData = [
  { month: 'Jan', price: 4.80 },
  { month: 'Feb', price: 4.90 },
  { month: 'Mar', price: 4.90 },
  { month: 'Apr', price: 5.20 },
  { month: 'May', price: 5.50 },
];

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
  isCurrency?: boolean;
}

function CustomTooltip({ active, payload, label, isCurrency }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 z-50">
      <p className="font-semibold text-slate-500 mb-1">{label}</p>
      <p className={`font-bold text-lg ${isCurrency ? 'text-amber-500' : 'text-slate-900'}`}>
        ${isCurrency ? payload[0].value.toFixed(2) : payload[0].value}
      </p>
    </div>
  );
}

export function AnalyticsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Price Trends & Insights</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">Track inflation and budget history based on your scans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-8">
        <Card className="rounded-2xl md:rounded-3xl border-slate-100 shadow-sm p-1 md:p-2 flex flex-col justify-between h-[340px] md:h-[420px] w-full">
          <CardHeader className="pt-4 md:pt-6 px-4 md:px-6 pb-2">
            <CardTitle className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">Staple Price Trend: Eggs (12pk)</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end px-2 md:px-6 pb-4 md:pb-6 w-full">
            <div className="h-40 md:h-56 w-full mb-4 md:mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} tickFormatter={(v) => `$${v.toFixed(2)}`} domain={[4.30, 6.00]} ticks={[4.30, 4.75, 5.20, 5.65, 6.00]} />
                  <Tooltip content={<CustomTooltip isCurrency />} cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#fff', stroke: '#f59e0b', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#f59e0b', stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-slate-600 text-xs md:text-sm font-medium bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100 mx-2 md:mx-0">
              <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-amber-500" />
              Prices for this staple have risen 14% over 5 months.
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl md:rounded-3xl border-slate-100 shadow-sm p-1 md:p-2 flex flex-col justify-between h-[340px] md:h-[420px] w-full">
          <CardHeader className="pt-4 md:pt-6 px-4 md:px-6 pb-2">
            <CardTitle className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">Weekly Grocery Spend</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end px-2 md:px-6 pb-4 md:pb-6 w-full">
            <div className="h-40 md:h-56 w-full mb-4 md:mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} tickFormatter={(v) => `$${v}`} domain={[0, 160]} ticks={[0, 40, 80, 120, 160]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
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
