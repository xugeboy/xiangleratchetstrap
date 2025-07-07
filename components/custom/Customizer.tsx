import { WebbingColor, TextColor, textColorOptions } from './constants';
import ColorSelector from './ColorSelector';
import { colorSelection } from '@/types/Customizations';

// The props for the now "dumb" component, receiving state and setters
interface CustomizerProps {
    webbingColor: WebbingColor;
    setWebbingColor: (color: WebbingColor) => void;
    textColor: TextColor;
    setTextColor: (color: TextColor) => void;
    printedText: string;
    setPrintedText: (text: string) => void;
    printInterval: number;
    setPrintInterval: (interval: number) => void;
    webbingColorOptions: colorSelection[]
}

export default function Customizer({
    webbingColor,
    setWebbingColor,
    textColor,
    setTextColor,
    printedText,
    setPrintedText,
    printInterval,
    setPrintInterval,
    webbingColorOptions
}: CustomizerProps) {
  // This component no longer holds state. It only renders the form controls.
  return (
    <div className="space-y-8">
      {/* 选项区域 */}
      <div className="space-y-6 rounded-lg border border-gray-200 p-6 bg-gray-50">
        <ColorSelector
          label="1) Webbing Color"
          colors={webbingColorOptions}
          selectedColor={webbingColor}
          onColorSelect={(color) => setWebbingColor(color as WebbingColor)}
        />
        <ColorSelector
          label="2) Text Color"
          colors={textColorOptions}
          selectedColor={textColor}
          onColorSelect={(color) => setTextColor(color as TextColor)}
        />
        
        <div>
          <label htmlFor="printedText" className="block text-sm font-medium text-gray-700">
            3) Printed Text
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="printedText"
              value={printedText}
              onChange={(e) => setPrintedText(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Your Text Here"
            />
          </div>
        </div>

        <div>
          <label htmlFor="printInterval" className="block text-sm font-medium text-gray-700">
            4) Loop Print Interval (mm)
          </label>
          <div className="mt-1">
            <input
              type="number"
              id="printInterval"
              value={printInterval}
              onChange={(e) => setPrintInterval(Number(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., 12"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
