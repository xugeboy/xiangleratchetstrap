"use client"

import { UnitOptions, WeightUnits, PALLET_PRESETS, LengthUnit, WeightUnit } from "@/utils/cbmConstants"
import type { CalculatorInput } from "@/utils/calculation"

interface Props {
  value: CalculatorInput
  onChange: (next: CalculatorInput) => void
  onCalculate: () => void
  onReset: () => void
}

export default function InputForm({ value, onChange, onCalculate, onReset }: Props) {
  const set = <K extends keyof CalculatorInput>(key: K, val: CalculatorInput[K]) => onChange({ ...value, [key]: val })

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-black">Inputs</h2>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black">Length Unit</label>
          <select
            value={value.unit}
            onChange={e => set("unit", e.target.value as LengthUnit)}
            className="mt-2 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
          >
            {UnitOptions.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Weight Unit</label>
          <select
            value={value.weightUnit}
            onChange={e => set("weightUnit", e.target.value as WeightUnit)}
            className="mt-2 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
          >
            {WeightUnits.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        {(["length","width","height"] as const).map((k) => (
          <div key={k} className={k === "length" ? "col-span-2" : ""}>
            <label className="block text-sm font-medium text-black">{k}</label>
            <input
              inputMode="decimal"
              value={String(value[k] ?? "")}
              onChange={e => set(k, Number(e.target.value || 0))}
              className="mt-2 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
              placeholder={k}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-black">Weight per Carton</label>
          <input
            inputMode="decimal"
            value={String(value.weightPerCarton ?? "")}
            onChange={e => set("weightPerCarton", Number(e.target.value || 0))}
            className="mt-2 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
            placeholder="e.g. 12"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Total Quantity</label>
          <input
            inputMode="numeric"
            value={String(value.quantity ?? "")}
            onChange={e => set("quantity", Number(e.target.value || 0))}
            className="mt-2 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
            placeholder="e.g. 1000"
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black">Pallet Settings</h3>
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-black">
            <input type="checkbox" checked={value.calculatePallet} onChange={e => set("calculatePallet", e.target.checked)} />
            Calculate Pallet Loading
          </label>
        </div>

        {value.calculatePallet && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-black">Pallet Type</label>
              <select
                value={value.palletPresetKey}
                onChange={e => set("palletPresetKey", e.target.value as "custom" | string)}
                className="mt-2 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
              >
                {PALLET_PRESETS.map(p => (
                  <option key={p.key} value={p.key}>{p.name}</option>
                ))}
                <option value="custom">Custom</option>
              </select>
            </div>

            {value.palletPresetKey === "custom" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-black">Pallet Length</label>
                  <input
                    inputMode="decimal"
                    value={String(value.palletLength ?? "")}
                    onChange={e => set("palletLength", Number(e.target.value || 0))}
                    className="mt-2 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Pallet Width</label>
                  <input
                    inputMode="decimal"
                    value={String(value.palletWidth ?? "")}
                    onChange={e => set("palletWidth", Number(e.target.value || 0))}
                    className="mt-2 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-black">Max Height (incl. pallet)</label>
              <input
                inputMode="decimal"
                value={String(value.maxPalletHeight ?? "")}
                onChange={e => set("maxPalletHeight", Number(e.target.value || 0))}
                className="mt-2 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Max Weight</label>
              <input
                inputMode="decimal"
                value={String(value.maxPalletWeight ?? "")}
                onChange={e => set("maxPalletWeight", Number(e.target.value || 0))}
                className="mt-2 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-black">Container (optional)</h3>
        <select
          value={value.containerKey || "none"}
          onChange={e => set("containerKey", e.target.value as "none" | string)}
          className="mt-2 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
        >
          <option value="none">None</option>
          <option value="20gp">20&apos; GP</option>
          <option value="40gp">40&apos; GP</option>
          <option value="40hc">40&apos; HC</option>
        </select>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={onCalculate} className="rounded-lg bg-black px-4 py-2 text-sm font-bold text-white">Calculate Now</button>
        <button onClick={onReset} className="rounded-lg border border-black/20 px-4 py-2 text-sm font-medium text-black">Reset</button>
      </div>
    </div>
  )
}


