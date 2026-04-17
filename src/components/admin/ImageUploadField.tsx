import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploadField({ value, onChange, label }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const uploadMutation = trpc.storage.uploadImage.useMutation();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Maximo 5MB.");
      return;
    }

    setUploading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await uploadMutation.mutateAsync({
        fileName: file.name,
        fileData: Array.from(new Uint8Array(arrayBuffer)),
        mimeType: file.type,
      });
      onChange(result.url);
      toast.success("Imagem enviada com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar imagem");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL da imagem"
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => document.getElementById(`file-input-${Math.random()}`)?.click()}
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
        </Button>
      </div>
      <input
        id={`file-input-${Math.random()}`}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      {value && (
        <div className="mt-2 rounded-lg overflow-hidden bg-muted">
          <img src={value} alt="Preview" className="w-full h-auto max-h-48 object-cover" />
        </div>
      )}
    </div>
  );
}
