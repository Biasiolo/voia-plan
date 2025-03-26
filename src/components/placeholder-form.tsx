import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PlaceholderForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Em Desenvolvimento</CardTitle>
        <CardDescription>Este template ainda está sendo desenvolvido</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-4xl mb-4">🚧</div>
          <p className="text-center text-muted-foreground">
            Este formulário de template está em construção e estará disponível em breve.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

