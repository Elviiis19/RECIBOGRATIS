import React, { useRef, useState, useEffect } from "react";
import { PenTool, RotateCcw, Check, X, ShieldCheck } from "lucide-react";

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  initialSignature?: string;
  signerName?: string;
}

export function SignatureModal({
  isOpen,
  onClose,
  onSave,
  initialSignature,
  signerName,
}: SignatureModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [penColor, setPenColor] = useState<string>("#0b2265"); // Royal blue ink standard
  const [penWidth, setPenWidth] = useState<number>(2.5);

  useEffect(() => {
    if (!isOpen) return;
    setHasDrawn(!!initialSignature);

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Handle retina / high-DPI displays
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;

      if (initialSignature) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, rect.width, rect.height);
        };
        img.src = initialSignature;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen, initialSignature]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e?: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    if (e) e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasDrawn(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) {
      onSave("");
      onClose();
      return;
    }
    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-emerald-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                Assinatura na Tela
              </h3>
              <p className="text-xs text-gray-500">
                {signerName ? `Assinatura de: ${signerName}` : "Assine com o dedo ou mouse"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Assinatura digital válida no documento
            </span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Tinta:</span>
              <button
                type="button"
                onClick={() => setPenColor("#0b2265")}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  penColor === "#0b2265" ? "border-gray-900 scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: "#0b2265" }}
                title="Azul Caneta (Padrão)"
              />
              <button
                type="button"
                onClick={() => setPenColor("#111827")}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  penColor === "#111827" ? "border-gray-900 scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: "#111827" }}
                title="Preto"
              />
            </div>
          </div>

          {/* Canvas Area */}
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-white overflow-hidden shadow-inner touch-none">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-44 cursor-crosshair block"
              style={{ touchAction: "none" }}
            />

            {/* Baseline guideline */}
            <div className="pointer-events-none absolute left-8 right-8 bottom-10 border-b border-gray-200 flex justify-between text-[11px] text-gray-300 font-mono">
              <span>assine sobre a linha</span>
              <span>×</span>
            </div>

            {!hasDrawn && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                Desenhe sua assinatura aqui com o dedo ou mouse
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Dica: No celular, assine usando a ponta do dedo</span>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1 text-gray-600 hover:text-red-600 font-medium py-1 px-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar tela
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-200/60 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasDrawn}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl shadow-md transition-all"
          >
            <Check className="w-4 h-4" />
            Salvar no Recibo
          </button>
        </div>
      </div>
    </div>
  );
}
