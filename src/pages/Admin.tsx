import { useState, useEffect } from "react";
import { Lock, LogOut, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ADMIN_PASSWORD = "barroca";
const AUTH_KEY = "admin_authed";
const STORAGE_KEY = "admin_data";

interface AdminData {
  product: {
    title: string;
    description: string;
    price: number;
    installments: string;
    couponCode: string;
    couponDiscount: number;
    location: string;
  };
  seller: {
    name: string;
    maskedName: string;
    maskedCPF: string;
    status: string;
    lastAccess: string;
    memberSince: string;
    location: string;
    completedSales: number;
    cancelledSales: number;
    avgShippingTime: string;
  };
  checkout: {
    warrantyPrice: number;
    originalShipping: number;
    finalShipping: number;
    deliveryDeadline: string;
    pickupLocation: string;
  };
}

const DEFAULT_DATA: AdminData = {
  product: {
    title: "Nintendo Switch V2 NOVO – Completo na Caixa",
    description: "Nintendo Switch V2 NOVO – Completo na Caixa",
    price: 750,
    installments: "3x sem juros de R$ 250,00",
    couponCode: "QUERO50",
    couponDiscount: 50,
    location: "Vila Cruzeiro, São Paulo, SP",
  },
  seller: {
    name: "Neuza",
    maskedName: "N***a",
    maskedCPF: "***.***.***-**",
    status: "Conta verificada",
    lastAccess: "Último acesso há 21 min",
    memberSince: "Na OLX desde outubro de 2013",
    location: "Vila Cruzeiro, São Paulo, SP, 04726010",
    completedSales: 1,
    cancelledSales: 0,
    avgShippingTime: "20 horas",
  },
  checkout: {
    warrantyPrice: 50,
    originalShipping: 15,
    finalShipping: 15,
    deliveryDeadline: "2-3 dias úteis",
    pickupLocation: "Rua Exemplo, 123 - São Paulo, SP",
  },
};

const LoginScreen = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onSuccess();
    } else {
      setErr("Senha incorreta");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <form
        onSubmit={submit}
        className="bg-white border border-slate-200 rounded-xl p-8 w-full max-w-sm space-y-5 shadow-lg"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Lock className="text-blue-600" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Painel Admin</h1>
          <p className="text-sm text-slate-600">Digite a senha para continuar</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pwd">Senha</Label>
          <Input
            id="pwd"
            type="password"
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value);
              setErr("");
            }}
            placeholder="Digite a senha"
            autoFocus
          />
          {err && <p className="text-sm text-red-600">{err}</p>}
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  );
};

