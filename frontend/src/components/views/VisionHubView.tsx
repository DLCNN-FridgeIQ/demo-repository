import { useState, useRef, type ChangeEvent } from 'react';
import { Upload, Loader2, ArrowLeft, RefreshCw, Box, AlertCircle, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SUPERMARKET_PRICES, type GroceryItem } from '@/data/priceDatabase';

interface Detection {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  confidence: number;
  class: number;
  name: string;
}

interface VisionHubProps {
  groceryList: GroceryItem[];
  onAddToList: (item: GroceryItem) => void;
}

export function VisionHubView({ groceryList, onAddToList }: VisionHubProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [detections, setDetections] = useState<Detection[]>([]);
  const [prices, setPrices] = useState<Record<string, { name: string; coles: string; woolworths: string; aldi: string }>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamically calculate missing items from the 12 required fridge staples that were not detected in the scan
  const missingItems = SUPERMARKET_PRICES.filter((item) => {
    if (Object.keys(counts).length === 0) return false;

    // The 12 core required staples that should be in the fridge
    const REQUIRED_STAPLES = [
      "apple (Loose Royal Gala, each)",
      "carrot (Loose, each)",
      "tomato (Roma Loose, each)",
      "cheese (Cheddar Block, 500g)",
      "yogurt (Greek Style Plain, 1kg)",
      "banana (Cavendish, each)",
      "avocado (Hass, each)",
      "bread (White Soft Toast, 700g)",
      "peach (Loose, each)",
      "fish (Frozen Basa Fillets, 1kg)",
      "egg (Free Range Large, 12-pack)",
      "chicken breast (RSPCA Breast Fillet, 1kg)"
    ];

    const isStaple = REQUIRED_STAPLES.includes(item.name);
    if (!isStaple) return false;

    const masterName = item.name.toLowerCase();
    const isFound = Object.keys(counts).some((detectedName) => {
      const normDetected = detectedName.toLowerCase().trim();
      return masterName.includes(normDetected) || normDetected.includes(masterName);
    });
    return !isFound;
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImage(null);
      setCounts({});
      setDetections([]);
      setPrices({});
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImage(null);
      setCounts({});
      setDetections([]);
      setPrices({});
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Dynamically detect the server host to support mobile/network PWA connections
      const backendHost = window.location.hostname;
      const backendUrl = `http://${backendHost}:8000/detect`;

      const response = await fetch(backendUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Attempt to extract verbose backend detail message
        let errorMsg = 'Detection failed';
        try {
          const errJson = await response.json();
          if (errJson && errJson.detail) {
            errorMsg = errJson.detail;
          }
        } catch (_) { }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setResultImage(data.image); // Base64 image with bounding boxes
      setCounts(data.counts);     // Key-value counts of foods detected
      setDetections(data.predictions);
      setPrices(data.prices || {});
    } catch (error: any) {
      console.error("Error during object detection:", error);
      alert(`Detection Server Error:\n\n${error.message || 'Failed to connect to YOLOv5 backend. Make sure the Python server is running on port 8000.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResultImage(null);
    setCounts({});
    setDetections([]);
    setPrices({});
  };

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
          /* Dropzone landing view */
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-100 shadow-sm w-full">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl md:rounded-2xl p-8 md:p-16 flex flex-col items-center justify-center text-center transition-all hover:bg-slate-100/70 hover:border-blue-400 cursor-pointer group"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
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
          /* Image Upload/Results state */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left/Middle Column: Preview & Detections Image */}
            <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <button onClick={handleReset} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-950 font-semibold transition-colors">
                  <ArrowLeft size={16} /> Change Image
                </button>
                {resultImage && (
                  <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-100 flex items-center gap-1">
                    Scan Completed
                  </span>
                )}
              </div>

              <div className="relative rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                <img
                  src={resultImage || previewUrl}
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

              {!resultImage && !loading && (
                <div className="mt-6 flex justify-end gap-3">
                  <Button onClick={handleReset} variant="outline" className="border-slate-200 rounded-xl px-6 py-5 font-semibold text-slate-600 hover:text-slate-950">
                    Cancel
                  </Button>
                  <Button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-5 rounded-xl shadow-md">
                    Run Scan
                  </Button>
                </div>
              )}

              {resultImage && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleReset} className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-5 rounded-xl flex items-center gap-2">
                    <RefreshCw size={16} /> Scan Another Image
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column: Object Counts Stats */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <Box size={18} className="text-blue-600" />
                Detection Results
              </h3>

              {!resultImage ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <p className="text-sm text-slate-400 font-medium">
                    Upload and click "Run Scan" to extract ingredients from your photo.
                  </p>
                </div>
              ) : Object.keys(counts).length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <p className="text-sm text-amber-600 font-bold mb-1">No items detected</p>
                  <p className="text-xs text-slate-400">YOLOv5 couldn't identify any standard foodstuffs in this image.</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col space-y-6 overflow-hidden">

                  {/* Found Items Section */}
                  <div className="flex-1 flex flex-col min-h-0">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Detected Inventory ({Object.keys(counts).length})</p>
                    <div className="space-y-3 overflow-y-auto max-h-[240px] pr-1">
                      {Object.entries(counts).map(([name, count]) => {
                        const priceInfo = prices[name];
                        return (
                          <div key={name} className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800 text-sm capitalize">{name}</span>
                              <span className="bg-blue-50 text-blue-700 text-xs font-extrabold px-3 py-1 rounded-lg border border-blue-100">
                                {count} units
                              </span>
                            </div>
                            {priceInfo && priceInfo.coles !== "N/A" && (
                              <div className="text-[10px] md:text-xs text-slate-500 bg-white border border-slate-100 rounded-lg p-2.5 space-y-1.5 mt-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                                <div className="font-semibold text-slate-400 text-[9px] uppercase tracking-wider mb-1 truncate">
                                  Matched Unit: {priceInfo.name}
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-slate-500">Coles:</span>
                                  <span className="font-bold text-red-600">{priceInfo.coles}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-slate-500">Woolworths:</span>
                                  <span className="font-bold text-emerald-600">{priceInfo.woolworths}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-slate-500">ALDI:</span>
                                  <span className="font-bold text-blue-600">{priceInfo.aldi}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Missing / Low Stock Section */}
                  <div className="flex-1 flex flex-col min-h-0 border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertCircle size={14} className="text-amber-500" /> Missing / Low Stock ({missingItems.length})
                    </p>
                    <div className="space-y-2 overflow-y-auto max-h-[260px] pr-1">
                      {missingItems.map((item) => {
                        const isAdded = groceryList.some(g => g.id === item.id);
                        return (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50/50 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
                            <div className="flex flex-col pr-2">
                              <span className="font-bold text-slate-700 text-xs md:text-sm capitalize leading-tight">{item.name}</span>
                              <span className="text-[9px] text-slate-400 font-medium mt-0.5">{item.category}</span>
                            </div>
                            {isAdded ? (
                              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-1 flex-shrink-0">
                                Added
                              </span>
                            ) : (
                              <Button
                                onClick={() => onAddToList(item)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3 py-1.5 h-auto rounded-lg shadow-sm flex-shrink-0 flex items-center gap-1"
                              >
                                <ShoppingCart size={10} /> Add
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

