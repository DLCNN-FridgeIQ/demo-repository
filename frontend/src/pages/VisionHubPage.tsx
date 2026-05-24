import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Upload, Loader2, ArrowLeft, RefreshCw, Box, Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { detectionService } from '@/services/detectionService';
import { priceInfoToGroceryItem } from '@/data/priceDatabase';
import type { Detection, DetectionResult, GroceryItem } from '@/types';

interface VisionHubPageProps {
  onAddToList: (item: GroceryItem) => void;
}

export function VisionHubPage({ onAddToList }: VisionHubPageProps) {
  const [selectedFile, setSelectedFile]   = useState<File | null>(null);
  const [previewUrl, setPreviewUrl]       = useState<string | null>(null);
  const [loading, setLoading]             = useState(false);
  const [result, setResult]               = useState<DetectionResult | null>(null);
  const [addedIds, setAddedIds]           = useState<Set<number>>(new Set());
  const fileInputRef                      = useRef<HTMLInputElement>(null);

  useEffect(() => { setAddedIds(new Set()); }, [result]);

  const setFile = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const data = await detectionService.detect(selectedFile);
      setResult(data);
    } catch (error: unknown) {
      alert(`Detection Error:\n\n${error instanceof Error ? error.message : 'Failed to connect to backend.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  const handleAddToList = (label: string) => {
    const priceInfo = result?.prices?.[label];
    if (!priceInfo) return;
    const item = priceInfoToGroceryItem(priceInfo);
    if (!item) return;
    onAddToList(item);
    setAddedIds((prev) => new Set([...prev, item.id]));
  };

  const detections: Detection[] = result?.predictions ?? [];
  const counts: Record<string, number> = result?.counts ?? {};

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Vision Hub</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">
          Upload an image of your fridge for real-time CNN food detection.
        </p>
      </div>

      <div className="mt-4 md:mt-8">
        {!previewUrl ? (
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-100 shadow-sm w-full">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl md:rounded-2xl p-8 md:p-16 flex flex-col items-center justify-center text-center transition-all hover:bg-slate-100/70 hover:border-blue-400 cursor-pointer group"
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <div className="bg-blue-50 p-4 rounded-full mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Drag & Drop Fridge Image</h3>
              <p className="text-slate-500 mb-6 md:mb-8 max-w-sm text-xs md:text-sm">
                or click here to select an image from your device or mobile camera.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 md:px-8 py-4 md:py-6 rounded-xl w-full md:w-auto shadow-md">
                Select Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image panel */}
            <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <button onClick={handleReset} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-950 font-semibold transition-colors">
                  <ArrowLeft size={16} /> Change Image
                </button>
                {result && (
                  <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-100 flex items-center gap-1">
                    Scan Completed
                  </span>
                )}
              </div>

              <div className="relative rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                <img
                  src={result?.image ?? previewUrl}
                  alt="Fridge scan"
                  className="max-h-[500px] w-auto object-contain rounded-xl"
                />
                {loading && (
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-400 mb-3" />
                    <p className="font-bold text-sm">Processing with YOLOv5...</p>
                  </div>
                )}
              </div>

              {!result && !loading && (
                <div className="mt-6 flex justify-end gap-3">
                  <Button onClick={handleReset} variant="outline" className="border-slate-200 rounded-xl px-6 py-5 font-semibold text-slate-600 hover:text-slate-950">
                    Cancel
                  </Button>
                  <Button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-5 rounded-xl shadow-md">
                    Run Scan
                  </Button>
                </div>
              )}

              {result && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleReset} className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-5 rounded-xl flex items-center gap-2">
                    <RefreshCw size={16} /> Scan Another Image
                  </Button>
                </div>
              )}
            </div>

            {/* Detection results panel */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <Box size={18} className="text-blue-600" /> Detection Results
              </h3>

              {!result ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <p className="text-sm text-slate-400 font-medium">Upload and click "Run Scan" to extract ingredients from your photo.</p>
                </div>
              ) : Object.keys(counts).length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <p className="text-sm text-amber-600 font-bold mb-1">No items detected</p>
                  <p className="text-xs text-slate-400">YOLOv5 couldn't identify any standard foodstuffs in this image.</p>
                </div>
              ) : (
                <div className="flex-1 space-y-3 overflow-y-auto max-h-[400px] pr-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Detected Inventory ({detections.length})</p>
                  {Object.entries(counts).map(([name, count]) => {
                    const priceInfo = result.prices?.[name];
                    const hasPrice  = priceInfo && priceInfo.coles != null;
                    const minPrice  = hasPrice
                      ? Math.min(priceInfo!.coles!, priceInfo!.woolworths ?? Infinity, priceInfo!.aldi ?? Infinity)
                      : null;
                    const isAdded   = priceInfo?.id != null && addedIds.has(priceInfo.id);

                    return (
                      <div key={name} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors gap-2">
                        <div className="min-w-0">
                          <span className="font-bold text-slate-800 text-sm capitalize block truncate">{name}</span>
                          {hasPrice && minPrice != null && (
                            <span className="text-xs text-slate-500">Best: ${minPrice.toFixed(2)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="bg-blue-50 text-blue-700 text-xs font-extrabold px-2.5 py-1 rounded-lg border border-blue-100">
                            {count}×
                          </span>
                          {hasPrice && (
                            <button
                              onClick={() => handleAddToList(name)}
                              disabled={isAdded}
                              title={isAdded ? 'Added to list' : 'Add to grocery list'}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isAdded
                                  ? 'text-emerald-600 bg-emerald-50 cursor-default'
                                  : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                              }`}
                            >
                              {isAdded ? <CheckCircle2 size={15} /> : <Plus size={15} />}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-[10px] text-slate-400 text-center pt-1">
                    Tap <Plus size={10} className="inline" /> to add items to your grocery list
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
