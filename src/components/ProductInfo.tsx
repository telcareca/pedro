import { useState } from "react";
import { ChevronDown, Truck, CreditCard, Shield } from "lucide-react";
import locationIcon from "@/assets/location-icon.png";

const ProductBadges = () => (
  <div className="flex flex-wrap gap-2">
    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
      <Truck size={14} /> Entrega Fácil
    </span>
    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
      <CreditCard size={14} /> Pague Online
    </span>
    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
      <Shield size={14} /> Garantia da OLX
    </span>
  </div>
);

const description = `Nintendo Switch V2 NOVO – Completo na Caixa

Foi presente de aniversário para o meu filho, está praticamente sem uso, novinho mesmo. Mas estou precisando levantar dinheiro urgente para pagar contas, então estou vendendo

✔️ Sem detalhes
✔️ Completo com todos acessórios
✔️ Pouquíssimo uso
✔️ Funcionando perfeitamente

🎮 Acompanha jogos: Mario, Zelda e Pokémon

💰 Valor: R$ 750,00`;

const details = [
  { label: "Categoria", value: "Consoles De Vídeo Game" },
  { label: "Marca do Console", value: "Nintendo" },
  { label: "Modelo", value: "Nintendo Switch" },
  { label: "Condição", value: "Novo" },
  { label: "Características", value: "Inclui Cabos, Inclui Caixa, Inclui Controles, Inclui Jogos" },
  { label: "Aceita trocas", value: "Não" },
];

const ProductInfo = () => {
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <div className="space-y-6">
      <ProductBadges />

      <h1 className="text-xl font-bold text-foreground">
        Nintendo Switch V2 NOVO – Completo na Caixa
      </h1>

      <div>
        <h2 className="text-lg font-bold text-foreground mb-3">Descrição</h2>
        <div className={`text-sm text-foreground whitespace-pre-line leading-relaxed ${showFullDesc ? "" : "max-h-40 overflow-hidden relative"}`}>
          {description}
          {!showFullDesc && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
          )}
        </div>
        {!showFullDesc && (
          <button
            onClick={() => setShowFullDesc(true)}
            className="text-primary font-semibold text-sm mt-2 flex items-center gap-1 hover:underline"
          >
            Ver descrição completa <ChevronDown size={16} />
          </button>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold text-foreground mb-3">Detalhes</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          {details.map((d, i) => (
            <div key={d.label} className={`flex text-sm ${i % 2 === 0 ? "bg-card" : "bg-muted/50"}`}>
              <span className="w-1/3 py-3 px-4 font-semibold text-muted-foreground">{d.label}</span>
              <span className="w-2/3 py-3 px-4 text-foreground">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-foreground mb-3">Localização</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <img src={locationIcon} alt="Localização" className="w-8 h-8" />
          <div>
            <p className="text-foreground font-medium">Vila Cruzeiro</p>
            <p>São Paulo, SP, 04726010</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
