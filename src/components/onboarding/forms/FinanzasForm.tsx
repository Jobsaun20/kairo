import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FinanzasFormProps {
  subCategoryId: string;
  formData: any;
  onUpdate: (data: any) => void;
}

export const FinanzasForm = ({ subCategoryId, formData, onUpdate }: FinanzasFormProps) => {
  const updateField = (field: string, value: any) => {
    onUpdate({ ...formData, [field]: value });
  };

  if (subCategoryId === 'ahorro') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Fondo de emergencia"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Cantidad objetivo (CHF)</Label>
          <Input
            type="number"
            value={formData.savingsTarget || ''}
            onChange={(e) => updateField('savingsTarget', parseInt(e.target.value))}
            placeholder="3000"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Ingreso mensual aprox. (CHF)</Label>
          <Input
            type="number"
            value={formData.monthlyIncome || ''}
            onChange={(e) => updateField('monthlyIncome', parseInt(e.target.value))}
            placeholder="4000"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Gastos fijos mensuales (CHF)</Label>
          <Input
            type="number"
            value={formData.fixedExpenses || ''}
            onChange={(e) => updateField('fixedExpenses', parseInt(e.target.value))}
            placeholder="2500"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Frecuencia de aporte</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { id: 'semanal', label: 'Semanal', value: 'semanal' },
              { id: 'quincenal', label: 'Quincenal', value: 'quincenal' },
              { id: 'mensual', label: 'Mensual', value: 'mensual' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.contributionFrequency === option.value ? 'default' : 'outline'}
                onClick={() => updateField('contributionFrequency', option.value)}
                className="h-10 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Día de cargo preferido</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[1, 5, 15, 25].map((day) => (
              <Button
                key={day}
                variant={formData.chargeDay === day ? 'default' : 'outline'}
                onClick={() => updateField('chargeDay', day)}
                className="h-10"
              >
                Día {day}
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (subCategoryId === 'pagar_deudas') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Pagar tarjeta de crédito"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Tipo de deuda</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'tarjeta', label: 'Tarjeta crédito', value: 'tarjeta' },
              { id: 'prestamo', label: 'Préstamo personal', value: 'prestamo' },
              { id: 'auto', label: 'Préstamo auto', value: 'auto' },
              { id: 'otro', label: 'Otro', value: 'otro' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.debtType === option.value ? 'default' : 'outline'}
                onClick={() => updateField('debtType', option.value)}
                className="h-10 text-sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Monto total de deuda (CHF)</Label>
          <Input
            type="number"
            value={formData.debtAmount || ''}
            onChange={(e) => updateField('debtAmount', parseInt(e.target.value))}
            placeholder="5000"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Tasa de interés aprox. (%)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.interestRate || ''}
            onChange={(e) => updateField('interestRate', parseFloat(e.target.value))}
            placeholder="15.5"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Estrategia de pago</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'avalancha', label: 'Avalancha (mayor interés)', value: 'avalancha' },
              { id: 'bola_nieve', label: 'Bola de nieve (menor deuda)', value: 'bola_nieve' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.paymentStrategy === option.value ? 'default' : 'outline'}
                onClick={() => updateField('paymentStrategy', option.value)}
                className="h-auto py-2 text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Aporte mensual (CHF)</Label>
          <Input
            type="number"
            value={formData.monthlyPayment || ''}
            onChange={(e) => updateField('monthlyPayment', parseInt(e.target.value))}
            placeholder="300"
            className="mt-2"
          />
        </div>
      </>
    );
  }

  if (subCategoryId === 'gasto_consciente') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Controlar gastos impulsivos"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Categorías a vigilar</Label>
          <Input
            value={formData.watchCategories || ''}
            onChange={(e) => updateField('watchCategories', e.target.value)}
            placeholder="Ej: Comida fuera, ropa, ocio"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Presupuesto semanal por categoría (CHF)</Label>
          <Input
            type="number"
            value={formData.weeklyBudget || ''}
            onChange={(e) => updateField('weeklyBudget', parseInt(e.target.value))}
            placeholder="100"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Días "no-spend" por semana</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[0, 1, 2, 3].map((days) => (
              <Button
                key={days}
                variant={formData.noSpendDays === days ? 'default' : 'outline'}
                onClick={() => updateField('noSpendDays', days)}
                className="h-10"
              >
                {days}
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (subCategoryId === 'presupuesto') {
    return (
      <>
        <div>
          <Label>Título del objetivo</Label>
          <Input
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ej: Presupuesto 50/30/20"
            className="mt-2"
          />
        </div>

        <div>
          <Label>Ingreso mensual neto (CHF)</Label>
          <Input
            type="number"
            value={formData.monthlyIncome || ''}
            onChange={(e) => updateField('monthlyIncome', parseInt(e.target.value))}
            placeholder="4000"
            className="mt-2"
          />
        </div>

        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span>50% Necesidades:</span>
            <span className="font-semibold">{formData.monthlyIncome ? (formData.monthlyIncome * 0.5).toFixed(0) : '0'} CHF</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>30% Deseos:</span>
            <span className="font-semibold">{formData.monthlyIncome ? (formData.monthlyIncome * 0.3).toFixed(0) : '0'} CHF</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>20% Ahorro:</span>
            <span className="font-semibold">{formData.monthlyIncome ? (formData.monthlyIncome * 0.2).toFixed(0) : '0'} CHF</span>
          </div>
        </div>

        <div>
          <Label>Frecuencia de revisión</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { id: 'semanal', label: 'Semanal', value: 'semanal' },
              { id: 'quincenal', label: 'Quincenal', value: 'quincenal' }
            ].map((option) => (
              <Button
                key={option.id}
                variant={formData.reviewFrequency === option.value ? 'default' : 'outline'}
                onClick={() => updateField('reviewFrequency', option.value)}
                className="h-10"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return null;
};