const AdminPanel = ({ onLogout }: { onLogout: () => void }) => {
  const [data, setData] = useState<AdminData>(DEFAULT_DATA);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
      }
    }
  }, []);

  const saveData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    toast.success("Dados salvos com sucesso!");
  };

  const updateProduct = (field: keyof AdminData["product"], value: any) => {
    setData((prev) => ({
      ...prev,
      product: { ...prev.product, [field]: value },
    }));
  };

  const updateSeller = (field: keyof AdminData["seller"], value: any) => {
    setData((prev) => ({
      ...prev,
      seller: { ...prev.seller, [field]: value },
    }));
  };

  const updateCheckout = (field: keyof AdminData["checkout"], value: any) => {
    setData((prev) => ({
      ...prev,
      checkout: { ...prev.checkout, [field]: value },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Painel Admin</h1>
          <Button variant="outline" onClick={onLogout} className="gap-2">
            <LogOut size={18} />
            Sair
          </Button>
        </div>

        <Tabs defaultValue="product" className="bg-white rounded-lg shadow-lg p-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="product">Produto</TabsTrigger>
            <TabsTrigger value="seller">Vendedor</TabsTrigger>
            <TabsTrigger value="checkout">Checkout</TabsTrigger>
          </TabsList>

          <TabsContent value="product" className="space-y-4 mt-6">
            <div>
              <Label>Título do Produto</Label>
              <Input
                value={data.product.title}
                onChange={(e) => updateProduct("title", e.target.value)}
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea
                value={data.product.description}
                onChange={(e) => updateProduct("description", e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <Label>Preço (R$)</Label>
              <Input
                type="number"
                value={data.product.price}
                onChange={(e) => updateProduct("price", parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label>Parcelamento</Label>
              <Input
                value={data.product.installments}
                onChange={(e) => updateProduct("installments", e.target.value)}
              />
            </div>
            <div>
              <Label>Código do Cupom</Label>
              <Input
                value={data.product.couponCode}
                onChange={(e) => updateProduct("couponCode", e.target.value)}
              />
            </div>
            <div>
              <Label>Desconto do Cupom (R$)</Label>
              <Input
                type="number"
                value={data.product.couponDiscount}
                onChange={(e) => updateProduct("couponDiscount", parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label>Localização</Label>
              <Input
                value={data.product.location}
                onChange={(e) => updateProduct("location", e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="seller" className="space-y-4 mt-6">
            <div>
              <Label>Nome do Vendedor</Label>
              <Input
                value={data.seller.name}
                onChange={(e) => updateSeller("name", e.target.value)}
              />
            </div>
            <div>
              <Label>Nome Mascarado</Label>
              <Input
                value={data.seller.maskedName}
                onChange={(e) => updateSeller("maskedName", e.target.value)}
              />
            </div>
            <div>
              <Label>CPF Mascarado</Label>
              <Input
                value={data.seller.maskedCPF}
                onChange={(e) => updateSeller("maskedCPF", e.target.value)}
              />
            </div>
            <div>
              <Label>Status</Label>
              <Input
                value={data.seller.status}
                onChange={(e) => updateSeller("status", e.target.value)}
              />
            </div>
            <div>
              <Label>Último Acesso</Label>
              <Input
                value={data.seller.lastAccess}
                onChange={(e) => updateSeller("lastAccess", e.target.value)}
              />
            </div>
            <div>
              <Label>Membro Desde</Label>
              <Input
                value={data.seller.memberSince}
                onChange={(e) => updateSeller("memberSince", e.target.value)}
              />
            </div>
            <div>
              <Label>Localização</Label>
              <Input
                value={data.seller.location}
                onChange={(e) => updateSeller("location", e.target.value)}
              />
            </div>
            <div>
              <Label>Vendas Concluídas</Label>
              <Input
                type="number"
                value={data.seller.completedSales}
                onChange={(e) => updateSeller("completedSales", parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>Vendas Canceladas</Label>
              <Input
                type="number"
                value={data.seller.cancelledSales}
                onChange={(e) => updateSeller("cancelledSales", parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>Tempo Médio de Envio</Label>
              <Input
                value={data.seller.avgShippingTime}
                onChange={(e) => updateSeller("avgShippingTime", e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="checkout" className="space-y-4 mt-6">
            <div>
              <Label>Preço da Garantia (R$)</Label>
              <Input
                type="number"
                value={data.checkout.warrantyPrice}
                onChange={(e) => updateCheckout("warrantyPrice", parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label>Frete Original (R$)</Label>
              <Input
                type="number"
                value={data.checkout.originalShipping}
                onChange={(e) => updateCheckout("originalShipping", parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label>Frete Final (R$)</Label>
              <Input
                type="number"
                value={data.checkout.finalShipping}
                onChange={(e) => updateCheckout("finalShipping", parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label>Prazo de Entrega</Label>
              <Input
                value={data.checkout.deliveryDeadline}
                onChange={(e) => updateCheckout("deliveryDeadline", e.target.value)}
              />
            </div>
            <div>
              <Label>Local de Retirada</Label>
              <Input
                value={data.checkout.pickupLocation}
                onChange={(e) => updateCheckout("pickupLocation", e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex gap-4">
          <Button onClick={saveData} className="gap-2 flex-1" size="lg">
            <Save size={18} />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const authed = sessionStorage.getItem(AUTH_KEY);
    setIsAuthed(!!authed);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthed(false);
  };

  if (!isAuthed) {
    return <LoginScreen onSuccess={() => setIsAuthed(true)} />;
  }

  return <AdminPanel onLogout={handleLogout} />;
}
