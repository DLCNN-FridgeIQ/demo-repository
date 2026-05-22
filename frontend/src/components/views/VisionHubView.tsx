import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function VisionHubView() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Vision Hub</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">Upload an image of your fridge for CNN object detection.</p>
      </div>
      <div className="mt-4 md:mt-8">
        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-100 shadow-sm w-full">
          <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl md:rounded-2xl p-8 md:p-16 flex flex-col items-center justify-center text-center transition-colors hover:bg-slate-100">
            <div className="bg-blue-50 p-4 rounded-full mb-4 md:mb-6">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Drag & Drop Fridge Image</h3>
            <p className="text-slate-500 mb-6 md:mb-8 max-w-sm text-xs md:text-sm">
              or tap here to use your mobile camera to take a photo of the open fridge.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 md:px-8 py-4 md:py-6 rounded-xl w-full md:w-auto shadow-md">
              Select Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
